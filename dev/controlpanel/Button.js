import { decksContent } from '../../src/config/deck/Deck';
import { getRandomImage } from '../../src/config/Unsplash';
import UUID from '../../src/config/UUID';

const Button = [
  {
    title: 'Deck',
    onPress: () => ({ decksContent }),
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
