import React, { useState } from 'react';

import {
  Text, View, StyleSheet, TouchableOpacity, LayoutAnimation,
} from 'react-native';
import { Portal } from 'react-native-paper';

import { BarChart } from 'react-native-chart-kit';
import { func } from '../../../../config/Const';
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
    paddingHorizontal: 20,
  },
  button: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  textConteiner: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 15,
  },
});

const AnalyzeButtons = (props) => {
  const {
    isGraphVisible, setGraphVisible, isDateVisible, setDateVisible, play, mode, setMode,
  } = props;

  const buttons = [
    {
      title: 'date',
      icon: { collection: 'MaterialCommunityIcons', name: 'calendar-clock' },
      onPress: () => {
        setDateVisible(true);
        setMode('date');
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
      visible: mode === 'noDate',
    },
    {
      title: 'chevrons-right',
      icon: { collection: 'Feather', name: 'chevrons-right' },
      onPress: () => {
        setDateVisible(false);
        setMode('noDate');
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
      visible: mode === 'date',
    },
    {
      title: 'graph',
      icon: { collection: 'Ionicons', name: 'bar-chart' },
      onPress: () => setGraphVisible(true),
      visible: true,
    },
  ];

  const renderDate = () => {
    if (isDateVisible) {
      return (
        <View style={style.textConteiner}>
          <Text style={style.text}>{`Last use on\n${func.formatDate(play[play.length - 1], false)}`}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={style.bar}>
      {renderDate()}
      {buttons.map((button) => {
        const IconComponent = Icon[button.icon.collection];
        return (button.visible ? (
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
        ) : null);
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
