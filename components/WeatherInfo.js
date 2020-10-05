import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function WeatherInfo({currentWeather}) {
  const {main:{temp}} = currentWeather
  return (
    <View style={styles.WeatherInfo}>
      <Text>{temp}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  WeatherInfo: {
    alignItems: 'center'
  }
})