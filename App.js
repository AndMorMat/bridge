import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, NativeModules } from 'react-native';
import { CalendarModule } from './native-modules'
import { requestCalendarPermission } from './native-modules';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false)
  useEffect(() => {
    const hasCalendarPermission = requestCalendarPermission()
    setHasPermission(hasCalendarPermission)
  }, [])

  const onPress = () => {

    if (!hasPermission) {
      console.log("O aplicativo não tem permissão para gerenciar o calendário")
      return
    }
    CalendarModule.createCalendarEvent(
      '1656091171000', // eventStartMillis
      '1656101971000', // eventEndMillis
      'Aniversário do João', // name
      'Aniversário de 25 anos do João', // eventDescription
      'Casa do João', // eventLocation
    )

  }

  return (
    <View style={styles.container}>
      <Text>Android bridge study</Text>
      <Button
        title="Add calendar event!"
        color="#841584"
        onPress={onPress}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
