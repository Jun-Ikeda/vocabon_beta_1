import React, { Component } from 'react';
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
    // alignItems: 'center',
    backgroundColor: Color.white1,
    borderRadius: 20,
  },
  label: {
    color: Color.font1,
    fontSize: 22,
    textAlign: 'left',
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
      vocab,
    } = this.props;
    return (
      <CardFlip
        style={style.cardflip}
        duration={300}
        ref={(card) => { this.card = card; }}
      >
        <TouchableOpacity style={[style.card]} onPress={() => this.flip()}>
          <Text style={style.label}>{vocab.term}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.card]} onPress={() => this.flip()}>
          <Text style={style.label}>{`${deck.formatArrayContent(vocab.definition)}\n`}</Text>
          <Text style={style.label}>{`Synonym: ${deck.formatArrayContent(vocab.synonym)}`}</Text>
          <Text style={style.label}>{`Antonym: ${deck.formatArrayContent(vocab.antonym)}`}</Text>
          {/* <Text style={style.label}>{`Ex: ${play.formatArrayContent(content.example)}`}</Text> */}
        </TouchableOpacity>
      </CardFlip>
    );
  }
}

PlayCard.propTypes = {
  vocab: PropTypes.object,
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
