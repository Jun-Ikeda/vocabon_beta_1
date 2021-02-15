import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import Color from '../../../config/Color';
import auth from '../../../config/firebase/Auth';
import AuthForms, { formsInputState } from '../AuthForms';

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
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const formsInput = useRecoilValue(formsInputState); // fomrsInput.email
  // const [errorMessage, setErrorMessage] = useState('');

  return (
    <View style={style.container}>
      <Text style={{ fontSize: 22, padding: 20 }}>Reset your password</Text>
      <AuthForms visible={{ email: true }} />
      <View style={style.signupButtonContainer}>
        <Button
          color={Color.green3}
          mode="contained"
          style={style.signupButton}
          onPress={() => auth.sendPasswordResetEmail(formsInput.email).then(() => {
            // Email sent.
            setIsSent(true);
            setIsError(false);
            Alert.alert('Sent an email', 'Check your inbox!');
          }).catch((error) => {
            // An error happened.
            setIsError(true);
            setIsSent(false);
            console.log(error);
            // setErrorMessage(error);
            Alert.alert('Opps!', error.message);
          })}
        >
          Send Reset Link

        </Button>

      </View>
      {/* {isSent ? (
        <View style={{ margin: 20, alignSelf: 'center' }}>
          <Text>Check your inbox!</Text>
        </View>
      ) : null} */}
      {/* {isError ? (
        // Alert.alert('Fill correctly')
        <View style={{ margin: 20, alignSelf: 'center' }}>
          <Text>{errorMessage.message}</Text>
        </View>
      ) : null} */}
    </View>
  );
};

export default ResetPassword;
