import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string } from 'yup'
import Widget from '../widget'
import axios from 'axios'
import myenv from '../../myenv'
import Slider from 'react-rangeslider'

const schema = object().shape({
  deviceId: number().required(),
  statusUrl: string(),
  actionUrl: string(),
  interval: number(),
  title: string()
})

export default class Dimmer extends Component {
  static defaultProps = {
    interval: 1000 * 5,  // five seconds
    title: 'Dimmer',
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
    this.state = {value: 0.000000, testMode: myenv['testMode'] > 0}
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
      if (!this.state.testMode) {
        var url = statusUrl.replace('{deviceId}', deviceId)
        await fetch(url)
      }
      this.setState({error: false, loading: false})
    } catch (error) {
      console.log(error)
      this.setState({error: true, loading: false})
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  handleChangeSlider = value => {
    this.setState({
      value: value
    })
    console.log(value)
  };

  handleChangeSliderComplete = () => {
    if (!this.state.testMode) {
      var url = this.props.actionUrl.replace('{deviceId}', this.props.deviceId)
      url = url.replace('{value}', this.state.value)
      axios.get(url)
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({error: true, loading: false})
        })
    }
  };

  render () {
    const {error, loading} = this.state
    const {title} = this.props

    const horizontalLabels = {0: 'Off', 0.5: '50%', 1: '100%'}
    const style = {width: '8em'}

    return (
      <Widget title={title} loading={loading} error={error}>
        <div style={style}>
          <Slider
            min={0}
            max={1}
            step={0.25}
            value={this.state.value}
            tooltip={false}
            onChange={this.handleChangeSlider.bind(this)}
            onChangeComplete={this.handleChangeSliderComplete.bind(this)}
            labels={horizontalLabels}
          />
        </div>
      </Widget>
    )
  }
}
