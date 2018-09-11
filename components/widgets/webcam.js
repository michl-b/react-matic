import { Component } from 'react'
import { number, object, string } from 'yup'
import Widget from '../widget'
import myenv from '../../myenv'

const schema = object().shape({
  imageUrl: string(),
  interval: number(),
  title: string()
})

export default class Webcam extends Component {
  static defaultProps = {
    interval: 1000 * 5 * 60, // five Minutes
    title: 'Webcam',
    imageUrl: `/api/webcam/image`
  }

  state = {
    error: false,
    loading: true,
    testMode: false
  }

  constructor (props) {
    super(props)
    this.state = {value: 0.000000, testMode: myenv['testMode'] > 0}
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
    this.timeout = setTimeout(() => this.fetchInformation(),
      this.props.interval)
  }

  render () {
    const {error, loading} = this.state
    const {title, imageUrl} = this.props
    return (
      <Widget doubleWidth doubleHeight title={title} loading={loading} error={error}>
        <a href={imageUrl} target='_blank'>
          <img src={imageUrl} width='320' height='180' />
        </a>
      </Widget>
    )
  }
}
