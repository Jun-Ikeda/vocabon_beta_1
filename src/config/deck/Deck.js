// デッキの情報のグローバル変数を定義する所

import { atom } from 'recoil';
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
export const saveDeckGeneral = async (setDeckGeneral, deckID, newData) => {
  let newState = {};
  await setDeckGeneral((prev) => {
    newState = JSON.parse(JSON.stringify(prev));
    newState[deckID] = { ...prev[deckID], ...newData };
    return newState;
  });
  const prevLocalData = await LocalStorage.load({ key: 'deck', id: deckID });
  LocalStorage.save({ key: 'deck', id: deckID, data: { general: newState[deckID], content: prevLocalData?.content ?? {} } });
};

export const getDeckContent = (deckID) => {
  if (Object.keys(decksContent).includes(deckID)) {
    return decksContent[deckID];
  }
  return {};
};

export const saveDeckContent = async (deckID, newData, merge = true) => {
  if (merge) {
    decksContent[deckID] = { ...decksContent[deckID], ...newData };
  } else {
    decksContent[deckID] = newData;
  }
  const prevLocalData = await LocalStorage.load({ key: 'deck', id: deckID });
  LocalStorage.save({ key: 'deck', id: deckID, data: { general: prevLocalData.general, content: decksContent[deckID] } });
};

export const deleteDeck = (setDeckGeneral, deckID) => {
  setDeckGeneral((prev) => {
    const newState = JSON.parse(JSON.stringify(prev));
    delete newState[deckID];
    return newState;
  });
  delete decksContent[deckID];
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
