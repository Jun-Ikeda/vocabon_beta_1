import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Linking, StyleSheet, LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from '../../../../config/Color';
import ProfileIcon from '../../../../components/user/profileicon/ProfileIcon';

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
  const { deckGeneral, accountContent } = props;
  // state
  const [expand, setExpand] = useState(false);
  //
  const {
    user, title, language, thumbnail, num, description,
  } = deckGeneral;

  const renderTitle = () => (
    <View>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );

  const renderLanguages = () => {
    const langs = [
      { title: 'Definition in ', value: language.definition },
      { title: 'Term in ', value: language.term },
    ];
    const playLength = accountContent.play.length;
    const recentMarks = Object.values(accountContent.marks).filter((mark) => mark.includes(playLength - 1)).length;
    return (
      <View style={{ flex: 1 }}>
        {langs.map((lang) => (
          <Text>
            {lang.title}
            <Text style={styles.languageBold}>{lang.value}</Text>
          </Text>
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
              <Text style={description === '' ? { color: Color.gray2, fontStyle: 'italic' } : null}>{description === '' ? 'no description' : description}</Text>
              <Text>{`${playLength} times play`}</Text>
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

/* class DeckMenuUtilities extends Component {
  render() {
    const { language, title, user } = this.props;
    return (
      <View style={{ backgroundColor: Color.white1, paddingVertical: 10 }}>
        <View>
          <Text style={{
            fontSize: titleFontSize,
            paddingLeft: narrowIndent,
          }}
          >
            {title}
          </Text>
        </View>
        <View style={{
          fontSize: normalFontSize,
          paddingHorizontal: wideIndent,
          paddingVertical: 5,
          flexDirection: 'row',
        }}
        >
          <View style={{ flex: 1 }}>
            <Text>
              Definition in
              <Text style={{
                fontSize: normalFontSize * 1.2,
                fontWeight: 'bold',
              }}
              >
                {` ${language.definition}`}
              </Text>
            </Text>
            <Text>
              Term in
              <Text style={{
                fontSize: normalFontSize * 1.2,
                fontWeight: 'bold',
              }}
              >
                {` ${language.term}`}
              </Text>
            </Text>
          </View>
          <Image
            source={{ uri: 'https://kyoiku.yomiuri.co.jp/MOT_9160.jpg' }}
            style={
            {
              // borderRadius: cardStyle.height * 0.25,
              // height: cardStyle.height * 0.2,
              // width: cardStyle.height * 0.2,
              // position: 'absolute',
              // marginTop: 50,
              // marginLeft: 230,
              // right: 30,
              borderRadius: 45,
              height: 45,
              width: 45,
            }
          }
          />
        </View>
        <TouchableOpacity // renderAttribution()
          onPress={() => Linking.openURL(user.link)}
          style={{
            fontSize: normalFontSize,
            paddingLeft: wideIndent,
          }}
        >
          <Text style={{
            color: Color.gray2,
          }}
          >
            {`Photo by ${user.name} in Unsplash`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
} */
