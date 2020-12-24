import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainNav from './main/MainNav';
import LaunchNav from './launch/LaunchNav';

const Stack = createStackNavigator();

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  render() {
    const { isLoggedIn } = this.state;
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
}
export default Nav;
