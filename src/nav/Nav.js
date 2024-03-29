import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import {
  atom, useRecoilState, useRecoilValue, useSetRecoilState,
} from 'recoil';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button } from 'react-native-paper';
import _ from 'lodash';
import LaunchNav from './launch/LaunchNav';
import MainNav from './main/MainNav';

import { Account, User } from '../../dev/TestData';
import { decksContent, decksGeneral } from '../config/deck/Deck';
import { saveUserGeneral, users } from '../config/user/User';
import {
  account, initialAccountGeneral, saveAccountGeneral, getAccountGeneral,
} from '../config/account/Account';
import LocalStorage from '../config/LocalStorage';
import { func } from '../config/Const';
import { getFirebaseUser, login } from '../config/firebase/Auth';
import { getRandomPastel } from '../config/Color';
import {
  auth, database, firestore, storage,
} from '../config/firebase/Firebase';

const Stack = createStackNavigator();

export const clearStorage = async () => {
  await LocalStorage.remove({ key: 'deckGeneral' }); // timestamp of deck general
  await LocalStorage.remove({ key: 'accountGeneral' }); // account general
  await LocalStorage.clearMapForKey('accountContent'); // account content
  await LocalStorage.remove({ key: 'accountContent' }); // timestamp of account content
  await LocalStorage.clearMapForKey('deck'); // deck general, content, timestamp
};

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: null,
});

