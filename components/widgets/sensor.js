import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import xml2js from 'xml2js'
import { DoorClosed } from 'styled-icons/fa-solid/DoorClosed.cjs'
import { DoorOpen } from 'styled-icons/fa-solid/DoorOpen.cjs'

const schema = object().shape({
  deviceId: number().required(),
  statusUrl: string(),
  interval: number(),
  title: string(),
  testMode: boolean()
})

export default class Sensor extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Sensor',
    statusUrl: 'http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id=',
    testMode: false,
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
    const { statusUrl, deviceId } = this.props

    try {
      let newActive = this.state.active
      if (!this.props.testMode) {
        const res = await fetch(`${statusUrl}${deviceId}`)
        const message = await res.text()

        xml2js.parseString(message, function (err, result) {
          newActive = result.state.datapoint[0].$.value === 'true' || result.state.datapoint[0].$.value === '1'
        })
      } else {
        newActive = !this.state.active
      }

      this.setState({ active: newActive, error: false, loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: true, loading: false })
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  render () {
    const { error, loading, active } = this.state
    const { title, textActive, textInactive } = this.props

    const icon = this.state.active ? <DoorOpen size='48'/> : <DoorClosed size='48'/>

    return (
      <Widget title={title} loading={loading} error={error} active={active} background={active ? '#f44336' : '#4caf50'}>
        <div style={{ paddingTop: 1 + 'em' }}>
          {icon}
          <div>{active ? textActive : textInactive}</div>
        </div>
      </Widget>
    )
  }
}
