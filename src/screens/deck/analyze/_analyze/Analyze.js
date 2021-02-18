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
    // borderWidth: 1,
    paddingHorizontal: '8%',
    paddingVertical: 20,
    marginHorizontal: '5%',
    marginVertical: '15%',
    backgroundColor: Color.white1,
    borderRadius: 10,
    flex: 1,
    // flex: 1,
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
    marginHorizontal: 25,
    backgroundColor: Color.green2,
    fontSize: iconSize * 0.66,
    borderRadius: 7,
  },
  popupmenu: {
    marginHorizontal: '20%',
  },
});

const Analyze = (props) => {
  const { navigation, route: { params: { deckID } } } = props;

  const { marks, play /* ここ 具体的な構造は、TestData若しくは、Accountの下のコメントを参照 */ } = getAccountContent(deckID);
  const content = getDeckContent(deckID);
  // state
  const [contentSorted, setContentSorted] = useState(content);
  const [detailVisibleID, setDetailVisibleID] = useState('');
  // const [detailVisible, setDetailVisible] = useState(false);
  const [graphVisible, setGraphVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [ascendOrDescend, setAscendOrDescend] = useState(true); // if true ascend; otherwise descend
  const [mode, setMode] = useState('noDate');
  const [termLabel, setTermLabel] = useState('Term ↓');
  const [marksLabel, setMarksLabel] = useState('');
  const [index, setIndex] = useState(0);
  // const [vocabButtonS, setvocabButtonS] = useRecoilState(vocabButtonState);

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

  const renderVocabDetail = () => {
    let dateList = [];
    let iconName = '';
    if (ascendOrDescend === true) {
      dateList = play.sort((a, b) => a - b);
      iconName = 'chevron-up';
    } else {
      dateList = play.sort((a, b) => b - a);
      iconName = 'chevron-down';
    }

    const returnNextOrPrevID = (nextOrPrev) => {
      const indexList = Object.keys(contentSorted);
      setIndex(indexList.indexOf(detailVisibleID));
      if (nextOrPrev === true) {
        setIndex(index + 1);
        if (index > indexList.length) {
          setIndex();
        }
      } else if (nextOrPrev === false) {
        setIndex(index - 1);
      }
      return (indexList[index]);
    };
    // { /* Object.keys(contentSorted) のなかに 今の detailVisibleID がどのindexに入ってるかを検索する？で、index+1番目のdetailVisibleIDをセットしなおす */ }

    return (
      <Portal>
        <PopUpMenu
          style={style.popupmenu}
          isVisible={!(detailVisibleID === '')}
          setVisible={() => setDetailVisibleID('')}
          renderMenu={() => (
            <View style={style.detailcontainer}>
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon.Feather name="x" size={iconSize} />
                    <Text style={[style.detailtext]}>
                      history
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ marginHorizontal: 10, padding: iconSize / 2 }}
                    onPress={() => setAscendOrDescend(!ascendOrDescend)}
                  >
                    <Icon.Entypo name={iconName} size={iconSize} />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: Color.white2, borderRadius: iconSize / 3 }}>
                  {marks[detailVisibleID]?.map((time) => <Text style={style.detaildate}>{func.formatDate(dateList[time])}</Text>)}
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    setDetailVisibleID(index + 1);
                    setIndex(index + 1);
                  }}
                  style={style.detailbutton}
                >
                  <Text style={{ color: Color.white1 }}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDetailVisibleID(index - 1);
                    setIndex(index - 1);
                  }}
                  style={style.detailbutton}
                >
                  <Text style={{ color: Color.white1 }}>NEXT</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => setDetailVisibleID(returnNextOrPrevID(false))} style={style.detailbutton}><Text style={{ color: Color.white1 }}>BACK</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setDetailVisibleID(returnNextOrPrevID(true))} style={style.detailbutton}><Text style={{ color: Color.white1 }}>NEXT</Text></TouchableOpacity> */}
              </View>
              {/* Object.keys(contentSorted) のなかに 今の detailVisibleID がどのindexに入ってるかを検索する？で、index+1番目のdetailVisibleIDをセットしなおす */}
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
