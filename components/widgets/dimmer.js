import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { object, string, number } from 'yup'
import Widget from '../widget'
import xml2js from 'xml2js'
import axios from 'axios'
import styled from 'styled-components'
import { size } from 'polished'

const schema = object().shape({
  statusUrl: string().required(),
  actionUrl: string().required(),
  interval: number(),
  title: string()
})

const DimmerStatus = styled.div`
background-color: ${props => props.value > 0.0 ? props.theme.palette.successColor : props.theme.palette.disabledColor};
${size('6em')}
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export default class Dimmer extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Dimmer'
  }

  state = {
    value: 0.000000,
    error: false,
    loading: true
  }

  constructor(props) {
    super(props);
    this.state = {value: 0.000000};
  }

  handleClick(value) {
    axios.get(this.props.actionUrl+value)
    .then(response => {
      let newValue = value
      const xml = xml2js.parseString(response.data, function (err, result) {
        newValue = result.result.changed[0].$.new_value
      });
      this.setState({ value: newValue, error: false, loading: false })
    })
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
    const { statusUrl } = this.props

    try {
      let newValue = this.state.value
      const res = await fetch(`${statusUrl}`)
      const message = await res.text()

      const xml = xml2js.parseString(message, function (err, result) {
        newValue = result.state.datapoint[0].$.value
      });

      this.setState({ value: newValue, error: false, loading: false })
    } catch (error) {
      console.log(error);
      this.setState({ error: true, loading: false })
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(), this.props.interval)
    }
  }

  render () {
    const { count, error, loading, value } = this.state
    const { title } = this.props
    return (
      <Widget title={title} loading={loading} error={error}>
        <DimmerStatus value={value}>
          {value}
          <button onClick={this.handleClick.bind(this, '0.000000')}>Off</button>
          <button onClick={this.handleClick.bind(this, '0.500000')}>50%</button>
          <button onClick={this.handleClick.bind(this, '1.000000')}>100%</button>
        </DimmerStatus>
      </Widget>
    )
  }
}
