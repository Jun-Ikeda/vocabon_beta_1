import SortMode from '../screens/deck/play/_options/SortMode';
import { func } from './Const';
import LocalStorage from './LocalStorage';

const playoption = {
  save: (sortMode, filter, visibleItem) => {
    // sortMode : index', 'index-reverse', 'shuffle'
    // filter: { index: { min, max }, mark: { min, max } }
    // visibleItem: { front: ['term'], back: ['definition'] }
    LocalStorage.save({ key: 'playoption', data: { sortMode, filter, visibleItem } });
  },
  get: async () => {
    const data = await LocalStorage.load({ key: 'playoption' }).then((result) => result)
      .catch(() => ({
        SortMode: 'index',
        filter: { index: {}, mark: {} },
        visibleItem: { front: ['term'], back: ['definition'] },
      }));
    return data;
  },
};

const playhistory = {
  save: (deckID, validVocabIDs, sortMode, itemVisible, leftVocabID, rightVocabID) => {
    // validVocabIDs: ['daifjdia', 'diaoi', 'dfiaojf' ] ソートはされた状態
    // sortMode: 'index', 'index-reverse', 'shuffle'
    // itemVisible: {front: ['term'], back: ['definition']}
    // leftVocabID: ['jdfiaoie']
    // rightVocabID: ['fdaoie']
    // func.alertConsole({ leftVocabID, rightVocabID });
    LocalStorage.save({
      key: 'playhistory',
      id: deckID,
      data: {
        validVocabIDs, sortMode, itemVisible, leftVocabID, rightVocabID,
      },
    });
  },
  get: async (deckID) => {
    const data = await LocalStorage.load({ key: 'playhistory', id: deckID }).then((result) => result).catch(() => false);
    return data;
  },
  remove: (deckID) => {
    LocalStorage.remove({ key: 'playhistory', id: deckID });
  },
};

export { playoption, playhistory };

export default { playoption, playhistory };
