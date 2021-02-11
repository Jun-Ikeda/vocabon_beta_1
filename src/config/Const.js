// import React from 'react';
import ExpoClipboard from 'expo-clipboard';
import { element } from 'prop-types';
import {
  Platform, Dimensions, StyleSheet, Alert, StatusBar,
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
  paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
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
    // console.log(object);
    const result = [];
    for (let i = 0; i < keys.length; i++) {
      result.push({ key: keys[i], value: values[i] });
    }
    return result;
  },
  convertArrayToObject: (array) => {
    const result = {};
    array.forEach((item) => {
      result[item.key] = item.value;
    });
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
    const string = JSON.stringify(object, null, 4);
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
  objectSort: ({ obj }) => {
    // console.log(obj);
    const keys = Object.keys(obj).sort();
    const map = {};
    keys.forEach((key) => {
      let val = obj[key];
      if (typeof val === 'object') {
        val = func.objectSort(val);
      }
      map[key] = val;
    });
    return map;
  },
  objectEqual: (obj1, obj2) => {
    // console.log(obj1, obj2);
    const aJSON = JSON.stringify(func.objectSort({ obj: obj1 }));
    const bJSON = JSON.stringify(func.objectSort({ obj: obj2 }));
    return aJSON === bJSON;
  },
  shuffle: ([...array]) => {
    const arrayCopy = JSON.parse(JSON.stringify(array));
    for (let i = arrayCopy.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  },
  reverseNonDestructive: (arr) => {
    if (toString.call(arr) !== '[object Array]') return null;
    if (arr.length === 0) return arr;
    const copy = arr.slice();
    return copy.reverse();
  },
  formatDate: (shortenedDate, formalOrNot) => {
    const year = (shortenedDate - (shortenedDate % 10000)) / 10000;
    const month = ((shortenedDate % 10000) - ((shortenedDate % 10000) % 100)) / 100;
    const day = (shortenedDate % 10000) % 100;
    const lastNum = shortenedDate % 10;
    const shortenedMonthName = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    const formalMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let hoge = '';
    let stringToReturn;
    const monthName = [shortenedMonthName[month - 1], formalMonthName[month - 1]];

    if (lastNum === 1) {
      hoge = 'st';
    } else if (lastNum === 2) {
      hoge = 'nd';
    } else if (lastNum === 3) {
      hoge = 'rd';
    } else {
      hoge = 'th';
    }

    if (formalOrNot === true) {
      stringToReturn = `${monthName[1]} ${day}${hoge}, ${year}`;
    } else {
      stringToReturn = `${monthName[0]} ${day}${hoge}, ${year}`;
    }

    return stringToReturn;
  },
  isNullOrWhitespace: (input) => !input || !input.trim(),
  getDate: () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (`0${today.getMonth() + 1}`).slice(-2);
    const date = (`0${today.getDate()}`).slice(-2);
    return `${year}${month}${date}`;
  },
  dataInBytes: (data) => (encodeURIComponent(data).replace(/%../g, 'x').length),
  separateDeckData: (content, elementDelimiter, itemDelimiter, cardDelimiter) => {
    // const
    const contentArray = func.convertObjectToArray(content);
    const resultArray = []; // ['一個目の集団','二個目の集団',...]
    // let
    let sumBytes = 0;
    let curData = '';
    // let num = 0; // 何個作られたか
    // let sum = 0;
    while (contentArray.length !== 0) { // 空になるまでのつもり
      while (sumBytes < 500 && contentArray.length !== 0) {
        const curContent = contentArray.splice(0, 1); // curContentに最初の、contentArrayは削られる
        curData += curContent.map((card) => [card.value.term?.join(elementDelimiter), card.value.definition?.join(elementDelimiter)]?.join(itemDelimiter))?.join(cardDelimiter);// Exportでoutputされるときの形
        const bytes = func.dataInBytes(curData); // bytes取得
        sumBytes += bytes;
        // sum += 1;
      }
      resultArray.push(curData);
      sumBytes = 0;
      if (contentArray.length === 0) {
        break;
      } else {
        curData = ''; // curData reset
      }
    }
    console.log(resultArray);
    return resultArray;
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
  sortVocabs: (validVocabIDs, sortMode) => {
    let validVocabIDsSorted = [];
    switch (sortMode) {
      case 'index':
        validVocabIDsSorted = validVocabIDs;
        break;
      case 'index-reverse':
        validVocabIDsSorted = func.reverseNonDestructive(validVocabIDs);
        break;
      case 'shuffle':
        validVocabIDsSorted = func.shuffle(validVocabIDs);
        break;
      default:
        validVocabIDsSorted = validVocabIDs;
        break;
    }
    return validVocabIDsSorted;
  },
  items: [
    { key: 'term', title: 'Term' },
    { key: 'definition', title: 'Definition' },
    { key: 'exampleT', title: 'Example in Term\'s language' },
    { key: 'exampleD', title: 'Example in Definition\'s language' },
    { key: 'synonym', title: 'Synonym' },
    { key: 'antonym', title: 'Antonym' },
    { key: 'prefix', title: 'Prefix' },
    { key: 'suffix', title: 'Suffix' },
    { key: 'cf', title: 'cf.' },
  ],
};

export default {
  header, carousel, func, deck,
};

export const titleMaxLength = 50;
