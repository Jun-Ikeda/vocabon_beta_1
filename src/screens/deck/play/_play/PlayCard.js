import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import PropTypes from 'prop-types';
import * as Speech from 'expo-speech';
// import HTML from 'react-native-render-html';

import Color from '../../../../config/Color';
import { deck, func } from '../../../../config/Const';
import Icon from '../../../../components/Icon';

const style = StyleSheet.create({
  cardflip: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white1,
    borderRadius: 20,
    padding: 30,
  },
  label: {
    color: Color.font1,
    fontSize: 24,
    textAlign: 'left',
  },
  headerIcon: {
    textAlign: 'right',
    // justifyContent: 'flex'
    fontSize: 30,
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: Color.gray1,
  },
});

/**
 * PlayCard Component in Play Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <PlayCard
 *  vocab={{ object }} // data of one word
 * />
 * props: { vocab }
 * recoil: {}
 * state: {}
 * ```
 */
class PlayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  flip = () => {
    this.card.flip();
  };

  render() {
    const {
      vocab, itemVisible, language,
    } = this.props;
    const frontItems = [
      { item: 'term', array: vocab.term ?? [], lang: language.term },
      { item: 'definition', array: vocab.definition ?? [], lang: language.definition },
      { item: 'synonym', array: vocab?.synonym ?? [], lang: language.term },
      { item: 'antonym', array: vocab?.antonym ?? [], lang: language.term },
      { item: 'prefix', array: vocab?.prefix ?? [], lang: language.term },
      { item: 'suffix', array: vocab?.suffix ?? [], lang: language.term },
      { item: 'exampleT', array: vocab?.exampleT ?? [], lang: language.term },
      { item: 'exampleD', array: vocab?.exampleD ?? [], lang: language.term },
      { item: 'cf', array: vocab?.cf ?? [], lang: language.term },
    ];
    const backItems = [
      { item: 'term', array: vocab.term ?? [], lang: language.term },
      { item: 'definition', array: vocab?.definition ?? [], lang: language.definition },
      { item: 'synonym', array: vocab?.synonym ?? [], lang: language.term },
      { item: 'antonym', array: vocab?.antonym ?? [], lang: language.term },
      { item: 'prefix', array: vocab?.prefix ?? [], lang: language.term },
      { item: 'suffix', array: vocab?.suffix ?? [], lang: language.term },
      { item: 'exampleT', array: vocab?.exampleT ?? [], lang: language.term },
      { item: 'exampleD', array: vocab?.exampleD ?? [], lang: language.definition },
      { item: 'cf', array: vocab?.cf ?? [], lang: language.term },
    ];
    return (
      <CardFlip
        style={style.cardflip}
        duration={300}
        ref={(card) => { this.card = card; }}
      >
        <TouchableOpacity style={[style.card]} onPress={() => this.flip()}>
          {frontItems.map((item) => (itemVisible.front.includes(item.item) && item.array.length !== 0 ? (
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.label} key={item.item}>{deck.formatArrayContent(item.array)}</Text>
              <Icon.MaterialIcons
                name="record-voice-over"
                style={style.headerIcon}
                onPress={() => {
                  item.array?.forEach((term) => {
                    Speech.speak(term ?? '', { language: item.lang });
                  });
                }}
              />
            </View>
          ) : null))}
        </TouchableOpacity>
        <TouchableOpacity style={[style.card]} onPress={() => this.flip()}>
          {backItems.map((item) => (itemVisible.back.includes(item.item) ? (
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.label} key={item.item}>{deck.formatArrayContent(item.array)}</Text>
              <Icon.MaterialIcons
                name="record-voice-over"
                style={style.headerIcon}
                onPress={() => {
                  item.array?.forEach((term) => {
                    Speech.speak(term ?? '', { language: item.lang });
                  });
                }}
              />
            </View>
          ) : null))}
        </TouchableOpacity>
      </CardFlip>
    );
  }
}

PlayCard.propTypes = {
  vocab: PropTypes.object,
  itemVisible: PropTypes.object.isRequired,
  language: PropTypes.shape(({
    term: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
};

PlayCard.defaultProps = {
  vocab: {},
};

export default PlayCard;

/* import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardFlip from 'react-native-card-flip';
import PropTypes from 'prop-types';
// import HTML from 'react-native-render-html';

import Color from '../../../../config/Color';
import { deck } from '../../../../config/Const';

const style = StyleSheet.create({
  cardflip: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Color.white1,
  },
  label: {
    color: Color.font1,
    fontSize: 22,
    textAlign: 'left',
  },
});

const PlayCard = (props) => {
  const { vocab } = props;
  let card = {};

  return (
    <CardFlip
      style={style.cardflip}
      duration={300}
      ref={(ref) => { card = ref; }}
    >
      <TouchableOpacity style={[style.card]} onPress={() => card.flip()}>
        <Text style={style.label}>{vocab.term}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[style.card]} onPress={() => card.flip()}>
        <Text style={style.label}>{`${deck.formatArrayContent(vocab.definition)}\n`}</Text>
        <Text style={style.label}>{`Synonym: ${deck.formatArrayContent(vocab.synonym)}`}</Text>
        <Text style={style.label}>{`Antonym: ${deck.formatArrayContent(vocab.antonym)}`}</Text>
      </TouchableOpacity>
    </CardFlip>
  );
};

PlayCard.propTypes = {
  vocab: PropTypes.object,
};

PlayCard.defaultProps = {
  vocab: {},
};

export default PlayCard;

/* class PlayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  flip = () => {
    this.card.flip();
  };

  render() {
    const {
      content,
    } = this.props;
    return (
      <CardFlip
        style={style.cardflip}
        duration={300}
        ref={(card) => { this.card = card; }}
      >
        <TouchableOpacity
          style={[style.card]}
          onPress={() => this.flip()}
        >
          <Text style={style.label}>{content.term}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.card]}
          onPress={() => this.flip()}
        >
          <Text style={style.label}>{`${deck.formatArrayContent(content.definition)}\n`}</Text>
          <Text style={style.label}>{`Synonym: ${deck.formatArrayContent(content.synonym)}`}</Text>
          <Text style={style.label}>{`Antonym: ${deck.formatArrayContent(content.antonym)}`}</Text>
        </TouchableOpacity>
      </CardFlip>
    );
  }
}
 */
