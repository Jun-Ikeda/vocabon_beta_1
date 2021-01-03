// デッキの情報の変数を定義する所

import { atom } from 'recoil';
import usersContent from './UserModule';

export const usersGeneral = atom({
  key: 'usersGeneral',
  default: {},
});

export { usersContent };

export default { usersContent, usersGeneral };

/*
usersGeneral = {
    [id]: {
        title: '...', ,,,
    },
    [id]: {
        title: '...', ,,,
    }
}
*/
