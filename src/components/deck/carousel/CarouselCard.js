import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';

import { useRecoilValue } from 'recoil';
import Color from '../../../config/Color';
import { unshortenURI } from '../../../config/Unsplash';
import { decksGeneral, getDeckGeneral } from '../../../config/deck/Deck';
import ProfileIcon from '../../user/profileicon/ProfileIcon';
import { getAccountContent } from '../../../config/account/Account';
import Icon from '../../Icon';
import langs from '../../../config/Langs';

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
const CarouselCard = (props) => {
  // props
  const { deckID, cardStyle, onPress } = props;
  // recoil
  const general = useRecoilValue(decksGeneral);
  //
  const deckGeneral = getDeckGeneral(general, deckID);
  const accountContent = getAccountContent(deckID);

  const renderBackgroundImage = () => (
    <View style={cardStyle}>
      <Image
        source={{ uri: unshortenURI(deckGeneral?.thumbnail.uri) }}
        style={cardStyle}
        // blurRadius={0.5}
      />
      <View style={[{ position: 'absolute' }, cardStyle, { backgroundColor: Color.gray1, opacity: 0.5 }]} />
    </View>
  );

  const renderBookmarkIcon = () => (accountContent.bookmark ? (
    <View style={{ position: 'absolute' }}>
      <View style={{
        position: 'absolute',
        backgroundColor: Color.white1,
        right: cardStyle.height * 0.04,
        left: cardStyle.height * 0.04,
        top: cardStyle.height * 0.04,
        bottom: cardStyle.height * 0.04,

      }}
      />
      <Icon.MaterialCommunityIcons
        name="bookmark-check"
        style={{
          fontSize: cardStyle.height * 0.15, color: Color.red2,
        }}
      />
    </View>
  ) : null);

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
        {`${deckGeneral?.num} terms`}
      </Text>
      <Text style={{
        fontSize: cardStyle.height * 0.08,
        color: Color.white2,
      }}
      >
        {`${accountContent?.play?.length ?? 0} times played`}
      </Text>
      <View>
        <Text style={[style.languageText, { fontSize: cardStyle.height * 0.06 }]}>
          {`Term in ${langs.filter((lang) => (deckGeneral?.language.term === lang.tag))[0]?.name ?? 'Not Found'}`}
        </Text>
        <Text style={[style.languageText, { fontSize: cardStyle.height * 0.06 }]}>
          {`Definition in ${langs.filter((lang) => (deckGeneral?.language.definition === lang.tag))[0]?.name ?? 'Not Found'}`}
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
        {renderBookmarkIcon()}
        {renderOverlayAbove()}
        {renderOverlayBotom()}
      </View>
    </TouchableOpacity>
  );
};

CarouselCard.propTypes = {
  cardStyle: PropTypes.object,
  deckID: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

CarouselCard.defaultProps = {
  cardStyle: {},
  onPress: () => {},
};

export default CarouselCard;
