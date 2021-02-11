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

export const signup = (email, password, name) => firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    if (user) {
      user.user.updateProfile({ displayName: name });
      console.log('Success to Signup');
      return user;
    }
    return null;
  })
  .catch((error) => {
    console.log(error);
  });

export const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => user)
  .catch((error) => {
    alert(error.message);
  });

export const deleteAccount = async () => {
  const user = await firebase.auth().currentUser;
  await user.delete();
};

export const getFirebaseUser = async () => {
  const account = getAccountGeneral();
  await firebase.auth().signOut();
  await firebase.auth().signInWithEmailAndPassword(account.email, account.password).then((user) => {
    // func.alertConsole(user.user);
  });
  return firebase.auth().currentUser;
};

export const sendEmail = async () => {
  const user = await getFirebaseUser();
  user.sendEmailVerification();
};

export default firebase;
