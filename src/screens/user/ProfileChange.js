import React, { useState } from 'react';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { auth, updateEmail } from '../../config/firebase/Auth';
import Color from '../../config/Color';
import { saveAccountGeneral } from '../../config/account/Account';

const style = StyleSheet.create({
  content: {
    // flex: 1,
    padding: 20,
  },
  name: {
    // margin: 20,
    marginBottom: 10,
  },
  email: {
    marginVertical: 10,
  },
  signupButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  signupButton: {
    width: 220,
    height: 40,
    borderRadius: 20,
  },
});

const ProfileChange = (props) => {
  const {
    accountGeneral, inputState, setInputState, isChanged, setIsChanged,
  } = props;
  // const user = auth.currentUser;
  // state
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailAddress, setEmailAddress] = useState(accountGeneral.email);
  const [isChangedEmail, setIsChangedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const renderName = () => (
    <View style={style.name}>
      {/* <View style={{ marginLeft: 10 }}>
          <Text>Name</Text>
        </View> */}
      <TextInput
        value={inputState}
        mode="outlined"
        label="Name"
        onChangeText={(newValue) => {
          setInputState(newValue);
          setIsChanged(true);
        }}
      />
    </View>
  );

  const renderEmailChange = () => (
    <View style={style.email}>
      <TextInput
        value={emailAddress}
        mode="outlined"
        label="New Email"
        dataDetectorTypes="address"
        onChangeText={(newValue) => {
          setEmailAddress(newValue);
          setIsChanged(true);
          setIsChangedEmail(true);
        }}
      />

      {isChangedEmail ? (
        <View style={style.signupButtonContainer}>
          <Button
            color={Color.green3}
            mode="contained"
            style={style.signupButton}
            onPress={() => { updateEmail(emailAddress); }}
          >
            Change Email

          </Button>

        </View>
      ) : null}
      {/* {isSent ? (

        <View style={{ margin: 20, alignSelf: 'center' }}>
          <Text>Check your inbox!</Text>
        </View>
      ) : null} */}
      {/* {isError ? (
        <View style={{ margin: 20, alignSelf: 'center' }}>
          <Text>{errorMessage.message}</Text>
        </View>
      ) : null} */}
    </View>
  );

  const renderPassword = () => (
    <View style={style.signupButtonContainer}>
      <Button
        color={Color.green3}
        mode="contained"
        style={style.signupButton}
        onPress={() => {
          auth.sendPasswordResetEmail(accountGeneral.email).then(() => {
          // Email sent.
            setIsSent(true);
            setIsError(false);
            Alert.alert('Sent an email', 'Check your inbox!');
          }).catch((error) => {
          // An error happened.
            setIsError(true);
            setIsSent(false);
            Alert.alert('Opps!', error.message);
          });
        }}
      >
        Change Password

      </Button>

    </View>
  );
  return (
    <View style={style.content}>
      {renderName()}
      {renderEmailChange()}
      {renderPassword()}
    </View>
  );
};
export default ProfileChange;
