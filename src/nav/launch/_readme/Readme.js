import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Readme = () => (
  <View style={style.container}>
    <Text>This is Readme screen!</Text>
  </View>
);

export default Readme;
