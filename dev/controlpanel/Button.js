import AsyncStorage from '@react-native-community/async-storage';
import * as Speech from 'expo-speech';
import { getAccountContent, getAccountGeneral } from '../../src/config/account/Account';
import { func } from '../../src/config/Const';
import LocalStorage from '../../src/config/LocalStorage';
import Deck from '../../src/config/deck/Deck';
import { getRandomImage } from '../../src/config/Unsplash';
import UUID from '../../src/config/UUID';

const Button = [
  {
    title: 'Deck (Global Vari)',
    onPress: () => {
      /*
      const general = getDeckGeneral(decksGeneralState, 'daioaid')
      第一引数: useRecoilState(decksGeneral) の第一返り値
            decksGeneralはsrc/config/deck/Deckからimport
      第二引数: deckID(このidで見つからなかったら今のところ空を返す)
      */
      // const content = getDeckContent('7NCodht%}0');
      const contentAll = Deck.decksContent;
      /*
      引数: deckID(このidで見つからなかったら今のところ空を返す)
      */
      // const contentArray = func.convertObjectToArray(content);
      // const contentObject = func.convertArrayToObject(contentArray);
      return { contentAll };
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
    title: 'Deck (LocalStorage)',
    onPress: async () => {
      const decks = await LocalStorage.getAllDataForKey('deck');
      return decks;
    },
  },
  {
    title: 'Account (LocalStorage)',
    onPress: async () => {
      const account = await LocalStorage.getAllDataForKey('accountContent');
      return account;
    },
  },
  {
    title: 'Clear Local Storage',
    onPress: async () => {
      await AsyncStorage.clear();
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
];

export default Button;
