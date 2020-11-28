import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import xml2js from 'xml2js'

const schema = object().shape({
  datapointId: number().required(),
  deviceId: number().required(),
  statusUrl: string(),
  interval: number(),
  title: string(),
  readOnly: boolean(),
  testMode: boolean()
})

class HmDevice extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Sensor',
    statusUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id=',
    deviceUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?device_id=',
    testMode: false,
    readOnly: false,
    textActive: 'Open',
    textInactive: 'Closed'
  }

  state = {
    active: false,
    error: false,
    loading: true
  }

  constructor (props) {
    super(props)
    this.state = { active: false }
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
    const { deviceUrl, statusUrl, deviceId, datapointId } = this.props

    try {
      let newActive = this.state.active
      let newError = false
      if (!this.props.testMode) {
        const res = await fetch(`${statusUrl}${datapointId}`)
        const message = await res.text()

        xml2js.parseString(message, function (err, result) {
          newActive = result.state.datapoint[0].$.value === 'true' || result.state.datapoint[0].$.value === '1'
        })

        const resDevice = await fetch(`${deviceUrl}${deviceId}`)
        const messageDevice = await resDevice.text()
        xml2js.parseString(messageDevice, function (err, result) {
          newError = result.state.device[0].$.unreach === 'true' || result.state.device[0].$.unreach === '1'
        })
      } else {
        newActive = !this.state.active
      }

      this.setState({ active: newActive, error: newError, loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: true, loading: false })
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }
}

export default HmDevice