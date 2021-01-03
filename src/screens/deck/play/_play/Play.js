import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  // TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import DeckSwiper from 'react-native-deck-swiper';

import { Button } from 'react-native-paper';
import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';

import PlayCard from './PlayCard';
import PlayCounter from './PlayCounter';
import PlayButtons from './PlayButtons';
import { decksContent } from '../../../../config/deck/Deck';

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
  const { navigation, route: { params: { deckID, validVocabIDs: validVocabIDsProp } } } = props;
  // recoil
  // state
  const content = decksContent[deckID];
  const validVocabIDs = returnValidVocabIDs(content, validVocabIDsProp);
  const validVocab = returnValidVocab(content, validVocabIDs);
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  const [rightVocabID, setRightVocabID] = useState([]);
  const [leftVocabID, setLeftVocabID] = useState([]);
  const finished = (validVocabIDs.length === rightVocabID.length + leftVocabID.length);
  // ref
  const [card, setCard] = useState({}); // 例外的にstateに
  let swiper = {};

  const renderCounterTop = () => (
    <Text style={style.checker}>
      {leftVocabID.length + rightVocabID.length + 1}
      /
      {validVocabIDs.length}
    </Text>
  );

  const renderSwiper = () => {
    if (!(layout.height === 0)) {
      return (
        <DeckSwiper
          cards={validVocab}
          renderCard={(vocab) => (<PlayCard vocab={vocab} ref={(ref) => { setCard(ref); }} />)}
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
        deckID, rightVocabID, leftVocabID, validVocabIDs, vocabIDs: Object.keys(content),
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

  const renderCounter = () => (
    <PlayCounter leftVocabID={leftVocabID} rightVocabID={rightVocabID} />
  );

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

  return (
    <View style={style.container}>
      {renderCounterTop()}
      <View
        style={{ flex: 1 }}
        onLayout={(e) => setLayout(func.onLayoutContainer(e))}
      >
        {/* {renderChecker()} */}
        {renderSwiper()}
        {renderFinishButton()}
      </View>
      {renderCounter()}
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

/*
class Swiper extends Component {
  constructor(props) {
    super(props);
    this.swiper = {};
    this.card = {};
    this.state = {
      layout: { height: 0, width: 0 },
      deckG: { thumbnail: { uri: '' } },
      // 黄色い線の左側
      deckC: [],
      // 黄色い線上
      invalidIndex: [],
      validIndex: [],
      // 黄色い線の右側
      deckC_cvt: [],
      rightIndex_cvt: [],
      leftIndex_cvt: [],
      allIndex: [],
    };
  }

  componentDidMount() {
    // deckのgeneral情報とcontent情報をfetch
    const [deckG, deckC] = [DeckGeneral[0], DeckContent[1]];
    this.setState({ deckG, deckC });

    // 再生するindexを取得
    const { navigation } = this.props;
    let validIndex = navigation.getParam('validIndexes');
    if (validIndex === undefined) {
      validIndex = [...Array(deckC.length)].map((v, i) => i);
    }
    this.setState({ validIndex });

    // deckCをvalidIndexesを法則として変換
    const deckC_cvt = [];
    for (let i = 0; i < validIndex.length; i++) {
      deckC_cvt.push(deckC[validIndex[i]]);
    }
    this.setState({ deckC_cvt });

    // invalid（すでに正解したもの）を作成
    const { invalid } = this.state;
    const allIndex = [...Array(deckC.length)].map((v, i) => i);
    const invalidIndex = allIndex.filter((i) => validIndex.indexOf(i) === -1);
    this.setState({ invalidIndex });
  }

  onSwipedRight = (index) => {
    const { rightIndex_cvt } = this.state;
    rightIndex_cvt.push(index);
    this.setState({ rightIndex_cvt });
  };

  onSwipedLeft = (index) => {
    const { leftIndex_cvt } = this.state;
    leftIndex_cvt.push(index);
    this.setState({ leftIndex_cvt });
  };

  swipeBack = () => {
    this.swiper.swipeBack(this.swiper.previousCardIndex);
    const { rightIndex_cvt, leftIndex_cvt } = this.state;
    const rightNew = rightIndex_cvt.filter(
      (hello) => hello !== rightIndex_cvt.length + leftIndex_cvt.length - 1,
    );
    const leftNew = leftIndex_cvt.filter(
      (goodbye) => goodbye !== rightIndex_cvtlength + leftIndex_cvt.length - 1,
    );
    this.setState({ rightIndex_cvt: rightNew, leftIndex_cvt: leftNew });
  };

  renderHeader = () => {
    const { deckG: { title } } = this.state;
    const { navigation } = this.props;
    return (
      <HeaderWithBack
        navigation={navigation}
        title={title}
      />
    );
  }

  renderSwiper = () => {
    const { layout: { height, width }, deckC_cvt } = this.state;
    if (!(height === 0)) {
      return (
        <DeckSwiper
          cards={deckC_cvt}
          renderCard={(content, index) => (
            <PlayCard
              content={content}
              ref={(ref) => { this.card = ref; }}
            />
          )}
          onSwipedRight={this.onSwipedRight}
          onSwipedLeft={this.onSwipedLeft}
          disableTopSwipe
          disableBottomSwipe
          horizontalThreshold={width / 8}
          cardIndex={0}
          backgroundColor="transparent"
          ref={(ref) => { this.swiper = ref; }}
          stackSize={1}
          cardVerticalMargin={20}
          useViewOverflow={false}
          cardStyle={{ height: height - 40 }}
        />
      );
    }
    return null;
  };

  renderFinishButton = () => {
    const {
      deckC_cvt, rightIndex_cvt, leftIndex_cvt, invalidIndex, validIndex, deckG: { thumbnail: { uri } },
    } = this.state;
    const { navigation } = this.props;
    const rightIndex = rightIndex_cvt.map((index) => validIndex[index]);
    const leftIndex = leftIndex_cvt.map((index) => validIndex[index]);
    const finish = (deckC_cvt.length === rightIndex_cvt.length + leftIndex_cvt.length);
    if (finish) {
      return (
        <View style={[StyleSheet.absoluteFill, { right: 20, left: 20, justifyContent: 'center' }]}>
          <Button
            color={Color.green3}
            mode="contained"
            onPress={() => navigation.push('results', {
              rightIndex, leftIndex, invalidIndex, uri,
            })}
          >
            Show Results
          </Button>
        </View>
      );
    }
    return null;
  };

  renderCounter = () => {
    const { leftIndex_cvt, rightIndex_cvt } = this.state;
    return (
      <PlayCounter swipedLeft={leftIndex_cvt} swipedRight={rightIndex_cvt} />
    );
  };

  renderButtons = () => {
    const { deckC_cvt, leftIndex_cvt, rightIndex_cvt } = this.state;
    return (
      <PlayButtons
        flip={() => this.card.flip()}
        finished={deckC_cvt.length === leftIndex_cvt.length + rightIndex_cvt.length}
        swipeLeft={() => this.swiper.swipeLeft()}
        swipeRight={() => this.swiper.swipeRight()}
        swipeBack={() => this.swipeBack()}
      />
    );
  };

  render() {
    return (
      <View style={style.container}>
        {this.renderHeader()}
        <View style={{ flex: 1 }}>
          <View
            style={style.container}
            onLayout={(e) => this.setState({ layout: func.onLayoutContainer(e) })}
          >
            {this.renderSwiper()}
            {this.renderFinishButton()}
          </View>
          {this.renderCounter()}
          {this.renderButtons()}
          <Button onPress={() => console.log(this.state)} />
        </View>
      </View>
    );
  }
}
*/
