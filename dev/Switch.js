import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';

import ControlPanel from './controlpanel/ControlPanel';
import Demo from './Demo';
import Nav from '../src/nav/Nav';
import Edit from '../src/screens/deck/edit/_edit/Edit';
import Options from '../src/screens/deck/play/_options/Options';
import Play from '../src/screens/deck/play/_play/Play';

const style = StyleSheet.create({
  container: {
    flex: 1,
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
  { title: 'Demo', element: <Demo /> },
  { title: 'Suzuki', element: <Edit navigation={{}} route={{ params: { id: 'Q38xR=rnKc' } }} /> },
  { title: 'Iwasaki', element: <Options navigation={{}} route={{ params: { deckID: '7NCodht%}0' } }} /> },
  { title: 'Kochiya', element: <Play navigation={{}} route={{ params: { id: 'Q38xR=rnKc' } }} /> },
];

const Switch = () => {
  // const [visibleIndex, setVisibleIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(2);

  const renderScreens = () => (
    <View style={style.container}>
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
