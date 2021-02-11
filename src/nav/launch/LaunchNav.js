// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Readme from './_readme/Readme';
import SignUp from './_signup/SignUp';
import LogIn from './_login/LogIn';
import ResetPassword from './_resetpassword/ResetPassword';
import EmailVerify from './_emailverify/EmailVerify';
import Welcome from './_welcome/Welcome';

const Stack = createStackNavigator();

const LaunchNav = () => (
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
    <Stack.Screen
      name="emailverify"
      component={EmailVerify}
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
      name="welcome"
      component={Welcome}
      options={{
        headerTitle: '',
        headerLeft: null,
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);

export default LaunchNav;
