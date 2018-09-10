import Page from '../components/page'
import Switch from '../components/widgets/switch'
import Sensor from '../components/widgets/sensor'
import Dimmer from '../components/widgets/dimmer'
import MotionSensor from '../components/widgets/motionsensor'
import Program from '../components/widgets/program'
import OsramLightify from '../components/widgets/osram-lightify'
import WindowShade from '../components/widgets/window-shade'
import darkTheme from '../styles/dark-theme'

export default () => (
  <Page theme={darkTheme} title='Test'>
    <Switch
      deviceId='2767'
    />

    <OsramLightify
      deviceId='1341'
    />

    <WindowShade
      deviceId='2802'
    />

    <Program
      programId='1383'
    />

    <Sensor
      deviceId='1715'
    />

    <MotionSensor
      deviceId='1451'
    />

    <Dimmer
      deviceId='1451'
    />

  </Page>
)
