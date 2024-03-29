// import React from 'react';
import ExpoClipboard from 'expo-clipboard';
import {
  Platform, Dimensions, StyleSheet, Alert, StatusBar,
} from 'react-native';
import BadWords from './BadWords';

// const BadWords = require('bad-words');

// const badwords = new BadWords();

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
  alertConsole: (object, title = 'CONSOLE') => {
    const string = JSON.stringify(object, null, 4);
    console.log(object);
    if (Platform.OS === 'web') {
      alert('copied');
      ExpoClipboard.setString(string);
    } else {
      Alert.alert(
        title,
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
    let stringToReturn = '';
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

    if (day === 11 || day === 12 || day === 13) {
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
  compressUnix: (unix = undefined) => {
    const unixtime = (unix === undefined) ? Date.now() : unix;
    const compressed = Math.floor(unixtime / 1000) - 1609459200; // 2021/01/01/0/00から何秒か
    return compressed;
  },
  decompressUnix: (compressed = undefined) => {
    const decompressed = compressed === undefined ? Date.now() : (compressed + 1609459200) * 1000;
    return decompressed;
  },
  showEachItem: (object) => {
    const showArray = [];
    Object.keys(object).forEach((key) => {
      if (object[key]) {
        showArray.push(key);
      }
    });
    return showArray;
  },

  createItemArray: (wordSet, showArray, elementDelimiter) => {
    const outputByWords = [];
    showArray.forEach((element) => {
      outputByWords.push(wordSet.value[element]?.join(elementDelimiter));
    });
    console.log(outputByWords);
    return outputByWords;
  },
  // showEachItem: (object) => {
  //   const showArray = [];
  //   // console.log(object);
  //   Object.keys(object).forEach((key) => {
  //     if (object[key]) {
  //       showArray.push(key);
  //     }
  //   });
  //   return showArray;
  // },
  // createItemArray: (wordSet, showArray, elementDelimiter) => {
  //   const outputByWords = [];
  //   showArray.forEach((item) => {
  //     outputByWords.push(wordSet.value.item?.join(elementDelimiter));
  //   });
  //   return outputByWords;
  // },
  separateDeckData: (content, elementDelimiter, elementVisible, itemDelimiter, cardDelimiter) => {
    // const
    const contentArray = func.convertObjectToArray(content);
    const resultArray = []; // ['一個目の集団','二個目の集団',...]
    // let
    let sumBytes = 0;
    let curData = '';
    // let num = 0; // 何個作られたか

    while (contentArray.length !== 0) { // 空になるまでのつもり
      while (sumBytes < 800 && contentArray.length !== 0) {
        const curContent = contentArray.splice(0, 1); // curContentに最初の、contentArrayは削られる
        curData += curContent.map((card) => (
          func.createItemArray(card, func.showEachItem(elementVisible), elementDelimiter)?.join(itemDelimiter)))?.join(cardDelimiter) + (cardDelimiter);// Exportでoutputされるときの形
        const bytes = func.dataInBytes(curData); // bytes取得
        sumBytes += bytes;
        // sum += 1;
      }
      resultArray.push(curData);
      console.log(sumBytes);
      sumBytes = 0;
      if (contentArray.length === 0) {
        break;
      } else {
        curData = ''; // curData reset
      }
    }
    return resultArray;
  },
  separateListItem: (content, eachLength) => {
    const array = Array(Math.ceil(content.length / eachLength));
    const contentArray = content;
    const resultArray = [];
    for (let i = 0; i < array.length; i++) {
      resultArray.push(contentArray.splice(0, eachLength));
    }
    // func.alertConsole(resultArray)
    return resultArray;
  },
  badwords: (sentence) => {
    if (typeof sentence !== 'string') return sentence;
    const words = sentence.split(' ');
    const cleaned = words.map((word) => {
      if (BadWords.includes(word.toLowerCase())) {
        return `${word.slice(0, 1)}${'*'.repeat(word.length - 1)}`;
      }
      return word;
    });
    return cleaned.join(' ');
  },
  badwordsArray: (array) => array.map((sentence) => func.badwords(sentence)),
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
    { key: 'exampleT', title: 'e.g. in Term\'s language' },
    { key: 'exampleD', title: 'e.g. in Definition\'s language' },
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
