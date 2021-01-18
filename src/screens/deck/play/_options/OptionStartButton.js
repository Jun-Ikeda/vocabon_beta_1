import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

import Color from '../../../../config/Color';

const style = StyleSheet.create({
  container: {
    position: 'absolute', bottom: 0, right: 0, left: 0,
  },
});

const OptionStartButton = (props) => {
  const {
    navigation, deckID, validVocabIDs, mode, itemVisible,
  } = props;

  const start = () => {
    if (mode === 'custom') {
      navigation.navigate('play', { deckID, itemVisible, validVocabIDs });
    } else if (mode === 'default') {
      navigation.navigate('play', { deckID, itemVisible });
    }
  };
  return (
    <View style={style.container}>
      {mode === 'custom' && validVocabIDs.length === 0 ? <Text style={{ textAlign: 'center' }}>No matched card</Text> : null}
      <Button
        color={Color.green2}
        style={{ margin: 15 }}
        mode="contained"
        onPress={start}
        disabled={mode === 'custom' && validVocabIDs.length === 0}
      >
        Start
      </Button>
    </View>
  );
};

OptionStartButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  deckID: PropTypes.object.isRequired,
  validVocabIDs: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  itemVisible: PropTypes.object.isRequired,
};

OptionStartButton.defaultProps = {

};

export default OptionStartButton;
