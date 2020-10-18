import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'

const weather_API_KEY = '17d37dcee33e572979460360bde38a67';
const base_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('imperial')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load() {
    setCurrentWeather(null)
    try {
      let { status } = await Location.requestPermissionsAsync()

      if (status != 'granted') {
        setErrorMessage('Access to location is needed in order to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = await location.coords;

      const weatherUrl = `${base_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${weather_API_KEY}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      }
      else {
        setErrorMessage(result.message)
      }

      /* alert(`Latitude: ${latitude}, \nLongitude: ${longitude}`) */
    }
    catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
});
