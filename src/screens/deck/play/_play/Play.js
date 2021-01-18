import React, { useState } from 'react';
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

const returnValidVocabIDs = (content, validVocabIDs) => {
  let validVocabIDsModified = [];
  if (validVocabIDs === undefined) {
    validVocabIDsModified = Object.keys(content);
  } else {
    validVocabIDsModified = validVocabIDs;
  }
  return validVocabIDsModified;
};
const returnValidVocab = (content, validVocabIDs, sortMode) => {
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
        deckID, validVocabIDs: validVocabIDsProp, sortMode: sortModeProp, itemVisible,
      },
    },
  } = props;
  // recoil
  // state
  const content = getDeckContent(deckID);
  const validVocabIDs = returnValidVocabIDs(content, validVocabIDsProp);
  const sortMode = (sortModeProp === undefined) ? 'shuffle' : sortModeProp;
  const validVocab = returnValidVocab(content, validVocabIDs, sortMode);
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  const [rightVocabID, setRightVocabID] = useState([]);
  const [leftVocabID, setLeftVocabID] = useState([]);
  const finished = (validVocabIDs.length === rightVocabID.length + leftVocabID.length);
  // ref
  const [card, setCard] = useState({}); // 例外的にstateに
  let swiper = {};

  const renderCounterTop = () => (
    <Text style={style.checker}>
      {finished ? leftVocabID.length + rightVocabID.length : leftVocabID.length + rightVocabID.length + 1}
      /
      {validVocabIDs.length}
    </Text>
  );

  const renderSwiper = () => {
    if (!(layout.height === 0)) {
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
