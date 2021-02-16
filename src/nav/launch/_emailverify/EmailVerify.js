import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert, Platform, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { deleteAccount, getFirebaseUser, sendEmail } from '../../../config/firebase/Auth';
import { getAccountGeneral, saveAccountGeneral } from '../../../config/account/Account';
import { func, header } from '../../../config/Const';
import Icon from '../../../components/Icon';
import Color from '../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: header.paddingTop,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttoncontainer: {
    flex: 1,
    // paddingTop: header.paddingTop,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.defaultBackground,
  },

  mainText: {
    fontSize: 48,
    color: Color.black,
    margin: 20,
  },

  subText: {
    fontSize: 30,
    color: Color.black,
    margin: 20,
  },

  refleshbuttoncontainer: {
    margin: 10,
    borderRadius: 50,
    padding: 5,
  },

  startbuttoncontainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    padding: 50,
    backgroundColor: Color.green2,
  },

  resendbuttoncontainer: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
});

const EmailVerify = (props) => {
  const { navigation } = props;
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await getFirebaseUser();
      setEmailVerified(user.emailVerified);
      if (!user.emailVerified) sendEmail();
      setLoading(false);
    })();
  }, []);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    if (Platform.OS !== 'web') {
      e.preventDefault();
      Alert.alert(
        'Delete Your Account?',
        'Please delete your account if you recreate an account again.',
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

  // if (loading) {
  //   return (
  //     <ActivityIndicator
  //       animating={loading}
  //       color={Color.gray1}
  //       size="large"
  //     />
  //   );
  // }
  return (
    <View style={style.container}>
      <Text style={style.mainText}>Email Verification</Text>
      <Text style={style.subText}>{`Status: ${emailVerified ? 'Verified successfully' : 'Not yet verified'}`}</Text>
      <TouchableOpacity
        // style={{
        //   width: 220, height: 36, borderRadius: 20, backgroundColor: Color.purple,
        // }}
        style={style.startbuttoncontainer}
        disabled={!emailVerified}
        // mode="contained"
        onPress={() => {
          console.log('aiueo');
          saveAccountGeneral({ emailVerified: true });
          navigation.navigate('welcome');
        }}
      >
        <Text style={{ fontSize: 60 }}>Start</Text>
        {/* <Icon.AntDesign name="playcircleo" /> */}
      </TouchableOpacity>
      <Button
        style={style.refleshbuttoncontainer}
        onPress={async () => {
          const user = await getFirebaseUser();
          setEmailVerified(user.emailVerified);
        }}
        color={Color.green2}
        mode="contained"
      >
        <Icon.Ionicons name="md-refresh-outline" style={{ fontSize: 36 }} />
      </Button>
      <TouchableOpacity
        style={style.resendbuttoncontainer}
        onPress={() => sendEmail()}
      >
        {/* 認証用のメールを再送信 */}
        <Text style={{ fontSize: 20 }}>Resend an email</Text>
      </TouchableOpacity>
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
