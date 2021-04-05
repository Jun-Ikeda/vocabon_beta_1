import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, Alert, Platform, ScrollView, LayoutAnimation, Linking,
} from 'react-native';
import { Divider, List, Button } from 'react-native-paper';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { TouchableOpacity } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import ProfileIcon from '../../components/user/profileicon/ProfileIcon';
import {
  deleteAccountContent, deleteAccountContentAll, getAccountGeneral, saveAccountGeneral, logout,
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
import HTMLContent from '../../nav/launch/_termsandconditions/HTMLContent';

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
  button: {
    borderRadius: 5,
  },
  suggestionContainer: {
    // alignItems: 'center',
    marginLeft: 18,
  },
});

const Profile = (props) => {
  const { navigation, route: { params: { userID } } } = props;
  const accountGeneral = getAccountGeneral();
  const isMe = accountGeneral.userID === userID;
  const user = getUserGeneral(userID);
  const [deckGeneral, setDeckGeneral] = useRecoilState(decksGeneral);
  const isMame = accountGeneral.name === 'まめ学生' || accountGeneral.name.toLowerCase() === 'Bean Student' || accountGeneral.name === 'まめ' || accountGeneral.name.toLowerCase() === 'student' || accountGeneral.name.toLowerCase() === 'students';

  // recoil
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  // state
  const [isChanged, setIsChanged] = useState(false);
  const [conditionsVisble, setConditionsVisble] = useState(false);
  const [changeProfileVisible, setChangeProfileVisible] = useState(false);
  const [inputState, setInputState] = useState(accountGeneral.name);
  // const [contentVisible, setContentVisible] = useState(false);

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
          />
        ) : null),
        titleStyle: style.text1,
      },
      {
        title: 'Contact us',
        render: null,
        titleStyle: style.text1,
        onPress: () => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSd0GgwtmG0PYp3sN224qERPWjQqC0WgyniGg2ZxlkfeDseung/viewform?usp=sf_link'),
      },
      {
        title: 'Terms and Conditions',
        render: (conditionsVisble ? (
          <View style={{ height: 500, padding: 25, paddingBottom: 5 }}>
            <WebView
              originWhitelist={['*']}
              source={{ html: HTMLContent }}
            />
          </View>
        ) : null),
        onPress: () => {
          setConditionsVisble(!conditionsVisble);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        },
        titleStyle: style.text1,
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
                logout();
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

    if (accountGeneral.name === 'Guest User') {
      return (
        <Button
          mode="contained"
          style={[style.button, { margin: 30 }]}
          color={Color.green2}
          onPress={() => {
            saveAccountGeneral({ name: '', loggedin: false });
            setIsLoggedIn(false);
          }}
        >
          Sign Up / Log In
        </Button>
      );
    }
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
    (accountGeneral.name !== 'Guest User' ? (
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
    ) : null)
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
        <ProfileIcon userID={userID} size={92} />
        <View style={{ flex: 1, paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 24 }}>{accountGeneral.name === 'Guest User' ? accountGeneral.name : user.name}</Text>
        </View>
      </View>
      {isMame ? (
        <TouchableOpacity style={style.suggestionContainer} onPress={() => Linking.openURL('https://store.line.me/stickershop/product/8294183/ja')}>
          <Text style={{ color: Color.gray2, fontSize: 16 }}>Purchase his Line Stamp here!!</Text>
        </TouchableOpacity>
      ) : null}
      <ScrollView>{isMe ? renderAuthButtons() : null}</ScrollView>
      {renderSaveButton()}
    </View>
  );
};

export default Profile;
