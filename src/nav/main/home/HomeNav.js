import React from 'react';
import {
  View, StatusBar, Text, Platform,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import { BlurView } from 'expo-blur';

import Color from '../../../config/Color';

// import Menu from '../../../screens/deck/menu/_menu/Menu';

// import Home from './_home/Home';
import { header } from '../../../config/Const';
import { account, getAccountGeneral } from '../../../config/account/Account';

import Home from './_home/Home';
import CreateDeck from './_createdeck/CreateDeck';
import Menu from '../../../screens/deck/menu/_menu/Menu';
import Property from '../../../screens/deck/property/_property/Property';
import Options from '../../../screens/deck/play/_options/Options';
import Play from '../../../screens/deck/play/_play/Play';
import Results from '../../../screens/deck/play/_results/Results';
import Edit from '../../../screens/deck/edit/_edit/Edit';
import Export from '../../../screens/deck/export/_export/Export';
import Analyze from '../../../screens/deck/analyze/_analyze/Analyze';
import Import from '../../../screens/deck/import/Import';

import ProfileIcon from '../../../components/user/profileicon/ProfileIcon';

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
            userID={getAccountGeneral().userID}
            style={{ marginRight: 20 }}
            size={44}
            onPress={() => navigation.navigate('account')}
          />
        ),
        // headerTransparent: true,
        // header: () => (
        //   <View>
        //     <BlurView
        //       style={{
        //         height: 120/*  + (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight) */,
        //         paddingTop: (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight),
        //         flexDirection: 'row',
        //       }}
        //       intensity={100}
        //     >
        //       <Text style={{
        //         fontSize: 22, alignSelf: 'center', /* borderWidth: 1, */ paddingLeft: 20, fontWeight: 'bold',
        //       }}
        //       >
        //         Home
        //       </Text>
        //       <View style={{ flex: 1 }} />
        //     </BlurView>
        //   </View>
        // ),
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
    <Stack.Screen
      name="import"
      component={Import}
      options={{
        headerTitle: 'Import',
      }}
    />
  </Stack.Navigator>
);
export default HomeNav;
