import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Alert, Platform, ScrollView, LayoutAnimation,
} from 'react-native';
import { Divider, List, Button } from 'react-native-paper';
import { useRecoilState, useSetRecoilState } from 'recoil';

import ProfileIcon from '../../components/user/profileicon/ProfileIcon';
import {
  deleteAccountContent, deleteAccountContentAll, getAccountGeneral, saveAccountGeneral,
} from '../../config/account/Account';
import Color from '../../config/Color';
import { getUserGeneral } from '../../config/user/User';
import { clearStorage, isLoggedInState } from '../../nav/Nav';
import {
  decksGeneral, deleteAllDecks, deleteDeck, getDeckGeneral,
} from '../../config/deck/Deck';
import { deleteAccount } from '../../config/firebase/Auth';
import { func } from '../../config/Const';
import ProfileChange from './ProfileChange';

const style = StyleSheet.create({
  itemContainer: {
    marginTop: 10,
    // borderWidth: 2,
    borderRadius: 10,
    // backgroundColor: Color.white1,
  },
  text1: {
    fontSize: 20,
    color: Color.gray1,
  },
  divider: { backgroundColor: Color.gray3, height: 1.5, opacity: 0.5 },
  startButtonContainer: {
    position: 'absolute', bottom: 0, right: 0, left: 0, padding: 15,
  },
});

const Profile = (props) => {
  const { navigation, route: { params: { userID } } } = props;
  const accountGeneral = getAccountGeneral();
  const isMe = accountGeneral.userID === userID;
  const user = getUserGeneral(userID);
  const [deckGeneral, setDeckGeneral] = useRecoilState(decksGeneral);

  // recoil
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  // state
  const [isChanged, setIsChanged] = useState(false);
  const [changeProfileVisible, setChangeProfileVisible] = useState(false);
  const [inputState, setInputState] = useState(accountGeneral.name);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    if (!(Platform.OS === 'web') && isChanged) {
      e.preventDefault();
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Save',
            onPress: async () => {
              await save();
              navigation.dispatch(e.data.action);
            },
          },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        ],
      );
    }
  }),
  [navigation, isChanged]);

  const save = async () => {
    await setIsChanged(false);
    await saveAccountGeneral({ name: inputState });
  };

  const renderAuthButtons = () => {
    const buttons = [
      {
        title: 'Change Profile',
        onPress: () => {
          setChangeProfileVisible(!changeProfileVisible);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        },
        render: (changeProfileVisible ? (
          <ProfileChange
            accountGeneral={accountGeneral}
            inputState={inputState}
            setInputState={setInputState}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
            // user={user}
          />
        ) : null),
        titleStyle: style.text1,
      },
      {
        title: 'Log out',
        onPress: () => {
          Alert.alert('Caution', 'Would you really want to log out?', [
            { text: 'cancel', style: 'cancel', onPress: () => {} },
            {
              text: 'log out',
              onPress: async () => {
                await clearStorage();
                setIsLoggedIn(false);
              },
            },
          ]);
        },
        render: null,
        titleStyle: style.text1,
      },
      {
        title: 'Delete',
        onPress: () => {
          Alert.alert('Caution', 'Would you really want to delete your account?', [
            { text: 'cancel', style: 'cancel', onPress: () => {} },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  deleteAllDecks(setDeckGeneral);
                  deleteAccountContentAll();
                  saveAccountGeneral({}, false);
                  await deleteAccount();
                  setIsLoggedIn(false);
                } catch (error) {
                  func.alertConsole(error);
                }
              },
            },
          ]);
        },
        render: null,
        titleStyle: { color: Color.red1, fontSize: 20 },
      },
    ];
    return buttons.map((button, index) => (
      <View key={button.title.toLowerCase()}>
        {index !== 0 ? <Divider style={style.divider} /> : null}
        <List.Item
          style={style.itemContainer}
          title={button.title}
          titleStyle={button.titleStyle}
          onPress={button.onPress}
          // left={() => <List.Icon icon={item.icon} color={Color.gray1} />}
        />
        {button.render}
      </View>
    ));
  };

  const renderSaveButton = () => (
    <View style={style.startButtonContainer}>
      <Button
        onPress={async () => {
          // func.alert(JSON.stringify(list, null, 2));
          await save();
          navigation.goBack();
        }}
        color={Color.green2}
        mode="contained"
        disabled={!isChanged}
      >
        Save
      </Button>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
        <ProfileIcon userID={userID} size={92} />
        <View style={{ flex: 1, paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 24 }}>{user.name}</Text>
        </View>
      </View>
      {!contentVisible ? renderSaveButton() : null}
      <ScrollView>{isMe ? renderAuthButtons() : null}</ScrollView>
    </View>
  );
};

export default Profile;
