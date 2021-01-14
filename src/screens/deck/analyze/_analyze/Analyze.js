import React, { useEffect } from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

import { getAccountContent } from '../../../../config/account/Account';
import { getDeckContent } from '../../../../config/deck/Deck';
// import { deck, func } from '../../../../config/Const';
import VocabList from '../../../../components/deck/list/VocabList';

const iconsize = 30;

const style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: iconsize / 3,
    flexDirection: 'row',
  },
  labelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: iconsize * 0.66,
  },
  text: {
    fontSize: iconsize,
  },
});

const Analyze = (props) => {
  const { navigation, route: { params: { deckID } } } = props;

  const { marks } = getAccountContent(deckID);
  // const { marks } = account.content?.[deckID] ?? { marks: {}, play: [], bookmark: false };
  const content = getDeckContent(deckID);
  //   makrs = { 'vocabID': number, 'vocabID': number }
  useEffect(() => {
    console.log(content);
  }, []);

  const renderVocab = () => (
    <VocabList
      content={content}
      itemVisible={{ term: true }}
      renderCardRight={(vocab) => <Text>{marks?.[vocab.key]?.length ?? 0}</Text>}
    />
    // <FlatList
    //   data={vocabIDs}
    //   renderItem={({ item, index }) => (
    //     <View style={[style.container, { backgroundColor: Color.white1 }]}>
    //       <Text style={[style.text, { flex: 1 }]}>{decksContent[deckID][item].term}</Text>
    //       <Text style={[style.text, { paddingRight: 20 }]}>{marks?.[item]?.length ?? 0}</Text>
    //     </View>
    //   )}
    // />
  );

  const renderFirst = () => (
    <View style={style.labelContainer}>
      <Text style={style.label}>Term</Text>
      <Text style={[style.label, { /* textAlign: 'right' */ }]}>Marks</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* <Button onPress={() => console.log(vocabIDs)} /> */}
      {renderFirst()}
      {renderVocab()}
      {/* {renderVocab2()} */}
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
