// デッキの情報の変数を定義する所

import { atom } from 'recoil';
import decksContent from './DeckModule';

export const decksGeneral = atom({
  key: 'decksGeneral',
  default: {},
});

export { decksContent };

export default { decksContent, decksGeneral };
