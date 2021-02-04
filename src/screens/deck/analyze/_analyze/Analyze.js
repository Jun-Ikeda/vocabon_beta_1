import React, { useState, useEffect } from 'react';
import {
  LayoutAnimation,
  StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import { Portal } from 'react-native-paper';
import { getAccountContent } from '../../../../config/account/Account';
import { getDeckContent } from '../../../../config/deck/Deck';
import { func } from '../../../../config/Const';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

import AnalyzeList from './AnalyzeList';
import AnalyzeButtons from './AnalyzeButtons';
import AnalyzeGraph from './AnalyzeGraph';
import Icon from '../../../../components/Icon';

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
    borderWidth: 1,
    paddingLeft: '8%',
    paddingVertical: 20,
    marginHorizontal: '5%',
    marginVertical: '15%',
    backgroundColor: Color.white1,
    borderRadius: 10,
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
  // state
  const [contentSorted, setContentSorted] = useState(content);
  const [detailVisibleID, setDetailVisibleID] = useState('');
  const [detailVisible, setDetailVisible] = useState(false);
  const [graphVisible, setGraphVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [mode, setMode] = useState('noDate');
  const [termLabel, setTermLabel] = useState('Term ↓');
  const [marksLabel, setMarksLabel] = useState('');

  const renderVocab = () => (
    <AnalyzeList
      marks={marks}
      contentSorted={contentSorted}
      vocabDetailVisible={detailVisibleID}
      setVocabDetailVisible={setDetailVisibleID}
    />
  );

  const renderDate = (shortenedDate) => (
    <View style={{ flex: 1 }}>
      <Text style={style.detailtext}>
        {func.formatDate(shortenedDate, true)}
      </Text>
    </View>
  );

  const renderButtons = () => (
    <AnalyzeButtons
      play={play}
      isGraphVisible={graphVisible}
      setGraphVisible={setGraphVisible}
      isDateVisible={dateVisible}
      setDateVisible={setDateVisible}
      mode={mode}
      setMode={setMode}
    />
  );

  const renderGraphPopup = () => (
    <AnalyzeGraph
      play={play}
      marks={marks}
      isVisible={graphVisible}
      setVisible={setGraphVisible}
    />
  );

  const renderLabels = () => {
    const labels = [
      {
        label: termLabel,
        onPress: () => {
          // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const newContentSorted = func.convertArrayToObject(func.convertObjectToArray(contentSorted).sort((a, b) => {
            const nameA = a.value.term.toLowerCase(); // 大文字と小文字を無視する
            const nameB = b.value.term.toLowerCase(); // 大文字と小文字を無視する
            return (nameA === nameB) ? 0 : (nameA > nameB ? 1 : -1);
          }));
          setContentSorted(newContentSorted);
          setTermLabel('Term ↓');
          setMarksLabel('');
          console.log(typeof (termLabel));
        },
      },
      {
        label: marksLabel,
        element: <Icon.AntDesign name="close" style={[style.label, { color: Color.cud.red }]} />,
        onPress: () => {
          // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const newContentSorted = func.convertArrayToObject(func.convertObjectToArray(contentSorted).sort((a, b) => {
            const markA = marks?.[a.key]?.length ?? 0; // 大文字と小文字を無視する
            const markB = marks?.[b.key]?.length ?? 0; // 大文字と小文字を無視する
            return (markA === markB) ? 0 : (markA < markB ? 1 : -1);
          }));
          setContentSorted(newContentSorted);
          setTermLabel('Term');
          setMarksLabel('↓');
        },
      },
    ];
    return (
      <View style={style.labelContainer}>
        {labels.map((label) => (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={label.onPress} key={label.label.toLowerCase()}>
            <Text style={style.label}>{label.label}</Text>
            {label?.element ?? null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderVocabDetail = () => (
    <Portal>
      <PopUpMenu
        isVisible={detailVisible}
        setVisible={setDetailVisible}
        renderMenu={() => (
          <View style={style.detailcontainer}>
            <Text style={style.detailtext}>{content[detailVisibleID]?.term}</Text>
            <Text style={style.detailtext}>{content[detailVisibleID]?.definition}</Text>
            <Text style={style.detailtext}>{'\nHistory:\n'}</Text>
            <View>
              {renderDate(20030507)}
              {renderDate(18911101)}
            </View>
          </View>
        )}
      />
    </Portal>
  );

  return (
    <View style={{ flex: 1 }}>
      {renderButtons()}
      {renderLabels()}
      {renderGraphPopup()}
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
