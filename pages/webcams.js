import Page from '../components/page'
import DateTime from '../components/widgets/datetime'
import Webcam from '../components/widgets/webcam'
import darkTheme from '../styles/dark-theme'

export default () => (
  <Page theme={darkTheme} title='Webcams'>
    <DateTime/>

    <Webcam/>
  </Page>
)
