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
 * Account Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('account');
 * props: { navigation }
 * recoil: {}
 * state: {}
 *
 * ```
 */
const Account = () => (
  <View style={style.container}>
    <View>
      <Text>This is Account screen!</Text>
    </View>
  </View>
);

export default Account;
