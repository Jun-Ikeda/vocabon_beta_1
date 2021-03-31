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
    height: 40,
    margin: 80,
    borderRadius: 100,
    padding: 5,
    backgroundColor: Color.white1,
  },
  text: {
    fontSize: 50,
    padding: 40,
    textAlign: 'center',
    color: Color.white1,
  },
  textInButton: {
    fontSize: 30,
    textAlign: 'center',
    color: Color.green2,
  },
  picture: {
    resizeMode: 'contain',
    height: '40%',
    width: '50%',
    marginHorizontal: '25%',
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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={logo} style={style.picture} />
      </View>
      <View style={{ alignItems: 'center', paddingVertical: 120 }}>
        <Button
          color={Color.white1}
          mode="contained"
          labelStyle={{ color: Color.green2 }}
          style={{
            borderRadius: 40, width: 200, height: 40, justifyContent: 'center',
          }}
          onPress={() => {
            saveAccountGeneral({ loggedin: true });
            setIsLoggedin(true);
          }}
        >
          Start Vocabon
        </Button>
      </View>
      {/* <TouchableOpacity
        style={style.button}
        onPress={() => {
          saveAccountGeneral({ loggedin: true });
          setIsLoggedin(true);
        }}
      >
        <Text style={style.textInButton}>Start Vocabon</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Welcome;
