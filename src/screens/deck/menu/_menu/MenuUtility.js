import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Linking, StyleSheet, LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from '../../../../config/Color';
import ProfileIcon from '../../../../components/user/profileicon/ProfileIcon';
import langs from '../../../../config/Langs';

const titleFontSize = 30;
const normalFontSize = 15;
const narrowIndent = 15;
const wideIndent = 20;

const styles = StyleSheet.create({
  title: {
    fontSize: titleFontSize,
    paddingLeft: narrowIndent,
  },
  languageBold: {
    fontSize: normalFontSize * 1.2,
    fontWeight: 'bold',
  },
  icon: {
    borderRadius: 45,
    height: 45,
    width: 45,
  },
  belowContainer: {
    fontSize: normalFontSize,
    paddingHorizontal: wideIndent,
    paddingVertical: 5,
    flexDirection: 'row',
  },
});

/**
 * MenuUtility Component in Menu Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <MenuUtility
 *    title="string"
 *    language={{ object }} // object
 *    thumbnail={{ ojbect }}
 * />
 *
 * ```
 */
const MenuUtility = (props) => {
  // props
  const {
    deckGeneral, accountContent, navigation, deckID,
  } = props;
  // state
  const [expand, setExpand] = useState(false);
  //
  const {
    user, title, language, thumbnail, num, description,
  } = deckGeneral;

  const renderTitle = () => (
    <TouchableOpacity onPress={() => navigation.navigate('property', { deckID })}>
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderLanguages = () => {
    const languages = [
      { title: 'Definition in ', value: langs.filter((lang) => (language.definition === lang.tag))[0]?.name ?? 'Not Found' },
      { title: 'Term in ', value: langs.filter((lang) => (language.term === lang.tag))[0]?.name ?? 'Not Found' },
    ];
    const playLength = accountContent.play.length;
    const recentMarks = Object.values(accountContent.marks).filter((mark) => mark.includes(playLength - 1)).length;
    return (
      <View style={{ flex: 1 }}>
        {languages.map((lang) => (
          <TouchableOpacity onPress={() => navigation.navigate('property', { deckID })} key={lang.title.toLowerCase()}>
            <Text key={lang.title}>
              {lang.title}
              <Text style={styles.languageBold}>{lang.value}</Text>
            </Text>
          </TouchableOpacity>
        ))}
        <Text>{`${num} terms`}</Text>
        <TouchableOpacity onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpand(!expand);
        }}
        >
          <Text style={{ color: Color.gray2 }}>{expand ? 'Close' : 'More'}</Text>
        </TouchableOpacity>
        {expand
          ? (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('property', { deckID })}>
                <Text style={description === '' ? { color: Color.gray2, fontStyle: 'italic' } : null}>{description === '' ? 'no description' : description}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('analyze', { deckID })}>
                <Text>{`${playLength} times play`}</Text>
              </TouchableOpacity>
              <Text>{`${recentMarks}`}</Text>
            </View>
          )
          : null}
      </View>
    );
  };

  const renderIcon = () => (
    <ProfileIcon userID={user} size={45} />
    // <Image
    //   source={{ uri: 'https://kyoiku.yomiuri.co.jp/MOT_9160.jpg' }}
    //   style={styles.icon}
    // />
  );

  const renderAttribution = () => (
    <TouchableOpacity
      onPress={() => Linking.openURL(thumbnail.user.link)}
      style={{ paddingLeft: wideIndent }}
    >
      <Text style={{ color: Color.gray2 }}>
        {`Photo by ${thumbnail.user.name} in Unsplash`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: Color.white1, paddingVertical: 10 }}>
      {renderTitle()}
      <View style={styles.belowContainer}>
        {renderLanguages()}
        {renderIcon()}
      </View>
      {renderAttribution()}
    </View>
  );
};

MenuUtility.propTypes = {
  deckGeneral: PropTypes.object.isRequired,
  accountContent: PropTypes.object.isRequired,
};

MenuUtility.defaultProps = {
};

export default MenuUtility;
