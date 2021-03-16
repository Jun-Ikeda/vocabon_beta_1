import React, { useState, useEffect } from 'react';
import {
  LayoutAnimation,
  StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import { Button, Portal } from 'react-native-paper';
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
    marginLeft: 20,
  },
  text: {
    fontSize: iconSize,
  },
  detailcontainer: {
    paddingHorizontal: '8%',
    paddingVertical: 20,
    marginHorizontal: '5%',
    marginVertical: '15%',
    backgroundColor: Color.white1,
    borderRadius: 10,
    flex: 1,
  },
  detailtext: {
    fontSize: iconSize * 0.66,
    padding: iconSize * 0.176,
  },
  detaildate: {
    fontSize: iconSize * 0.66,
    paddingVertical: iconSize * 0.176,
    paddingHorizontal: 20,
  },
  detailbutton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    backgroundColor: Color.green2,
    fontSize: iconSize * 0.66,
    borderRadius: 7,
  },
  popupmenu: {
    marginHorizontal: '20%',
  },
  cancelButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray3,
  },
  cancelButtonIcon: {
    fontSize: 24,
    color: Color.gray1,
  },
});

const Analyze = (props) => {
  const { navigation, route: { params: { deckID } } } = props;

  const { marks, play } = getAccountContent(deckID);
  const content = getDeckContent(deckID);
  const [contentSorted, setContentSorted] = useState(content);
  const [detailVisibleID, setDetailVisibleID] = useState('');
  const [graphVisible, setGraphVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [ascendOrDescend, setAscendOrDescend] = useState(true); // if true ascend; otherwise descend
  const [mode, setMode] = useState('noDate');
  const [termLabel, setTermLabel] = useState('Term ↓');
  const [marksLabel, setMarksLabel] = useState('');
  const [index, setIndex] = useState(0);

  const renderVocab = () => (
    <AnalyzeList
      marks={marks}
      contentSorted={contentSorted}
      vocabDetailVisible={detailVisibleID}
      setVocabDetailVisible={setDetailVisibleID}
      index={index}
      setIndex={setIndex}
    />
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
          const newContentSorted = func.convertArrayToObject(func.convertObjectToArray(contentSorted).sort((a, b) => {
            const nameA = a.value.term.toString().toLowerCase(); // 大文字と小文字を無視する
            const nameB = b.value.term.toString().toLowerCase(); // 大文字と小文字を無視する
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

  const renderVocabDetail = () => {
    let dateList = [];
    let iconName = '';
    if (ascendOrDescend === true) {
      dateList = play.sort((a, b) => a > b ? -1 : 1);
      iconName = 'chevron-up';
    } else {
      dateList = play.sort((a, b) => b > a ? -1  : 1);
      iconName = 'chevron-down';
    }

    const returnNextOrPrevID = (nextOrPrev) => {
      const indexList = Object.keys(contentSorted);
      setIndex(indexList.indexOf(detailVisibleID));
      let newIndex;
      if (nextOrPrev === true) {
        if (index >= indexList.length - 1) {
          newIndex = 0;
        } else {
          newIndex = index + 1;
        }
      } else if (nextOrPrev === false) {
        if (index <= 0) {
          newIndex = indexList.length - 1;
        } else {
          newIndex = index - 1;
        }
      }
      setIndex(newIndex);
      setDetailVisibleID(indexList[newIndex]);
      console.log(newIndex);
    };

    const renderCancelButton = () => (
      <TouchableOpacity style={style.cancelButton} onPress={() => setDetailVisibleID('')}>
        <Icon.Feather name="x" style={style.cancelButtonIcon} />
      </TouchableOpacity>
    );

    return (
      <Portal>
        <PopUpMenu
          style={style.popupmenu}
          isVisible={!(detailVisibleID === '')}
          setVisible={() => setDetailVisibleID('')}
          renderMenu={() => (
            <View style={style.detailcontainer}>
              {renderCancelButton()}
              <View style={{ flex: 1 }}>
                <Text style={style.detailtext}>{`Term: ${content[detailVisibleID]?.term}`}</Text>
                <Text style={style.detailtext}>{`Def: ${content[detailVisibleID]?.definition}`}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Icon.Feather name="x" size={iconSize} color={Color.cud.red} />
                  <Text style={[style.detailtext]}>
                    history
                  </Text>
                </View>
                <View style={{ backgroundColor: Color.white2, borderRadius: iconSize / 3 }}>
                  {marks[detailVisibleID]?.map((time) => <Text style={style.detaildate}>{func.formatDate(dateList[time])}</Text>)}
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  onPress={() => returnNextOrPrevID(false)}
                  style={style.detailbutton}
                >
                  <Text style={{ color: Color.white1 }}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.detailbutton}
                  onPress={() => setAscendOrDescend(!ascendOrDescend)}
                >
                  <Icon.Entypo name={iconName} size={iconSize * 0.66} color={Color.white1} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => returnNextOrPrevID(true)}
                  style={style.detailbutton}
                >
                  <Text style={{ color: Color.white1 }}>NEXT</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </Portal>
    );
  };

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

Analyze.defaultProps = {};

export default Analyze;
