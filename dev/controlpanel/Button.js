import AsyncStorage from '@react-native-community/async-storage';
import * as Speech from 'expo-speech';
import { account, getAccountContent, getAccountGeneral } from '../../src/config/account/Account';
import { deck, func } from '../../src/config/Const';
import LocalStorage from '../../src/config/LocalStorage';
import Deck, { decksContent, getDeckContent } from '../../src/config/deck/Deck';
import { getRandomImage } from '../../src/config/Unsplash';
import UUID from '../../src/config/UUID';

import firebase, {
  auth, database, firestore, getFirebaseUser,
} from '../../src/config/firebase/Firebase';
import { playoption } from '../../src/config/PersistentData';

const Filter = require('bad-words');

const filter = new Filter();

const Button = [
  {
    title: 'Clear Local Storage',
    onPress: async () => {
      await AsyncStorage.clear();
    },
  },
  {
    title: 'Account General',
    onPress: async () => {
      // general
      const generalRecoilGlobal = account.general; // recoil/global
      const generalLocalStorage = await LocalStorage.load({ key: 'accountGeneral' });
      return ({ global: generalRecoilGlobal, local: generalLocalStorage });
    },
  },
  {
    title: 'Deck Content',
    onPress: async () => ({ content: decksContent }),
  },
  {
    title: 'Deck General',
    onPress: async () => {
      const localTimeStamp = await LocalStorage.load({ key: 'deckGeneral' });
      const generalLocalStorage = await LocalStorage.getAllDataForKey('deck');
      return ({ timestamp: localTimeStamp, local: generalLocalStorage });
    },
  },
  {
    title: 'Deck (Global Vari)',
    onPress: () => {
      /*
      const general = getDeckGeneral(decksGeneralState, 'daioaid')
      第一引数: useRecoilState(decksGeneral) の第一返り値
            decksGeneralはsrc/config/deck/Deckからimport
      第二引数: deckID(このidで見つからなかったら今のところ空を返す)
      */
      const content = getDeckContent();
      // const contentAll = Deck.decksContent;
      /*
      引数: deckID(このidで見つからなかったら今のところ空を返す)
      */
      const deck = {};
      // const contentArray = func.convertObjectToArray(content);
      // const contentObject = func.convertArrayToObject(contentArray);
      return content;
    },
    // onPress: () => ({ decksGeneral, decksContent }),
  },
  // {
  //   title: 'User (Global Vari)',
  //   onPress: () => {
  //     const general = getUserGeneral('diaooea');
  //     /*
  //     引数: userID(このidで見つからなかったら今のところ空を返す)
  //     */
  //     return { general };
  //   },
  // },
  {
    title: 'Account (Global Vari)',
    onPress: () => {
      const general = getAccountGeneral();
      /*
      自分の情報が返ってくる
      */
      const content = getAccountContent();
      /*
      引数: deckID(このidのデッキの自分の再生履歴を返す、見つからなかったら空)
      引数を指定しない、または''だとすべて返す
      */
      return { general, content };
    },
  },
  {
    title: 'Play History',
    onPress: async () => {
      const data = await LocalStorage.getAllDataForKey('playhistory');
      return data;
    },
  },
  {
    title: 'Deck (LocalStorage)',
    onPress: async () => {
      const decks = await LocalStorage.getAllDataForKey('deck');
      return decks;
    },
  },
  {
    title: 'Account (LocalStorage)',
    onPress: async () => {
      const account = await LocalStorage.load({ key: 'accountGeneral' });
      // const account = await LocalStorage.getAllDataForKey('accountContent');
      return account;
    },
  },
  {
    title: 'UUID',
    onPress: () => {
      const uuids = [];
      for (let i = 0; i < 63; i++) {
        uuids.push(UUID.generate(8));
      }
      return { uuids };
    },
  },
  {
    title: 'Time',
    onPress: () => ({ UCT: func.getUTCDate() }),
  },
  {
    title: 'Unsplash',
    onPress: async () => {
      const thumb = await getRandomImage();
      return { thumb };
    },
  },
  {
    title: 'Speech',
    onPress: () => {
      Speech.speak('Yo soy estudiante', { language: 'es' });
    },
  },
  {
    title: 'Firebase auth',
    onPress: async () => {
      // const user = await getFirebaseUser();
      const user = auth.currentUser;
      return user;
    },
  },
  {
    title: 'Firebase firestore',
    onPress: async () => {
      // set
      // await firestore.collection('test').doc('doc').set({ field: 'this is a value' }, { merge: true });

      // get
      const data = await firestore
        .collection('test')
        .doc('doc').get().then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
          }
        });
    },
  },
  {
    title: 'firebase database',
    onPress: async () => {
      const data = await database.ref('test/testdata').once('value', (snapshot) => snapshot.val());
      return data;
    },
  },
  {
    title: 'json',
    onPress: () => {
      fetch('https://firebasestorage.googleapis.com/v0/b/vocabonbeta1.appspot.com/o/account%2FTKQ0EYBHPpdvNIgsdxUPgCKoyTv1?alt=media&token=815e89a6-4fa4-454c-abe2-634b601acd17')
        .then((response) => response.json())
        .then((card) => {
          func.alertConsole(card);
          // return card;
        });
    },
  },
  {
    title: 'Time',
    onPress: () => {
      // const now = Math.floor(new Date().getTime() / 1000);
      const compressed = func.compressUnix();
      const decompressed = Date.now();
      return { compressed, decompressed };
    },
  },
  {
    title: 'Deck General',
    onPress: async () => {
      const data = await LocalStorage.load({ key: 'deckGeneral' });
      return data;
    },
  },
  {
    title: 'playoption',
    onPress: async () => {
      const data = await playoption.get();
      return data;
    },
  },
  {
    title: 'Offensive word',
    onPress: () => {
      const filtered = filter.clean('');
      return filtered;
    },
  },
];

export default Button;
