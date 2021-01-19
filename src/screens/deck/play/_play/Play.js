import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import DeckSwiper from 'react-native-deck-swiper';

import { Button } from 'react-native-paper';
import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';

import PlayCard from './PlayCard';
import PlayCounter from './PlayCounter';
import PlayButtons from './PlayButtons';
import { getDeckContent } from '../../../../config/deck/Deck';
import Icon from '../../../../components/Icon';

// import { DeckGeneral, DeckContent } from '../../../../../dev/TestData';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  checker: {
    textAlign: 'center',
    fontSize: 30,
    // backgroundColor: 'red',
  },
  watchCards: {
    textAlign: 'right',
    fontSize: 30,
  },
  labelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const returnValidVocabIDs = (content, validVocabIDsParam, sortMode) => {
  const validVocabIDs = (validVocabIDsParam === undefined) ? Object.keys(content) : validVocabIDsParam;
  console.log({ validVocabIDs });
  return validVocabIDs;
};
const returnValidVocab = (content, validVocabIDs) => {
  const result = [];
  console.log({ content, validVocabIDs });
  for (let i = 0; i < validVocabIDs.length; i++) {
    result.push(content[validVocabIDs[i]]);
  }
  return result;
};
// const returnValidVocab = (content, validVocabIDsProp, sortMode) => {
//   const validVocabIDs = (validVocabIDsProp === undefined) ? Object.keys(content) : validVocabIDsProp;
//   let validVocabIDs_sorted = [];
//   switch (sortMode) {
//     case 'index':
//       validVocabIDs_sorted = validVocabIDs;
//       break;
//     case 'index-reverse':
//       validVocabIDs_sorted = validVocabIDs.reverse();
//       break;
//     case 'shuffle':
//       validVocabIDs_sorted = func.shuffle(validVocabIDs);
//       break;
//     default:
//       validVocabIDs_sorted = validVocabIDs;
//       break;
//   }
//   const validVocab = [];
//   for (let i = 0; i < validVocabIDs_sorted.length; i++) {
//     validVocab.push(content[validVocabIDs_sorted[i]]);
//   }
//   console.log({ sortMode, validVocabIDs, validVocab });
//   return [validVocabIDs_sorted, validVocab];
// };
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
        deckID, validVocabIDs: validVocabIDsProp, sortMode, itemVisible,
      },
    },
  } = props;
  // recoil
  // state
  const content = getDeckContent(deckID);
  // const [validVocabIDs, validVocab] = returnValidVocab(content, validVocabIDsProp, sortMode);
  // const sortMode = (sortModeProp === undefined) ? 'index' : sortModeProp;
  // const validVocabIDs = returnValidVocabIDs(content, validVocabIDsProp);
  // const validVocab = returnValidVocab(content, validVocabIDs, sortMode);
  const [validVocabIDs, setValidVocabIDs] = useState([]);
  const [validVocab, setValidVocab] = useState([]);
  const [vocabReady, setVocabReady] = useState(false);
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  const [rightVocabID, setRightVocabID] = useState([]);
  const [leftVocabID, setLeftVocabID] = useState([]);
  const finished = (validVocabIDs.length === rightVocabID.length + leftVocabID.length);
  // ref
  const [card, setCard] = useState({}); // 例外的にstateに
  let swiper = {};

  useEffect(() => {
    const newValidVocabIDs = returnValidVocabIDs(content, validVocabIDsProp, sortMode);
    setValidVocabIDs(newValidVocabIDs);
    setValidVocab(returnValidVocab(content, newValidVocabIDs));
    setVocabReady(true);
  }, []);

  const renderCounterTop = () => (
    <Text style={style.checker}>
      {finished ? leftVocabID.length + rightVocabID.length : leftVocabID.length + rightVocabID.length + 1}
      /
      {validVocabIDs.length}
    </Text>
  );

  const renderSwiper = () => {
    if (!(layout.height === 0) && vocabReady) {
      return (
        <DeckSwiper
          cards={validVocab}
          renderCard={(vocab) => (<PlayCard vocab={vocab} ref={(ref) => { setCard(ref); }} itemVisible={itemVisible} />)}
          onSwipedRight={(index) => setRightVocabID([...rightVocabID, validVocabIDs[index]])}
          onSwipedLeft={(index) => setLeftVocabID([...leftVocabID, validVocabIDs[index]])}
          disableTopSwipe
          disableBottomSwipe
          horizontalThreshold={layout.width / 8}
          cardIndex={0}
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

  const renderFinishButton = () => {
    const goToResult = () => {
      console.log({ rightVocabID, leftVocabID });
      navigation.push('results', {
        deckID, rightVocabID, leftVocabID, validVocabIDs, vocabIDs: Object.keys(content), itemVisible,
      });
    };
    if (finished) {
      return (
        <View style={[StyleSheet.absoluteFill, { right: 20, left: 20, justifyContent: 'center' }]}>
          <Button color={Color.green3} mode="contained" onPress={goToResult}>
            Show Results
          </Button>
        </View>
      );
    }
    return null;
  };

  const renderButtons = () => {
    const swipeBack = async () => {
      const previousCardIndex = rightVocabID.length + leftVocabID.length - 1;
      await swiper.jumpToCardIndex(previousCardIndex);
      setRightVocabID(rightVocabID.filter((vocabID) => vocabID !== validVocabIDs[previousCardIndex]));
      setLeftVocabID(leftVocabID.filter((vocabID) => vocabID !== validVocabIDs[previousCardIndex]));
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

  const renderViewCardButton = () => (
    <TouchableOpacity>
      <Icon.MaterialCommunityIcons
        name="cards-outline"
        style={style.watchCards}
        onPress={() => console.log('HI')}
      />
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      <View style={style.labelContainer}>
        {renderCounterTop()}
        {renderViewCardButton()}
      </View>
      <View
        style={{ flex: 1 }}
        onLayout={(e) => setLayout(func.onLayoutContainer(e))}
      >
        {/* {renderChecker()} */}
        {renderSwiper()}
        {renderFinishButton()}
      </View>
      <PlayCounter leftVocabID={leftVocabID} rightVocabID={rightVocabID} />
      {renderButtons()}
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
