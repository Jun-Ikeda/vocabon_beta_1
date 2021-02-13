import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import ProfileIcon from '../../components/user/profileicon/ProfileIcon';
import { getAccountGeneral } from '../../config/account/Account';
import Color from '../../config/Color';
import { getUserGeneral } from '../../config/user/User';

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

  const renderAuthButtons = () => {
    const buttons = [
      { title: 'Change Profile', onPress: () => {} },
      { title: 'Log out', onPress: () => {} },
      { title: 'Delete', onPress: () => {} },
    ];
    return buttons.map((button, index) => (
      <View>
        {index !== 0 ? <Divider style={style.divider} /> : null}
        <List.Item
          style={style.itemContainer}
          title={button.title}
          titleStyle={style.text1}
          // onPress={() => navigation.navigate(item.nav)}
          // left={() => <List.Icon icon={item.icon} color={Color.gray1} />}
        />
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
