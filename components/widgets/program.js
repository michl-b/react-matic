import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string } from 'yup'
import Widget from '../widget'
import xml2js from 'xml2js'
import axios from 'axios'
import ActionButton from '../action-button'
import { PlayCircle } from 'styled-icons/fa-regular/PlayCircle.cjs'
import myenv from '../../myenv'

const schema = object().shape({
  programId: number().required(),
  statusUrl: string(),
  interval: number(),
  title: string()
})

export default class Program extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Program',
    statusUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id='
  }

  state = {
    active: false,
    error: false,
    testMode: false
  }

  constructor (props) {
    super(props)
    this.state = {testMode: myenv['testMode']}
  }

  componentDidMount () {
    schema.validate(this.props)
    .then(() => this.fetchInformation())
    .catch((err) => {
      console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
      this.setState({error: true, loading: false})
    })
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  async fetchInformation () {
    const {statusUrl, programId} = this.props

    try {
      let newActive = this.state.active
      if (!this.state.testMode) {
        const res = await fetch(`${statusUrl}${programId}`)
        const message = await res.text()

        xml2js.parseString(message, function (err, result) {
          newActive = result.state.datapoint[0].$.value === 'true'
        })
      } else {
        newActive = !this.state.active
      }

      this.setState({active: newActive, error: false, loading: false})
    } catch (error) {
      console.log(error)
      this.setState({error: true, loading: false})
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  handleClick () {
    if (!this.state.testMode) {
      axios.get(
        'http://homematic-raspi/addons/xmlapi/runprogram.cgi?program_id=' +
        this.props.programId)
      .then(this.setState({active: true}))
      .catch((err) => {
        console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
        this.setState({error: true})
      })
    }
  }

  render () {
    const {error, loading, active} = this.state
    const {title} = this.props
    return (
      <Widget title={title} loading={loading} error={error}>
        <ActionButton active={active} onClick={this.handleClick.bind(this)}>
          <PlayCircle size='36'/>
        </ActionButton>
      </Widget>
    )
  }
}
