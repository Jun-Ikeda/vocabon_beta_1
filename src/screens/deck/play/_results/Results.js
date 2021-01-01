import React, { Component, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
// import { DeckGeneral } from '../../../../../dev/TestData';

import { useRecoilValue } from 'recoil';
import Color from '../../../../config/Color';
import Unsplash, { unshortenURI } from '../../../../config/Unsplash';
import { decksState } from '../../../../nav/main/MainNav';

// import Home from '../../../../nav/main/home/screens/home/Home';
// import TestData from '../../../../../dev/TestData';

const imgHeight = 250;
const titleFontSize = 20;

const switchMessage = (correctRate) => {
  let message = '';
  if (correctRate < 0.4) {
    message = 'Break your leg!';
  } else if (correctRate < 0.6) {
    message = 'You could do better!';
  } else if (correctRate < 0.8) {
    message = 'Almost perfect!';
  } else {
    message = 'Well done!';
  }
  return message;
};

const style = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFill,
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  countersContainer: {
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  counter: {
    alignItems: 'center',
  },
  counterText: {
    color: Color.white1,
    fontSize: 26,
  },
  counterNum: {
    color: Color.white1,
    fontSize: 44,
  },
  buttonTitle: {
    fontSize: 18,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    margin: 3,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

/**
 * Results Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('results', { deckID, rightIndex, leftIndex, invalidIndex });
 * props: { navigation, route }
 * recoil: { decksState }
 * state: { leftIndex, rightIndex, invalidIndex, deckID, general }
 * ```
 */
const Results = (props) => {
  // props
  const {
    navigation, route: {
      params: {
        rightIndex: propRight, leftIndex: propLeft, invalidIndex: propInvalid, deckID: deckIDprop,
      },
    },
  } = props;
  // recoil
  const decks = useRecoilValue(decksState);
  // state
  const [leftIndex, setLeftIndex] = useState(propLeft);
  const [rightIndex, setRightIndex] = useState(propRight);
  const [invalidIndex, setInvalidIndex] = useState(propInvalid);
  const [deckID, setDeckID] = useState(deckIDprop);
  const [general, setGeneral] = useState(decks[deckIDprop].general);

  const renderThumbnail = () => (
    <View style={{ height: imgHeight, width: '100%' }}>
      <Image
        source={{ uri: unshortenURI(general.thumbnail.uri) }}
        style={{ height: imgHeight, width: '100%' }}
      />
      <View style={{
        position: 'absolute', height: imgHeight, width: '100%', backgroundColor: Color.gray1, opacity: 0.5,
      }}
      />
    </View>
  );

  const renderButtons = () => {
    const buttons = [
      {
        title: 'Replay',
        num: `(${rightIndex.length + leftIndex.length + invalidIndex.length})`,
        onPress: () => { navigation.push('play', { deckID }); },
        isVisible: true,
      },
      {
        title: 'Play mistaken cards',
        num: `(${leftIndex.length})`,
        onPress: () => navigation.push('play', { validIndex: leftIndex, deckID }),
        isVisible: !(leftIndex.length === 0),
      },
      {
        title: 'Options', // go back to options
        num: '',
        onPress: () => navigation.navigate('options', { deckID }),
        isVisible: true,
      },
      {
        title: 'Finish this Deck',
        num: '',
        onPress: () => navigation.popToTop(),
        isVisible: true,
      },
    ];

    return buttons.map((button) => {
      if (button.isVisible) {
        return (
          <TouchableOpacity
            style={style.button}
            onPress={button.onPress}
            key={button.title.replace(' ', '').toLowerCase()}
          >
            <Text style={style.buttonTitle}>{`${button.title} ${button.num}`}</Text>
          </TouchableOpacity>
        );
      }
      return null;
    });
  };

  const renderCounter = () => {
    const counters = [
      { title: 'Marked', num: leftIndex.length },
      { title: 'Clear', num: rightIndex.length },
    ];
    return (
      <View style={style.countersContainer}>
        {counters.map((counter) => (
          <View style={style.counter} key={counter.title.toLowerCase()}>
            <Text style={style.counterText}>{counter.title}</Text>
            <Text style={style.counterNum}>{counter.num}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderMessage = () => {
    const correctRate = rightIndex.length / (rightIndex.length + leftIndex.length);
    const message = switchMessage(correctRate);
    return (
      <Text style={{
        fontSize: titleFontSize,
        paddingVertical: 10,
      }}
      >
        {message}
      </Text>
    );
  };

  return (
    <View style={style.container}>
      <View>
        {renderThumbnail()}
        <View style={style.overlayContainer}>
          {renderCounter()}
        </View>
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        {renderMessage()}
        {renderButtons()}
      </View>
    </View>
  );
};

Results.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Results.defaultProps = {
};

export default Results;

/* class PlayResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: [],
      right: [],
      invalid: [],
      uri: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const left = navigation.getParam('left');
    const right = navigation.getParam('right');
    const invalid = navigation.getParam('invalid');
    const uri = navigation.getParam('uri');
    this.setState({
      left, right, invalid, uri,
    });
  }

  renderThumbnail = () => {
    const { uri } = this.state;
    return (
      <Image
        source={{ uri: Unsplash.unshortenURI(uri) }}
        style={{
          height: imgHeight,
          width: '100%',
          opacity: 0.7,
        }}
      />
    );
  }

  renderHeader = () => {
    const { navigation } = this.props;
    return (
      <HeaderWithBack
        navigation={navigation}
        style={{
          backgroundColor: 'transparent',
        }}
      />
    );
  };

  renderButtons = () => {
    const { right, left, invalid } = this.state;
    const { navigation } = this.props;
    const buttons = [
      {
        title: 'Replay',
        num: `(${right.length + left.length + invalid.length})`,
        onPress: () => { navigation.push('play'); },
        isVisible: true,
      },
      {
        title: 'Play mistaken cards',
        num: `(${left.length})`,
        onPress: () => navigation.push('play', { validIndexes: left }),
        isVisible: !(left.length === 0),
      },
      {
        title: 'Options', // go back to options
        num: '',
        onPress: () => navigation.navigate('playoption'),
        isVisible: true,
      },
      {
        title: 'Finish this Deck',
        num: '',
        onPress: () => navigation.popToTop(),
        isVisible: true,
      },
    ];

    return buttons.map((button) => {
      if (button.isVisible) {
        return (
          <TouchableOpacity
            style={style.button}
            onPress={button.onPress}
          >
            <Text style={style.buttonTitle}>{`${button.title} ${button.num}`}</Text>
          </TouchableOpacity>
        );
      }
      return null;
    });
  }

  renderCounter = () => {
    const { left, right } = this.state;
    const counters = [
      { title: 'Marked', num: left.length },
      { title: 'Clear', num: right.length },
    ];
    return (
      <View style={style.countersContainer}>
        {counters.map((counter) => (
          <View style={style.counter}>
            <Text style={style.counterText}>{counter.title}</Text>
            <Text style={style.counterNum}>{counter.num}</Text>
          </View>
        ))}
      </View>
    );
  }

  renderMessage = () => {
    const { right, left } = this.state;
    let message = '';
    if (right.length / (right.length + left.length) < 0.4) {
      message = 'Break your leg!';
    } else if (right.length / (right.length + left.length) < 0.6) {
      message = 'You could do better!';
    } else if (right.length / (right.length + left.length) < 0.8) {
      message = 'Almost perfect!';
    } else {
      message = 'Well done!';
    }
    return (
      <Text style={{
        fontSize: titleFontSize,
        paddingVertical: 10,
      }}
      >
        {message}
      </Text>
    );
  }

  render() {
    return (
      <View style={style.container}>
        <View>
          {this.renderThumbnail()}
          <View style={style.overlayContainer}>
            {this.renderHeader()}
            {this.renderCounter()}
          </View>
        </View>
        <View style={{
          paddingHorizontal: 40,
        }}
        >
          {this.renderMessage()}
          {this.renderButtons()}
        </View>
      </View>
    );
  }
} */
