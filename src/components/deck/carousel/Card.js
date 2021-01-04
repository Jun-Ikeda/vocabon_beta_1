import React, { useEffect } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { useRecoilValue } from 'recoil';
import Color from '../../../config/Color';
import { unshortenURI } from '../../../config/Unsplash';
import { decksGeneral } from '../../../config/deck/Deck';
import ProfileIcon from '../../user/profileicon/ProfileIcon';
import { usersGeneral } from '../../../config/user/User';

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: Color.white1,
  },
  overlaybottomContainer: {
  },
  overlayContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  languageText: { color: Color.white2 },
});

/**
 * Card Component in Carousel Component
 * @augments {Component<Props,State>}
 * Usage :
 * ```js
 * <Card
 *    deckID="string" // REQUIRED
 *    onPress={() => function}
 *    cardStyle={{ style }}
 * />
 *
 * ```
 */
const Card = (props) => {
  // props
  const { deckID, cardStyle, onPress } = props;
  // recoil
  const deckGenerals = useRecoilValue(decksGeneral);
  // state
  // const [deckID, setDeckID] = useState(deckIDprop);
  const deckGeneral = deckGenerals[deckID];
  // const [general, setGeneral] = useState(generals[deckID]);

  useEffect(() => {
  }, []);

  const renderBackgroundImage = () => (
    <View style={cardStyle}>
      <Image
        source={{ uri: unshortenURI(deckGeneral?.thumbnail.uri) }}
        style={cardStyle}
        blurRadius={0.5}
      />
      <View style={[{ position: 'absolute' }, cardStyle, { backgroundColor: Color.gray1, opacity: 0.5 }]} />
    </View>
  );

  const renderOverlayAbove = () => (
    <View style={{
      paddingLeft: cardStyle.width * 0.1,
      paddingTop: cardStyle.height * 0.06,
    }}
    >
      <Text style={{
        fontSize: cardStyle.height * 0.1,
        color: Color.white1,
      }}
      >
        {deckGeneral?.title}
      </Text>
      <Text style={{
        fontSize: cardStyle.height * 0.08,
        color: Color.white2,
      }}
      >
        n views, m reviews
      </Text>
      <View>
        <Text style={[style.languageText, { fontSize: cardStyle.height * 0.06 }]}>
          {`Term in ${deckGeneral?.language.term}`}
        </Text>
        <Text style={[style.languageText, { fontSize: cardStyle.height * 0.06 }]}>
          {`Definition in ${deckGeneral?.language.definition}`}
        </Text>
      </View>
    </View>
  );

  const renderOverlayBotom = () => (
    <View style={style.overlaybottomContainer}>
      <ProfileIcon
        userID={deckGeneral?.user}
        size={cardStyle.height * 0.2}
        style={{
          marginLeft: cardStyle.height * 0.1,
          marginBottom: cardStyle.height * 0.05,
        }}
      />
    </View>
  );

  return (
    <TouchableOpacity
      style={[
        style.cardContainer,
        cardStyle,
      ]}
      onPress={onPress}
    >
      {renderBackgroundImage()}
      <View style={style.overlayContainer}>
        {renderOverlayAbove()}
        {renderOverlayBotom()}
      </View>
    </TouchableOpacity>
  );
};

Card.propTypes = {
  cardStyle: PropTypes.object,
  deckID: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

Card.defaultProps = {
  cardStyle: {},
  onPress: () => {},
};

export default Card;
