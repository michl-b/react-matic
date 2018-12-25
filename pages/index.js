import Page from '../components/page'
import DateTime from '../components/widgets/datetime'
import Switch from '../components/widgets/switch'
import Sensor from '../components/widgets/sensor'
import MotionSensor from '../components/widgets/motionsensor'
import Weather from '../components/widgets/weather'
import OsramLightify from '../components/widgets/osram-lightify'
import WindowShade from '../components/widgets/window-shade'
import AlertSystem from '../components/widgets/alert-system'
import darkTheme from '../styles/dark-theme'

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
    <Switch title='Esszimmerlicht' deviceId='2767' textActive='An' textInactive='Aus' />
    <Switch title='Stehlampe' deviceId='1279' textActive='An' textInactive='Aus' />
    <Switch title='Lichtschalter Garage außen' deviceId='1814' textActive='An' textInactive='Aus' />
    <Switch title='Außensteckdosen Haustüre' deviceId='3113' textActive='An' textInactive='Aus' />
    <Switch title='Zwischenstecker Schlafzimmer' deviceId='2007' textActive='An' textInactive='Aus' />
    <WindowShade title='Rollo 3m' deviceId='2802' />
    <MotionSensor title='Bewegungsmelder' deviceId='1451' textActive='Bewegung' textInactive='Nix' />
    <Sensor title='Haustür' deviceId='1715' textActive='Offen' textInactive='Zu' />
    <Sensor title='Nebeneingangstür' deviceId='1773' textActive='Offen' textInactive='Zu' />
    <Sensor title='Holzschuppen' deviceId='1609' textActive='Offen' textInactive='Zu' />
    <Sensor title='Geräteschuppen' deviceId='1656' textActive='Offen' textInactive='Zu' />
    <Sensor title='Garagentor' deviceId='1870' textActive='Offen' textInactive='Zu' />
    <Sensor title='Terrassentür rechts' deviceId='2914' textActive='Offen' textInactive='Zu' />
    <Sensor title='Terrassentür links' deviceId='2859' textActive='Offen' textInactive='Zu' />
    <Weather city='Tirschenreuth' />
    <OsramLightify
      title='Lichtleiste TV'
      mac='e1ffa200aa3eb07c' />
  </Page>
)
