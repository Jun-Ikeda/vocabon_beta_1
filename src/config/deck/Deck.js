// デッキの情報のグローバル変数を定義する所

import { Alert } from 'react-native';
import { atom } from 'recoil';
import { getAccountGeneral } from '../account/Account';
import { func } from '../Const';
import { database, firestore, storage } from '../firebase/Firebase';
import LocalStorage from '../LocalStorage';
import decksContent from './DeckModule';

export const decksGeneral = atom({ // globalなstate ダイナミック 動的
  key: 'decksGeneral',
  default: {},
});

export { decksContent }; // globalな普通の変数 静的

export default { decksContent, decksGeneral };

export const getDeckGeneral = (general, deckID) => {
  // const generalCopy = JSON.parse(JSON.stringify(general));
  if (Object.keys(general).includes(deckID)) {
    return general[deckID];
  }
  return {
    title: '',
    user: '',
    language: { term: '', definition: '' },
    thumbnail: {
      uri: '',
      user: { link: '', name: '' },
    },
  };
};

// export const saveDeckGeneral = (setState) => {
//   setState();
// };
// timestampはユーザーごとに管理
export const saveDeckGeneral = async (setDeckGeneral, deckID, newData) => {
  let newState = {};
  const timestamp = func.compressUnix();
  const account = getAccountGeneral();
  // recoil/global variables
  await setDeckGeneral((prev) => {
    newState = JSON.parse(JSON.stringify(prev));
    newState[deckID] = { ...prev[deckID], ...newData };
    return newState;
  });
  // localstorage
  const prevLocalData = await LocalStorage.load({ key: 'deck', id: deckID });
  LocalStorage.save({ key: 'deck', id: deckID, data: { general: newState[deckID], content: prevLocalData?.content ?? {}, timestamp: prevLocalData?.timestamp ?? null } });
  // firebase
  firestore.collection('deck').doc(deckID).set(newState[deckID], { merge: true });
  // timestamp
  LocalStorage.save({ key: 'deckGeneral', data: timestamp });
  database.ref(`timestamp/deckGeneral/${account.userID}`).set(timestamp);
};

export const getDeckContent = (deckID) => {
  if (Object.keys(decksContent).includes(deckID)) {
    return decksContent[deckID];
  }
  return {};
};

// timestampはデッキ毎に管理
export const saveDeckContent = async (deckID, newData, merge = true) => {
  // recoil/global variables
  const timestamp = func.compressUnix();
  if (merge) {
    decksContent[deckID] = { ...decksContent[deckID], ...newData };
  } else {
    decksContent[deckID] = newData;
  }
  // localstorage
  const prevLocalData = await LocalStorage.load({ key: 'deck', id: deckID });
  LocalStorage.save({ key: 'deck', id: deckID, data: { general: prevLocalData.general, content: decksContent[deckID], timestamp } });
  // firebase
  storage.ref('deck').child(deckID).put(new Blob([JSON.stringify(decksContent[deckID])], { type: 'application\/json' }));
  // timestamp
  database.ref(`timestamp/deckContent/${deckID}`).set(timestamp);
};

export const deleteDeck = (setDeckGeneral, deckID) => {
  const account = getAccountGeneral();
  const timestamp = func.compressUnix();
  // recoil/global variables
  setDeckGeneral((prev) => {
    const newState = JSON.parse(JSON.stringify(prev));
    delete newState[deckID];
    return newState;
  });
  delete decksContent[deckID];
  // localstorage
  LocalStorage.remove({ key: 'deck', id: deckID });
  // firebase
  storage.ref('deck').child(deckID).delete();
  firestore.collection('deck').doc(deckID).delete().then(() => Alert.alert('The deck was successfully deleted'));
  // timestamp
  database.ref(`timestamp/deckContent/${deckID}`).set(0);
  database.ref(`timestamp/deckGeneral/${account.userID}`).set(timestamp);
};

export const deleteAllDecks = (setDeckGeneral) => {
  const account = getAccountGeneral();
  const deckIDsAll = Object.keys(decksContent);
  // recoil/global variables
  deckIDsAll.forEach((deckID) => {
    delete decksContent[deckID];
  });
  setDeckGeneral({});
  // localstorage
  LocalStorage.clearMapForKey('deck');
  // firebase
  firestore.collection('deck').where('user', '==', account.userID).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
    });
  });
  deckIDsAll.forEach((deckID) => {
    storage.ref('deck').child(deckID).delete();
  });
  // timestamp
  deckIDsAll.forEach((deckID) => {
    database.ref(`timestamp/deckContent/${deckID}`).remove();
  });
  database.ref(`timestamp/deckGeneral/${account.userID}`).remove();
};

