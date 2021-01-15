import React from 'react';
import {
  Platform, StyleSheet, UIManager, View,
} from 'react-native';
import { Provider } from 'react-native-paper';
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
    <Provider>
      <View style={style.container}>
        <Switch />
      </View>
    </Provider>
  </RecoilRoot>
);

export default App;
