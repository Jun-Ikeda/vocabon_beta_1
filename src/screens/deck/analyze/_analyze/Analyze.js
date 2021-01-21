import React, { useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { Portal } from 'react-native-paper';
import { getAccountContent } from '../../../../config/account/Account';
import { getDeckContent } from '../../../../config/deck/Deck';
import VocabList from '../../../../components/deck/list/VocabList';
import { func } from '../../../../config/Const';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

const iconSize = 30;

const style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: iconSize / 3,
    flexDirection: 'row',
  },
  labelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: iconSize * 0.66,
  },
  text: {
    fontSize: iconSize,
  },
  detailcontainer: {
    flex: 1,
    // borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Color.white1,
    marginHorizontal: '10%',
    marginVertical: '25%',
    padding: '8%',
  },
  detailtext: {
    // borderWidth: 1,
    fontSize: iconSize * 0.66,
  },
});

const Analyze = (props) => {
  const { navigation, route: { params: { deckID } } } = props;

  const { marks, play } = getAccountContent(deckID);
  const content = getDeckContent(deckID);
  const [contentSearched, setContentSearched] = useState(content);
  const [vocabDetailVisible, setVocabDetailVisible] = useState(false);

  const renderVocab = () => (
    <VocabList
      content={contentSearched}
      itemVisible={{ term: true }}
      renderCardRight={(vocab) => <Text>{marks?.[vocab.key]?.length ?? 0}</Text>}
      onPressCard={(vocab) => setVocabDetailVisible(vocab.key)}
      searchBar
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
          <View style={style.detailcontainer}>
            <Text style={style.detailtext}>{content[vocabDetailVisible]?.term}</Text>
            <Text style={style.detailtext}>{content[vocabDetailVisible]?.definition}</Text>
            <Text style={style.detailtext}>{'\nHistory:'}</Text>
          </View>
        )}
      />
    </Portal>
  );

  const getDate = (shortenedDate) => {
    const year = (shortenedDate - shortenedDate % 10000) / 10000;
    const month = (shortenedDate % 10000 - (shortenedDate % 10000) % 100) / 100;
    const day = (shortenedDate % 10000) % 100;
    const lastNum = shortenedDate % 10;
    let hoge = '';
    
    if (lastNum === 1){
      hoge = 'st';
    }else if (lastNum === 2){
      hoge = 'nd';
    }else if (lastNum === 3){
      hoge = 'rd';
    }else{
      hoge = 'th';
    }

    return (
      <View style={{flex: 1}}>
        <Text style={style.detailtext}>
          {`${day}${hoge}`}
        </Text>
      </View>
    );
  },

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