/*
decksContent = {
  '7NCodht%}0': {
    'Q!Am=KbD': {
      term: 'apple',
      definition: ['リンゴ', 'アップル'],
      synonym: [],
      antonym: ['Microsoft', 'Google', 'Federal Government', 'Epic Games'],
      prefix: [],
      suffix: [],
      exampleT: ['I hate Apple'],
      exampleD: ['私はアップル社が嫌いです'],
      cf: ['grape', 'banana', 'facebook', 'twitter', 'instagram', 'huawei'],
    },
    '3v8}weTF': { term: 'hippopotomonstrosesquipedaliophobia'...省略 },
    'wzntj)G9': { term: 'follow'...省略 },
    '(Oi48f(a': { term: 'hypocrite'...省略 },
  },
  '-BiGIisZb*': {
    ypjkhApD: { term: 'increase'...省略 },
    sFlEIDaB: { term: 'expect'...省略 },
    'PfRg:zR{': { term: 'consider'...省略 },
  },
  rUiKQdnLb9: {
    wdPx0JnA: { term: 'apple'...省略 },
    'Z2%FYcP(': { term: 'hippopotomonstrosesquipedaliophobia'...省略 },
    Ub3wlJAr: { term: 'follow'...省略 },
    TzyEbrTc: { term: 'consider'...省略 },
  },
  'xn>EfhY:2*': {
    MdmRNj0Y: { term: 'increase'...省略 },
    '5::oT=-v': { term: 'expect'...省略 },
    'qIDjbgc-': { term: 'hypocrite'...省略 },
  },
  'Q38xR=rnKc': {
    'qy%nQmid': { term: 'apple'...省略 },
    '>pA|x-V<': { term: 'hippopotomonstrosesquipedaliophobia'...省略 },
    lnz24x4C: { term: 'follow'...省略 },
    '6:LSsg9s': { term: 'consider'...省略 },
  },
};

decksGeneral = {
  '7NCodht%}0': {
    title: 'Test Deck 1',
    user: 'WUgzMNtDDAap5TkAXZbrPwF97Bu2',
    language: { term: 'English', definition: 'Japanese' },
    thumbnail: {
      uri: 'photo-1515705576963-95cad62945b6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWlsa3klMjB3YXl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      user: { link: 'https://unsplash.com/@tobias_markmeyer', name: 'Tobias Markmeyer' },
    },
  },
  '-BiGIisZb*': {
    title: 'Test Deck 2',
    user: 'KgZLhZvgTiTSYJ7VBFbfutjjtUE2',
    language: { term: 'French', definition: 'Japanese' },
    thumbnail: {
      uri: 'photo-1574709057920-a44a16a9ab1a?ixlib=rb-1.2.1&q=…ysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzU4MX0',
      user: { link: 'https://unsplash.com/@tobias_markmeyer', name: 'Tobias Markmeyer' },
    },
  },
  rUiKQdnLb9: {
    title: 'Test Deck 3',
    user: 'WUgzMNtDDAap5TkAXZbrPwF97Bu2',
    language: { term: 'Chinese', definition: 'Japanese' },
    thumbnail: {
      uri: 'photo-1574709057920-a44a16a9ab1a?ixlib=rb-1.2.1&q=…ysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzU4MX0',
      user: { link: 'https://unsplash.com/@tobias_markmeyer', name: 'Tobias Markmeyer' },
    },
  },
  'xn>EfhY:2*': {
    title: 'Test Deck 4',
    user: 'KgZLhZvgTiTSYJ7VBFbfutjjtUE2',
    language: { term: 'Spanish', definition: 'Japanese' },
    thumbnail: {
      uri: 'photo-1574709057920-a44a16a9ab1a?ixlib=rb-1.2.1&q=…ysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzU4MX0',
      user: { link: 'https://unsplash.com/@tobias_markmeyer', name: 'Tobias Markmeyer' },
    },
  },
  'Q38xR=rnKc': {
    title: 'Test Deck 5',
    user: 'WUgzMNtDDAap5TkAXZbrPwF97Bu2',
    language: { term: 'Korean', definition: 'Japanese' },
    thumbnail: {
      uri: 'photo-1574709057920-a44a16a9ab1a?ixlib=rb-1.2.1&q=…ysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzU4MX0',
      user: { link: 'https://unsplash.com/@tobias_markmeyer', name: 'Tobias Markmeyer' },
    },
  },
};
*/
