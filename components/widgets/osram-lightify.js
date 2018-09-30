import { Component } from 'react'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import axios from 'axios'
import Slider from 'react-rangeslider'
import { CirclePicker } from 'react-color'
import styled from 'styled-components'

const Status = styled.button`
  background-color: ${props => props.active ? props.theme.palette.lightOnColor : props.theme.palette.disabledColor};
  color: ${props => props.active ? props.theme.palette.textInvertColor : props.theme.palette.textColor};
  width: 100%;
  height: 2em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const schema = object().shape({
  mac: string().required(),
  interval: number(),
  title: string(),
  testMode: boolean()
})

export default class OsramLightify extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Osram Lightify',
    testMode: false
  }

  state = {
    status: 0,
    brightness: 0,
    error: false,
    loading: true,
    red: 0,
    green: 0,
    blue: 0,
    color: '#ffffff',
    temperature: 2700
  }

  constructor (props) {
    super(props)
    this.state = { status: 0, brightness: 0, red: 0, green: 0, blue: 0, temperature: 2700 }
  }

  componentDidMount () {
    schema.validate(this.props)
      .then(() => this.fetchInformation())
      .catch((err) => {
        console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
        this.setState({ error: true, loading: false })
      })
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  async fetchInformation () {
    const { mac } = this.props

    try {
      if (!this.props.testMode) {
        axios.get('http://localhost:3000/api/osram/nodeStatus?mac=' + mac)
          .then(axiosRes => {
            var rgb = axiosRes.data.blue | (axiosRes.data.green << 8) | (axiosRes.data.red << 16)
            var hexColor = '#' + (0x1000000 + rgb).toString(16).slice(1)

            this.setState({
              status: axiosRes.data.status,
              brightness: axiosRes.data.brightness,
              temperature: axiosRes.data.temperature,
              color: hexColor,
              error: false,
              loading: false
            })
          })
          .catch(err => {
            console.log(err)
            this.setState({ error: true, loading: false })
          })
      } else {
        this.setState({ error: false, loading: false })
      }
    } catch (error) {
      console.log(error)
      this.setState({ error: true, loading: false })
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  handleChangeBrightnessSlider = level => {
    this.setState({
      brightness: level
    })
  }

  handleChangeBrightnessSliderComplete = () => {
    if (!this.props.testMode) {
      var url = 'http://localhost:3000/api/osram/nodeBrightness?mac=' + this.props.mac + '&brightness=' + this.state.brightness
      axios.get(url)
        .then(this.fetchInformation())
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true, loading: false })
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
      var url = 'http://localhost:3000/api/osram/nodeTemperature?mac=' + this.props.mac + '&temperature=' + this.state.temperature
      axios.get(url)
        .then(this.fetchInformation())
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true, loading: false })
        })
    }
  }

  setColor = () => {
    if (!this.props.testMode) {
      var url = 'http://localhost:3000/api/osram/nodeColor?mac=' + this.props.mac + '&red=' + this.state.red + '&green=' + this.state.green + '&blue=' + this.state.blue
      axios.get(url)
        .then(this.fetchInformation())
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true, loading: false })
        })
    }
  }

  handleChangeColorComplete = (color) => {
    this.setState({ color: color.hex, red: color.rgb.r, green: color.rgb.g, blue: color.rgb.b })
    this.setColor()
  }

  handleOnOff = () => {
    if (!this.props.testMode) {
      const newStatus = this.state.status === 1 ? 0 : 1
      var url = 'http://localhost:3000/api/osram/nodeOnOff?mac=' + this.props.mac + '&on=' + newStatus
      axios.get(url)
        .then(this.fetchInformation())
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true, loading: false })
        })
    }
  }

  render () {
    const { error, loading } = this.state
    const { title } = this.props

    const horizontalLabels = { 0: 'Off', 50: '50%', 100: '100%' }
    const horizontalTempLabels = { 2700: '2700', 6500: '6500' }
    const style = { width: '15em', height: '3em' }
    const active = this.state.status === 1

    return (
      <Widget doubleWidth doubleHeight loading={loading} error={error}>
        <Status active={active} onClick={this.handleOnOff.bind(this)}>
          <div>{title}{active ? ' - ON' : ' - OFF'}</div>
        </Status>

        <CirclePicker
          color={this.state.color}
          onChangeComplete={this.handleChangeColorComplete.bind(this)}
        />
        <div style={style}>
          <Slider
            id='brightnessSlider'
            min={0}
            max={100}
            step={25}
            value={this.state.brightness}
            tooltip={false}
            onChange={this.handleChangeBrightnessSlider.bind(this)}
            onChangeComplete={this.handleChangeBrightnessSliderComplete.bind(this)}
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
