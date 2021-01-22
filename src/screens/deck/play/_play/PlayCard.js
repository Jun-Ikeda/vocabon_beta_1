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
      vocab, itemVisible,
    } = this.props;
    const frontItems = [
      { item: 'term', text: vocab.term, visible: itemVisible.front.includes('term') },
      { item: 'definition', text: deck.formatArrayContent(vocab.definition), visible: itemVisible.front.includes('definition') },
      { item: 'synonym', text: `Synonym: ${deck.formatArrayContent(vocab.synonym)}`, visible: itemVisible.front.includes('synonym') },
      { item: 'antonym', text: `Antonym: ${deck.formatArrayContent(vocab.antonym)}`, visible: itemVisible.front.includes('antonym') },
      { item: 'prefix', text: `Prefix: ${deck.formatArrayContent(vocab.prefix)}`, visible: itemVisible.front.includes('prefix') },
      { item: 'suffix', text: `Suffix: ${deck.formatArrayContent(vocab.suffix)}`, visible: itemVisible.front.includes('suffix') },
      { item: 'exampleT', text: deck.formatArrayContent(vocab.exampleT), visible: itemVisible.front.includes('exampleT') },
      { item: 'exampleD', text: deck.formatArrayContent(vocab.exampleD), visible: itemVisible.front.includes('exampleD') },
      { item: 'cf', text: `cf. ${deck.formatArrayContent(vocab.cf)}`, visible: itemVisible.front.includes('cf') },
    ];
    const backItems = [
      { item: 'term', text: vocab.term, visible: itemVisible.back.includes('term') },
      { item: 'definition', text: deck.formatArrayContent(vocab.definition), visible: itemVisible.back.includes('definition') },
      { item: 'synonym', text: `Synonym: ${deck.formatArrayContent(vocab.synonym)}`, visible: itemVisible.back.includes('synonym') },
      { item: 'antonym', text: `Antonym: ${deck.formatArrayContent(vocab.antonym)}`, visible: itemVisible.back.includes('antonym') },
      { item: 'prefix', text: `Prefix: ${deck.formatArrayContent(vocab.prefix)}`, visible: itemVisible.back.includes('prefix') },
      { item: 'suffix', text: `Suffix: ${deck.formatArrayContent(vocab.suffix)}`, visible: itemVisible.back.includes('suffix') },
      { item: 'exampleT', text: deck.formatArrayContent(vocab.exampleT), visible: itemVisible.back.includes('exampleT') },
      { item: 'exampleD', text: deck.formatArrayContent(vocab.exampleD), visible: itemVisible.back.includes('exampleD') },
      { item: 'cf', text: `cf. ${deck.formatArrayContent(vocab.cf)}`, visible: itemVisible.back.includes('cf') },
    ];
    return (
      <CardFlip
        style={style.cardflip}
        duration={300}
        ref={(card) => { this.card = card; }}
      >
        <TouchableOpacity style={[style.card]} onPress={() => this.flip()}>
          {frontItems.map((item) => (item.visible ? <Text style={style.label} key={item.item}>{item.text}</Text> : null))}
        </TouchableOpacity>
        <TouchableOpacity style={[style.card]} onPress={() => this.flip()}>
          {backItems.map((item) => (item.visible ? <Text style={style.label} key={item.item}>{item.text}</Text> : null))}
        </TouchableOpacity>
      </CardFlip>
    );
  }
}

PlayCard.propTypes = {
  vocab: PropTypes.object,
  itemVisible: PropTypes.object.isRequired,
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
