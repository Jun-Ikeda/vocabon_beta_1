import React, { Component } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, Image, View,
} from 'react-native';
import PropTypes from 'prop-types';

import Color from '../../config/Color';

import { DeckGeneral } from '../../../dev/TestData';

import { unshortenURI } from '../../config/Unsplash';

// const uri = unshortenURI('省略されたuri');

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: Color.white1,
  },
  overlaybottomContainer: {
    // borderWidth: 1,
  },
  overlayContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    // borderWidth: 0,
  },
});

/**
 * Template Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <DeckCard
 *  message="Hi, use me in this way" />
 * ```
 */
class DeckCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {
        title: '',
        id: '',
        language: {
          term: '',
          definition: '',
        },
        thumbnail: {
          uri: '',
          user: {
            link: '',
            name: '',
          },
        },
      },
    };
  }

  componentDidMount() {
    this.setState({ deck: DeckGeneral[0] });
  }

  renderImage = () => {
    const { cardStyle } = this.props;
    const { deck } = this.state;
    return (
      <Image
        source={{ uri: unshortenURI(deck.thumbnail.uri) }}
        style={[cardStyle,
          {
            opacity: 0.6,
          },
        ]}
      />
    );
  }

  renderOverlayAbove = () => {
    const { cardStyle } = this.props;
    const { deck } = this.state;
    return (
      <View style={{
        paddingLeft: cardStyle.width * 0.1,
        paddingTop: cardStyle.height * 0.06,
        // borderWidth: 1,
      }}
      >
        <Text style={{
          fontSize: cardStyle.height * 0.1,
          // fontWeight: 'bold',
        }}
        >
          {deck.title}
        </Text>
        <Text style={{
          fontSize: cardStyle.height * 0.08,
          color: Color.gray1,
        }}
        >
          n views, m reviews
        </Text>
        <View>
          <Text style={{ fontSize: cardStyle.height * 0.06, color: Color.gray1 }}>{`Term in ${deck.language.term}`}</Text>
          <Text style={{ fontSize: cardStyle.height * 0.06, color: Color.gray1 }}>{`Definition in ${deck.language.definition}`}</Text>
        </View>
      </View>
    );
  }

  renderOverlayBotom = () => {
    // const { deck } = this.state;
    const { cardStyle } = this.props;
    return (
      <View style={style.overlaybottomContainer}>
        <Image
          source={{ uri: 'data:image/jpeg;base64,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' }}
          style={
          {
            borderRadius: cardStyle.height * 0.25,
            height: cardStyle.height * 0.2,
            width: cardStyle.height * 0.2,
            marginLeft: cardStyle.height * 0.1,
            marginBottom: cardStyle.height * 0.05,
          }
        }
        />
      </View>
    );
  }

  render() {
    const { cardStyle, /* item,  */onPress } = this.props;
    // const { deck } = this.state;
    return (
      <TouchableOpacity
        style={[
          style.cardContainer,
          cardStyle,
        ]}
        onPress={onPress}
      >
        {this.renderImage()}
        <View style={style.overlayContainer}>
          {this.renderOverlayAbove()}
          {this.renderOverlayBotom()}
        </View>
      </TouchableOpacity>
    );
  }
}

DeckCard.propTypes = {
  cardStyle: PropTypes.object,
  // item: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

DeckCard.defaultProps = {
  cardStyle: {},
  onPress: () => {},
};

export default DeckCard;
