import { Component } from 'react'
import tinytime from 'tinytime'
import styled from 'styled-components'
import Widget from '../widget'

const TimeItem = styled.div`
  font-size: 3em;
  text-align: center;
`

const DateItem = styled.div`
  font-size: 1.5em;
  text-align: center;
`

export default class DateTime extends Component {
  static defaultProps = {
    interval: 1000 * 2 // two seconds
  }

  state = {
    date: new Date()
  }

  componentDidMount () {
    this.fetchInformation()
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  async fetchInformation () {
    this.setState({ date: new Date() })
    this.timeout = setTimeout(() => this.fetchInformation(),
      this.props.interval)
  }

  render () {
    const { date } = this.state
    return (
      <Widget>
        <div style={{ paddingTop: 2 + 'em' }}>
          <TimeItem>{tinytime('{H}:{mm}').render(date)}</TimeItem>
          <DateItem>{tinytime('{DD}.{Mo}.{YYYY}').render(date)}</DateItem>
        </div>
      </Widget>
    )
  }
}
