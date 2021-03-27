import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import DeckSwiper from 'react-native-deck-swiper';

import { CommonActions } from '@react-navigation/native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';
import {
  decksGeneral, getDeckContent, getDeckGeneral, saveDeckContent,
} from '../../../../config/deck/Deck';
import { getAccountContent, getAccountGeneral, saveAccountContent } from '../../../../config/account/Account';

import Icon from '../../../../components/Icon';

import PlayCard from './PlayCard';
import PlayCounter from './PlayCounter';
import PlayButtons from './PlayButtons';
import PlayDetail, { onEditVocabIDState } from './PlayDetail';
import PlayEdit from './PlayEdit';
import VocabEdit from '../../../../components/deck/vocab/VocabEdit';
import { playhistory } from '../../../../config/PersistentData';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  checker: {
    textAlign: 'center',
    fontSize: 30,
  },
  alert: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'red',
  },
  headerIcon: {
    textAlign: 'right',
    fontSize: 30,
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: Color.gray1,
  },
  labelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const returnValidVocab = (content, validVocabIDs) => {
  const result = [];
  for (let i = 0; i < validVocabIDs.length; i++) {
    result.push(content[validVocabIDs[i]]);
  }
  return result;
};
/**
 * Play Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('play', { deckID, validVocabIDs });
 * props: { navigation, route }
 * ```
 */
