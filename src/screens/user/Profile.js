import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ProfileIcon from '../../components/user/profileicon/ProfileIcon';
import {
  deleteAccountContent, deleteAccountContentAll, getAccountGeneral, saveAccountGeneral,
} from '../../config/account/Account';
import Color from '../../config/Color';
import { getUserGeneral } from '../../config/user/User';
// import ChangeProfile from '../../components/user/profileicon/ChangeProfile';
import { clearStorage, isLoggedInState } from '../../nav/Nav';
import {
  decksGeneral, deleteAllDecks, deleteDeck, getDeckGeneral,
} from '../../config/deck/Deck';
import { deleteAccount } from '../../config/firebase/Auth';
import { func } from '../../config/Const';

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
  const [changeProfileVisble, setChangeProfileVisble] = useState(false);

  const renderAuthButtons = () => {
    const buttons = [
      {
        title: 'Change Profile',
        onPress: () => (changeProfileVisble ? (setChangeProfileVisble(false)) : (setChangeProfileVisble(true))),
      },
      {
        title: 'Log out',
        onPress: async () => {
          await clearStorage();
          setIsLoggedIn(false);
        },
      },
      {
        title: 'Delete',
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
    ];
    return buttons.map((button, index) => (
      <View key={button.title.toLowerCase()}>
        {index !== 0 ? <Divider style={style.divider} /> : null}
        <List.Item
          style={style.itemContainer}
          title={button.title}
          titleStyle={style.text1}
          onPress={button.onPress}
          // left={() => <List.Icon icon={item.icon} color={Color.gray1} />}
        />
        {/* {button.render} */}
      </View>
    ));
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
        <ProfileIcon userID={userID} size={92} />
        <View style={{ flex: 1, paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 24 }}>{user.name}</Text>
        </View>
      </View>
      {isMe ? renderAuthButtons() : null}
    </View>
  );
};

export default Profile;
