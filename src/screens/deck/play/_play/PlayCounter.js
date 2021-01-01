import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  container: { flexDirection: 'row' },
  label: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
});

/**
 * PlayCounter Component in Play Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <PlayCounter
 *  leftIndex={[ array ]}
 *  rightIndex={[ array ]}
 * />
 *
 * ```
 */
const PlayCounter = (props) => {
  const { leftIndex, rightIndex } = props;

  return (
    <View style={style.container}>
      <Text style={style.label}>{`Marked: ${leftIndex.length}`}</Text>
      <View style={style.lebel} />
      <Text style={style.label}>{`Clear: ${rightIndex.length}`}</Text>
    </View>
  );
};

PlayCounter.propTypes = {
  leftIndex: PropTypes.array,
  rightIndex: PropTypes.array,
};

PlayCounter.defaultProps = {
  leftIndex: [],
  rightIndex: [],
};

export default PlayCounter;
