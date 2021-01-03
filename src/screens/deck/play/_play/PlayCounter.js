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
      <Text style={style.label}>{`Marked: ${leftVocabID.length}`}</Text>
      <View style={style.lebel} />
      <Text style={style.label}>{`Clear: ${rightVocabID.length}`}</Text>
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
