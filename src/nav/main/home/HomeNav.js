import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
// import { BlurView } from 'expo-blur';

import { useRecoilState } from 'recoil';
import { LayoutAnimation, TouchableOpacity } from 'react-native';
import Color from '../../../config/Color';

// import Menu from '../../../screens/deck/menu/_menu/Menu';

// import Home from './_home/Home';
import { header } from '../../../config/Const';

import Home from './_home/Home';
import CreateDeck from './_createdeck/CreateDeck';
import Menu from '../../../screens/deck/menu/_menu/Menu';
import Play from '../../../screens/deck/play/_play/Play';
import Options from '../../../screens/deck/play/_options/Options';
import Results from '../../../screens/deck/play/_results/Results';
import Property from '../../../screens/deck/property/_property/Property';
import Edit from '../../../screens/deck/edit/_edit/Edit';
import Import from '../../../screens/deck/import/_import/Import';
import ImportOption from '../../../screens/deck/import/_importoption/ImportOption';
import Export from '../../../screens/deck/export/_export/Export';
import Analyze from '../../../screens/deck/analyze/_analyze/Analyze';

import { docVisibleState } from '../../../../dev/Switch';
import Icon from '../../../components/Icon';
import ProfileIcon from '../../../components/user/profileicon/ProfileIcon';
import { getAccountGeneral } from '../../../config/account/Account';

const Stack = createStackNavigator();

const HomeNav = () => {
  const [docVisible, setDocVisible] = useRecoilState(docVisibleState);
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'left',
        gestureDirection: 'vertical',
        // headerRight: () => (
        //   <TouchableOpacity
        //     style={{ paddingHorizontal: 10 }}
        //     onPress={() => {
        //       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        //       setDocVisible(!docVisible);
        //     }}
        //   >
        //     <Icon.Feather name="help-circle" style={{ fontSize: 28, color: Color.gray2 }} />
        //   </TouchableOpacity>
        // ),
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
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setDocVisible(!docVisible);
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="createdeck"
        component={CreateDeck}
        options={{ headerTitle: 'Create a New Deck' }}
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
          // headerRight: () => <ImportMenu />,
        }}
      />
      <Stack.Screen
        name="importoption"
        component={ImportOption}
        options={{
          headerTitle: 'Option',
          // headerRight: () => <ImportMenu />,
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeNav;
