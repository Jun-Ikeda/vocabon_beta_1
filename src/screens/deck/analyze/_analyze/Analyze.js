import React, { useState, useEffect } from 'react';
import {
  LayoutAnimation,
  StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import { Button, Portal } from 'react-native-paper';
import { account, getAccountContent, getAccountGeneral } from '../../../../config/account/Account';
import { decksContent, getDeckContent, getDeckGeneral } from '../../../../config/deck/Deck';
import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';
import { storage } from '../../../../config/firebase/Firebase';

import AnalyzeList from './AnalyzeList';
import AnalyzeButtons from './AnalyzeButtons';
import AnalyzeGraph from './AnalyzeGraph';
import AnalyzeDetailPopUp from './AnalyzeDetailPopUp';

const unPressedColor = Color.defaultBackground;
const pressedColor = Color.white3;

const style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  labelContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  eachLabelContainer: {
    marginLeft: 10,
    padding: 3,
    borderRadius: 5,
  },
  label: {
    fontSize: 20,
  },
});

const Analyze = (props) => {
  const { navigation, route: { params: { deckID } } } = props;

  const { marks, play } = getAccountContent(deckID);
  const accountGeneral = getAccountGeneral();
  let content = getDeckContent(deckID);
  const general = getDeckGeneral(deckID);
  const [contentSorted, setContentSorted] = useState(content);
  const [detailVisibleID, setDetailVisibleID] = useState('');
  const [graphVisible, setGraphVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [ascendOrDescend, setAscendOrDescend] = useState(true); // if true ascend; otherwise descend
  const [mode, setMode] = useState('noDate');
  const [indexLabel, setIndexLabel] = useState(pressedColor);
  const [termLabel, setTermLabel] = useState(unPressedColor);
  const [marksLabel, setMarksLabel] = useState(unPressedColor);
  const [index, setIndex] = useState(0);
  const [deckContentLoaded, setDeckContentLoaded] = useState(false);

  // load deck content
  useEffect(() => {
    if (general?.user === accountGeneral.userID/* my deck */ || Object.keys(content).length !== 0/* other's deck previously loaded */) {
      setDeckContentLoaded(true);
    } else {
      (async () => {
        await storage.ref('deck').child(deckID).getDownloadURL().then((url) => fetch(url)
          .then(async (response) => response.json())
          .then(async (result) => {
            // apply to recoil/global
            decksContent[deckID] = result;
            content = result;
          }));
        setDeckContentLoaded(true);
      })();
    }
  }, []);

  const renderVocab = () => (
    <AnalyzeList
      marks={marks}
      content={content}
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

  const renderDetailPopUp = () => (
    <AnalyzeDetailPopUp
      play={play}
      marks={marks}
      detailVisibleID={detailVisibleID}
      setDetailVisibleID={setDetailVisibleID}
      index={index}
      setIndex={setIndex}
      ascendOrDescend={ascendOrDescend}
      setAscendOrDescend={setAscendOrDescend}
      content={content}
      contentSorted={contentSorted}
    />
  );

  const renderLabels = () => {
    const labels = [
      {
        label: indexLabel,
        style: { backgroundColor: indexLabel },
        element: <Icon.MaterialCommunityIcons name="order-numeric-ascending" style={style.label} />,
        onPress: () => {
          const newContentSorted = JSON.parse(JSON.stringify(content)); /* func.convertArrayToObject(func.convertObjectToArray(contentSorted).sort((a, b) => {
            const nameA = a.value.term.toString().toLowerCase(); // 大文字と小文字を無視する
            const nameB = b.value.term.toString().toLowerCase(); // 大文字と小文字を無視する
            return (nameA === nameB) ? 0 : (nameA > nameB ? 1 : -1);
          })); */
          setContentSorted(newContentSorted);
          setIndexLabel(pressedColor);
          setTermLabel(unPressedColor);
          setMarksLabel(unPressedColor);
          console.log(typeof (termLabel));
        },
      },
      {
        label: termLabel,
        style: { backgroundColor: termLabel },
        element: <Icon.MaterialCommunityIcons name="order-alphabetical-ascending" style={style.label} />,
        onPress: () => {
          const newContentSorted = func.convertArrayToObject(func.convertObjectToArray(contentSorted).sort((a, b) => {
            const nameA = a.value.term.toString().toLowerCase(); // 大文字と小文字を無視する
            const nameB = b.value.term.toString().toLowerCase(); // 大文字と小文字を無視する
            return (nameA === nameB) ? 0 : (nameA > nameB ? 1 : -1);
          }));
          setContentSorted(newContentSorted);
          setIndexLabel(unPressedColor);
          setTermLabel(pressedColor);
          setMarksLabel(unPressedColor);
          console.log(typeof (termLabel));
        },
      },
      {
        label: marksLabel,
        style: { backgroundColor: marksLabel },
        element: <Icon.AntDesign name="close" style={[style.label, { color: Color.cud.red }]} />,
        onPress: () => {
          const newContentSorted = func.convertArrayToObject(func.convertObjectToArray(contentSorted).sort((a, b) => {
            const markA = marks?.[a.key]?.length ?? 0; // 大文字と小文字を無視する
            const markB = marks?.[b.key]?.length ?? 0; // 大文字と小文字を無視する
            return (markA === markB) ? 0 : (markA < markB ? 1 : -1);
          }));
          setContentSorted(newContentSorted);
          setIndexLabel(unPressedColor);
          setTermLabel(unPressedColor);
          setMarksLabel(pressedColor);
        },
      },
    ];
    return (
      <View style={style.labelContainer}>
        {labels.map((label) => (
          <TouchableOpacity style={[style.eachLabelContainer, label?.style]} onPress={label.onPress}>
            {/* <Text style={style.label}>{label.label}</Text> */}
            {label?.element ?? null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return deckContentLoaded ? (
    <View style={{ flex: 1, backgroundColor: Color.defaultBackground }}>
      {/* <ScrollView>
        <Button onPress={async () => {
          const content = await getAccountContent(deckID)
          func.alertConsole(account, 'Account Content')
        }} title="account content" />
        <Text>
          {JSON.stringify(marks, null, 2)}
          a
          {JSON.stringify(play, null, 2)}
        </Text>
      </ScrollView> */}
      {renderButtons()}
      {renderLabels()}
      {renderGraphPopup()}
      {renderVocab()}
      {renderDetailPopUp()}
    </View>
  ) : <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator animating /></View>;
};

Analyze.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Analyze.defaultProps = {};

export default Analyze;
