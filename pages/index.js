import Page from '../components/page'
import DateTime from '../components/widgets/datetime'
import Switch from '../components/widgets/switch'
import Sensor from '../components/widgets/sensor'
import MotionSensor from '../components/widgets/motionsensor'
import OsramLightify from '../components/widgets/osram-lightify'
import WindowShade from '../components/widgets/window-shade'
import AlertSystem from '../components/widgets/alert-system'
import darkTheme from '../styles/dark-theme'
import Weather from '../components/widgets/weather'
import TempSensor from '../components/widgets/tempSensor'

const IndexPage = () => (
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
    <Switch title='Esszimmer' datapointId='9002' deviceId='8965' textActive='An' textInactive='Aus' />
    <Switch title='Stehlampe' datapointId='3255' deviceId='3215' textActive='An' textInactive='Aus' />
    <Switch title='Lampe Flur' datapointId='3312' deviceId='3272' textActive='An' textInactive='Aus' />
    <Switch title='Garage/Garten außen' datapointId='1814' deviceId='1777' textActive='An' textInactive='Aus' />
    <Switch title='Brunnen' datapointId='8412' deviceId='8374' textActive='An' textInactive='Aus' />
    <Switch title='Pool & Garten' datapointId='1279' deviceId='1239' textActive='An' textInactive='Aus' />
        
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
    <TempSensor title='Temperatur Büro' temperatureDatapointId='8730' humidityDatapointId='8740' deviceId='8704' />
    <Weather city='Tirschenreuth' />
    <OsramLightify
      title='Lichtleiste TV'
      mac='e1ffa200aa3eb07c'
      textOff='Aus'
      textOn='An'
      textBrightness='Helligkeit'
      textTemperature='Temperatur'
    />
  </Page>
)

export default IndexPage;