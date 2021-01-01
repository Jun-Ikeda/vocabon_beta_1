// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Readme from './_readme/Readme';

const Stack = createStackNavigator();

const LaunchNav = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="readme" component={Readme} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default LaunchNav;
