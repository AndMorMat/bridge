import { NativeModules, PermissionsAndroid } from 'react-native'
const { CalendarModule } = NativeModules


async function requestCalendarPermission() {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      PermissionsAndroid.PERMISSIONS.READ_CALENDAR
    ];
    const granted = await PermissionsAndroid.requestMultiple(permissions, {
      title: 'Permissão para acessar o calendário',
      message: 'O aplicativo precisa de permissão para acessar o calendário',
      buttonPositive: 'OK',
    });
    if (
      granted[PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.READ_CALENDAR] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Permissões concedidas!');
      return true;
    } else {
      console.log('Permissões negadas!');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

export {
  CalendarModule,
  requestCalendarPermission,
}
