import React, { useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { Portal } from 'react-native-paper';
import { getAccountContent } from '../../../../config/account/Account';
import { getDeckContent } from '../../../../config/deck/Deck';
// import { deck, func } from '../../../../config/Const';
import VocabList from '../../../../components/deck/list/VocabList';
import { func } from '../../../../config/Const';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

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
  const content = getDeckContent(deckID);
  const [contentSearched, setContentSearched] = useState(content);
  const [vocabDetailVisible, setVocabDetailVisible] = useState(false);

  const renderVocab = () => (
    <VocabList
      content={contentSearched}
      itemVisible={{ term: true }}
      renderCardRight={(vocab) => <Text>{marks?.[vocab.key]?.length ?? 0}</Text>}
      onPressCard={(vocab) => setVocabDetailVisible(vocab.key)}
    />
  );

  const renderLabels = () => {
    const labels = [
      {
        label: 'Term',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const newContentSearched_Array = func.convertObjectToArray(JSON.parse(JSON.stringify(contentSearched)));
          newContentSearched_Array.sort((a, b) => {
            const nameA = a.value.term.toLowerCase(); // 大文字と小文字を無視する
            const nameB = b.value.term.toLowerCase(); // 大文字と小文字を無視する
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          setContentSearched(func.convertArrayToObject(newContentSearched_Array));
        },
      },
      {
        label: 'Marks',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const newContentSearched_Array = func.convertObjectToArray(JSON.parse(JSON.stringify(contentSearched)));
          newContentSearched_Array.sort((a, b) => {
            const markA = marks?.[a.key]?.length ?? 0; // 大文字と小文字を無視する
            const markB = marks?.[b.key]?.length ?? 0; // 大文字と小文字を無視する
            if (markA < markB) {
              return 1;
            }
            if (markA > markB) {
              return -1;
            }
            return 0;
          });
          setContentSearched(func.convertArrayToObject(newContentSearched_Array));
        },
      },
    ];
    return (
      <View style={style.labelContainer}>
        {labels.map((label) => (
          <TouchableOpacity onPress={label.onPress}>
            <Text style={style.label}>{label.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderVocabDetail = () => (
    <Portal>
      <PopUpMenu
        isVisible={vocabDetailVisible}
        setVisible={setVocabDetailVisible}
        renderMenu={() => (
          <View style={{
            backgroundColor: Color.white1, marginHorizontal: '10%', marginVertical: '25%', flex: 1,
          }}
          >
            <Text>{content[vocabDetailVisible]?.term}</Text>
            <Text>{content[vocabDetailVisible]?.definition}</Text>
          </View>
        )}
      />
    </Portal>
  );

  return (
    <View style={{ flex: 1 }}>
      {renderLabels()}
      {renderVocab()}
      {renderVocabDetail()}
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
