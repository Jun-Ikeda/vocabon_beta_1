import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LaunchNav from './launch/LaunchNav';
import MainNav from './main/MainNav';
import { Deck, User } from '../../dev/TestData';
import { decksContent, decksGeneral } from '../config/deck/Deck';
import { users } from '../config/user/User';

const Stack = createStackNavigator();

const Nav = () => {
  // recoil
  const setDeckGeneral = useSetRecoilState(decksGeneral);
  // state
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const deckIDs = Object.keys(Deck);
    const userIDs = Object.keys(User);

    // Deck
    const newDecksGeneral = {};
    deckIDs.forEach((deckID) => {
      newDecksGeneral[deckID] = Deck[deckID].general;
      decksContent[deckID] = Deck[deckID].content;
    });
    setDeckGeneral(newDecksGeneral);

    // User
    userIDs.forEach((userID) => {
      users[userID] = User[userID];
    });

    // Account
    

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
