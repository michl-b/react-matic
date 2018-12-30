import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'
import myEnv from '../../myenv'
import VerticalList from '../vertival-list'

const schema = object().shape({
  city: string().required(),
  interval: number(),
  title: string(),
  testMode: boolean()
})

export default class WeatherVertical extends Component {
  static defaultProps = {
    interval: 1000 * 5 * 60,
    title: 'Weather',
    city: 'Tirschenreuth',
    testMode: false,
    description: '',
    icon: '01d',
    wind: '',
    humidity: '',
    pressure: ''
  }

  state = {
    active: false,
    error: false,
    loading: true,
    temperature: '0.0'
  }

  constructor (props) {
    super(props)
    this.state = { active: false, temperature: '0.0', icon: '01d', description: '' }
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
    try {
      if (!this.props.testMode) {
        const res = await fetch(myEnv.app.baseUrl + '/api/openweathermap/current?city=' + this.props.city)
        const jsonResult = await res.json()

        this.setState({
          temperature: jsonResult.main.temp,
          humidity: jsonResult.main.humidity,
          pressure: jsonResult.main.pressure,
          description: jsonResult.weather[0].description,
          icon: jsonResult.weather[0].icon,
          wind: jsonResult.wind.speed,
          error: false,
          loading: false
        })
      } else {
        this.setState({ temperature: '99.99', description: 'Rain', error: false, loading: false })
      }
    } catch (error) {
      console.log(error)
      this.setState({ error: true, loading: false })
    } finally {
      this.timeout = setTimeout(() => this.fetchInformation(),
        this.props.interval)
    }
  }

  render () {
    const { error, loading, temperature, description, icon, wind, humidity, pressure } = this.state
    const { city } = this.props

    const iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png'

    return (
      <Widget doubleWidth title={city} loading={loading} error={error}>
        <VerticalList>
          <div>
            <img src={iconUrl} width='50' />
            <div>{description}</div>
            <div style={{ fontSize: '30px', fontWeight: 'bold', paddingTop: 10 + 'px' }}>{temperature} °C</div>
          </div>
          <div>
            <p>Wind: {wind} km/h</p>
            <p>Feucht.: {humidity} %</p>
            <p>Luftdr.: {pressure} hPa</p>
          </div>
        </VerticalList>
      </Widget>
    )
  }
}
