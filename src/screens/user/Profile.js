import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Alert, Platform, ScrollView, LayoutAnimation, Linking,
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
  divider: { backgroundColor: Color.gray3, height: 1.5, opacity: 0.8 },
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

  const save = async () => {
    await saveAccountGeneral({ name: inputState });
    Alert.alert('It takes time to update the changes', '');
  };

  // useEffect(() => navigation.addListener('beforeRemove', (e) => {
  //   // alert(isChanged);
  //   if (!(Platform.OS === 'web') && isChanged) {
  //     e.preventDefault();
  //     Alert.alert(
  //       'Discard changes?',
  //       'You have unsaved changes. Are you sure to discard them and leave the screen?',
  //       [
  //         { text: "Don't leave", style: 'cancel', onPress: () => {} },
  //         {
  //           text: 'Save',
  //           onPress: async () => {
  //             await save();
  //             navigation.dispatch(e.data.action);
  //           },
  //         },
  //         { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
  //       ],
  //     );
  //   }
  // }),
  // [navigation, isChanged]);

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
        title: 'Contact Us',
        render: null,
        titleStyle: style.text1,
        onPress: () => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSd0GgwtmG0PYp3sN224qERPWjQqC0WgyniGg2ZxlkfeDseung/viewform?usp=sf_link'),
      },
      {
        title: 'Log Out',
        onPress: () => {
          Alert.alert('Caution', 'Would you really want to Log Out?', [
            { text: 'Cancel', style: 'cancel', onPress: () => {} },
            {
              text: 'Log Out',
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
          Alert.alert('Caution', 'Would you really want to delete your account and whole decks data?', [
            { text: 'Cancel', style: 'cancel', onPress: () => {} },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                Alert.alert('Caution', 'ARE YOU REALLY SURE?YOU CANNOT RECOVER YOUR DATA', [
                  { text: 'Cancel', style: 'cancel', onPress: () => {} },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        deleteAllDecks(setDeckGeneral, deckGeneral);
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
            },
          ]);
        },

        render: null,
        titleStyle: { color: Color.cud.red, fontSize: 20 },
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
        />
        {button.render}
      </View>
    ));
  };

  const renderSaveButton = () => (
    <View style={style.startButtonContainer}>
      <Button
        onPress={async () => {
          setIsChanged(false);
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
      <ScrollView>{isMe ? renderAuthButtons() : null}</ScrollView>
      {renderSaveButton()}
    </View>
  );
};

export default Profile;
