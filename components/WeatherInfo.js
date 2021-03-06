import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../utils/index'

const { primaryColor, secondaryColor } = colors;

export default function WeatherInfo({ currentWeather }) {
  const {
    main: { temp },
    weather: [details],
    name,
  } = currentWeather
  const { icon, main, description } = details
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

  return (
    <View style={styles.WeatherInfo}>
      <Text style={styles.simpleText}>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}º</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  WeatherInfo: {
    alignItems: 'center'
  },
  weatherDescription: {
    textTransform: 'capitalize',
    color: '#ffff'
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  textPrimary: {
    fontSize: 40,
    color: primaryColor
  },
  textSecondary: {
    fontSize: 20,
    color: secondaryColor,
    fontWeight: '500',
    marginTop: 10
  },
  imageStyle: {
    flex: 1,
  },
  simpleText:{
    color: '#ffff'
  }
})