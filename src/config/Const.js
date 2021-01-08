// import React from 'react';
import ExpoClipboard from 'expo-clipboard';
import {
  Platform, Dimensions, StyleSheet, Alert,
} from 'react-native';

export const header = {
  mainHeaderStyles: StyleSheet.create({
    headerStyle: {
      height: 120,
      backgroundColor: 'transparent',
      elevation: 0,
    },
    headerTitleStyle: {
      fontSize: 22,
    },
  }),
};

const carousel = {

};

export const func = {
  isColor: (strColor) => {
    try {
      return strColor.indexOf('/') === -1;
    } catch (error) {
      return null;
    }
  },
  isPortrait: () => {
    const { height, width } = Dimensions.get('window');
    return height > width;
  },
  onLayoutContainer: (e) => {
    const { layout } = e.nativeEvent;
    const { height, width } = layout;
    return { height, width };
  },
  convertObjectToArray: (object) => {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const result = [];
    for (let i = 0; i < keys.length; i++) {
      result.push({ key: keys[i], value: values[i] });
    }
    return result;
  },
  blackOrWhite: (hexcolor) => {
    if (typeof hexcolor === 'string') {
      const r = parseInt(hexcolor.substr(1, 2), 16);
      const g = parseInt(hexcolor.substr(3, 2), 16);
      const b = parseInt(hexcolor.substr(5, 2), 16);

      return ((((r * 299) + (g * 587) + (b * 114)) / 1000) < 128) ? 'white' : 'black';
    }
    return null;
  },
  alertConsole: (object) => {
    const string = JSON.stringify(object, null, 2);
    console.log(object);
    if (Platform.OS === 'web') {
      alert('copied');
      ExpoClipboard.setString(string);
    } else {
      Alert.alert(
        'CONSOLE',
        string,
        [{ text: 'Copy', onPress: () => ExpoClipboard.setString(string) }, { text: 'OK', onPress: () => {} }],
      );
    }
  },
  alert: (string, description = null, buttons = null) => {
    if (Platform.OS === 'web') {
      alert(string);
    } else {
      Alert.alert(string, description, buttons);
    }
  },
  getUTCDate: () => {
    const date = new Date();
    const time = date.getUTCFullYear() + (`00${date.getUTCMonth() + 1}`).slice(-2) + (`00${date.getUTCDate()}`).slice(-2);
    return time;
  },
};

export const deck = {
  formatArrayContent: (array) => {
    try {
      let str = '';
      array.forEach((element) => {
        str = `${str}${element}, `;
      });
      return str.slice(0, -2);
    } catch (error) {
      return array;
    }
  },
};

export default {
  header, carousel, func, deck,
};

export const titleMaxLength = 20;
