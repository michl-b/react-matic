import Page from '../components/page'
import DateTime from '../components/widgets/datetime'
import Switch from '../components/widgets/switch'
import darkTheme from '../styles/dark-theme'

const DekoPage = () => (
  <Page theme={darkTheme} title='Deko'>
    <DateTime />
    <Switch title='Brunnen' deviceId='8374' datapointId='8412' textActive='An' textInactive='Aus' />
    <Switch title='Schlafzimmer Stecker' deviceId='1978' datapointId='2007' textActive='An' textInactive='Aus' />
    <Switch title='Haustüre außen' deviceId='3076' datapointId='3113' textActive='An' textInactive='Aus' />
    <Switch title='Pool & Garten' deviceId='1239' datapointId='1279' textActive='An' textInactive='Aus' />
    <Switch title='Küche Deko' deviceId='4731' datapointId='4771' textActive='An' textInactive='Aus' />
    <Switch title='Jonas Deko' deviceId='4788' datapointId='4828' textActive='An' textInactive='Aus' />
    <Switch title='Johannes Deko' deviceId='4845' datapointId='4885' textActive='An' textInactive='Aus' />
    <Switch title='Esszimmer Deko' deviceId='5131' datapointId='5171' textActive='An' textInactive='Aus' />
    <Switch title='Christbaum' deviceId='4902' datapointId='4942' textActive='An' textInactive='Aus' />
  </Page>
)

export default DekoPage;