import React from 'react';
import {
  Platform, StyleSheet, UIManager, View,
} from 'react-native';
import { RecoilRoot } from 'recoil';

import Switch from './dev/Switch';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const App = () => (
  <RecoilRoot>
    <View style={style.container}>
      <Switch />
    </View>
  </RecoilRoot>
);

export default App;
