import React from 'react';
import {
  Alert, StyleSheet, Text, View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { saveAccountGeneral } from '../../../config/account/Account';
import Color from '../../../config/Color';
import { login } from '../../../config/firebase/Firebase';
import AuthForms, { formsInputState } from '../AuthForms';
import { func } from '../../../config/Const';

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

const LogIn = (props) => {
  // props
  const { navigation } = props;
  // recoil
  const formsInput = useRecoilValue(formsInputState);

  const loginAndSave = async () => {
    const { email, password, name } = formsInput;
    if (Object.values({ email, password }).includes('')) {
      Alert.alert('Error', 'Please fill in all the blanks');
    } else {
      const user = await login(formsInput.email, formsInput.password);
      func.alertConsole(user);
      if (user != null) {
        saveAccountGeneral({
          email, name: user.user.displayName, password, userID: user.user.uid, loggedin: true, emailVerified: user.user.emailVerified,
        });
        navigation.navigate('emailverify');
      }
    }
  };

  const renderLogInButton = () => (
    <View style={style.loginButtonContainer}>
      <Button color={Color.green3} mode="contained" style={style.loginButton} onPress={loginAndSave}>Log in</Button>
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

LogIn.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LogIn;