const Play = (props) => {
  // props
  const {
    navigation, route: {
      params: {
        deckID,
        validVocabIDs: validVocabIDsProp,
        sortMode,
        itemVisible,
        leftVocabID: leftVocabIDProps,
        rightVocabID: rightVocabIDProps,
      },
    },
  } = props;
  // recoil
  const [onEditVocabID, setOnEditVocabID] = useRecoilState(onEditVocabIDState);
  const deckGeneral = useRecoilValue(decksGeneral);
  const general = getDeckGeneral(deckGeneral, deckID);
  // state
  const [content, setContent] = useState(getDeckContent(deckID));
  const { marks, play } = getAccountContent(deckID);
  const accountGeneral = getAccountGeneral();

  const validVocabIDs = validVocabIDsProp;
  const validVocab = returnValidVocab(content, validVocabIDsProp);

  const [rightVocabID, setRightVocabID] = useState(rightVocabIDProps ?? []);
  const [leftVocabID, setLeftVocabID] = useState(leftVocabIDProps ?? []);
  const finished = (validVocabIDs.length === rightVocabID.length + leftVocabID.length);

  const [detailVisible, setDetailVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  // const setOnEditVocabID = useSetRecoilState(onEditVocabIDState);
  const [layout, setLayout] = useState({ height: 0, width: 0 });

  const [card, setCard] = useState({}); // 例外的にstateに
  let swiper = {};

  const [hasUnsavedHistory, setHasUnsavedHistory] = useState(false);
  const [isEditChanged, setIsEditChanged] = useState(false);

  // const [deckContentLoaded, setDeckContentLoaded] = useState(false);

  // suspend
  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    const suspend = async () => {
      playhistory.save(deckID, validVocabIDs, sortMode, itemVisible, leftVocabID, rightVocabID);
    };
    if (isEditChanged) saveDeckContent(deckID, content);
    if (!(Platform.OS === 'web') && hasUnsavedHistory) {
      e.preventDefault();
      Alert.alert(
        'Discard play history?',
        'You have unsaved history. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Suspend',
            style: 'default',
            onPress: async () => {
              await suspend();
              if (isEditChanged) await saveDeckContent(deckID, content);
              navigation.dispatch(e.data.action);
            },
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: async () => {
              if (isEditChanged) await saveDeckContent(deckID, content);
              navigation.dispatch(e.data.action);
            },
          },
        ],
      );
    }
  }),
  [navigation, hasUnsavedHistory, leftVocabID, rightVocabID, isEditChanged, content]);

  const goToResults = async () => {
    const newMark = JSON.parse(JSON.stringify(marks));
    leftVocabID.forEach((vocabID) => {
      const vocabMarks = newMark?.[vocabID] ?? [];
      vocabMarks.push(play.length);
      newMark[vocabID] = vocabMarks;
    });
    const newPlay = play ? play.slice() : [];
    newPlay.push(func.getDate());
    if (hasUnsavedHistory) {
      saveAccountContent(deckID, { marks: newMark, play: newPlay }, true);
    }
    if (isEditChanged) saveDeckContent(deckID, content);
    await playhistory.remove(deckID);
    setHasUnsavedHistory(false);
    navigation.dispatch((state) => {
      const params = {
        deckID, rightVocabID, leftVocabID, validVocabIDs, itemVisible, sortMode,
      };
      const routes = [
        ...state.routes.filter((route) => route.name !== 'results'),
        { name: 'results', params },
      ];
      return CommonActions.reset({ ...state, routes, index: routes.length - 1 });
    });
  };

  const renderCounterTop = () => {
    const currentLength = leftVocabID.length + rightVocabID.length;
    return (
      <Text style={style.checker}>
        {`${finished ? currentLength : currentLength + 1}/${validVocabIDs.length}`}
      </Text>
    );
  };

  const renderSwiper = () => {
    if (!(layout.height === 0)) {
      return (
        <DeckSwiper
          cards={validVocab}
          cardIndex={rightVocabID.length + leftVocabID.length}
          renderCard={(vocab) => (<PlayCard vocab={vocab} ref={(ref) => { setCard(ref); }} itemVisible={itemVisible} language={general?.language} />)}
          onSwipedRight={(index) => {
            setHasUnsavedHistory(true);
            setRightVocabID([...rightVocabID, validVocabIDs[index]]);
          }}
          onSwipedLeft={(index) => {
            setHasUnsavedHistory(true);
            setLeftVocabID([...leftVocabID, validVocabIDs[index]]);
          }}
          disableTopSwipe
          disableBottomSwipe
          horizontalThreshold={layout.width / 16}
          backgroundColor="transparent"
          ref={(ref) => { swiper = ref; }}
          stackSize={1}
          cardVerticalMargin={20}
          useViewOverflow={false}
          cardStyle={{ height: layout.height - 40 }}
          swipeBackCard
        />
      );
    }
    return null;
  };

  const renderFinishButton = () => (finished ? (
    <View style={[StyleSheet.absoluteFill, { right: 20, left: 20, justifyContent: 'center' }]}>
      <Button
        color={Color.green3}
        mode="contained"
        onPress={() => goToResults()}
      >
        Show Results
      </Button>
    </View>
  ) : null);

  const renderBottomButtons = () => {
    const swipeBack = async () => {
      const previousCardIndex = rightVocabID.length + leftVocabID.length - 1;
      await swiper.jumpToCardIndex(previousCardIndex);
      setRightVocabID(rightVocabID.filter((vocabID) => vocabID !== validVocabIDs[previousCardIndex]));
      setLeftVocabID(leftVocabID.filter((vocabID) => vocabID !== validVocabIDs[previousCardIndex]));
      setHasUnsavedHistory(true);
    };
    return (
      <PlayButtons
        finished={finished}
        flip={() => card.flip()}
        swipeLeft={() => swiper.swipeLeft()}
        swipeRight={() => swiper.swipeRight()}
        swipeBack={() => swipeBack()}
      />
    );
  };

  const renderTopButton = () => {
    const uri = finished ? '' : `https://www.google.com/search?q=${validVocab[leftVocabID.length + rightVocabID.length].term}`;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon.Feather
          name="edit"
          style={[style.headerIcon, { fontSize: 24 }]}
          onPress={async () => {
            await setOnEditVocabID(validVocabIDs[rightVocabID.length + leftVocabID.length]);
            setEditVisible(true);
          }}
        />
        <Icon.AntDesign name="google" style={style.headerIcon} onPress={() => Linking.openURL(uri)} />
        <Icon.MaterialCommunityIcons name="cards-outline" style={style.headerIcon} onPress={() => setDetailVisible(true)} />
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.labelContainer}>
        {renderCounterTop()}
        {renderTopButton()}
      </View>
      <View
        style={{ flex: 1 }}
        onLayout={(e) => setLayout(func.onLayoutContainer(e))}
      >
        {renderSwiper()}
        {renderFinishButton()}
      </View>
      {/* <Button onPress={() => func.alertConsole({ leftVocabID, rightVocabID })}>state</Button> */}
      <PlayCounter leftVocabID={leftVocabID} rightVocabID={rightVocabID} />
      {renderBottomButtons()}
      <PlayDetail
        modalVisible={detailVisible}
        setModalVisible={setDetailVisible}
        setEditVisible={setEditVisible}
        validVocabIDs={validVocabIDs}
        content={content}
        leftVocabID={leftVocabID}
        rightVocabID={rightVocabID}
      />
      <VocabEdit
        content={content}
        setContent={(newContent) => {
          Alert.alert('Caution', 'The change may not be applied until you finish this deck');
          setContent(newContent);
        }}
        vocabID={onEditVocabID}
        isVisible={editVisible}
        setVisible={setEditVisible}
        setEditVocabID={setOnEditVocabID}
        setIsChanged={setIsEditChanged}
      />
    </View>
  );
};

Play.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Play.defaultProps = {
};

export default Play;
