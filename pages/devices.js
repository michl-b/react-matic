import Page from '../components/page'
import DeviceList from '../components/widgets/devicelist'
import darkTheme from '../styles/dark-theme'

export default () => (
  <Page theme={darkTheme} title='Devices'>
    <DeviceList />
  </Page>
)
