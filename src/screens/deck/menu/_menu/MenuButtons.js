import React, { useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, LayoutAnimation, Alert,
} from 'react-native';
import PropTypes from 'prop-types';

import Color from '../../../../config/Color';

import Icon from '../../../../components/Icon';

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
  // state
  const [visible, setVisible] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

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
        icon: () => <Icon.Ionicons name="md-list" size={iconsize} style={style.icon} />,
        onPress: () => navigation.navigate('property', { deckID }),
        textStyle: {},
      },
      {
        title: 'Edit',
        icon: () => <Icon.Feather name="edit" size={iconsize} style={style.icon} />,
        onPress: () => navigation.navigate('edit', { deckID }),
        textStyle: {},
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
          title: bookmarked ? 'bookmarked!!' : 'bookmark',
          icon: () => (
            <Icon.FontAwesome
              name={bookmarked ? 'bookmark' : 'bookmark-o'}
              style={style.icon}
              size={iconsize}
            />
          ),
          onPress: () => setBookmarked(!bookmarked),
          textStyle: {},
        },
        {
          title: 'Import',
          icon: () => <Icon.Feather name="download" size={iconsize} style={style.icon} />,
          onPress: () => alert('import'),
          textStyle: {},
        },
        {
          title: 'Export',
          icon: () => <Icon.Feather name="upload" size={iconsize} style={style.icon} />,
          onPress: () => alert('export'),
          textStyle: {},
        },
        {
          title: 'Duplicate',
          icon: () => <Icon.Feather name="copy" size={iconsize} style={style.icon} />,
          onPress: () => alert('duplicate'),
          textStyle: {},
        },
      ],
      [
        {
          title: 'Share',
          icon: () => <Icon.Entypo name="share" size={iconsize} style={style.icon} />,
          onPress: () => alert('share'),
          textStyle: {},
        },
        {
          title: 'Test',
          icon: () => <Icon.AntDesign name="checkcircleo" size={iconsize} style={style.icon} />,
          onPress: () => alert('test'),
          textStyle: {},
        },
        {
          title: 'Analyze',
          icon: () => <Icon.Entypo name="line-graph" size={iconsize} style={style.icon} />,
          onPress: () => alert('analyze'),
          textStyle: {},
        },
        {
          title: 'Delete',
          icon: () => <Icon.FontAwesome name="trash" size={iconsize} style={[style.icon, { color: Color.cud.pink }]} />,
          onPress: () => Alert.alert('Are you sure to delete this deck?'),
          textStyle: { color: Color.cud.pink },
        },
      ],
    ];
    if (visible) {
      return buttonsMultiDim.map((buttons) => renderColumn(buttons));
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
};

MenuButtons.defaultProps = {

};

export default MenuButtons;
