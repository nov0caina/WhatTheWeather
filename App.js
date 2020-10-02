import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'


export default function App() {
  
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    load()
  }, [])
  
  async function load() {
    
    try{
      let {status} = await Location.requestPermissionsAsync()

      if (status !=  'granted'){
        setErrorMessage('Access to location is needed in order to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync()

      const {latitude, longitude } = await location.coords
      alert(`Latitude: ${latitude}, \nLongitude: ${longitude}`)
    }
    catch(error){
      
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>App under construction!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
