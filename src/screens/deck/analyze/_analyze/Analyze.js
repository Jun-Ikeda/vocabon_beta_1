import React, { useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import { Portal } from 'react-native-paper';
import { getAccountContent } from '../../../../config/account/Account';
import { getDeckContent } from '../../../../config/deck/Deck';
import VocabList from '../../../../components/deck/list/VocabList';
import { func } from '../../../../config/Const';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

import AnalyzeList from './AnalyzeList';
import AnalyzeButtons from './AnalyzeButtons';

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
    // flex: 1,
    // borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Color.white1,
    marginHorizontal: '5%',
    marginVertical: 50,
    // padding: '8%',
  },
  detailtext: {
    // borderWidth: 1,
    fontSize: iconSize * 0.66,
  },
  detaildate: {
    fontSize: iconSize * 0.66,

  },
});

const Analyze = (props) => {
  const { navigation, route: { params: { deckID } } } = props;

  const { marks, play /* ここ 具体的な構造は、TestData若しくは、Accountの下のコメントを参照 */ } = getAccountContent(deckID);
  const content = getDeckContent(deckID);
  const [contentSorted, setContentSorted] = useState(content);
  const [vocabDetailVisible, setVocabDetailVisible] = useState(false);

  const renderVocab = () => (
    <AnalyzeList
      marks={marks}
      contentSorted={contentSorted}
      vocabDetailVisible={vocabDetailVisible}
      setVocabDetailVisible={setVocabDetailVisible}
    />
  );

  const renderLabels = () => {
    const labels = [
      {
        label: 'Term',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const newContentSorted = func.convertArrayToObject(func.convertObjectToArray(contentSorted).sort((a, b) => {
            const nameA = a.value.term.toLowerCase(); // 大文字と小文字を無視する
            const nameB = b.value.term.toLowerCase(); // 大文字と小文字を無視する
            return (nameA === nameB) ? 0 : (nameA > nameB ? 1 : -1);
          }));
          setContentSorted(newContentSorted);
        },
      },
      {
        label: 'Marks',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const newContentSorted = func.convertArrayToObject(func.convertObjectToArray(contentSorted).sort((a, b) => {
            const markA = marks?.[a.key]?.length ?? 0; // 大文字と小文字を無視する
            const markB = marks?.[b.key]?.length ?? 0; // 大文字と小文字を無視する
            return (markA === markB) ? 0 : (markA < markB ? 1 : -1);
          }));
          setContentSorted(newContentSorted);
        },
      },
    ];
    return (
      <View style={style.labelContainer}>
        {labels.map((label) => (
          <TouchableOpacity onPress={label.onPress} key={label.label.toLowerCase()}>
            <Text style={style.label}>{label.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderDate = (shortenedDate) => (
    <View style={{ flex: 1 }}>
      <Text style={style.detailtext}>
        {func.formatDate(shortenedDate)}
      </Text>
    </View>
  );

  const renderVocabDetail = () => (
    <Portal>
      <PopUpMenu
        isVisible={vocabDetailVisible}
        setVisible={setVocabDetailVisible}
        renderMenu={() => (
          <View style={style.detailcontainer}>
            <Text style={style.detailtext}>{content[vocabDetailVisible]?.term}</Text>
            <Text style={style.detailtext}>{content[vocabDetailVisible]?.definition}</Text>
            <Text style={style.detailtext}>{'\nHistory:\n'}</Text>
            <View>
              {renderDate(20030507)}
              {renderDate(19420125)}
            </View>
          </View>
        )}
      />
    </Portal>
  );

  const renderButtons = () => {
    <AnalyzeButtons />;
  };

  return (
    <View style={{ flex: 1 }}>
      {renderButtons()}
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