const Nav = () => {
  // recoil
  const setDeckGeneral = useSetRecoilState(decksGeneral);
  // state
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [syncState, setSyncState] = useState([]);

  const initializeAuth = async () => {
    setSyncState([]);
    const preLocalGeneral = await LocalStorage.load({ key: 'accountGeneral' }).catch(() => initialAccountGeneral);
    let preIsLoggedIn = (preLocalGeneral?.loggedin ?? false) && (preLocalGeneral?.emailVerified ?? false);
    account.general = { name: preLocalGeneral?.name ?? '', ...account.general };
    if (preIsLoggedIn) {
      await login(preLocalGeneral?.email, preLocalGeneral?.password, () => {
        clearStorage();
        preIsLoggedIn = false;
      });
    }
    setSyncState((prev) => ([...prev, 'auth initialized']));
    return preIsLoggedIn;
  };

  const initializeAccount = async () => {
    // general
    const user = auth.currentUser;
    const preAccountGeneral = await LocalStorage.load({ key: 'accountGeneral' });
    const newAccountGeneral = { ...preAccountGeneral, name: user.displayName, emailVerified: user.emailVerified };
    // recoil/global
    account.general = newAccountGeneral;
    // func.alertConsole(newAccountGeneral);
    // localstorage
    LocalStorage.save({ key: 'accountGeneral', data: newAccountGeneral });
    setSyncState((prev) => ([...prev, 'accountGeneral: download']));

    // content
    account.content = {};
    // get timestamp
    try {
      let fireTimeStamp = 0;
      await database.ref(`timestamp/account/${preAccountGeneral.userID}`).once('value', (timestamp) => { fireTimeStamp = timestamp.val(); });
      const localTimeStamp = await LocalStorage.load({ key: 'accountContent' }).then((result) => result).catch(() => null);
      // compare
      if (fireTimeStamp < localTimeStamp) {
        setSyncState((prev) => ([...prev, `accountContent: upload  (fire: ${fireTimeStamp}, local: ${localTimeStamp})`]));
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
      } else if (fireTimeStamp > localTimeStamp) {
        setSyncState((prev) => ([...prev, `accountContent: download (fire: ${fireTimeStamp}, local: ${localTimeStamp})`]));
        // get firebase
        await storage.ref('account').child(preAccountGeneral.userID).getDownloadURL()
          .then((url) => fetch(url)
            .then((response) => response.json())
            .then((accountContent) => {
            // apply to recoil/global
              account.content = accountContent;
              // apply to localstorage
              Object.keys(accountContent).forEach((deckID) => {
                LocalStorage.save({ key: 'accountContent', id: deckID, data: accountContent[deckID] });
              });
            }));
        // set timestamp
        await LocalStorage.save({ key: 'accountContent', data: fireTimeStamp });
      } else {
        setSyncState((prev) => ([...prev, `accountContent: nochange (fire: ${fireTimeStamp}, local: ${localTimeStamp})`]));
        // get local
        const deckIDs = await LocalStorage.getIdsForKey('accountContent').catch(() => []);
        const accountContent = await LocalStorage.getAllDataForKey('accountContent').catch(() => []);
        // apply to recoil/global
        await deckIDs.forEach((deckID, index) => {
          account.content[deckID] = accountContent[index];
        });
      }
    } catch (error) {
      func.alert(error);
    }
  };

  const initializeUser = async () => {
    // alert('User');
    const userIDSelf = account.general.userID;
    saveUserGeneral(userIDSelf, { name: account.general.name, icon: { color: getRandomPastel() } });
  };

  const initializeDeck = async () => {
    const userIDSelf = account.general.userID;
    let deckIDsAll = [];
    // general
    // timestamp
    let fireTimeStamp = 0;
    await database.ref(`timestamp/deckGeneral/${userIDSelf}`).once('value', (snapshot) => { fireTimeStamp = snapshot.val(); });
    const localTimeStamp = await LocalStorage.load({ key: 'deckGeneral' }).catch(() => null);
    const newDecksGeneral = {};
    if (fireTimeStamp < localTimeStamp) {
      setSyncState((prev) => ([...prev, 'deckGeneral: upload']));
      // get localstorage
      const deckIDs = await LocalStorage.getIdsForKey('deck');
      const decks = await LocalStorage.getAllDataForKey('deck');
      // apply to recoil/global
      deckIDs.forEach((deckID, index) => {
        newDecksGeneral[deckID] = decks[index]?.general;
      });
      setDeckGeneral(newDecksGeneral);
      // set firebase
      deckIDs.forEach((deckID, index) => {
        if (decks[index]?.general.user === userIDSelf) {
          firestore.collection('deck').doc(deckID).set(decks[index]?.general, { merge: false });
        }
      });
      // set timestamp
      await database.ref(`timestamp/deckGeneral/${userIDSelf}`).set(localTimeStamp);
      //
      deckIDsAll = deckIDs;
    } else if (fireTimeStamp > localTimeStamp) {
      setSyncState((prev) => ([...prev, 'deckGeneral: download']));
      // get firebase
      await firestore.collection('deck').where('user', '==', userIDSelf).get().then(async (snapshot) => {
        await snapshot.forEach(async (doc) => {
          // set localstorage
          const prevLocalStorage = await LocalStorage.load({ key: 'deck', id: doc.id });
          LocalStorage.save({ key: 'deck', id: doc.id, data: { ...prevLocalStorage, general: doc.data() } });
        });
        // apply to recoil/global
        const deckIDs = await LocalStorage.getIdsForKey('deck');
        const decks = await LocalStorage.getAllDataForKey('deck');
        deckIDs.forEach((deckID, index) => {
          newDecksGeneral[deckID] = decks[index]?.general;
        });
        setDeckGeneral(newDecksGeneral);
      });
      // set timestamp
      await LocalStorage.save({ key: 'deckGeneral', data: fireTimeStamp });
      //
      deckIDsAll = Object.keys(newDecksGeneral);
    } else { // firestoreの内容とlocalstorageの内容は同じ
      setSyncState((prev) => ([...prev, `deckGeneral: nochange (fire: ${fireTimeStamp} local: ${localTimeStamp})`]));
      // get local
      const deckIDs = await LocalStorage.getIdsForKey('deck');
      const decks = await LocalStorage.getAllDataForKey('deck');
      // apply to recoil/global
      await deckIDs.forEach((deckID, index) => {
        newDecksGeneral[deckID] = decks[index]?.general ?? {};
      });
      // func.alertConsole(newDecksGeneral);
      setDeckGeneral(newDecksGeneral);
      //
      deckIDsAll = deckIDs;
    }
    //
    Object.keys(account.content).forEach((deckID) => {
      if (!deckIDsAll.includes(deckID)) {
        firestore.collection('deck').doc(deckID).get().then((doc) => {
          if (doc.exists) {
            LocalStorage.save({ key: 'deck', id: deckID, data: { content: {}, general: doc.data() } });
            setDeckGeneral((prev) => ({ ...prev, [deckID]: doc.data() }));
          }
        });
      }
    });

    // content
    deckIDsAll.forEach(async (deckID) => {
      // alert(JSON.stringify({ decksGeneral: newDecksGeneral[deckID], general: account.general }));
      if (newDecksGeneral[deckID].user === account.general.userID) { // timestamp
        let fireTimeStampDeck = null;
        const localstorage = await LocalStorage.load({ key: 'deck', id: deckID }).catch(() => null);
        const localTimeStampDeck = localstorage?.timestamp ?? null;
        await database.ref(`timestamp/deckContent/${deckID}`).once('value', (snapshot) => { fireTimeStampDeck = snapshot.val(); });
        if (fireTimeStamp === 0) { // deleteされた
        // delete localstorage
          LocalStorage.remove({ key: 'deck', id: deckID });
        } else if (fireTimeStampDeck < localTimeStampDeck) {
          setSyncState((prev) => ([...prev, `deckContent: ${deckID}: upload (fire: ${fireTimeStampDeck}, local: ${localTimeStampDeck})`]));
          // get local
          const deck = await LocalStorage.load({ key: 'deck', id: deckID });
          // apply to recoil/global
          decksContent[deckID] = deck?.content;
          // set firebase
          await storage.ref('deck').child(deckID).put(new Blob([JSON.stringify(decksContent[deckID])]));
          // set timestamp
          database.ref(`timestamp/deckContent/${deckID}`).set(localTimeStampDeck);
        } else if (fireTimeStampDeck > localTimeStampDeck) {
          setSyncState((prev) => ([...prev, `deckContent: ${deckID}: download (fire: ${fireTimeStampDeck}, local: ${localTimeStampDeck})`]));
          // get firebase
          await storage.ref('deck').child(deckID).getDownloadURL().then((url) => fetch(url)
            .then(async (response) => response.json())
            .then(async (result) => {
            // apply to recoil/global
              decksContent[deckID] = result;
              // save to localstorage, timestamp
              const prevLocalStorage = await LocalStorage.load({ key: 'deck', id: deckID });
              await LocalStorage.save({ key: 'deck', id: deckID, data: { ...prevLocalStorage, content: result, timestamp: fireTimeStampDeck } });
            }));
        } else {
          setSyncState((prev) => ([...prev, `deckContent: ${deckID}: nochange (fire: ${fireTimeStampDeck}, local: ${localTimeStampDeck})`]));
          // get local
          const deck = await LocalStorage.load({ key: 'deck', id: deckID });
          // apply to recoil/global
          decksContent[deckID] = deck.content;
        }
      } else {
        decksContent[deckID] = { user: decksGeneral[deckID].user, userID: account.general.userID };
      }
    });
    // deleteされてたらlocalstorage削除
    const deckIDsAllLocal = await LocalStorage.getIdsForKey('deck');
    deckIDsAllLocal.forEach(async (deckID) => {
      if (!deckIDsAll.includes(deckID)) {
        await LocalStorage.remove({ key: 'deck', id: deckID });
      }
    });
  };

  const initialize = async () => {
    await initializeAccount();
    await initializeUser();
    await initializeDeck();
  };

  useEffect(() => {
    (async () => {
      // await SplashScreen.preventAutoHideAsync();
      const newIsLoggedIn = await initializeAuth();
      setIsLoggedIn(newIsLoggedIn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (getAccountGeneral().name === 'Guest User') {
        setIsLoggedIn(true);
        setIsInitialized(true);
      } else if (isLoggedIn) { // isLoggedIn=true:emailVerifyかつloginしてる
        setIsInitialized(false);
        await initialize();
        await setIsInitialized(true);
        // await SplashScreen.hideAsync();
      } else if (isLoggedIn === false) { // falseの場合emailVerifyだけしてない、またはともにしていない
        account.general = await LocalStorage.load({ key: 'accountGeneral' }).catch(() => {}); // 前者の場合、emailVerifyの画面で止まる
        await setIsInitialized(true);
        // await SplashScreen.hideAsync();
      }
    })();
  }, [isLoggedIn]);

  if (isInitialized) {
    return (
      <View style={{ flex: 1 }}>
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
        {/* <Button onPress={() => alert(JSON.stringify({ isLoggedIn, isInitialized }))}>state</Button> */}
        {/* <Button onPress={() => func.alertConsole(syncState)}>SynsState</Button> */}
      </View>
    );
  }
  return <View style={{ flex: 1 }} />;
  // return (
  //   <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
  //     <Button onPress={() => alert(JSON.stringify({ isLoggedIn, isInitialized }))}>state</Button>
  //   </View>
  // );
};

export default Nav;
