import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';

import { atom, useRecoilValue } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import ControlPanel from './controlpanel/ControlPanel';
import Demo from './Demo';
import Nav from '../src/nav/Nav';
import Readme from '../src/nav/launch/_readme/Readme';
import DocInJapanese from './DocInJapanese';
import LaunchNav from '../src/nav/launch/LaunchNav';
import EmailVerify from '../src/nav/launch/_emailverify/EmailVerify';
import Welcome from '../src/nav/launch/_welcome/Welcome';
// import Export from '../src/screens/deck/export/Export';

// import EditSearch from '../src/screens/deck/edit/_edit/EditSearch';

export const docVisibleState = atom({
  key: 'docVisibleState',
  default: false,
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
  },
  buttonsContainer: {
    borderWidth: 1,
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 2,
  },
});

const buttons = [
  { title: 'Product', element: <Nav /> },
  // { title: 'Demo', element: <Demo /> },
  // { title: 'Kochiya', element: <Readme /> },
  // { title: 'Email Verify', element: <EmailVerify navigation={{ addListener: () => {} }} /> },
  // { title: 'Welcome', element: <Welcome navigation={{ addListener: () => {} }} /> },
  // { title: 'Launch', element: <NavigationContainer><LaunchNav /></NavigationContainer> },
  // { title: 'Okuda', element: <Export />},
];

const Switch = () => {
  // const [visibleIndex, setVisibleIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const docVisible = useRecoilValue(docVisibleState);

  const renderScreens = () => (
    <View style={style.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {docVisible ? <DocInJapanese /> : null}
        <View style={{ flex: 1 }}>
          {buttons.map((button, index) => {
            if (index === visibleIndex) {
              return (
                <View
                  style={StyleSheet.absoluteFill}
                  key={button.title.toLowerCase()}
                >
                  {button.element}
                </View>
              );
            }
            return null;
          })}
        </View>
      </View>
    </View>
  );

  const renderButtons = () => (
    <View style={style.buttonsContainer}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal>
        {buttons.map((button, index) => {
          const isVisible = index === visibleIndex;
          return (
            <TouchableOpacity
              onPress={() => setVisibleIndex(index)}
              style={[style.button, { backgroundColor: isVisible ? 'black' : 'white' }]}
              key={button.title.toLowerCase()}
            >
              <Text style={{ color: isVisible ? 'white' : 'black' }}>{button.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderControlPanel = () => (
    <ControlPanel />
  );

  return (
    <View style={style.container}>
      {renderScreens()}
      {renderButtons()}
      {renderControlPanel()}
    </View>
  );
};

export default Switch;
