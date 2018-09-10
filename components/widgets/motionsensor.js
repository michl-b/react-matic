import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string } from 'yup'
import Widget from '../widget'
import SensorStatus from '../sensor-status'
import xml2js from 'xml2js'
import { Person } from 'styled-icons/octicons/Person.cjs'
import myenv from '../../myenv'

const schema = object().shape({
  deviceId: number().required(),
  statusUrl: string(),
  interval: number(),
  title: string()
})

export default class MotionSensor extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'MotionSensor',
    statusUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id='
  }

  state = {
    active: false,
    error: false,
    loading: true,
    testMode: false
  }

  constructor (props) {
    super(props)
    this.state = {active: false, testMode: myenv['testMode'] > 0}
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
      if (!this.state.testMode) {
        const res = await fetch(`${statusUrl}${deviceId}`)
        const message = await res.text()

        xml2js.parseString(message, function (err, result) {
          newActive = result.state.datapoint[0].$.value === 'true'
        })
      } else {
        newActive = !this.state.active
      }

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
    const icon = this.state.active ? <Person size='36' /> : ''
    return (
      <Widget title={title} loading={loading} error={error}>
        <SensorStatus active={active}>
          {icon}
          <div>{active ? 'Motion' : 'Nothing'}</div>
        </SensorStatus>
      </Widget>
    )
  }
}
