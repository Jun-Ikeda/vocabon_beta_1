import firebase from 'firebase';
import { getAccountContent, getAccountGeneral } from '../account/Account';
import { func } from '../Const';

const config = {
  apiKey: 'AIzaSyCK5b7sjxtbgIRWSDY_Y-wiIp2HFJJpUI8',
  authDomain: 'vocabonbeta1.firebaseapp.com',
  projectId: 'vocabonbeta1',
  storageBucket: 'vocabonbeta1.appspot.com',
  messagingSenderId: '80492018713',
  appId: '1:80492018713:web:02cc19128725f900ad7e88',
  measurementId: 'G-93SF39B3LT',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export default firebase;
