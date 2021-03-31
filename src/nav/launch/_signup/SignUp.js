import React, { useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet, Text, TouchableOpacity, View, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import Color from '../../../config/Color';
import AuthForms, { formsInputState } from '../AuthForms';
import { signup } from '../../../config/firebase/Auth';
import { getAccountGeneral, saveAccountGeneral } from '../../../config/account/Account';
import { func } from '../../../config/Const';
import LocalStorage from '../../../config/LocalStorage';

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
  suggestionContainer: {
    alignItems: 'center',
    padding: 5,
  },
});

const SignUp = (props) => {
  const { navigation } = props;
  const formsInput = useRecoilValue(formsInputState);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    if (Platform.OS !== 'web') {
      e.preventDefault();
    }
  }),
  [navigation]);

  useEffect(() => {
    (async () => {
      const accountGeneral = await LocalStorage.load({ key: 'accountGeneral' }).catch(() => undefined);
      if (accountGeneral?.loggedin) navigation.navigate('emailverify');
    })();
  }, []);

  const signupAndSave = async () => {
    if (Object.values(formsInput).includes('')) {
      Alert.alert('Error', 'Please fill in all the blanks');
    } else {
      const { email, password, name } = formsInput;
      const user = await signup(formsInput.email, formsInput.password, formsInput.name);
      if (user != null) {
        await saveAccountGeneral({
          email, name, password, userID: user.user.uid, loggedin: true, emailVerified: user.user.emailVerified,
        });
        navigation.navigate('emailverify');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again');
      }
    }
  };

  const renderSignUpButton = () => (
    <View style={style.signupButtonContainer}>
      <Button
        color={Color.green3}
        mode="contained"
        style={style.signupButton}
        onPress={signupAndSave}
      >
        Sign Up
      </Button>
    </View>
  );

  const renderSuggestions = () => {
    const suggestions = [
      { title: 'Already have an account?', onPress: () => navigation.navigate('login') },
      { title: 'Forgot the password?', onPress: () => navigation.navigate('resetpassword') },
      {
        title: 'Log In as a guest',
        onPress: () => Alert.alert(
          'Caution',
          'Your play data won\'t be saved and you can\'t create your own deck. (Or you can sign up later to unlock these features)',
          [{
            text: 'Sure',
            onPress: () => {
              saveAccountGeneral({
                email: '',
                name: 'Guest User',
                password: '',
                userID: '',
              });
              navigation.navigate('welcome');
            },
          }, { text: 'Cancel', style: 'cancel', onPress: () => {} }],
        ),
      },
    ];
    return (
      suggestions.map((suggestion) => (
        <TouchableOpacity onPress={suggestion.onPress} style={style.suggestionContainer} key={suggestion.title.toLowerCase()}>
          <Text style={{ color: Color.gray1 }}>{suggestion.title}</Text>
        </TouchableOpacity>
      ))
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={style.container}
    >
      <Text style={{ fontSize: 22, padding: 20 }}>Sign Up</Text>
      <AuthForms visible={{ name: true, email: true, password: true }} />
      {renderSignUpButton()}
      {renderSuggestions()}
    </KeyboardAvoidingView>
  );
/*
  return (
    <View style={style.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Text style={{ fontSize: 22, padding: 20 }}>Sign Up</Text>
        <AuthForms visible={{ name: true, email: true, password: true }} />
        {renderSignUpButton()}
        {renderSuggestions()}
      </KeyboardAvoidingView>
    </View>
  );
*/
};

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignUp;

/*
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={style.container}
      >
        <Text style={{ fontSize: 22, padding: 20 }}>Sign Up</Text>
        <AuthForms visible={{ name: true, email: true, password: true }} />
        {renderSignUpButton()}
        {renderSuggestions()}
    </KeyboardAvoidingView>
  );
*/
