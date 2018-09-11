import Page from '../components/page'
import DateTime from '../components/widgets/datetime'
import Switch from '../components/widgets/switch'
import Sensor from '../components/widgets/sensor'
import Dimmer from '../components/widgets/dimmer'
import MotionSensor from '../components/widgets/motionsensor'
import Program from '../components/widgets/program'
import OsramLightify from '../components/widgets/osram-lightify'
import WindowShade from '../components/widgets/window-shade'
import darkTheme from '../styles/dark-theme'
import Webcam from '../components/widgets/webcam'

export default () => (
  <Page theme={darkTheme} title='Demo of Components'>
    <DateTime />

    <Switch
      deviceId='2767'
      testMode={true}
    />

    <OsramLightify
      deviceId='1341'
      testMode={true}
    />

    <WindowShade
      deviceId='2802'
      testMode={true}
    />

    <Program
      programId='1383'
      testMode={true}
    />

    <Sensor
      deviceId='1715'
      testMode={true}
    />

    <MotionSensor
      deviceId='1451'
      testMode={true}
    />

    <Dimmer
      deviceId='1451'
      testMode={true}
    />

    <Webcam
      testMode={true}
    />
  </Page>
)
