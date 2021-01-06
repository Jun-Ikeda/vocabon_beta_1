import { account } from '../../src/config/account/Account';
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
    onPress: () => {
      const date = new Date();
      return { unix: date.getTime() };
    },
  },
  {
    title: 'Unsplash',
    onPress: async () => {
      const thumb = await getRandomImage();
      return { thumb };
    },
  },
];

export default Button;
