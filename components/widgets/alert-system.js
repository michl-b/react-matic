import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import SensorStatus from '../sensor-status'
import xml2js from 'xml2js'
import VerticalList from '../vertival-list'
import ActionButton from '../action-button'
import axios from 'axios'

const schema = object().shape({
  alertVariableId: number().required(),
  alertSystemVariableId: number().required(),
  activateSystemProgramId: number().required(),
  deactivateSystemProgramId: number().required(),
  statusUrl: string(),
  interval: number(),
  title: string(),
  testMode: boolean()
})

export default class AlertSystem extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'AlertSystem',
    statusUrl: 'http://homematic-raspi/addons/xmlapi/sysvar.cgi?ise_id=',
    testMode: false
  }

  state = {
    alertSystemActive: false,
    alertTriggered: false,
    error: false,
    loading: true
  }

  constructor (props) {
    super(props)
    this.state = { alertSystemActive: false, alertTriggered: false }
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
    const {statusUrl, alertVariableId, alertSystemVariableId} = this.props

    try {
      let newAlertSystemActive = this.state.alertSystemActive
      if (!this.props.testMode) {
        const res = await fetch(`${statusUrl}${alertSystemVariableId}`)
        const message = await res.text()

        xml2js.parseString(message, function (err, result) {
          newAlertSystemActive = result.systemVariables.systemVariable[0].$.value === 'true'
        })
      } else {
        newAlertSystemActive = !this.state.alertSystemActive
      }

      let newAlertTrigerred = this.state.alertTriggered
      if (!this.props.testMode) {
        const res = await fetch(`${statusUrl}${alertVariableId}`)
        const message = await res.text()

        xml2js.parseString(message, function (err, result) {
          newAlertTrigerred = result.systemVariables.systemVariable[0].$.value === 'true'
        })
      } else {
        newAlertTrigerred = !this.state.alertTriggered
      }

      this.setState({
        alertSystemActive: newAlertSystemActive,
        alertTriggered: newAlertTrigerred,
        error: false,
        loading: false
      })
    } catch (error) {
      console.log(error)
      this.setState({error: true, loading: false})
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  handleClickActivate () {
    if (!this.props.testMode) {
      axios.get(
        'http://homematic-raspi/addons/xmlapi/runprogram.cgi?program_id=' +
        this.props.activateSystemProgramId)
        .then(this.setState({ alertSystemActive: true }))
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true })
        })
    }
  }

  handleClickDeactivate () {
    if (!this.props.testMode) {
      axios.get(
        'http://homematic-raspi/addons/xmlapi/runprogram.cgi?program_id=' +
        this.props.deactivateSystemProgramId)
        .then(this.setState({ alertSystemActive: false }))
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true })
        })
    }
  }

  render () {
    const { error, loading, alertSystemActive, alertTriggered } = this.state
    const { title } = this.props
    const background = this.state.alertTriggered ? '#f44336' : null

    return (
      <Widget doubleWidth title={title} loading={loading} error={error} background={background}>
        <VerticalList>
          <ActionButton onClick={this.handleClickActivate.bind(this)}>
            activate
          </ActionButton>
          <SensorStatus active={alertTriggered}>
            <div>{alertTriggered ? 'Alert' : 'Fine'}</div>
          </SensorStatus>
          <SensorStatus active={alertSystemActive}>
            <div>{alertSystemActive ? 'System Active' : 'System Inactive'}</div>
          </SensorStatus>
          <ActionButton onClick={this.handleClickDeactivate.bind(this)}>
            de- activate
          </ActionButton>
        </VerticalList>
      </Widget>
    )
  }
}
