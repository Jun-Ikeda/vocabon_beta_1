import React, { useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, LayoutAnimation, Alert,
} from 'react-native';
import PropTypes from 'prop-types';

import { useRecoilValue } from 'recoil';
import Color from '../../../../config/Color';

import Icon from '../../../../components/Icon';
import { decksGeneral } from '../../../../config/deck/Deck';
import { account } from '../../../../config/account/Account';
import { func } from '../../../../config/Const';

const iconsize = 30;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: iconsize / 3,
    backgroundColor: Color.white1,
    paddingVertical: 5,
    margin: 3,
  },
});

/**
 * MenuButton Component in Menu Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <MenuButton
 *    navigation={navigation}
 *    deckID="string"
 * />
 * props: { navigation, deckID }
 * recoil: {}
 * state: { visible, bookmarked }
 *
 * ```
 */
const MenuButtons = (props) => {
  // props
  const { navigation, deckID } = props;
  // recoil
  const decksGeneralState = useRecoilValue(decksGeneral);
  // state
  const [visible, setVisible] = useState(false);
  const [bookmarked, setBookmarked] = useState(account.content[deckID].bookmark);

  //
  const deckGeneral = decksGeneralState[deckID];
  const identifyVisible = (deckGeneral.user === account?.general?.userID);

  const renderColumn = (buttons) => (
    <View style={style.container}>
      {buttons.map((button) => (
        <TouchableOpacity
          style={[style.button]}
          onPress={button.onPress}
          key={button.title.toLowerCase()}
        >
          {button.icon()}
          <Text style={[style.title, button.textStyle]}>{button.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMainButtons = () => {
    const buttons = [
      {
        title: 'Play',
        icon: () => <Icon.Feather name="play" size={iconsize} style={style.icon} />,
        onPress: () => navigation.push('options', { deckID }),
        textStyle: {},
      },
      {
        title: 'Property',
        icon: () => (
          <Icon.Ionicons
            name="md-list"
            size={iconsize}
            style={[style.icon, { color: identifyVisible ? Color.black : Color.gray3 }]}
          />
        ),
        onPress: () => {
          if (identifyVisible) {
            navigation.navigate('property', { deckID });
          } else {
            func.alert('You cannot change the property of this deck.');
          }
          console.log(identifyVisible);
        },
        textStyle: { color: identifyVisible ? Color.black : Color.gray3 },
      },
      {
        title: 'Edit',
        icon: () => (
          <Icon.Feather
            name="edit"
            size={iconsize}
            style={[style.icon, { color: identifyVisible ? Color.black : Color.gray3 }]}
          />
        ),
        onPress: () => {
          if (identifyVisible) {
            navigation.navigate('edit', { deckID });
          } else {
            func.alert('You cannot change the edit of this deck.');
          }
        },
        textStyle: { color: identifyVisible ? Color.black : Color.gray3 },
      },
      {
        title: visible ? 'Close' : 'More',
        icon: () => (
          <Icon.Feather
            name={visible ? 'chevron-up' : 'chevron-down'}
            style={style.icon}
            size={iconsize}
          />
        ),
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setVisible(!visible);
          // console.log(deckGeneral.user);
          // console.log('hi');
        },
        textStyle: {},
      },
    ];
    return renderColumn(buttons);
  };

  const renderMoreButtons = () => {
    const buttonsMultiDim = [
      [
        {
          title: 'Bookmark',
          icon: () => (
            <Icon.MaterialCommunityIcons
              name={bookmarked ? 'bookmark-check' : 'bookmark-outline'}
              style={[style.icon, { color: bookmarked ? Color.red2 : 'black' }]}
              size={iconsize}
            />
          ),
          onPress: () => setBookmarked(!bookmarked),
          textStyle: {},
        },
        {
          title: 'Duplicate',
          icon: () => <Icon.Feather name="copy" size={iconsize} style={style.icon} />,
          onPress: () => func.alert('duplicate'),
          textStyle: {},
        },
        {
          title: 'Import',
          icon: () => <Icon.Feather name="download" size={iconsize} style={style.icon} />,
          onPress: () => func.alert('import'),
          textStyle: {},
        },
        {
          title: 'Export',
          icon: () => <Icon.Feather name="upload" size={iconsize} style={style.icon} />,
          onPress: () => navigation.navigate('export'),
          textStyle: {},
        },
      ],
      [
        {
          title: 'Share',
          icon: () => <Icon.Entypo name="share" size={iconsize} style={style.icon} />,
          onPress: () => func.alert('share'),
          textStyle: {},
        },
        {
          title: 'Test',
          icon: () => <Icon.AntDesign name="checkcircleo" size={iconsize} style={style.icon} />,
          onPress: () => func.alert('test'),
          textStyle: {},
        },
        {
          title: 'Analyze',
          icon: () => <Icon.Entypo name="line-graph" size={iconsize} style={style.icon} />,
          onPress: () => navigation.navigate('analyze', { deckID }),
          textStyle: {},
        },
        {
          title: 'Delete',
          icon: () => <Icon.FontAwesome name="trash" size={iconsize} style={[style.icon, { color: Color.cud.pink }]} />,
          onPress: () => func.alert('Are you sure to delete this deck?'),
          textStyle: { color: Color.cud.pink },
        },
      ],
    ];
    if (visible) {
      return buttonsMultiDim.map((buttons) => (
        <View key={buttons[0].title.toLowerCase()}>
          {renderColumn(buttons)}
        </View>
      ));
    }
    return null;
  };

  return (
    <View>
      {renderMainButtons()}
      {renderMoreButtons()}
    </View>
  );
};

MenuButtons.propTypes = {
  navigation: PropTypes.object.isRequired,
  deckID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

MenuButtons.defaultProps = {

};

export default MenuButtons;
