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
  signupButtonContainer: {
    alignItems: 'center',
    padding: 20,
  },
  signupButton: {
    width: 220,
    height: 40,
    borderRadius: 20,
  },
});

const ResetPassword = (props) => {
  const { } = props;
  return (
    <View style={style.container}>
      <Text style={{ fontSize: 22, padding: 20, borderWidth: 1 }}>Reset your password</Text>
      <AuthForms visible={{ email: true }} />
      <View style={style.signupButtonContainer}>
        <Button color={Color.green3} mode="contained" style={style.signupButton}>Send Reset Link</Button>
      </View>
    </View>
  );
};

export default ResetPassword;
