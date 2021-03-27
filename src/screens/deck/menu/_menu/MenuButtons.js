import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';

import { useRecoilState } from 'recoil';
import Color from '../../../../config/Color';

import Icon from '../../../../components/Icon';
import {
  decksGeneral, deleteDeck, getDeckContent, getDeckGeneral, saveDeckContent, saveDeckGeneral,
} from '../../../../config/deck/Deck';
import {
  deleteAccountContent, getAccountContent, getAccountGeneral, saveAccountContent,
} from '../../../../config/account/Account';
import { func } from '../../../../config/Const';
import UUID from '../../../../config/UUID';

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
/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!注意 グローバル変数への保存がある!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
bookmark
  ローカルstate ユーザーが切り替える度
    const [bookmark, setBookmark] = useState(accountContent.bookmark);
  グローバルstate 画面遷移時、変更があった場合更新
    useEffect(() => {...}, [navigation])
delete
  ローカルstate 削除されるとisDeleteがtrueに
  グローバルstate 削除されるとdeckGeneral, deckContent, accountContentから削除, 即座にhomeに戻る
*/
const MenuButtons = (props) => {
  // props
  const { navigation, deckID } = props;
  // recoil
  const [decksGeneralState, setDecksGeneralState] = useRecoilState(decksGeneral);
  //
  const deckGeneral = getDeckGeneral(decksGeneralState, deckID);
  const deckContent = getDeckContent(deckID);
  const accountContent = getAccountContent(deckID);
  const accountGeneral = getAccountGeneral();
  const identifyVisible = (deckGeneral.user === getAccountGeneral().userID);
  // state
  const [visible, setVisible] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [bookmark, setBookmark] = useState(accountContent.bookmark);

  useEffect(() => navigation.addListener('state', (e) => {
    if ((bookmark !== accountContent.bookmark) && (!isDeleted)) {
      saveAccountContent(deckID, { bookmark }, true);
    }
  }),
  [navigation, bookmark, isDeleted]);

  const deleteDeckAndAccountContent = async () => {
    setIsDeleted(true);
    await deleteDeck(setDecksGeneralState, deckID, deckGeneral);
    await deleteAccountContent(deckID);
    navigation.goBack();
  };

  const renderColumn = (buttons) => (
    <View style={style.container}>
      {buttons.map((button) => (
        // <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[style.button]}
          onPress={button.onPress}
          key={button.title.toLowerCase()}
        >
          {button.icon()}
          <Text style={[style.title, button.textStyle]}>{button.title}</Text>
        </TouchableOpacity>
        // </View>
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
        flex: 1,
      },
      {
        title: 'Analyze',
        icon: () => <Icon.Entypo name="line-graph" size={iconsize} style={style.icon} />,
        onPress: () => navigation.navigate('analyze', { deckID }),
        textStyle: {},
        flex: 1,
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
            func.alert('You cannot edit this deck.');
          }
        },
        textStyle: { color: identifyVisible ? Color.black : Color.gray3 },
        flex: 1,
      },
      // {
      //   title: visible ? 'Close' : 'More',
      //   icon: () => (
      //     <Icon.Feather
      //       name={visible ? 'chevron-up' : 'chevron-down'}
      //       style={style.icon}
      //       size={iconsize}
      //     />
      //   ),
      //   onPress: () => {
      //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      //     setVisible(!visible);
      //     // console.log(deckGeneral.user);
      //     // console.log('hi');
      //   },
      //   textStyle: {},
      //   flex: 1,
      // },
    ];
    return renderColumn(buttons);
  };

  const renderMoreButtons = () => {
    const buttonsMultiDim = [
      [
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
          },
          textStyle: { color: identifyVisible ? Color.black : Color.gray3 },
          flex: 1,
        },
        {
          title: 'Bookmark',
          icon: () => (
            <Icon.MaterialCommunityIcons
              name={bookmark ? 'bookmark-check' : 'bookmark-outline'}
              style={[style.icon, { color: bookmark ? Color.red2 : 'black' }]}
              size={iconsize}
            />
          ),
          onPress: () => setBookmark(!bookmark),
          textStyle: {},
          flex: 1,
        },
        {
          title: 'Duplicate',
          icon: () => <Icon.Feather name="copy" size={iconsize} style={[style.icon, { /* color: Color.gray3 */ }]} />,
          onPress: async () => {
            const num = func.convertObjectToArray(decksGeneralState).filter((vocab) => vocab.value.user === accountGeneral.userID).length;
            if (num >= 10) {
              Alert.alert('Storage is full', 'You can save up to 10 decks.');
            } else {
              const newDeckID = UUID.generate(10);
              const newDeckGeneral = { ...deckGeneral, user: accountGeneral?.userID };
              await saveDeckGeneral(setDecksGeneralState, newDeckID, newDeckGeneral);
              await saveDeckContent(newDeckID, deckContent);
              navigation.goBack();
            }
          },
          textStyle: { /* color: Color.gray3 */ },
          flex: 1,
        },
      ],
      [
        // {
        //   title: 'Share',
        //   icon: () => <Icon.Entypo name="share" size={iconsize} style={[style.icon, { color: Color.gray3 }]} />,
        //   onPress: () => func.alert('share'),
        //   textStyle: { color: Color.gray3 },
        //   flex: 1,
        // },
        // {
        //   title: 'Test',
        //   icon: () => <Icon.AntDesign name="checkcircleo" size={iconsize} style={style.icon} />,
        //   onPress: () => func.alert('test'),
        //   textStyle: {},
        // flex: 1
        // },
        {
          title: 'Import',
          icon: () => (
            <Icon.Feather
              name="download"
              size={iconsize}
              style={[style.icon, { color: identifyVisible ? Color.black : Color.gray3 }]}
            />
          ),
          onPress: () => {
            if (identifyVisible) {
              navigation.navigate('import', { deckID });
            } else {
              func.alert('You cannot import data to this deck.');
            }
          },
          textStyle: { color: identifyVisible ? Color.black : Color.gray3 },
          flex: 1,
        },
        {
          title: 'Export',
          icon: () => <Icon.Feather name="upload" size={iconsize} style={style.icon} />,
          onPress: () => navigation.navigate('export', { deckID }),
          textStyle: {},
          flex: 1,
        },
        {
          title: 'Delete',
          icon: () => <Icon.FontAwesome name="trash" size={iconsize} style={[style.icon, { color: Color.cud.pink }]} />,
          onPress: () => func.alert('Caution', 'Are you sure to delete this deck?', [{
            text: 'Delete',
            onPress: deleteDeckAndAccountContent,
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          }]),
          textStyle: { color: Color.cud.pink },
          flex: 2,
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
};

MenuButtons.defaultProps = {

};

export default MenuButtons;
