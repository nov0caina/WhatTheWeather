import { View, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'


export default class BackgroundImage extends Component {
  render() {
    const styles = StyleSheetFactory.getSheet(this.props.opacity);

    return (
      < View style={styles.imageContainer}>
        <Image style={styles.bgImage} source={this.props.imageSource}/>
        {this.props.children}
      </View >
    );
  }
}

class StyleSheetFactory {
  static getSheet(opacity) {
    return StyleSheet.create({
      imageContainer: {
        flex: 1
      },
      bgImage: {
        flex: 1,
        position: 'absolute',
        zIndex: 0,
        width: '100%',
        height: '100%',
        opacity
      }
    })
  }
}