import { account } from '../../src/config/account/Account';
import { func } from '../../src/config/Const';
import { decksContent, decksGeneral } from '../../src/config/deck/Deck';
import { getRandomImage } from '../../src/config/Unsplash';
import { users } from '../../src/config/user/User';
import UUID from '../../src/config/UUID';

const Button = [
  {
    title: 'Deck',
    onPress: () => ({ decksGeneral, decksContent }),
  },
  {
    title: 'User',
    onPress: () => ({ users }),
  },
  {
    title: 'Account',
    onPress: () => ({ account }),
  },
  {
    title: 'UUID',
    onPress: () => {
      const uuids = [];
      for (let i = 0; i < 10; i++) {
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
    title: 'function',
    onPress: () => {
      // const parameter = { num: 1, message: 'aaa' };
      const parameter = (prev) => ({ ...prev, message: 'henkogo' });
      const _func = (param) => {
        const prev = { num: 0, message: 'henkomae' };
        const result = (typeof param === 'function') ? param(prev) : param;
        console.log(result);
      };
      _func(parameter);
    },
  },
];

export default Button;
