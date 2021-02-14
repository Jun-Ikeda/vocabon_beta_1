// デッキの情報の変数を定義する所
import { Alert } from 'react-native';
import { func } from '../Const';
import { database, storage } from '../firebase/Firebase';
import LocalStorage from '../LocalStorage';
import account from './AccountModule';

export { account };

export const initialAccountGeneral = {
  email: '',
  name: '',
  password: '',
  userID: '',
  loggedin: false,
  emailVerified: false,
};

export const getAccountGeneral = () => account?.general ?? initialAccountGeneral;

export const saveAccountGeneral = (newData, merge = true) => {
  account.general = merge ? { ...initialAccountGeneral, ...account.general, ...newData } : newData;
  LocalStorage.save({ key: 'accountGeneral', data: account.general });
};

export const getAccountContent = (deckID = '') => {
  if (deckID === '') {
    return account?.content ?? {};
  }
  return account?.content?.[deckID] ?? {
    marks: {},
    play: [],
    bookmark: false,
  };
};

export const saveAccountContent = (deckID = '', newData, merge = true) => {
  const timestamp = func.compressUnix();
  // recoil/global
  if (Object.keys(account.content).includes(deckID)) {
    account.content[deckID] = merge ? { ...account?.content?.[deckID], ...newData } : newData;
  } else {
    account.content[deckID] = merge ? {
      ...{
        marks: {},
        play: [],
        bookmark: false,
      },
      ...newData,
    } : newData;
  }
  // localstorage
  LocalStorage.save({ key: 'accountContent', id: deckID, data: account.content[deckID] });
  // firebase
  storage.ref('account').child(account.general.userID).put(new Blob([JSON.stringify(account.content)], { type: 'application\/json' }));
  // }
  // timestamp
  database.ref(`timestamp/account/${getAccountGeneral().userID}`).set(timestamp);
  LocalStorage.save({ key: 'accountContent', data: timestamp });
};

export const deleteAccountContent = async (deckID) => {
  const timestamp = func.compressUnix();
  // recoil/global
  delete account.content[deckID];
  // localstorage
  LocalStorage.remove({ key: 'accountContent', id: deckID });
  // firebase
  storage.ref('account').child(account.general.userID).put(new Blob([JSON.stringify(account.content)], { type: 'application\/json' }));
  // timestamp
  database.ref(`timestamp/account/${getAccountGeneral().userID}`).set(timestamp);
  LocalStorage.save({ key: 'accountContent', data: timestamp });
};

export const deleteAccountContentAll = () => {
  // recoil/global
  Object.keys(account.content).forEach((deckID) => {
    delete account.content[deckID];
  });
  // localstorage
  LocalStorage.clearMapForKey('accountContent');
  // firebase
  storage.ref('account').child(account.general.userID).delete();
  // timestamp
  database.ref(`timestamp/account/${getAccountGeneral().userID}`).remove();
  LocalStorage.remove({ key: 'accountContent' });
};

export default { account, getAccountGeneral, getAccountContent };

/* const account = {
  general: {
    email: 'vocabon.team@gmail.com',
    password: 'bossbaby0121',
    userID: 'WUgzMNtDDAap5TkAXZbrPwF97Bu2',
  },
  content: { // 履歴
    '7NCodht%}0': { // deckID
      marks: {
        'Q!Am=KbD': [0, 1, 4, 7], // vocabID
        '3v8}weTF': [0, 3, 4, 5, 6], // vocabID
        'wzntj)G9': [2, 5, 7], // vocabID
        '(Oi48f(a': [], // vocabID
      },
      play: [
        20201004,
        20201111,
        20201114,
        20201118,
        20201228,
        20201230,
        20201231,
        20210103,
      ],
      bookmark: false,
    },
    '-BiGIisZb*': {
      marks: {
        ypjkhApD: [0, 3, 4],
        sFlEIDaB: [2, 4],
        'PfRg:zR{': [0, 1],
      },
      play: [
        20201024,
        20201114,
        20201218,
        20201221,
        20210107,
      ],
      bookmark: true,
    },
    rUiKQdnLb9: {
      marks: {
        wdPx0JnA: [1, 4, 8],
        'Z2%FYcP(': [3, 4, 5, 6, 7, 8],
        Ub3wlJAr: [8],
        TzyEbrTc: [5, 8],
      },
      play: [
        20201007,
        20201011,
        20201024,
        20201109,
        20201119,
        20201128,
        20201206,
        20201222,
        20210104,
      ],
      bookmark: true,
    },
    'xn>EfhY:2*': {
      marks: {
        MdmRNj0Y: [2, 4, 8, 9],
        '5::oT=-v': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'qIDjbgc-': [3, 4, 7, 10],
      },
      play: [
        20201007,
        20201019,
        20201031,
        20201101,
        20201110,
        20201120,
        20201201,
        20201211,
        20201222,
        20210101,
        20210108,
      ],
      bookmark: true,
    },
    // 'Q38xR=rnKc': {
    //   marks: {
    //     'qy%nQmid': 1,
    //     '>pA|x-V<': 18,
    //     lnz24x4C: 9,
    //     '6:LSsg9s': 4,
    //   },
    //   latest: ['>pA|x-V<', '6:LSsg9s'],
    //   bookmark: false,
    // },
  },
}; */
