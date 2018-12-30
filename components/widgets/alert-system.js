import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import xml2js from 'xml2js'
import VerticalList from '../vertival-list'
import axios from 'axios'
import styled from 'styled-components'

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

const Status = styled.span`
  background-color: ${props => props.active ? props.theme.palette.errorColor : props.theme.palette.successColor};
  color: ${props => props.active ? props.theme.palette.textInvertColor : props.theme.palette.textColor};
  height: 5em;
  width: 10em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: 2px;
  margin-right: 2px;
`

export default class AlertSystem extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'AlertSystem',
    statusUrl: 'http://homematic-raspi/addons/xmlapi/sysvar.cgi?ise_id=',
    testMode: false,
    textSystemActive: 'System Active',
    textSystemInactive: 'System Inactive',
    textAlertActive: 'Alert',
    textAlertInactive: 'Fine'
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
    const { statusUrl, alertVariableId, alertSystemVariableId } = this.props

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
      this.setState({ error: true, loading: false })
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  handleClickActivate () {
    if (!this.props.testMode) {
      let url = 'http://homematic-raspi/addons/xmlapi/runprogram.cgi?program_id=' + this.props.activateSystemProgramId

      if (this.state.alertSystemActive) {
        url = 'http://homematic-raspi/addons/xmlapi/runprogram.cgi?program_id=' + this.props.deactivateSystemProgramId
      }

      axios.get(url)
        .then(this.setState({ alertSystemActive: !this.state.alertSystemActive }))
        .catch((err) => {
          console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
          this.setState({ error: true })
        })
    }
  }

  render () {
    const { error, loading, alertSystemActive, alertTriggered } = this.state
    const { title, textSystemActive, textSystemInactive, textAlertActive, textAlertInactive } = this.props
    const background = this.state.alertTriggered ? '#f44336' : null

    return (
      <Widget doubleWidth title={title} loading={loading} error={error} background={background}>
        <div style={{ paddingTop: 2 + 'em' }}>
          <VerticalList>
            <Status active={alertTriggered}>
              <div>{alertTriggered ? textAlertActive : textAlertInactive}</div>
            </Status>
            <Status active={alertSystemActive} onClick={this.handleClickActivate.bind(this)}>
              <div>{alertSystemActive ? textSystemActive : textSystemInactive}</div>
            </Status>
          </VerticalList>
        </div>
      </Widget>
    )
  }
}
