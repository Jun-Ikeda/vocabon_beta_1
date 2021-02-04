import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import { CommonActions } from '@react-navigation/native';
import Color from '../../../../config/Color';
import { unshortenURI } from '../../../../config/Unsplash';
import { decksGeneral, getDeckContent, getDeckGeneral } from '../../../../config/deck/Deck';
import { deck } from '../../../../config/Const';

import Icon from '../../../../components/Icon';

import ResultsDetail from './ResultsDetail';

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
  counterIcon: {
    color: Color.white1,
    fontSize: 30,
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
    backgroundColor: Color.white1,
    flexDirection: 'row', // 合わせるやつ
    justifyContent: 'center',
  },
  icons: {
    fontSize: 30,
    marginRight: 10,
  },
  columnContainer: {
    justifyContent: 'space-around',
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
        deckID, validVocabIDs, itemVisible, sortMode, rightVocabID, leftVocabID,
      },
    },
  } = props;
  // recoil
  const generals = useRecoilValue(decksGeneral);
  // state
  const general = getDeckGeneral(generals, deckID);
  const content = getDeckContent(deckID);
  const vocabIDs = Object.values(content);

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
    const navigationDeletePush = (deleteRoute, pushRoute, params) => {
      navigation.dispatch((state) => {
        const routes = [
          ...state.routes.filter((route) => !deleteRoute.includes(route.name)),
          { name: pushRoute, params },
        ];
        return CommonActions.reset({ ...state, routes, index: routes.length - 1 });
      });
    };
    const listButtons = [
      {
        title: 'Replay',
        num: `(${validVocabIDs.length})`,
        onPress: () => navigationDeletePush(['play'], 'play', {
          deckID, validVocabIDs: deck.sortVocabs(validVocabIDs, sortMode), itemVisible, sortMode,
        }),
        isVisible: true,
        icon: 'replay',
        color: Color.black,
      },
      {
        title: 'Play the whole deck',
        num: `(${vocabIDs.length})`,
        onPress: () => navigationDeletePush(['play'], 'play', {
          deckID, validVocabIDs: deck.sortVocabs(vocabIDs, sortMode), itemVisible, sortMode,
        }),
        isVisible: validVocabIDs.length !== vocabIDs.length,
        icon: 'overscan',
        color: Color.black,
      },
      {
        title: 'Play X cards',
        num: `(${leftVocabID.length})`,
        onPress: () => navigationDeletePush(['play'], 'play', {
          deckID, validVocabIDs: deck.sortVocabs(leftVocabID, sortMode), itemVisible, sortMode,
        }),
        isVisible: ((leftVocabID.length !== 0) && (rightVocabID.length !== 0)),
        icon: 'window-close',
        color: Color.cud.red,
      },
    ];
    const squareButtons = [
      [
        {
          title: 'Menu',
          num: '',
          onPress: () => navigation.navigate('menu'),
          isVisible: true,
          icon: 'menu',
          color: Color.black,
        },
        {
          title: 'Analyze',
          num: '',
          onPress: () => navigationDeletePush(['play'], 'analyze', { deckID }),
          isVisible: true,
          icon: 'chart-timeline-variant',
          color: Color.black,
        },
      ],
      [
        {
          title: 'Options', // go back to options
          num: '',
          onPress: () => navigationDeletePush(['play'], 'options', { deckID, sortMode }),
          isVisible: true,
          icon: 'tune',
          color: Color.black,
        },
        {
          title: 'Home',
          num: '',
          onPress: () => navigation.popToTop(),
          isVisible: true,
          icon: 'home',
          color: Color.black,
        },
      ],
    ];
    const renderListButtons = () => listButtons.map((button) => {
      if (button.isVisible) {
        return (
          <TouchableOpacity
            style={style.button}
            onPress={button.onPress}
            key={button.title.replace(' ', '').toLowerCase()}
          >
            <Icon.MaterialCommunityIcons style={[style.icons, { color: button.color }]} name={button.icon} />
            <Text style={style.buttonTitle}>{`${button.title} ${button.num}`}</Text>
          </TouchableOpacity>
        );
      }
      return null;
    });
    const renderSquareButtons = () => squareButtons.map((column) => (
      <View style={{ flexDirection: 'row' }}>
        {column.map((button) => {
          if (button.isVisible) {
            return (
              <TouchableOpacity
                style={[style.button, { flex: 1, flexDirection: 'column', alignItems: 'center' }]}
                onPress={button.onPress}
                key={button.title.replace(' ', '').toLowerCase()}
              >
                <Icon.MaterialCommunityIcons style={[style.icons, { color: button.color }]} name={button.icon} />
                <Text style={style.buttonTitle}>{`${button.title} ${button.num}`}</Text>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>
    ));
    return (
      <View>
        {renderListButtons()}
        <View style={style.columnContainer}>
          {renderSquareButtons()}
        </View>
      </View>
    );
  };

  const renderCounter = () => {
    const counters = [
      { title: 'Marked', icon: 'close', num: leftVocabID.length },
      { title: 'Clear', icon: 'check', num: rightVocabID.length },
    ];
    return (
      <View style={style.countersContainer}>
        {counters.map((counter) => (
          <View style={style.counter} key={counter.title.toLowerCase()}>
            <Icon.AntDesign name={counter.icon} style={style.counterIcon} />
            <Text style={style.counterNum}>{counter.num}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderMessage = () => {
    const correctRate = rightVocabID.length / (rightVocabID.length + leftVocabID.length);
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
      <View style={{ paddingHorizontal: 40, flex: 1 }}>
        <ResultsDetail
          content={content}
          validVocabIDs={validVocabIDs}
          leftVocabID={leftVocabID}
          rightVocabID={rightVocabID}
          renderButtons={() => (
            <View style={{ flex: 1, paddingBottom: 20 }}>
              {renderMessage()}
              {renderButtons()}
            </View>
          )}
        />
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
