import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import myEnv from '../../myenv'

const schema = object().shape({
  city: string().required(),
  interval: number(),
  title: string(),
  testMode: boolean()
})

export default class Weather extends Component {
  static defaultProps = {
    interval: 1000 * 5 * 60,
    title: 'Weather',
    city: 'Tirschenreuth',
    testMode: false,
    description: 'Naja',
    icon: ''
  }

  state = {
    active: false,
    error: false,
    loading: true,
    temperature: '0.0'
  }

  constructor (props) {
    super(props)
    this.state = { active: false, temperature: '0.0', description: 'Naja' }
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
      let newTemperature = this.state.temperature
      let newDescription = this.state.description
      let newIcon = this.state.icon
      if (!this.props.testMode) {
        const res = await fetch(myEnv.app.baseUrl + '/api/openweathermap/current?city=' + this.props.city)
        const jsonResult = await res.json()
        newTemperature = jsonResult.main.temp
        newDescription = jsonResult.weather[0].description
        newIcon = jsonResult.weather[0].icon
      } else {
        newTemperature = !this.state.temperature
      }

      this.setState({ temperature: newTemperature, description: newDescription, icon: newIcon, error: false, loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: true, loading: false })
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  render () {
    const { error, loading, temperature, description, icon } = this.state
    const { city } = this.props

    const iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png'

    return (
      <Widget doubleHeight title={city} loading={loading} error={error}>
        <img src={iconUrl} />
        <div>{description}</div>
        <h2>{temperature} °C</h2>
      </Widget>
    )
  }
}
