import React, { Component, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  // TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import DeckSwiper from 'react-native-deck-swiper';

import { Button } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';
import { decksState } from '../../../../nav/main/MainNav';

// import HeaderWithBack from '../../../../components/header/HeaderWithBack';

import PlayCard from './PlayCard';
import PlayCounter from './PlayCounter';
import PlayButtons from './PlayButtons';

// import { DeckGeneral, DeckContent } from '../../../../../dev/TestData';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
  },
  checker: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
    // backgroundColor: 'red',
  },
});

const modifyValidIndex = (validIndex, content) => {
  let result = [];
  if (validIndex === undefined) {
    result = [...Array(content.length)].map((v, i) => i);
  } else {
    result = validIndex;
  }
  return result;
};
const returnInvalidIndex = (validIndex, content) => {
  let result = [];
  if (validIndex === undefined) {
    result = [];
  } else {
    const allIndex = [...Array(content.length)].map((v, i) => i);
    result = allIndex.filter((i) => validIndex.indexOf(i) === -1);
  }
  return result;
};
const returnContentCVT = (validIndex, content) => {
  let result = [];
  if (validIndex === undefined) {
    result = content;
  } else {
    for (let i = 0; i < validIndex.length; i++) {
      result.push(content[validIndex[i]]);
    }
  }
  return result;
};
/**
 * Play Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('play', { deckID, validIndex });
 * props: { navigation, route }
 * recoil: { decksState }
 * state: { layout, deckID, general, content, playLaw, contentCVT, leftCVT, rightCVT }
 * ```
 */
const Play = (props) => {
  // props
  const { navigation, route: { params: { deckID: deckIDprop, validIndex } } } = props;
  // recoil
  const decks = useRecoilValue(decksState);
  // state
  const [deckID, setDeckID] = useState(deckIDprop);
  const [general, setGeneral] = useState(decks[deckIDprop].general);
  const [content, setContent] = useState(decks[deckIDprop].content);
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  const [playLaw, setPlayLaw] = useState({
    valid: modifyValidIndex(validIndex, content),
    invalid: returnInvalidIndex(validIndex, content),
  });
  const [contentCVT, setContentCVT] = useState(returnContentCVT(validIndex, content));
  const [leftIndexCVT, setLeftIndexCVT] = useState([]);
  const [rightIndexCVT, setRightIndexCVT] = useState([]);
  // ref
  const [card, setCard] = useState({}); // 例外的にstateに
  let swiper = {};

  // const renderChecker = () => (
  //   <View style={style.checker}>
  //     {leftIndexCVT.length + rightIndexCVT.length + 1}
  //     /
  //     {contentCVT.length}
  //   </View>
  // );

  const renderSwiper = () => {
    if (!(layout.height === 0)) {
      return (
        <View>
          <Text style={style.checker}>
            {leftIndexCVT.length + rightIndexCVT.length + 1}
            /
            {contentCVT.length}
          </Text>
          <DeckSwiper
            cards={contentCVT}
            renderCard={(vocab, index) => (<PlayCard vocab={vocab} ref={(ref) => { setCard(ref); }} />)}
            onSwipedRight={(index) => setRightIndexCVT([...rightIndexCVT, index])}
            onSwipedLeft={(index) => setLeftIndexCVT([...leftIndexCVT, index])}
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
        </View>
      );
    }
    return null;
  };

  const renderFinishButton = () => {
    const rightIndex = rightIndexCVT.map((index) => playLaw.valid[index]);
    const leftIndex = leftIndexCVT.map((index) => playLaw.valid[index]);
    const finish = (contentCVT.length === rightIndexCVT.length + leftIndexCVT.length);
    const goToResult = () => {
      console.log({ rightIndex, leftIndex, invalidIndex: playLaw.invalid });
      navigation.push('results', {
        rightIndex, leftIndex, invalidIndex: playLaw.invalid, deckID,
      });
    };
    if (finish) {
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
    <PlayCounter leftIndex={leftIndexCVT} rightIndex={rightIndexCVT} />
  );

  const renderButtons = () => {
    const swipeBack = () => {
      swiper.swipeBack(swiper.previousCardIndex);
      const rightL = rightIndexCVT.length;
      const leftL = leftIndexCVT.length;
      setRightIndexCVT(rightIndexCVT.filter((index) => index !== rightL + leftL - 1));
      setLeftIndexCVT(leftIndexCVT.filter((index) => index !== rightL + leftL - 1));
    };
    return (
      <PlayButtons
        finished={contentCVT.length === leftIndexCVT.length + rightIndexCVT.length}
        flip={() => card.flip()}
        swipeLeft={() => swiper.swipeLeft()}
        swipeRight={() => swiper.swipeRight()}
        swipeBack={() => swipeBack()}
      />
    );
  };

  return (
    <View style={style.container}>
      <View
        style={style.container}
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
