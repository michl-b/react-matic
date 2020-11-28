import Page from '../components/page'
import Switch from '../components/widgets/switch'
import Sensor from '../components/widgets/sensor'
import MotionSensor from '../components/widgets/motionsensor'
import OsramLightify from '../components/widgets/osram-lightify'
import WindowShade from '../components/widgets/window-shade'
import AlertSystem from '../components/widgets/alert-system'
import darkTheme from '../styles/dark-theme'

const AllPage = () => (
  <Page theme={darkTheme} title='Dashboard'>
    <AlertSystem
      title='Alarmsystem'
      alertVariableId='1235'
      alertSystemVariableId='1549'
      activateSystemProgramId='1550'
      deactivateSystemProgramId='1918'
      textSystemActive='Aktiv'
      textSystemInactive='Aus'
      textAlertActive='Alarm'
      textAlertInactive='Sicher' />
    <Switch title='Esszimmer' datapointId='2767' deviceId='2730' textActive='An' textInactive='Aus' />
    <Switch title='Stehlampe' datapointId='3255' deviceId='3215' textActive='An' textInactive='Aus' />
    <Switch title='Lampe Flur' datapointId='3312' deviceId='3272' textActive='An' textInactive='Aus' />
    <Switch title='Garage/Garten außen' datapointId='1814' deviceId='1777' textActive='An' textInactive='Aus' />
    <Switch title='Brunnen' datapointId='8412' deviceId='8374' textActive='An' textInactive='Aus' />
    <Switch title='Pool' datapointId='1279' deviceId='1239' textActive='An' textInactive='Aus' />

    <WindowShade title='Rollo 3m' datapointId='2802' deviceId='2769' />
    <MotionSensor title='Bewegung Windfang' deviceId='1451' textActive='Bewegung' textInactive='Nix' />
    <Sensor title='Haustür' datapointId='1715' deviceId='1661' textActive='Offen' textInactive='Zu' />
    <Sensor title='Nebeneingangstür' datapointId='1773' deviceId='1719' textActive='Offen' textInactive='Zu' />
    <Sensor title='Holzschuppen' datapointId='1609' deviceId='1563' textActive='Offen' textInactive='Zu' />
    <Sensor title='Geräteschuppen' datapointId='1656' deviceId='1610' textActive='Offen' textInactive='Zu' />
    <Sensor title='Garagentor' datapointId='1870' deviceId='1816' textActive='Offen' textInactive='Zu' />
    <Sensor title='Terrassentür rechts' datapointId='2914' deviceId='2860' textActive='Offen' textInactive='Zu' />
    <Sensor title='Terrassentür links' datapointId='2859' deviceId='2805' textActive='Offen' textInactive='Zu' />
    <Sensor title='Fenster Büro' datapointId='8526' deviceId='8496' textActive='Offen' textInactive='Zu' />
    <OsramLightify
      title='Lichtleiste TV'
      mac='e1ffa200aa3eb07c'
      textOff='Aus'
      textOn='An'
      textBrightness='Helligkeit'
      textTemperature='Temperatur'
    />
    <Switch title='Brunnen' deviceId='8374' datapointId='8412' textActive='An' textInactive='Aus' />
    <Switch title='Schlafzimmer Stecker' deviceId='1978' datapointId='2007' textActive='An' textInactive='Aus' />
    <Switch title='Haustüre außen' deviceId='3076' datapointId='3113' textActive='An' textInactive='Aus' />
    <Switch title='Pool' deviceId='1239' datapointId='1279' textActive='An' textInactive='Aus' />
    <Switch title='Küche Deko' deviceId='4731' datapointId='4771' textActive='An' textInactive='Aus' />
    <Switch title='Jonas Deko' deviceId='4788' datapointId='4828' textActive='An' textInactive='Aus' />
    <Switch title='Johannes Deko' deviceId='4845' datapointId='4885' textActive='An' textInactive='Aus' />
    <Switch title='Esszimmer Deko' deviceId='5131' datapointId='5171' textActive='An' textInactive='Aus' />
    <Switch title='Christbaum' deviceId='4902' datapointId='4942' textActive='An' textInactive='Aus' />
  </Page>
)

export default AllPage;