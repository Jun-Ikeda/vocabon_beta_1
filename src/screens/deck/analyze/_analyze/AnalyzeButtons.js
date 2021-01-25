import React, { useState } from 'react';

import {
  Text, View, StyleSheet, TouchableOpacity, onPress,
} from 'react-native';
import { Portal } from 'react-native-paper';

import { BarChart } from 'react-native-chart-kit';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';
import PopUpMenu from '../../../../components/popup/PopUpMenu';

const iconSize = 20;
const style = StyleSheet.create({
  bar: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 40,
  },
  button: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 20,
  },
  graph: {

  },
});

const AnalyzeButtons = (props) => {
  const { isVisible, setVisible, play } = props;

  const buttons = [
    {
      title: 'graph',
      icon: { collection: 'Ionicons', name: 'bar-chart' },
      onPress: () => setVisible(true),
    },
  ];
  return (
    <View style={style.bar}>
      <Text style={style.text}>Create: May 7th,2020</Text>
      <Text style={style.text}>Last use: May 10th,2020</Text>
      {buttons.map((button) => {
        const IconComponent = Icon[button.icon.collection];
        return (
          <TouchableOpacity
            style={style.button}
            onPress={button.onPress}
            key={button.title.toLowerCase()}
          >
            <IconComponent
              name={button.icon.name}
              size={iconSize}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// AnalyzeButtons.propTypes = {
//   setMode: PropTypes.func.isRequired,
//   mode: PropTypes.string.isRequired,
//   setVisibles: func.isRequired,
//   setIsChanged: PropTypes.func.isRequired,
// };

export default AnalyzeButtons;
