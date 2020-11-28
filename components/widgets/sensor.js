import { Component } from 'react'
import Widget from '../widget'
import { DoorClosed } from 'styled-icons/fa-solid/DoorClosed.cjs'
import { DoorOpen } from 'styled-icons/fa-solid/DoorOpen.cjs'
import HmDevice from './hmDevice'

class Sensor extends HmDevice {
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

export default Sensor;