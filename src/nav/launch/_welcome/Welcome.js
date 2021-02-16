import React, { useEffect } from 'react';

import {
  Text, View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useSetRecoilState } from 'recoil';
import { saveAccountGeneral } from '../../../config/account/Account';
import Color, { getRandomPastel } from '../../../config/Color';
import { header } from '../../../config/Const';

import { isLoggedInState } from '../../Nav';

const logo = require('../../../../assets/adaptive-icon.png');

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: header.paddingTop,
    backgroundColor: Color.green3,
  },
  button: {
    margin: 80,
    borderRadius: 100,
    padding: 20,
    backgroundColor: Color.white1,
  },
  text: {
    fontSize: 50,
    padding: 30,
    textAlign: 'center',
  },
  textInButton: {
    fontSize: 30,
    textAlign: 'center',
    color: Color.green2,
  },
  picture: {
    resizeMode: 'contain',
    height: '50%',
    width: '70%',
    marginHorizontal: '15%',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Welcome = (props) => {
  const { navigation } = props;

  const setIsLoggedin = useSetRecoilState(isLoggedInState);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
  }),
  [navigation]);

  return (
    <View style={style.container}>
      <Text style={style.text}>Welcome</Text>
      <Image source={logo} style={style.picture} />
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          saveAccountGeneral({ loggedin: true });
          setIsLoggedin(true);
          console.log('HI');
        }}
      >
        <Text style={style.textInButton}>Start Vocabon</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
