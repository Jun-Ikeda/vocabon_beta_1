import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LaunchNav from './launch/LaunchNav';
import MainNav from './main/MainNav';

const Stack = createStackNavigator();

const Nav = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (isInitialized) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="main" component={MainNav} />
          ) : (
            <Stack.Screen name="launch" component={LaunchNav} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Loading</Text></View>);
};

export default Nav;
