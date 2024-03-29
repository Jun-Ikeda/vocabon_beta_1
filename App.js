import React, { useEffect } from 'react';
import {
  Platform, StyleSheet, UIManager, View, StatusBar,
} from 'react-native';
import { Provider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import Nav from './src/nav/Nav';

import Switch from './dev/Switch';
import ControlPanel from './dev/controlpanel/ControlPanel';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const App = () => {
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'ios') {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      }
      // await SplashScreen.preventAutoHideAsync();
    })();
  }, []);
  return (
    <RecoilRoot>
      <Provider>
        <StatusBar barStyle="dark-content" translucent={Platform.OS === 'android'} backgroundColor="transparent" />
        <View style={style.container}>
          {/* <Switch /> */}
          <Nav />
          {/* <ControlPanel /> */}
        </View>
      </Provider>
    </RecoilRoot>
  );
};

export default App;
