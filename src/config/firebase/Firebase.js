import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAePqLoHJwYgVRxegYmkhu7XI6VkPKZb0c',
  authDomain: 'vocabon02.firebaseapp.com',
  databaseURL: 'https://vocabon02.firebaseio.com',
  projectId: 'vocabon02',
  storageBucket: 'vocabon02.appspot.com',
  messagingSenderId: '424728039803',
  appId: '1:424728039803:web:4bc69213dc2bffbbdeedde',
  measurementId: 'G-T5YVZFB21P',
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

export default firebase;
