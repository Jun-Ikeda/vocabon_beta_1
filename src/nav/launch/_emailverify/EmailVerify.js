import React, { useEffect, useState } from 'react';
import {
  Alert, Platform, StyleSheet, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { deleteAccount, getFirebaseUser, sendEmail } from '../../../config/firebase/Firebase';
import { getAccountGeneral, saveAccountGeneral } from '../../../config/account/Account';
import { func, header } from '../../../config/Const';
import Icon from '../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: header.paddingTop,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const EmailVerify = (props) => {
  const { navigation } = props;
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getFirebaseUser();
      setEmailVerified(user.emailVerified);
      if (!user.emailVerified) sendEmail();
    })();
  }, []);

  return (
    <View style={style.container}>
      <Text>Email Verification</Text>
      <Text>{`Status: ${emailVerified ? 'Verified successfully' : 'Not yet verified'}`}</Text>
      <Button onPress={async () => {
        const user = await getFirebaseUser();
        setEmailVerified(user.emailVerified);
      }}
      >
        <Icon.Ionicons name="md-refresh-outline" style={{ fontSize: 24 }} />
      </Button>
      <Button disabled={!emailVerified} onPress={() => navigation.navigate('welcome')}>Start</Button>
    </View>
  );
};

EmailVerify.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EmailVerify;

// import React, { useEffect, useState } from 'react';

// import {
//   Alert, Platform, Text, View,
// } from 'react-native';
// import PropTypes from 'prop-types';
// import { deleteAccount, getFirebaseUser, sendEmail } from '../../../config/firebase/Firebase';
// import { getAccountGeneral, saveAccountGeneral } from '../../../config/account/Account';
// import { func } from '../../../config/Const';

// const EmailVerify = (props) => {
//   const { navigation } = props;
//   const [timer, setTimer] = useState(300);
//   const accountGeneral = getAccountGeneral();
//   const [emailVerified, setEmailVerified] = useState(accountGeneral.emailVerified);
//   let count = {};
//   let isManuallyGoBack = true;

//   const countDown = () => {
//     const user = getFirebaseUser();
//     setEmailVerified(user.emailVerified);
//     if (emailVerified) {
//       navigation.navigate('welcome');
//     }
//     if (timer === 0) {
//       isManuallyGoBack = false;
//       navigation.navigate('');
//     }
//     setTimer((pre) => pre - 1);
//   };

//   useEffect(() => {
//     const clear = () => clearInterval(count);
//     return clear;
//   }, []);

//   useEffect(() => {
//     if (emailVerified) {
//       navigation.navigate('welcome');
//     } else {
//       sendEmail();
//       count = setInterval(countDown, 1000);
//     }
//   }, []);

//   useEffect(() => navigation.addListener('beforeRemove', (e) => {
//     if (Platform.OS !== 'web' && isManuallyGoBack) {
//       e.preventDefault();
//       Alert.alert(
//         'Discard changes?',
//         'You have unsaved changes. Are you sure to discard them and leave the screen?',
//         [
//           { text: "Don't leave", style: 'cancel', onPress: () => {} },
//           {
//             text: 'Delete the account',
//             style: 'destructive',
//             onPress: async () => {
//               deleteAccount();
//               saveAccountGeneral({}, false);
//               navigation.dispatch(e.data.action);
//             },
//           },
//         ],
//       );
//     }
//   }),
//   [navigation, isManuallyGoBack]);

//   return (
//     <View>
//       <Text>EmailVerify</Text>
//       <Text>{timer}</Text>
//       <Text>{timer % 5 === 0 ? 'true' : 'false'}</Text>
//       <Text>{emailVerified ? 'true' : 'false'}</Text>
//     </View>
//   );
// };

// EmailVerify.propTypes = {
//   navigation: PropTypes.object.isRequired,
// };

// export default EmailVerify;
