import { getRandomImage } from '../../src/config/Unsplash';

const Button = [
  {
    title: 'test',
    onPress: () => console.log('test'),
  },
  {
    title: 'Unsplash',
    onPress: async () => {
      const thumb = getRandomImage();
      console.log(thumb);
    },
  },
];

export default Button;
