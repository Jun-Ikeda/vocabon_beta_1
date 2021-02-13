import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import {
  atom, useRecoilState, useRecoilValue, useSetRecoilState,
} from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LaunchNav from './launch/LaunchNav';
import MainNav from './main/MainNav';

import { Account, User } from '../../dev/TestData';
import { decksContent, decksGeneral } from '../config/deck/Deck';
import { saveUserGeneral, users } from '../config/user/User';
import { account, initialAccountGeneral, saveAccountGeneral } from '../config/account/Account';
import LocalStorage from '../config/LocalStorage';
import { func } from '../config/Const';
import { getFirebaseUser, login } from '../config/firebase/Auth';
import { getRandomPastel } from '../config/Color';
import {
  auth, database, firestore, storage,
} from '../config/firebase/Firebase';

const Stack = createStackNavigator();

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

const Nav = () => {
  // recoil
  const setDeckGeneral = useSetRecoilState(decksGeneral);
  // state
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const initializeAuth = async () => {
    const preLocalGeneral = await LocalStorage.load({ key: 'accountGeneral' }).catch(() => initialAccountGeneral);
    let preIsLoggedIn = (preLocalGeneral?.loggedin ?? false) && (preLocalGeneral?.emailVerified ?? false);
    if (preIsLoggedIn) {
      await login(preLocalGeneral?.email, preLocalGeneral?.password).catch((error) => {
        Alert.alert('Error', error);
        preIsLoggedIn = false;
      });
    }
    return preIsLoggedIn;
  };
  // const initializeAuth = () => true;

  const initializeAccount = async () => {
    // general
    const user = auth.currentUser;
    const preAccountGeneral = await LocalStorage.load({ key: 'accountGeneral' });
    const newAccountGeneral = { ...preAccountGeneral, name: user.displayName, emailVerified: user.emailVerified };
    // recoil/global
    account.general = newAccountGeneral;
    // localstorage
    LocalStorage.save({ key: 'accountGeneral', data: newAccountGeneral });

    // content
    // get timestamp
    try {
      let fireTimeStamp = '';
      await database.ref(`timestamp/account/${preAccountGeneral.userID}`).once('value', (timestamp) => { fireTimeStamp = timestamp; });
      const localTimeStamp = LocalStorage.load({ key: 'accountContent' });
      // compare
      if (fireTimeStamp < localTimeStamp) {
      // get local
        const deckIDs = await LocalStorage.getIdsForKey('accountContent');
        const accountContent = await LocalStorage.getAllDataForKey('accountContent');
        // apply to recoil/global
        await deckIDs.forEach((deckID, index) => {
          account.content[deckID] = accountContent[index];
        });
        // set firebase
        await storage.ref('account').child(preAccountGeneral.userID).put(new Blob([JSON.stringify(account.content)], { type: 'application\/json' }));
        // set timestamp
        await database.ref(`timestamp/account/${preAccountGeneral.userID}`).set(localTimeStamp);
      } else {
      // get firebase
        await storage.ref('account').child(preAccountGeneral.userID).getDownloadURL()
          .then((url) => fetch(url)
            .then((response) => response.json())
            .then((accountContent) => {
            // apply to recoil/global
              account.content = accountContent;
              // apply to localstorage
              Object.keys(account.content).forEach((deckID) => {
                LocalStorage.save({ key: 'accountContent', id: deckID, data: account.content[deckID] });
              });
            }));
        // set timestamp
        await LocalStorage.save({ key: 'accountContent', data: fireTimeStamp });
      }
    } catch (error) {
      func.alert(error);
    }
    // const localGeneral = await LocalStorage.load({ key: 'accountGeneral' }).catch(() => initialAccountGeneral);
    // const isLoggedInLocal = (localGeneral?.loggedin ?? false) && (localGeneral?.emailVerified ?? false);

    // if (isLoggedInLocal) {
    //   // general
    //   await login(localGeneral.email, localGeneral.password).then((user) => {
    //     const newAccountGeneral = { ...localGeneral, user: user.user.displayName, emailVerified: user.user.emailVerified };
    //     saveAccountGeneral(newAccountGeneral);
    //   }).catch((error) => {
    //     Alert.alert(error);
    //     setIsLoggedIn(false);
    //   });
    // }
    // account.content = {};
    // // const deckIDs = await LocalStorage.getIdsForKey('accountContent');
    // // const accountContent = await LocalStorage.getAllDataForKey('accountContent');
    // // await deckIDs.forEach((deckID, index) => {
    // //   account.content[deckID] = accountContent[index];
    // // });
    // // func.alertConsole(account);
    // setIsLoggedIn(isLoggedInLocal);
    // if (isLoggedInLocal) {
    //   login(account.general.email, account.general.password);
    //   // firebase -> localstorage, recoil/global
    //   storage.ref('account').child(account.general.userID).getDownloadURL()
    //     .then((url) => fetch(url)
    //       .then((response) => response.json())
    //       .then((card) => {
    //         account.content = card;
    //         Object.keys(account.content).forEach((deckID) => {
    //           LocalStorage.save({ key: 'accountContent', id: deckID, data: account.content[deckID] });
    //         });
    //       }))
    //     .catch(() => {});
    // }
    // // account.content = Account.content;
  };

  const initializeDeck = async () => {
    // firebase
    const newDecksGeneral = {};
    const deckIDsFirebase = [];
    const decksFirebase = [];
    await firestore.collection('deck').where('user', '==', account.general.userID).get().then(async (snapshot) => {
      await snapshot.forEach(async (doc) => {
        await deckIDsFirebase.push(doc.id);
        await storage.ref('deck').child(doc.id).getDownloadURL().then((url) => fetch(url)
          .then(async (response) => response.json())
          .then(async (result) => {
            await decksFirebase.push({ general: doc.data(), content: result });
            LocalStorage.save({ key: 'deck', id: doc.id, data: { general: doc.data(), content: result } });
            decksContent[doc.id] = result;
          }));
        newDecksGeneral[doc.id] = doc.data();
        setDeckGeneral(newDecksGeneral);
      });
    });
    // console.log(deckIDs, decks);
    // local
    // const deckIDsLocal = await LocalStorage.getIdsForKey('deck');
    // const decksLocal = await LocalStorage.getAllDataForKey('deck');
    // console.log(deckIDsLocal, decksLocal);
    // const deckIDs = await LocalStorage.getIdsForKey('deck');
    // const decks = await LocalStorage.getAllDataForKey('deck');
    // console.log(deckIDs, decks);
    // await deckIDs.forEach((deckID, index) => {
    //   decksContent[deckID] = decks[index]?.content ?? {};
    //   newDecksGeneral[deckID] = decks[index]?.general;
    // });
  };

  const initializeUser = async () => {
    // alert('User');
    const userIDSelf = account.general.userID;
    saveUserGeneral(userIDSelf, { name: account.general.name, icon: { color: getRandomPastel() } });
  };

  const initialize = async () => {
    await alert('initialize');
  };

  useEffect(() => {
    (async () => {
      const newIsLoggedIn = await initializeAuth();
      setIsInitialized(true);
      setIsLoggedIn(newIsLoggedIn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        setIsInitialized(false);
        await initialize();
        setIsInitialized(true);
      }
    })();
  }, [isLoggedIn]);

  // useEffect(() => {
  //   (async () => {
  //     setIsInitialized(false);
  //     // if (newIsLoggedIn) {
  //     //   await initializeAccount();
  //     //   // await initializeUser();
  //     //   // await initializeDeck();
  //     // }
  //     // setIsLoggedIn(newIsLoggedIn);
  //     setIsInitialized(true);
  //   })();
  // }, [isLoggedIn]);

  if (isInitialized) {
    return (
      <NavigationContainer
        onStateChange={(state) => console.log(state)}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="main" component={MainNav} />
          ) : (
            <Stack.Screen name="launch" component={LaunchNav} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Loading</Text></View>);
};

export default Nav;
