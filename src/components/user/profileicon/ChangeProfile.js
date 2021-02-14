import React from 'react';
import { Text, View } from 'react-native';

const ChangeProfile = (props) => {
  const { changeProfileVisble, setChangeProfileVisble } = props;
  return (
    changeProfileVisble ? (
      <View>
        <Text>ChangeProfile</Text>
      </View>
    ) : null
  );
};

export default ChangeProfile;
