import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import VocabList from '../../../../components/deck/vocab/VocabList';
import { func } from '../../../../config/Const';

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
    contentSorted, vocabDetailVisible, setVocabDetailVisible, marks, index, setIndex,
  } = props;
  // state
  //   const [togglevisible,set]
  const indexList = Object.keys(contentSorted);

  const renderVocab = () => (
    <VocabList
      content={contentSorted}
      itemVisible={{ term: true, definition: true }}
      renderCardRight={(vocab) => <Text>{marks?.[vocab.key]?.length ?? 0}</Text>}
      onPressCard={(vocab) => {
        // func.alertConsole(vocab.key);
        setVocabDetailVisible(vocab.key);
        setIndex(indexList.indexOf(vocab.key));
        console.log(index);
      }}
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
