import firebase from 'firebase';

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

// メール＆パスワードログイン
export const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    alert('Login Success!');
    return user;
  })
  .catch((error) => {
    alert(error.message);
  });

export const deleteAccount = async () => {
  const user = await firebase.auth().currentUser;
  await user.delete();
};

export const getFirebaseUser = () => firebase.auth().currentUser;

export default firebase;
