import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { object, string, number } from 'yup'
import Widget from '../widget'
import xml2js from 'xml2js'
import axios from 'axios'
import ActionButton from '../action-button'

const schema = object().shape({
  programId: number().required(),
  statusUrl: string().required(),
  interval: number(),
  title: string()
})

export default class Program extends Component {
  static defaultProps = {
    interval: 1000 * 5,
    title: 'Program'
  }

  state = {
    active: false,
    error: false
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
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
        let newActive = this.state.active
        const res = await fetch(`${statusUrl}`)
        const message = await res.text()

        const xml = xml2js.parseString(message, function (err, result) {
          if ( result.state.datapoint[0].$.value === 'true') {
            newActive = true
          } else  {
            newActive = false
          }
        });

        this.setState({ active: newActive, error: false, loading: false })
      } catch (error) {
        console.log(error);
        this.setState({ error: true, loading: false })
      } finally {
        this.timeout = setTimeout(() => this.fetchInformation(), this.props.interval)
      }
    }

  handleClick() {
    axios.get('http://homematic-raspi/addons/xmlapi/runprogram.cgi?program_id='+this.props.programId)
    .then(this.setState({ active: true }))
    .catch((err) => {
      console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
      this.setState({ error: true })
    });
  }

  render () {
    const { error, loading, active } = this.state
    const { title } = this.props
    return (
      <Widget title={title} loading={loading} error={error}>
        <ActionButton active={active} onClick={this.handleClick}>
          Run
        </ActionButton>
      </Widget>
    )
  }
}
