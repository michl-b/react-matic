import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string, boolean } from 'yup'
import Widget from '../widget'
import styled from 'styled-components'
import xml2js from 'xml2js'

const TemperatureItem = styled.div`
  font-size: 2em;
  text-align: center;
`

const HumidityItem = styled.div`
  font-size: 1.5em;
  text-align: center;
`

const schema = object().shape({
  temperatureDatapointId: number().required(),
  humidityDatapointId: number(),
  deviceId: number().required(),
  statusUrl: string(),
  deviceUrl: string(),
  interval: number(),
  title: string(),
  testMode: boolean()
})

class TempSensor extends Component {
  static defaultProps = {
    interval: 1000 * 5, // five seconds
    title: 'Temperatur- und Luftfeuchtigkeitssensor',
    statusUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id=',
    deviceUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?device_id=',
    testMode: false
  }

  state = {
    temperature: 0.000000,
    humidity: 0,
    error: false,
    loading: true
  }

  constructor(props) {
    super(props)
    this.state = { temperature: 0.000000, humidity: 0 }
  }

  componentDidMount() {
    schema.validate(this.props)
      .then(() => this.fetchInformation())
      .catch((err) => {
        console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
        this.setState({ error: true, loading: false })
      })
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  async fetchInformation() {
    const { deviceUrl, statusUrl, deviceId, temperatureDatapointId, humidityDatapointId } = this.props

    try {
      let newTemperature = 0.0
      let newHumidity = 0
      let newError = false

      if (!this.props.testMode) {
        const temperatureRes = await fetch(`${statusUrl}${temperatureDatapointId}`)
        const temperatureMessage = await temperatureRes.text()

        xml2js.parseString(temperatureMessage, function (err, result) {
          newTemperature = result.state.datapoint[0].$.value
        })

        const humidityRes = await fetch(`${statusUrl}${humidityDatapointId}`)
        const humidityMessage = await humidityRes.text()

        xml2js.parseString(humidityMessage, function (err, result) {
          newHumidity = result.state.datapoint[0].$.value
        })

        const resDevice = await fetch(`${deviceUrl}${deviceId}`)
        const messageDevice = await resDevice.text()
        xml2js.parseString(messageDevice, function (err, result) {
          newError = result.state.device[0].$.unreach === 'true' || result.state.device[0].$.unreach === '1'
        })
      } else {
        newTemperature = 23.87
        newHumidity = 99
      }

      this.setState({ humidity: newHumidity, temperature: newTemperature, error: newError, loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: true, loading: false })
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  render() {
    const { error, loading, temperature, humidity } = this.state
    const { title } = this.props

    let tempString = parseInt(temperature).toFixed(2)

    return (
      <Widget title={title} loading={loading} error={error}>
        <div style={{ paddingTop: 2 + 'em' }}>
          <TemperatureItem>{tempString + ' °C'}</TemperatureItem>
          <HumidityItem>{humidity + ' %'}</HumidityItem>
        </div>
      </Widget>
    )
  }
}

export default TempSensor;