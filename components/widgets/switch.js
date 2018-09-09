import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import LightStatus from '../light-status'
import xml2js from 'xml2js'
import axios from 'axios'
import { Lightbulb } from 'styled-icons/fa-regular/Lightbulb.cjs'

const schema = object().shape({
  deviceId: number().required(),
  statusUrl: string(),
  actionUrl: string(),
  interval: number(),
  readOnly: boolean(),
  title: string()
})

export default class Switch extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Switch',
    readOnly: false,
    statusUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id={deviceId}',
    actionUrl: 'http://homematic-raspi/addons/xmlapi/statechange.cgi?ise_id={deviceId}&new_value={value}'
  }

  state = {
    active: false,
    error: false,
    loading: true
  }

  constructor (props) {
    super(props)
    this.state = {active: false}
  }

  handleClick () {
    if (this.props.readOnly === false) {
      var url = this.props.actionUrl.replace('{deviceId}', this.props.deviceId)
      url = url.replace('{value}', !this.state.active)
      let newActive = this.state.active
      console.log(url)
      axios.get(url)
        .then(response => {
          xml2js.parseString(response.data, function (err, result) {
            if (result.result.changed[0].$.new_value === 'true') {
              newActive = true
            } else {
              newActive = false
            }
          })
          this.setState({active: newActive, error: false, loading: false})
        })
    }
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
    const {statusUrl, deviceId} = this.props

    try {
      let newActive = this.state.active
      const url = statusUrl.replace('{deviceId}', deviceId)

      const res = await fetch(url)
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

  render () {
    const {error, loading, active} = this.state
    const {title} = this.props
    return (
      <Widget title={title} loading={loading} error={error}>
        <LightStatus active={active} onClick={this.handleClick.bind(this)}>
          <Lightbulb size='36' />
          <div>{active ? 'ON' : 'OFF'}</div>
        </LightStatus>
      </Widget>
    )
  }
}
