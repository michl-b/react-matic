import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import axios from 'axios'
import Slider from 'react-rangeslider'
import { CirclePicker } from 'react-color';

const schema = object().shape({
  levelDeviceId: number().required(),
  colorDeviceId: number().required(),
  temperatureDeviceId: number().required(),
  actionUrl: string(),
  statusUrl: string(),
  interval: number(),
  title: string(),
  testMode: boolean()
})

export default class OsramLightify extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Osram Lightify',
    actionUrl: `http://homematic-raspi/addons/xmlapi/statechange.cgi?ise_id={deviceId}&new_value={value}`,
    statusUrl: `http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id={deviceId}`,
    testMode: false
  }

  state = {
    level: 0.000000,
    error: false,
    loading: true,
    red: 0,
    green: 0,
    blue: 255,
    color: '#ffffff',
    temperature: 2700
  }

  constructor (props) {
    super(props)
    this.state = {level: 0.000000, red: 0, green: 0, blue: 255, temperature: 2700}
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
    const {statusUrl, levelDeviceId} = this.props

    try {
      if (!this.props.testMode) {
        var url = statusUrl.replace('{deviceId}', levelDeviceId)
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

  handleChangeLevelSlider = level => {
    this.setState({
      level: level
    })
  }

  handleChangeLevelSliderComplete = () => {
    if (!this.props.testMode) {
      var url = this.props.actionUrl.replace('{deviceId}',
        this.props.levelDeviceId)
      url = url.replace('{value}', this.state.level)
      axios.get(url)
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({error: true, loading: false})
        })
    }
  }

  handleChangeTemperatureSlider = level => {
    this.setState({
      temperature: level
    })
  }

  handleChangeTemperatureSliderComplete = () => {
    if (!this.props.testMode) {
      var url = this.props.actionUrl.replace('{deviceId}',
        this.props.temperatureDeviceId)
      url = url.replace('{value}', this.state.temperature)
      axios.get(url)
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({error: true, loading: false})
        })
    }
  }

  setColor = () => {
    if (!this.props.testMode) {
      var url = this.props.actionUrl.replace('{deviceId}',
        this.props.colorDeviceId)
      url = url.replace('{value}',
        `rgb(${this.state.red},${this.state.green},${this.state.blue},0)`)
      axios.get(url)
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({error: true, loading: false})
        })
    }
  }

  handleChangeColorComplete = (color) => {
    this.setState({ color: color.hex })
    this.setState({ red: color.rgb.r, green: color.rgb.g, blue: color.rgb.b })
    this.setColor()
  };

  render () {
    const {error, loading} = this.state
    const {title} = this.props

    const horizontalLabels = {0: 'Off', 0.5: '50%', 1: '100%'}
    const horizontalTempLabels = {2700: '2700', 6500: '6500'}
    const style = {width: '15em', height: '3em'}

    return (
      <Widget doubleWidth doubleHeight title={title} loading={loading} error={error}>
        <CirclePicker
          color={this.state.color}
          onChangeComplete={this.handleChangeColorComplete.bind(this)}
        />
        <div style={style}>
          <Slider
            id='levelSlider'
            min={0}
            max={1}
            step={0.25}
            value={this.state.level}
            tooltip={false}
            onChange={this.handleChangeLevelSlider.bind(this)}
            onChangeComplete={this.handleChangeLevelSliderComplete.bind(this)}
            labels={horizontalLabels}
          />
        </div>
        <div style={style}>
          <Slider
            id='tempSlider'
            min={2700}
            max={6500}
            step={100}
            value={this.state.temperature}
            tooltip={false}
            onChange={this.handleChangeTemperatureSlider.bind(this)}
            onChangeComplete={this.handleChangeTemperatureSliderComplete.bind(this)}
            labels={horizontalTempLabels}
          />
        </div>
      </Widget>
    )
  }
}
