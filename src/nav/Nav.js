import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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
import { account, initialAccountGeneral } from '../config/account/Account';
import LocalStorage from '../config/LocalStorage';
import { func } from '../config/Const';
import { login } from '../config/firebase/Auth';
import { getRandomPastel } from '../config/Color';
import { firestore, storage } from '../config/firebase/Firebase';

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

  const initializeAccount = async () => {
    // alert('Account');
    account.general = await LocalStorage.load({ key: 'accountGeneral' }).catch(() => initialAccountGeneral);

    account.content = {};
    // const deckIDs = await LocalStorage.getIdsForKey('accountContent');
    // const accountContent = await LocalStorage.getAllDataForKey('accountContent');
    // await deckIDs.forEach((deckID, index) => {
    //   account.content[deckID] = accountContent[index];
    // });
    // func.alertConsole(account);
    const isLoggedInLocal = (account?.general?.loggedin ?? false) && (account?.general?.emailVerified ?? false);
    setIsLoggedIn(isLoggedInLocal);
    if (isLoggedInLocal) {
      // alert('isloggedin');
      login(account.general.email, account.general.password);
      storage.ref('account').child(account.general.userID).getDownloadURL().then((url) => fetch(url)
        .then((response) => response.json())
        .then((card) => {
        // func.alertConsole(card);
          account.content = card;
          // return card;
          Object.keys(account.content).forEach((deckID) => {
            LocalStorage.save({ key: 'accountContent', id: deckID, data: account.content[deckID] });
          });
        }));
    }
    // account.content = Account.content;
  };

  const initializeDeck = async () => {
    // alert('Deck');
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

  useEffect(() => {
    (async () => {
      setIsInitialized(false);
      await initializeAccount();
      if (isLoggedIn) {
        await initializeUser();
        await initializeDeck();
        // User を TestDataから取ってきて、config/user/User.jsのuserに代入 !contentをgeneralに分けてない!
        // // const userIDs = Object.keys(User);
        // userIDs.forEach((userID) => {
        //   users[userID] = User[userID];
        // });
      }
      setIsInitialized(true);
    })();
  }, [isLoggedIn]);

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
