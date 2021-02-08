// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import Readme from './_readme/Readme';
import SignUp from './_signup/SignUp';
import LogIn from './_login/LogIn';
import ResetPassword from './_resetpassword/ResetPassword';

const Stack = createStackNavigator();

const LaunchNav = () => (
  <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen name="readme" component={Readme} options={{ headerTitle: '', headerTransparent: true }} /> */}
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{
          headerTitle: '',
          headerStyle: {
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={LogIn}
        options={{
          headerTitle: '',
          headerStyle: {
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="resetpassword"
        component={ResetPassword}
        options={{
          headerTitle: '',
          headerStyle: {
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default LaunchNav;
