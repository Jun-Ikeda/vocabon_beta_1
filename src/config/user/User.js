// デッキの情報の変数を定義する所

import { atom } from 'recoil';
import users from './UserModule';

// export const usersGeneral = atom({
//   key: 'usersGeneral',
//   default: {},
// });

export { users };

export default { users /* usersGeneral */ };

/*
users = {
  KgZLhZvgTiTSYJ7VBFbfutjjtUE2: {
    name: 'Sumio',
    icon: { uri: 'https://spring-js.com/wp-content/uploads/2017/06/01-1.jpg' },
  },
  WUgzMNtDDAap5TkAXZbrPwF97Bu2: {
    name: 'Vocabon',
    icon: { color: PastelColors[UUID.getRandom({ max: PastelColors.length })] },
  },
};
 */
