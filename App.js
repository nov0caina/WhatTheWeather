import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'
import BackgroundImage from './components/BackgroundImage';
import { colors } from './utils/index'
import { weather_API_KEY } from 'react-native-dotenv'

const Thunderstorm = "./assets/backgrounds/Thunderstorm.png"
const Drizzle = "./assets/backgrounds/Drizzle.png"
const Snow = "./assets/backgrounds/Snow.png"
const Rain = "./assets/backgrounds/Rain.png"
const Mist = "./assets/backgrounds/Mist.png"
const Smoke = "./assets/nov0caina.png"
const Haze = "./assets/nov0caina.png"
const Dust = "./assets/nov0caina.png"
const Fog = "./assets/nov0caina.png"
const Sand = "./assets/nov0caina.png"
const Ash = "./assets/nov0caina.png"
const Squall = "./assets/nov0caina.png"
const Tornado = "./assets/nov0caina.png"
const Clear = "./assets/backgrounds/Clear.png"
const Clouds = "./assets/backgrounds/Clouds.png"

const base_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
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

    }
    catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (currentWeather) {

    const {
      weather: [details]
    } = currentWeather
    const { main } = details

    let bg

    switch (main) {
      case 'Thunderstorm':
        bg = require(Thunderstorm);
        break;
      case 'Drizzle':
        bg = require(Drizzle);
        break;
      case 'Rain':
        bg = require(Rain);
        break;
      case 'Snow':
        bg = require(Snow);
        break;
      case 'Mist':
        bg = require(Mist);
        break;
      case 'Smoke':
        bg = require(Smoke);
        break;
      case 'Haze':
        bg = require(Haze);
        break;
      case 'Dust':
        bg = require(Dust);
        break;
      case 'Fog':
        bg = require(Fog);
        break;
      case 'Sand':
        bg = require(Sand);
        break;
      case 'Ash':
        bg = require(Ash);
        break;
      case 'Squall':
        bg = require(Squall);
        break;
      case 'Tornado':
        bg = require(Tornado);
        break;
      case 'Clear':
        bg = require(Clear);
        break;
      case 'Clouds':
        bg = require(Clouds);
        break;
    }

    return (
      <View style={styles.container}>
        <BackgroundImage imageSource={bg} opacity={0.8}>
          <StatusBar style="auto" />
          <View style={styles.main}>
            <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
            <ReloadIcon load={load} />
            <WeatherInfo currentWeather={currentWeather} º />
          </View>
          <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
        </BackgroundImage>
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primaryColor} />
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
