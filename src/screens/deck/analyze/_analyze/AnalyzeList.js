import React, { useState } from 'react';

import { Text, View, StyleSheet } from 'react-native';
// import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

import VocabList from '../../../../components/deck/list/VocabList';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

const AnalyzeList = (props) => {
  // props
  const {
    contentSorted, vocabDetailVisible, setVocabDetailVisible, marks,
  } = props;
  // state
  //   const [togglevisible,set]

  const renderVocab = () => (
    <VocabList
      content={contentSorted}
      itemVisible={{ term: true, definition: true }}
      renderCardRight={(vocab) => <Text>{marks?.[vocab.key]?.length ?? 0}</Text>}
      onPressCard={(vocab) => setVocabDetailVisible(vocab.key)}
      searchBar
      // renderViewContent={(vocab) => <View style={{ width: 100, backgroundColor: 'red' }}><Text>{JSON.stringify(vocab.value, null, 2)}</Text></View>}
    />
  );
  return (
    <View style={{ flex: 1 }}>
      {renderVocab()}
    </View>
  );
};

export default AnalyzeList;
