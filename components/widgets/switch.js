import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import xml2js from 'xml2js'
import axios from 'axios'
import { Lightbulb } from 'styled-icons/fa-regular/Lightbulb.cjs'
import HmDevice from './hmDevice'

class Switch extends HmDevice {
  handleClick () {
    const actionUrl = 'http://homematic-raspi/addons/xmlapi/statechange.cgi?ise_id={datapointId}&new_value={value}'
    if (!this.props.testMode) {
      if (this.props.readOnly === false) {
        var url = actionUrl.replace('{datapointId}',
          this.props.datapointId)
        url = url.replace('{value}', !this.state.active)
        let newActive = this.state.active
        axios.get(url)
          .then(response => {
            xml2js.parseString(response.data, function (err, result) {
              if (result.result.changed[0].$.new_value === 'true') {
                newActive = true
              } else {
                newActive = false
              }
            })
            this.setState({ active: newActive, error: false, loading: false })
          })
      }
    }
  }

  render () {
    const { error, loading, active } = this.state
    const { title, textActive, textInactive } = this.props
    return (
      <Widget title={title} loading={loading} error={error} active={active} color={active ? '#303030' : '#ffffff'} background={active ? '#ffeb3b' : '#424242'} onClick={this.handleClick.bind(this)}>
        <div style={{ paddingTop: 1 + 'em' }}>
          <Lightbulb size='48'/>
          <div>{active ? textActive : textInactive}</div>
        </div>
      </Widget>
    )
  }
}

export default Switch;
