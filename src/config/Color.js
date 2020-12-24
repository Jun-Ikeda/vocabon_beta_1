const Color = {
  defaultBackground: '#efefef',
  black: 'black',
  green1: '#07b86c',
  green2: '#1e8f5e',
  green3: '#26a36d',
  green4: '#b9d08b',
  green5: '#82ba6c',
  green6: '#3ca897',
  blue1: '#363c8f',
  red1: '#943b3b',
  white1: '#ffffff',
  white2: '#e9e9e9',
  white3: '#d4d4d4',
  white4: '#bfbfbf',
  gray1: '#333333',
  gray2: '#999999',
  gray3: '#cccccc',
  cud: { // color universal design
    red: 'rgb(255,75,0)',
    yellow: 'rgb(255,241,0)',
    green: 'rgb(3,175,122)',
    blue: 'rgb(0,90,255)',
    sky: 'rgb(77,196,255)',
    pink: 'rgb(255,128,130)',
    orange: 'rgb(246,170,0)',
    purple: 'rgb(153,0,153)',
    brown: 'rgb(128,64,0)',
    pPink: 'rgb(255,202,191)',
    pCream: 'rgb(255,255,128)',
    pGreen1: 'rgb(216,242,85)',
    pGreen2: 'rgb(119,217,168)',
    pSky: 'rgb(191,228,255)',
    pBrown: 'rgb(255,202,128)',
    pPurple: 'rgb(201,172,230)',
  },
};

export const PastelColors = [
  '#F59BC1',
  '#FFCED6',
  '#FFF9F9',
  '#D9FED6',
  '#B2F1B3',
  '#53A1B3',
  '#68B5C7',
  '#E5315B',
];

export const getRandomPastel = () => {
  const r = Math.floor(Math.random() * PastelColors.length);
  return PastelColors[r];
};

export default Color;
