import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../../../config/Color';

import Search from './_search/Search';

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

const SearchNav = () => (
  <Stack.Navigator headerMode="screen" screenOptions={{ headerTitleAlign: 'left', gestureDirection: 'vertical' }}>
    <Stack.Screen
      name="search"
      component={Search}
      options={{
        headerTitle: 'Search',
        ...styles,
      }}
    />
  </Stack.Navigator>
);

export default SearchNav;
