import UnsplashOriginal, { toJson } from 'unsplash-js';

const Unsplash = new UnsplashOriginal({
  accessKey: 'l9DHYV9_Osv1iDTytXBIOIfT3KpRnNhTiQ9jK4SgrvU',
});

export { toJson };

export const shortenURI = (uri) => uri.replace('https://images.unsplash.com/', '');
export const unshortenURI = (uri) => `https://images.unsplash.com/${uri}`;

export const getShortenedURI = (json) => {
  const uri = json.results[0].urls.regular;
  //   const shortened = uri.replace('https://images.unsplash.com/', '');
  const shortened = shortenURI(uri);
  const user = {
    name: json.results[0].user.name,
    link: json.results[0].user.links.html,
  };
  return { uri: shortened, user };
};

export const getRandomImage = async (/* { word = '' } */) => {
  //   let searchWord = word;
  //   if (!searchWord) {
  const words = [
    'nature',
    'view',
    'landscape',
    'mountain',
    'ocean',
    'scenery',
    'tree',
    'art',
    'architecture',
    'universe',
    'city',
    'night',
    'color',
    'light',
    'sky',
  ];
  const random1 = Math.floor(Math.random() * words.length);
  const searchWord = words[random1];
  //   }
  const random2 = Math.floor(Math.random() * 15000);

  const result = await Unsplash.search
    .photos(searchWord, random2, 1)
    .then(toJson)
    .then(getShortenedURI);
  return result;
};

export default {
  ...Unsplash, toJson, getShortenedURI, getRandomImage, shortenURI, unshortenURI,
};
