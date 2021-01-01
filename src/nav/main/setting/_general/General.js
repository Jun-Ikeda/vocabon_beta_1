import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * General Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('general');
 * props: { navigation }
 * recoil: {}
 * state: {}
 *
 * ```
 */
const General = () => (
  <View style={style.container}>
    <View>
      <Text>This is General screen!</Text>
    </View>
  </View>
);

export default General;
