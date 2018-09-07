import Page from '../components/page'
import Switch from '../components/widgets/switch'
import Program from '../components/widgets/program'
import OsramLightify from '../components/widgets/osram-lightify'
import darkTheme from '../styles/dark-theme'

export default () => (
  <Page theme={darkTheme} title='Control'>
    <Switch
      title='Esszimmerlicht'
      deviceId='2767'
    />
    <Switch
      title='Stehlampe'
      deviceId='1279'
    />
    <Switch
      title='Lichtschalter Garage außen'
      deviceId='1814'
    />
    <Switch
      title='Außensteckdosen Haustüre'
      deviceId='3113'
    />
    <Switch
      title='Zwischenstecker Schlafzimmer'
      deviceId='2007'
    />
    <Program
      title='Garage'
      statusUrl='http://homematic-raspi/addons/xmlapi/state.cgi?datapoint_id=1381'
      programId='1383'
    />
    <OsramLightify
      title='Lichtleiste'
      deviceId='1341'
    />
  </Page>
)
