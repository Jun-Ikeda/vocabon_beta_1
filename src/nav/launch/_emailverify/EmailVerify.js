import React, { useEffect, useState } from 'react';

import {
  Alert, Platform, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { deleteAccount, getFirebaseUser } from '../../../config/firebase/Firebase';
import { getAccountGeneral, saveAccountGeneral } from '../../../config/account/Account';

const EmailVerify = (props) => {
  const { navigation } = props;
  const [timer, setTimer] = useState(300);
  const accountGeneral = getAccountGeneral();
  const [emailVefified, setEmailVefified] = useState(accountGeneral.emailVerified);
  let count = {};

  const countDown = () => {
    setTimer((pre) => pre - 1);
    if (timer % 5) {
      const user = getFirebaseUser();
      setEmailVefified(user.emailVerified);
    }
  };

  useEffect(() => {
    if (emailVefified) {
      navigation.navigate('main');
    } else {
      count = setInterval(countDown, 1000);
    }
  }, []);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    if (Platform.OS !== 'web') {
      e.preventDefault();
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Delete the account',
            style: 'destructive',
            onPress: async () => {
              deleteAccount();
              saveAccountGeneral({}, false);
              navigation.dispatch(e.data.action);
            },
          },
        ],
      );
    }
  }),
  [navigation]);

  return (
    <View>
      <Text>EmailVerify</Text>
    </View>
  );
};

EmailVerify.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EmailVerify;
