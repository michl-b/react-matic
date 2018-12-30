import Page from '../components/page'
import DateTime from '../components/widgets/datetime'
import Switch from '../components/widgets/switch'
import Sensor from '../components/widgets/sensor'
import MotionSensor from '../components/widgets/motionsensor'
import OsramLightifyVertical from '../components/widgets/osram-lightify-vertical'
import WindowShade from '../components/widgets/window-shade'
import AlertSystem from '../components/widgets/alert-system'
import darkTheme from '../styles/dark-theme'
import WeatherVertical from '../components/widgets/weather-vertical'

export default () => (
  <Page theme={darkTheme} title='Dashboard'>
    <DateTime />
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
    <Switch title='Esszimmer' deviceId='2767' textActive='An' textInactive='Aus' />
    <Switch title='Christbaum' deviceId='1279' textActive='An' textInactive='Aus' />
    <Switch title='Stehlampe' deviceId='3255' textActive='An' textInactive='Aus' />
    <Switch title='Lampe Flur' deviceId='3312' textActive='An' textInactive='Aus' />
    <Switch title='Garage außen' deviceId='1814' textActive='An' textInactive='Aus' />
    <Switch title='Haustüre außen' deviceId='3113' textActive='An' textInactive='Aus' />
    <Switch title='Schlafzimmer Stecker' deviceId='2007' textActive='An' textInactive='Aus' />
    <WindowShade title='Rollo 3m' deviceId='2802' />
    <MotionSensor title='Bewegung Windfang' deviceId='1451' textActive='Bewegung' textInactive='Nix' />
    <Sensor title='Haustür' deviceId='1715' textActive='Offen' textInactive='Zu' />
    <Sensor title='Nebeneingangstür' deviceId='1773' textActive='Offen' textInactive='Zu' />
    <Sensor title='Holzschuppen' deviceId='1609' textActive='Offen' textInactive='Zu' />
    <Sensor title='Geräteschuppen' deviceId='1656' textActive='Offen' textInactive='Zu' />
    <Sensor title='Garagentor' deviceId='1870' textActive='Offen' textInactive='Zu' />
    <Sensor title='Terrassentür rechts' deviceId='2914' textActive='Offen' textInactive='Zu' />
    <Sensor title='Terrassentür links' deviceId='2859' textActive='Offen' textInactive='Zu' />
    <WeatherVertical city='Tirschenreuth' />
    <OsramLightifyVertical
      title='Lichtleiste TV'
      mac='e1ffa200aa3eb07c'
      textOff='Aus'
      textOn='An'
      textBrightness='Helligkeit'
      textTemperature='Temperatur'
    />
  </Page>
)
