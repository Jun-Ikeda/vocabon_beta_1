import { getAccountGeneral } from '../account/Account';
import { auth } from './Firebase';

export const signup = (email, password, name) => auth.createUserWithEmailAndPassword(email, password)
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

export const login = (email, password) => auth.signInWithEmailAndPassword(email, password)
  .then((user) => user)
  .catch((error) => {
    alert(error.message);
  });

export const deleteAccount = async () => {
  const user = await auth.currentUser;
  await user.delete();
};

export const getFirebaseUser = async () => {
  const account = getAccountGeneral();
  await auth.signOut();
  await auth.signInWithEmailAndPassword(account.email, account.password).then((user) => {
  // func.alertConsole(user.user);
  });
  return auth.currentUser;
};

export const sendEmail = async () => {
  const user = await getFirebaseUser();
  user.sendEmailVerification();
};

export default auth;
