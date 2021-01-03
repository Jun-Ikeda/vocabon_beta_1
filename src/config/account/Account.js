// デッキの情報の変数を定義する所

import { atom } from 'recoil';
import accountContent from './AccountModule';

export const accountGeneral = atom({
  key: 'accountGeneral',
  default: {},
});

export { accountContent };

export default { accountContent, accountGeneral };
