import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string } from 'yup'
import Widget from '../widget'
import axios from 'axios'
import LightStatus from '../light-status'
import ActionButtonSmall from '../action-button-small'

const schema = object().shape({
  deviceId: number().required(),
  actionUrl: string(),
  statusUrl: string(),
  interval: number(),
  title: string()
})

export default class OsramLightify extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Osram Lightify',
    actionUrl: `http://homematic-raspi/addons/xmlapi/statechange.cgi?ise_id={deviceId}&new_value={value}`,
    statusUrl: `http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id={deviceId}`
  }

  state = {
    value: 0.000000,
    error: false,
    loading: true
  }

  constructor (props) {
    super(props)
    this.state = {value: 0.000000}
  }

  handleClick (value) {
    var url = this.props.actionUrl.replace('{deviceId}', this.props.deviceId)
    url = url.replace('{value}', value)
    axios.get(url)
    .catch((err) => {
      console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
      this.setState({error: true, loading: false})
    })

    this.setState({value: value})
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
      var url = statusUrl.replace('{deviceId}', deviceId)
      await fetch(url)

      this.setState({error: false, loading: false})
    } catch (error) {
      console.log(error)
      this.setState({error: true, loading: false})
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  render () {
    const {error, loading, value} = this.state
    const {title} = this.props
    return (
      <Widget title={title} loading={loading} error={error}>
        <LightStatus active={value > 0.0} onClick={this.handleClick}>
          {value}
          <ActionButtonSmall onClick={this.handleClick.bind(this, '0.0')}>0%</ActionButtonSmall>
          <ActionButtonSmall onClick={this.handleClick.bind(this, '0.5')}>50%</ActionButtonSmall>
          <ActionButtonSmall onClick={this.handleClick.bind(this, '1.0')}>100%</ActionButtonSmall>
        </LightStatus>
      </Widget>
    )
  }
}
