import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../../../config/Color';

// import Menu from '../../../screens/deck/menu/_menu/Menu';

// import Home from './_home/Home';

import Home from './_home/Home';
import CreateDeck from './_createdeck/CreateDeck';
import Menu from '../../../screens/deck/menu/_menu/Menu';
import Property from '../../../screens/deck/property/_property/Property';
import Options from '../../../screens/deck/play/_options/Options';
import Play from '../../../screens/deck/play/_play/Play';
import Results from '../../../screens/deck/play/_results/Results';
import Edit from '../../../screens/deck/edit/_edit/Edit';
import Export from '../../../screens/deck/export/_export/Export';
import { header } from '../../../config/Const';
import ProfileIcon from '../../../components/user/profileicon/ProfileIcon';
import { account } from '../../../config/account/Account';
import Analyze from '../../../screens/deck/analyze/_analyze/Analyze';

const Stack = createStackNavigator();

const HomeNav = () => (
  <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      // headerTintColor: Color.black,
      headerTitleAlign: 'left',
      gestureDirection: 'vertical',
    }}
  >
    <Stack.Screen
      name="home"
      component={Home}
      options={({ navigation }) => ({
        ...header.mainHeaderStyles,
        headerTitle: 'Home',
        headerRight: () => (
          <ProfileIcon
            userID={account?.general?.userID}
            style={{ marginRight: 20 }}
            size={44}
            onPress={() => navigation.navigate('account')}
          />
        ),
        headerTransparent: true,
      })}
    />
    <Stack.Screen
      name="createdeck"
      component={CreateDeck}
      options={{ headerTitle: 'Create Deck' }}
    />
    <Stack.Screen
      name="menu"
      component={Menu}
      options={{
        headerTitle: '',
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: Color.white1,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="property"
      component={Property}
      options={{ headerTitle: 'Property' }}
    />
    <Stack.Screen
      name="options"
      component={Options}
      options={{ headerTitle: 'Options' }}
    />
    <Stack.Screen
      name="play"
      component={Play}
      options={{ headerTitle: '' }}
    />
    <Stack.Screen
      name="results"
      component={Results}
      options={{
        headerTitle: '',
        headerTransparent: true,
        headerTintColor: Color.white1,
      }}
    />
    <Stack.Screen
      name="edit"
      component={Edit}
      options={{
        headerTitle: 'Edit',
      }}
    />
    <Stack.Screen
      name="export"
      component={Export}
      options={{
        headerTitle: 'Export',
      }}
    />
    <Stack.Screen
      name="analyze"
      component={Analyze}
      options={{
        headerTitle: 'Analyze',
      }}
    />
  </Stack.Navigator>
);
export default HomeNav;
