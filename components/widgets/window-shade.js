import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string } from 'yup'
import Widget from '../widget'
import xml2js from 'xml2js'
import axios from 'axios'
import VerticalList from '../vertival-list'
import Input from '../input'
import ActionButtonSmall from '../action-button-small'
import myenv from '../../myenv'

const schema = object().shape({
  deviceId: number().required(),
  statusUrl: string(),
  actionUrl: string(),
  interval: number(),
  title: string()
})

export default class WindowShade extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Window Shade',
    actionUrl: `http://homematic-raspi/addons/xmlapi/statechange.cgi?ise_id={deviceId}&new_value={value}`,
    statusUrl: `http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id={deviceId}`
  }

  state = {
    value: 0.000000,
    error: false,
    loading: true,
    testMode: false
  }

  constructor (props) {
    super(props)
    this.state = {value: 0.000000, testMode: myenv['testMode']}
  }

  handleChange (event) {
    if (!this.state.testMode) {
      var url = this.props.actionUrl.replace('{deviceId}', this.props.deviceId)
      url = url.replace('{value}', event.target.value)
      axios.get(url)
      .catch((err) => {
        console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
        this.setState({error: true, loading: false})
      })
    }
    this.setState({value: event.target.value})
  }

  handleClick (value) {
    if (!this.state.testMode) {
      var url = this.props.actionUrl.replace('{deviceId}', this.props.deviceId)
      url = url.replace('{value}', value)
      axios.get(url)
      .catch((err) => {
        console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
        this.setState({error: true, loading: false})
      })
    }
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
      let newValue = this.state.value
      const url = statusUrl.replace('{deviceId}', deviceId)
      if (!this.state.testMode) {
        const res = await fetch(url)
        const message = await res.text()

        xml2js.parseString(message, function (err, result) {
          newValue = result.state.datapoint[0].$.value
        })
      } else {
        newValue = 0.550000
      }

      this.setState({value: newValue, error: false, loading: false})
    } catch (error) {
      console.log(error)
      this.setState({error: true, loading: false})
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  render () {
    const {error, loading} = this.state
    const {title} = this.props
    return (
      <Widget doubleWidth title={title} loading={loading} error={error}>
        <Input placeholder='LEVEL' value={this.state.value} type='number'
          min={0.000000} max={1.000000} step={0.250000} pattern='[0-9]{1,6}'
          onChange={this.handleChange.bind(this)} />

        <VerticalList>
          <ActionButtonSmall onClick={this.handleClick.bind(this, '0.000000')}>Closed</ActionButtonSmall>
          <ActionButtonSmall onClick={this.handleClick.bind(this, '0.750000')}>Middle</ActionButtonSmall>
          <ActionButtonSmall onClick={this.handleClick.bind(this, '1.000000')}>Open</ActionButtonSmall>
        </VerticalList>
      </Widget>
    )
  }
}
