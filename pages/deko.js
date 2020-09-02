import Page from '../components/page'
import DateTime from '../components/widgets/datetime'
import Switch from '../components/widgets/switch'
import darkTheme from '../styles/dark-theme'

export default () => (
  <Page theme={darkTheme} title='Deko'>
    <DateTime />
    <Switch title='Brunnen' deviceId='8412' textActive='An' textInactive='Aus' />
    <Switch title='Schlafzimmer Stecker' deviceId='2007' textActive='An' textInactive='Aus' />
    <Switch title='Haustüre außen' deviceId='3113' textActive='An' textInactive='Aus' />
    <Switch title='Pool' deviceId='1279' textActive='An' textInactive='Aus' />
    <Switch title='Küche Deko' deviceId='4771' textActive='An' textInactive='Aus' />
    <Switch title='Jonas Deko' deviceId='4828' textActive='An' textInactive='Aus' />
    <Switch title='Johannes Deko' deviceId='4885' textActive='An' textInactive='Aus' />
    <Switch title='Esszimmer Deko' deviceId='5171' textActive='An' textInactive='Aus' />
    <Switch title='Christbaum' deviceId='4942' textActive='An' textInactive='Aus' />
  </Page>
)
