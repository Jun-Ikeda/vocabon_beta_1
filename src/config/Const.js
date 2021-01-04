// import React from 'react';
import {
  Platform, Dimensions,
} from 'react-native';

export const header = {
  paddingTopByOS: () => {
    switch (Platform.OS) {
      case 'android':
        return 24;
        // return 0
      case 'ios':
        return 18;
      default:
        return 0;
    }
  },
  heightMax: 120,
  heightMid: 86,
  heightMin: 60,
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
