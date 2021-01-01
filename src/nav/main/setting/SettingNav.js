import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../../../config/Color';

import Setting from './_setting/Setting';
import General from './_general/General';
import Account from './_account/Account';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    height: 100,
    backgroundColor: Color.defaultBackground,
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitleStyle: {
    fontSize: 22,
  },
});

const HomeNav = () => (
  <Stack.Navigator headerMode="screen" screenOptions={{ headerTitleAlign: 'left', gestureDirection: 'vertical' }}>
    <Stack.Screen
      name="setting"
      component={Setting}
      options={{
        ...styles,
        headerTitle: 'Setting',
      }}
    />
    <Stack.Screen
      name="general"
      component={General}
      options={{
        headerTitle: 'General',
      }}
    />
    <Stack.Screen
      name="account"
      component={Account}
      options={{
        headerTitle: 'Account',
      }}
    />
  </Stack.Navigator>
);

export default HomeNav;
