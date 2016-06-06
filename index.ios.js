/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';

const testgps = React.createClass({
  getInitialState() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    }
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },
  render() {
    let latitude = 0
    let longitude = 0
    let pos = {}
    if(this.state.initialPosition != 'unknown'){
      pos = JSON.parse(this.state.initialPosition)
      latitude = pos.coords.latitude
      longitude = pos.coords.longitude
    }
    return (
      <View>
        <Text>Hola amigo</Text>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
        <Text>
          hello
          {(this.state.initialPosition)}
        </Text>
        <MapView
          style={styles.map}
    initialRegion={{
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
     longitudeDelta: 0.0421,
    }}
  />
      </View>
    );
  }
})

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

AppRegistry.registerComponent('testgps', () => testgps);
