import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string } from 'yup'
import Widget from '../widget'
import xml2js from 'xml2js'
import axios from 'axios'
import ActionButton from '../action-button'
import { PlayCircle } from 'styled-icons/fa-regular/PlayCircle.cjs'

const schema = object().shape({
  programId: number().required(),
  statusUrl: string().required(),
  interval: number(),
  title: string()
})

export default class Program extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Program'
  }

  state = {
    active: false,
    error: false
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
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
    const {statusUrl} = this.props

    try {
      let newActive = this.state.active
      const res = await fetch(`${statusUrl}`)
      const message = await res.text()

      xml2js.parseString(message, function (err, result) {
        newActive = result.state.datapoint[0].$.value === 'true'
      })

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
    axios.get('http://homematic-raspi/addons/xmlapi/runprogram.cgi?program_id=' +
      this.props.programId)
      .then(this.setState({active: true}))
      .catch((err) => {
        console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
        this.setState({error: true})
      })
  }

  render () {
    const {error, loading, active} = this.state
    const {title} = this.props
    return (
      <Widget title={title} loading={loading} error={error}>
        <ActionButton active={active} onClick={this.handleClick}>
          <PlayCircle size='36' />
        </ActionButton>
      </Widget>
    )
  }
}
