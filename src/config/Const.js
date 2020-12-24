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
};

export const deck = {
  formatArrayContent: (array) => {
    let str = '';
    array.forEach((element) => {
      str = `${str}${element}, `;
    });
    return str.slice(0, -2);
  },
};

export default {
  header, carousel, func, deck,
};

export const titleMaxLength = 20;
