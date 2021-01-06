import React from 'react';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { account } from '../../../../config/account/Account';
import { decksContent } from '../../../../config/deck/Deck';
import Color from '../../../../config/Color';

const iconsize = 30;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: iconsize / 3,
  },
  cards: {
    fontSize: iconsize,
  },
//   cards: {
//     flexDirection: 'row',
//     flex: 1,
//   },
});

const Analyze = (props) => {
  const { navigation, route: { params: { deckID } } } = props;

  const { marks } = account.content[deckID];
  const vocabIDs = Object.keys(marks);
  //   makrs = { 'vocabID': number, 'vocabID': number }
  const renderVocab = () => vocabIDs.map((vocabID) => (
    <View style={[style.container, { backgroundColor: Color.white1 }]}>
      <Text style={style.cards}>
        {`${decksContent[deckID][vocabID].term}: ${marks[vocabID]}`}
      </Text>
    </View>
  ));
  const renderFirst = () => (
    <View style={[style.container, { backgroundColor: Color.gray3 }]}>
      <Text style={style.cards}>
        word: marks
      </Text>
    </View>
  );

  return (
    <View>
      {/* <Button onPress={() => console.log(vocabIDs)} /> */}
      {renderFirst()}
      {renderVocab()}
      {/* <Text>{JSON.stringify(marks)}</Text> */}
    </View>
  );
};

Analyze.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Analyze.defaultProps = {

};

export default Analyze;
