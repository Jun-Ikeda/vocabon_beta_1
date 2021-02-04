import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LaunchNav from './launch/LaunchNav';
import MainNav from './main/MainNav';

import { Account, User } from '../../dev/TestData';
import { decksContent, decksGeneral } from '../config/deck/Deck';
import { users } from '../config/user/User';
import { account } from '../config/account/Account';
import LocalStorage from '../config/LocalStorage';

const Stack = createStackNavigator();

const Nav = () => {
  // recoil
  const setDeckGeneral = useSetRecoilState(decksGeneral);
  // state
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const initializeDeck = async () => {
    // const newDecksGeneral = {};
    // const deckIDs = Object.keys(Deck); // ['7NCodht%}0', '-BiGIisZb*', 'rUiKQdnLb9', 'xn>EfhY:2*', 'Q38xR=rnKc']
    // deckIDs.forEach((deckID) => {
    //   newDecksGeneral[deckID] = Deck[deckID].general; // newDecksGeneral = { '7NCodht%}0': Deck['7NCodht%}0'].general }
    //   decksContent[deckID] = Deck[deckID].content; // decksContent = { '7NCodht%}0': Deck['7NCodht%}0'].content }
    // });
    // setDeckGeneral(newDecksGeneral);
    const deckIDs = await LocalStorage.getIdsForKey('deck');
    const decks = await LocalStorage.getAllDataForKey('deck');
    const newDecksGeneral = {};
    await deckIDs.forEach((deckID, index) => {
      decksContent[deckID] = decks[index]?.content ?? {};
      newDecksGeneral[deckID] = decks[index]?.general;
    });
    setDeckGeneral(newDecksGeneral);
  };

  const initializeAccount = async () => {
    account.general = Account.general;

    account.content = {};
    const deckIDs = await LocalStorage.getIdsForKey('accountContent');
    const accountContent = await LocalStorage.getAllDataForKey('accountContent');
    await deckIDs.forEach((deckID, index) => {
      account.content[deckID] = accountContent[index];
    });
    // account.content = Account.content;
  };

  useEffect(() => {
    (async () => {
      await initializeDeck();
      // User を TestDataから取ってきて、config/user/User.jsのuserに代入 !contentをgeneralに分けてない!
      const userIDs = Object.keys(User);
      userIDs.forEach((userID) => {
        users[userID] = User[userID];
      });
      await initializeAccount();
      setIsInitialized(true);
    })();
  }, []);

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
