import { decksContent } from '../../src/config/deck/Deck';
import { getRandomImage } from '../../src/config/Unsplash';
import UUID from '../../src/config/UUID';

const Button = [
  {
    title: 'Unsplash',
    onPress: async () => {
      const thumb = await getRandomImage();
      return { thumb };
    },
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
    title: 'Deck',
    onPress: () => ({ decksContent }),
  },
];

export default Button;
