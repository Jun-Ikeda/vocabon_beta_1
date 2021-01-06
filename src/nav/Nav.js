import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchNav from './launch/LaunchNav';
import MainNav from './main/MainNav';
import { Account, Deck, User } from '../../dev/TestData';
import { decksContent, decksGeneral } from '../config/deck/Deck';
import { users } from '../config/user/User';
import { account } from '../config/account/Account';

const Stack = createStackNavigator();

const Nav = () => {
  // recoil
  const setDeckGeneral = useSetRecoilState(decksGeneral);
  // state
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const deckIDs = Object.keys(Deck); // ['7NCodht%}0', '-BiGIisZb*', 'rUiKQdnLb9', 'xn>EfhY:2*', 'Q38xR=rnKc']
    const userIDs = Object.keys(User);

    // Deck を TestDataから取ってきて、config/deck/Deck.jsのdecksGeneral, decksContentに代入
    const newDecksGeneral = {};
    deckIDs.forEach((deckID) => {
      newDecksGeneral[deckID] = Deck[deckID].general; // newDecksGeneral = { '7NCodht%}0': Deck['7NCodht%}0'].general }
      decksContent[deckID] = Deck[deckID].content; // decksContent = { '7NCodht%}0': Deck['7NCodht%}0'].content }
    });
    setDeckGeneral(newDecksGeneral);

    // User を TestDataから取ってきて、config/user/User.jsのuserに代入 !contentをgeneralに分けてない!
    userIDs.forEach((userID) => {
      users[userID] = User[userID];
    });

    // Account
    account.content = Account.content;
    account.general = Account.general;

    setIsInitialized(true);
  }, []);

  if (isInitialized) {
    return (
      <NavigationContainer>
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
