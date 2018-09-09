import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string } from 'yup'
import Widget from '../widget'
import SensorStatus from '../sensor-status'
import xml2js from 'xml2js'
import { DoorClosed } from 'styled-icons/fa-solid/DoorClosed.cjs'
import { DoorOpen } from 'styled-icons/fa-solid/DoorOpen.cjs'

const schema = object().shape({
  deviceId: number().required(),
  statusUrl: string(),
  interval: number(),
  title: string()
})

export default class Sensor extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Sensor',
    statusUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id='
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
      const res = await fetch(`${statusUrl}${deviceId}`)
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

    const icon = this.state.active ? <DoorOpen size='36' /> : <DoorClosed size='36' />

    return (
      <Widget title={title} loading={loading} error={error}>
        <SensorStatus active={active}>
          {icon}
          <div>{active ? 'Open' : 'Closed'}</div>
        </SensorStatus>
      </Widget>
    )
  }
}
