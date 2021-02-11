import React, { useEffect } from 'react';

import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSetRecoilState } from 'recoil';
import { saveAccountGeneral } from '../../../config/account/Account';
import { header } from '../../../config/Const';

import { isLoggedInState } from '../../Nav';

const Welcome = (props) => {
  const { navigation } = props;

  const setIsLoggedin = useSetRecoilState(isLoggedInState);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
  }),
  [navigation]);

  return (
    <View style={{ flex: 1, paddingTop: header.paddingTop }}>
      <Text>Welcome</Text>
      <Button onPress={() => {
        saveAccountGeneral({ loggedin: true });
        setIsLoggedin(true);
      }}
      >
        Start
      </Button>
    </View>
  );
};

export default Welcome;
