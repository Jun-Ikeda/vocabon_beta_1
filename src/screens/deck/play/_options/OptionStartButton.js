import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

import { CommonActions } from '@react-navigation/native';
import Color from '../../../../config/Color';
import { deck } from '../../../../config/Const';

const style = StyleSheet.create({
  container: {
    position: 'absolute', bottom: 0, right: 0, left: 0,
  },
});

const OptionStartButton = (props) => {
  const {
    navigation, deckID, validVocabIDs, mode, itemVisible, sortMode,
  } = props;

  const start = () => {
    const validVocabIDsSorted = deck.sortVocabs(validVocabIDs, sortMode);
    navigation.dispatch((state) => {
      const params = {
        deckID, itemVisible, validVocabIDs: validVocabIDsSorted, sortMode,
      };
      const routes = [
        ...state.routes.filter((route) => route.name !== 'options'),
        { name: 'play', params },
      ];
      return CommonActions.reset({ ...state, routes, index: routes.length - 1 });
    });
  };
  return (
    <View style={style.container}>
      {mode === 'custom' && validVocabIDs.length === 0 ? <Text style={{ textAlign: 'center' }}>No matched card</Text> : null}
      <Button
        color={Color.green2}
        style={{ margin: 15 }}
        mode="contained"
        onPress={start}
        disabled={validVocabIDs.length === 0}
      >
        Start
      </Button>
    </View>
  );
};

OptionStartButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  deckID: PropTypes.string.isRequired,
  validVocabIDs: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
  itemVisible: PropTypes.object.isRequired,
  sortMode: PropTypes.string.isRequired,
};

OptionStartButton.defaultProps = {

};

export default OptionStartButton;
