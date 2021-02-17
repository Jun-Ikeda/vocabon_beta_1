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
    backgroundColor: Color.green2,
  },

  margecontainer: {
    flexDirection: 'row',
  },

  mainText: {
    fontSize: 48,
    color: Color.white1,
    margin: 20,
  },

  subText: {
    fontSize: 24,
    color: Color.white1,
    marginVertical: 30,
  },

  refleshbuttoncontainer: {
    // flex: 1,
    marginVertical: 24,
    marginHorizontal: 5,
    borderRadius: 50,
    padding: 5,
    // backgroundColor: Color.defaultBackground,
  },

  startbuttoncontainer: {
    // flex: 1,
    margin: 20,
    borderRadius: 20,
    padding: 10,
    backgroundColor: Color.defaultBackground,
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
      if (!user.emailVerified) {
        Alert.alert('Sent an email', 'Check your inbox!');
        sendEmail();
      }
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

  if (loading) {
    return (
      <ActivityIndicator
        animating={loading}
        color={Color.gray1}
        size="large"
      />
    );
  }
  return (
    <View style={style.container}>
      <Text style={style.mainText}>Email Verification</Text>
      <View style={style.margecontainer}>
        <Text style={style.subText}>{`Status: ${emailVerified ? 'Verified successfully' : 'Not yet verified'}`}</Text>
        <TouchableOpacity
          style={style.refleshbuttoncontainer}
          onPress={async () => {
            const user = await getFirebaseUser();
            setEmailVerified(user.emailVerified);
          }}
          mode="contained"
        >
          <Icon.Ionicons name="md-refresh-outline" style={[{ fontSize: 24, color: Color.defaultBackground }]} />
        </TouchableOpacity>
      </View>
      <Button
        color={Color.white1}
        mode="contained"
        style={{ padding: 10 }}
        disabled={!emailVerified}
        onPress={() => {
          console.log('aiueo');
          saveAccountGeneral({ emailVerified: true });
          navigation.navigate('welcome');
        }}
      >
        Start
      </Button>
      <TouchableOpacity
        style={style.resendbuttoncontainer}
        onPress={() => sendEmail()}
      >
        <Text style={{ fontSize: 20, color: Color.white1 }}>Resend an email</Text>
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
