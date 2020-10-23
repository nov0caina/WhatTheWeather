import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils/index'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const { primaryColor, secondaryColor, feelsLikeColor, humidityColor, windColor, borderColor } = colors

export default function WeatherDetails({ currentWeather, unitsSystem }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather

  const windSpeed = unitsSystem == 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`

  return (
    <View style={styles.WeatherDetails}>
      <View style={styles.WeatherDetailsRow}>
        <View style={{ ...styles.WeatherDetailsBox, borderRightWidth: 1, borderRightColor: borderColor }}  >
          <View style={styles.WeatherDetailsRow}>
            <FontAwesome5 name="temperature-low" size={25} color={feelsLikeColor} />
            <View style={styles.WeatherDetailsItems}>
              <Text>Feels like:</Text>
              <Text style={styles.textSecondary}>{feels_like} º</Text>
            </View>
          </View>
        </View>
        <View style={styles.WeatherDetailsBox}>
          <View style={styles.WeatherDetailsRow}>
            <MaterialCommunityIcons name="water" size={30} color={humidityColor} />
            <View style={styles.WeatherDetailsItems}>
              <Text>Humidity:</Text>
              <Text style={styles.textSecondary}>{humidity} %</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ ...styles.WeatherDetailsRow, borderTopWidth: 1, borderTopColor: borderColor }}>
        <View style={{ ...styles.WeatherDetailsBox, borderRightWidth: 1, borderRightColor: borderColor }}  >
          <View style={styles.WeatherDetailsRow}>
            <MaterialCommunityIcons name="weather-windy" size={30} color={windColor} />
            <View style={styles.WeatherDetailsItems}>
              <Text>Wind Speed:</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.WeatherDetailsBox}>
          <View style={styles.WeatherDetailsRow}>
            <MaterialCommunityIcons name="speedometer" size={30} color={primaryColor} />
            <View style={styles.WeatherDetailsItems}>
              <Text>Pressure:</Text>
              <Text style={styles.textSecondary}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  WeatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
  },
  WeatherDetailsRow: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  WeatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  WeatherDetailsItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  textSecondary: {
    fontSize: 15,
    color: secondaryColor,
    fontWeight: '700',
    margin: 7
  }
})