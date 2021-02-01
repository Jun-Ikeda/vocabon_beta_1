import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';

const style = StyleSheet.create({
  container: { flexDirection: 'row' },
  label: {
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
    marginBottom: 12,
  },
  iconMarked: {
    color: Color.cud.red,
    fontSize: 24,
  },
  iconClear: {
    color: Color.green2,
    fontSize: 24,
  },
});

/**
 * PlayCounter Component in Play Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <PlayCounter
 *  leftVocabID={[ array ]}
 *  rightVocabID={[ array ]}
 * />
 *
 * ```
 */
const PlayCounter = (props) => {
  const { leftVocabID, rightVocabID } = props;

  return (
    <View style={style.container}>
      <Text style={style.label}>
        <Icon.AntDesign name="close" style={style.iconMarked} />
        {`: ${leftVocabID.length}`}
      </Text>
      <View style={style.lebel} />
      <Text style={style.label}>
        <Icon.AntDesign name="check" style={style.iconClear} />
        {`: ${rightVocabID.length}`}
      </Text>
    </View>
  );
};

PlayCounter.propTypes = {
  leftVocabID: PropTypes.array,
  rightVocabID: PropTypes.array,
};

PlayCounter.defaultProps = {
  leftVocabID: [],
  rightVocabID: [],
};

export default PlayCounter;
