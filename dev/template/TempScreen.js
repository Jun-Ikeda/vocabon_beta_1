import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class TempScreen extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>This is TempScreen screen!</Text>
      </View>
    );
  }
}

export default TempScreen;
