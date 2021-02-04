import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
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
  suggestionContainer: {
    alignItems: 'center',
    padding: 5,
  },
});

const SignUp = (props) => {
  const { navigation } = props;

  const renderSignUpButton = () => (
    <View style={style.signupButtonContainer}>
      <Button color={Color.green3} mode="contained" style={style.signupButton}>Sign Up</Button>
    </View>
  );

  const renderSuggestions = () => {
    const suggestions = [
      { title: 'Already have an account?', onPress: () => navigation.navigate('login') },
      { title: 'Forgot the password?', onPress: () => navigation.navigate('resetpassword') },
    ];
    return (
      suggestions.map((suggestion) => (
        <TouchableOpacity onPress={suggestion.onPress} style={style.suggestionContainer}>
          <Text style={{ color: Color.gray1 }}>{suggestion.title}</Text>
        </TouchableOpacity>
      ))
    );
  };

  return (
    <View style={style.container}>
      <Text style={{ fontSize: 22, padding: 20, borderWidth: 1 }}>Sign Up</Text>
      <AuthForms visible={{ name: true, email: true, password: true }} />
      {renderSignUpButton()}
      {renderSuggestions()}
    </View>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignUp;
