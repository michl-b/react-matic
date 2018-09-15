import Page from '../components/page'
import DateTime from '../components/widgets/datetime'
import Switch from '../components/widgets/switch'
import Sensor from '../components/widgets/sensor'
import MotionSensor from '../components/widgets/motionsensor'
import Program from '../components/widgets/program'
import OsramLightify from '../components/widgets/osram-lightify'
import WindowShade from '../components/widgets/window-shade'
import Webcam from '../components/widgets/webcam'
import darkTheme from '../styles/dark-theme'

export default () => (
  <Page theme={darkTheme} title='Dashboard'>
    <DateTime />

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
    <WindowShade
      title='Rollo 3m'
      deviceId='2802'
    />
    <OsramLightify
      title='Lichtleiste TV'
      deviceId='1341'
    />
    <Program
      title='Garage'
      programId='1383'
    />
    <MotionSensor
      title='Bewegungsmelder'
      deviceId='1451'
    />
    <Sensor
      title='Türkontakt Haustür'
      deviceId='1715'
    />
    <Sensor
      title='Türkontakt Nebeneingangstür'
      deviceId='1773'
    />
    <Sensor
      title='Türkontakt Holzschuppen'
      deviceId='1609'
    />
    <Sensor
      title='Türkontakt Geräteschuppen'
      deviceId='1656'
    />
    <Sensor
      title='Torkontakt Garagentor'
      deviceId='1870'
    />
    <Sensor
      title='Terrassentür rechts'
      deviceId='2914'
    />
    <Sensor
      title='Terrassentür links'
      deviceId='2859'
    />
  </Page>
)
