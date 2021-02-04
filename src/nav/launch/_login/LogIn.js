import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Color from '../../../config/Color';
import AuthForms from '../AuthForms';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  loginButtonContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loginButton: {
    width: 220,
    height: 40,
    borderRadius: 20,
  },
  suggestionContainer: {
    alignItems: 'center',
    padding: 5,
  },
});

const LogIn = (/* props */) => {
  const renderLogInButton = () => (
    <View style={style.loginButtonContainer}>
      <Button color={Color.green3} mode="contained" style={style.loginButton}>Log in</Button>
    </View>
  );

  return (
    <View style={style.container}>
      <Text style={{ fontSize: 22, padding: 20, borderWidth: 1 }}>Log In</Text>
      <AuthForms visible={{ email: true, password: true }} />
      {renderLogInButton()}
    </View>
  );
};

export default LogIn;
