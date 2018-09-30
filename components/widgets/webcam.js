import { Component } from 'react'
import { boolean, number, object, string } from 'yup'
import Widget from '../widget'

const schema = object().shape({
  imageUrl: string(),
  interval: number(),
  title: string(),
  testMode: boolean()
})

export default class Webcam extends Component {
  static defaultProps = {
    interval: 1000 * 5 * 60, // five Minutes
    title: 'Webcam',
    imageUrl: `/api/webcam/image`,
    testMode: false
  }

  state = {
    error: false,
    loading: true
  }

  constructor (props) {
    super(props)
    this.state = { value: 0.000000 }
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
    this.timeout = setTimeout(() => this.fetchInformation(),
      this.props.interval)
  }

  render () {
    const {error, loading} = this.state
    const {title, imageUrl} = this.props

    var url

    if (this.props.testMode) {
      url = '/static/demo.jpg'
    } else {
      url = imageUrl
    }

    return (
      <Widget doubleWidth doubleHeight title={title} loading={loading} error={error}>
        <a href={url} target='_blank'>
          <img src={url} width='320' />
        </a>
      </Widget>
    )
  }
}
