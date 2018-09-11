import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { number, object, string, boolean } from 'yup'
import xml2js from 'xml2js'

const schema = object().shape({
  interval: number(),
  title: string(),
  testMode: boolean()
})

export default class DeviceList extends Component {
  static defaultProps = {
    interval: 1000 * 60 * 5,
    title: 'Devices',
    testMode: false
  }

  state = {
    text: 'Empty',
    error: false,
    loading: true
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
    try {
      var newValue = ''
      let message = ''
      if (!this.props.testMode) {
        const res = await fetch(
          'http://homematic-raspi/addons/xmlapi/statelist.cgi')
        message = await res.text()
      } else  {
        message = 'Testmode'
      }
      xml2js.parseString(message, function (err, result) {
        console.log('parse')
        for (var d = 0; d < result.stateList.device.length; d++) {
          //console.log('Device: ' + result.stateList.device[d].$.name);
          var device = result.stateList.device[d]
          for (var c = 0; c < device.channel.length; c++) {
            var channel = device.channel[c]
            //console.log(channel.datapoint);
            if (channel.datapoint !== undefined) {
              for (var dp = 0; dp < channel.datapoint.length; dp++) {
                var datapoint = channel.datapoint[dp]
                console.log(datapoint)
                if (datapoint.$.type === 'STATE') {
                  console.log(
                    'SWITCH: ' + datapoint.$.name + ' - ' + datapoint.$.ise_id)
                  newValue += 'SWITCH: ' + datapoint.$.name + ' - '
                    + datapoint.$.ise_id + '<br>'
                }
                if (datapoint.$.type === 'LEVEL') {
                  console.log(
                    'DIMMER: ' + datapoint.$.name + ' - ' + datapoint.$.ise_id)
                  newValue += 'DIMMER: ' + datapoint.$.name + ' - '
                    + datapoint.$.ise_id + '<br>'
                }
              }
            }
          }
        }
      })

      this.setState({text: newValue, error: false, loading: false})
    } catch (error) {
      console.log(error)
      this.setState({error: true, loading: false})
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  render () {
    const {text} = this.state
    const {title} = this.props
    return (
      <div>
        <h2>{title}</h2>
        <div>{text}</div>
      </div>
    )
  }
}
