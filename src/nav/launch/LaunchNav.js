// In App.js in a new project

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Readme from './readme/Readme';

const Stack = createStackNavigator();

class LaunchNav extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="readme" component={Readme} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default LaunchNav;
