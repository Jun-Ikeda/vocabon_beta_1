// デッキの情報の変数を定義する所
import users from './UserModule';

export { users };

export const getUserGeneral = (userID) => {
  if (Object.keys(users).includes(userID)) {
    return users[userID];
  }
  return {
    name: '',
    icon: { uri: '' },
  };
};

export const saveUserGeneral = (userID, data, merge = true) => {
  const newData = { ...data, ...(merge ? users[userID] : {}) };
  users[userID] = newData;
};

export default { users, getUserGeneral };

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
