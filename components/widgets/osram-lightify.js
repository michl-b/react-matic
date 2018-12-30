import { Component } from 'react'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import axios from 'axios'
import { HuePicker } from 'react-color'
import styled from 'styled-components'
import myEnv from '../../myenv'
import VerticalList from '../vertival-list'
import ActionButtonSmall from '../action-button-small'
import Title from '../title'

const Status = styled.div`
  width: 18em;
  height: 6em;
  align-items: center;
  background-color: ${props => props.active ? props.theme.palette.lightOnColor : props.theme.palette.canvasColor};
  color: ${props => props.active ? props.theme.palette.textInvertColor : props.theme.palette.textColor};
  border: 1px solid ${props => props.theme.palette.borderColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  align-content:flex-start;
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
    testMode: false,
    textOff: 'Off',
    textOn: 'On',
    textBrightness: 'brightness',
    textTemperature: 'temperature'
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
        axios.get(myEnv.app.baseUrl + '/api/osram/nodeStatus?mac=' + mac)
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

  handleChangeBrightness (value) {
    if (!this.props.testMode) {
      var url = myEnv.app.baseUrl + '/api/osram/nodeBrightness?mac=' + this.props.mac + '&brightness=' + value
      axios.get(url)
        .then(this.fetchInformation())
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true, loading: false })
        })
    }
    this.setState({ brightness: value })
  }

  handleChangeTemperature (value) {
    if (!this.props.testMode) {
      var url = myEnv.app.baseUrl + '/api/osram/nodeTemperature?mac=' + this.props.mac + '&temperature=' + value
      axios.get(url)
        .then(this.fetchInformation())
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true, loading: false })
        })
    }
    this.setState({ temperature: value })
  }

  setColor = () => {
    if (!this.props.testMode) {
      var url = myEnv.app.baseUrl + '/api/osram/nodeColor?mac=' + this.props.mac + '&red=' + this.state.red + '&green=' + this.state.green + '&blue=' + this.state.blue
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
      var url = myEnv.app.baseUrl + '/api/osram/nodeOnOff?mac=' + this.props.mac + '&on=' + newStatus
      axios.get(url)
        .then(this.fetchInformation())
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true, loading: false })
        })
      this.setState({ status: newStatus })
    }
  }

  render () {
    const { error, loading, brightness, temperature } = this.state
    const { title, textOff, textOn, textBrightness, textTemperature } = this.props

    const active = this.state.status === 1

    return (
      <Widget doubleWidth doubleHeight loading={loading} error={error}>
        <Status doubleWidth active={active} onClick={this.handleOnOff.bind(this)}>
          <Title>{title}</Title>
          <div>{textBrightness}: {brightness}%</div>
          <div>{textTemperature}: {temperature} Kelvin</div>
        </Status>

        <HuePicker
          color={this.state.color}
          onChangeComplete={this.handleChangeColorComplete.bind(this)}
        />

        <p>{textBrightness}</p>
        <VerticalList doubleWidth>
          <ActionButtonSmall
            onClick={this.handleChangeBrightness.bind(this, '0')}>{textOff}</ActionButtonSmall>
          <ActionButtonSmall
            onClick={this.handleChangeBrightness.bind(this, '50')}>50%</ActionButtonSmall>
          <ActionButtonSmall
            onClick={this.handleChangeBrightness.bind(this, '100')}>{textOn}</ActionButtonSmall>
        </VerticalList>

        <p>{textTemperature}</p>
        <VerticalList doubleWidth>
          <ActionButtonSmall
            onClick={this.handleChangeTemperature.bind(this, '2700')}>2700</ActionButtonSmall>
          <ActionButtonSmall
            onClick={this.handleChangeTemperature.bind(this, '4000')}>4000</ActionButtonSmall>
          <ActionButtonSmall
            onClick={this.handleChangeTemperature.bind(this, '6500')}>6500</ActionButtonSmall>
        </VerticalList>
      </Widget>
    )
  }
}
