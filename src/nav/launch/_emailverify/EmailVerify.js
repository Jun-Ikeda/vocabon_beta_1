import React, { useEffect } from 'react';

import {
  Alert, Platform, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../../config/firebase/Firebase';
import { saveAccountGeneral } from '../../../config/account/Account';

const EmailVerify = (props) => {
  const { navigation } = props;

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
