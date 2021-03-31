import React, { useState } from 'react';
import {
  Text, View, StyleSheet, Alert, LayoutAnimation, Linking,
} from 'react-native';
import {
  TextInput, Button, List, Divider,
} from 'react-native-paper';
import { updateEmail } from '../../config/firebase/Auth';
import { auth } from '../../config/firebase/Firebase';
import Color from '../../config/Color';
import { saveAccountGeneral } from '../../config/account/Account';

const style = StyleSheet.create({
  content: {
    // flex: 1,
    padding: 20,
  },
  name: {
    // margin: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  email: {
    marginVertical: 10,
    marginLeft: 20,
  },
  signupButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  signupButton: {
    width: 220,
    height: 40,
    borderRadius: 20,
  },
  divider: {
    backgroundColor: Color.gray3,
    height: 1.5,
    opacity: 0.8,
    marginLeft: 10,
  },
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
  list: {
    // marginLeft: 5,
  },

});

const ProfileChange = (props) => {
  const {
    accountGeneral, inputState, setInputState, isChanged, setIsChanged,
  } = props;
  // const user = auth.currentUser;
  // state
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [isChangedEmail, setIsChangedEmail] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const [nameVisible, setNameVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);

  const renderName = () => (
    <View style={style.name}>
      <TextInput
        value={inputState}
        mode="outlined"
        label="Name"
        onChangeText={(newValue) => {
          setInputState(newValue);
          if (newValue.length !== 0) {
            setIsChanged(true);
          } else {
            setIsChanged(false);
          }
        }}
      />
    </View>
  );

  const renderEmailChange = () => (
    <View style={style.email}>
      <TextInput
        value={accountGeneral.email}
        mode="outlined"
        label="Present Address"
        dataDetectorTypes="address"
        editable={false}

      />
      <View style={{ height: 10 }} />
      <TextInput
        value={emailAddress}
        mode="outlined"
        label="New Address"
        dataDetectorTypes="address"
        onChangeText={(newValue) => {
          setEmailAddress(newValue);
          setIsChanged(true);
          setIsChangedEmail(true);
        }}
      />

      {isChangedEmail ? (
        <View style={style.signupButtonContainer}>
          <Button
            color={Color.green3}
            mode="contained"
            style={style.signupButton}
            onPress={() => {
              updateEmail(emailAddress);
            }}
          >
            Change Email

          </Button>

        </View>
      ) : null}
      {/* {isSent ? (

        <View style={{ margin: 20, alignSelf: 'center' }}>
          <Text>Check your inbox!</Text>
        </View>
      ) : null} */}
      {/* {isError ? (
        <View style={{ margin: 20, alignSelf: 'center' }}>
          <Text>{errorMessage.message}</Text>
        </View>
      ) : null} */}
    </View>
  );

  // const renderPassword = () => (
  //   <View style={style.signupButtonContainer}>
  //     <Button
  //       color={Color.green3}
  //       mode="contained"
  //       style={style.signupButton}
  //       onPress={() => {
  //         auth.sendPasswordResetEmail(accountGeneral.email).then(() => {
  //         // Email sent.
  //           setIsSent(true);
  //           setIsError(false);
  //           Alert.alert('Sent an email', 'Check your inbox!');
  //         }).catch((error) => {
  //         // An error happened.
  //           setIsError(true);
  //           setIsSent(false);
  //           Alert.alert('Opps!', error.message);
  //         });
  //       }}
  //     >
  //       Change Password

  //     </Button>

  //   </View>
  // );

  const renderButtons = () => {
    const buttons = [
      {
        title: 'Name',
        render: (nameVisible ? (renderName()) : null),
        onPress: () => {
          setNameVisible(!nameVisible);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        },
      },
      {
        title: 'Change Email Address',
        render: (addressVisible ? (renderEmailChange()) : null),
        onPress: () => {
          setAddressVisible(!addressVisible);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        },
      },
      {
        title: 'Change Password ',
        render: null,
        onPress: () => {
          auth.sendPasswordResetEmail(accountGeneral.email).then(() => {
          // Email sent.
            setIsSent(true);
            setIsChanged(true);
            setIsError(false);
            Alert.alert('Sent an email', 'Check your inbox!');
          }).catch((error) => {
          // An error happened.
            setIsError(true);
            setIsSent(false);
            Alert.alert('Opps!', error.message);
          });
        },
      },
    ];
    return buttons.map((button, index) => (
      <View key={button.title.toLowerCase()} style={style.list}>
        {index !== 0 ? <Divider style={style.divider} /> : null}
        <List.Item
          style={style.itemContainer}
          title={button.title}
          titleStyle={style.text1}
          onPress={button.onPress}
        />
        {button.render}
      </View>
    ));
  };

  return (
    <View style={style.content}>
      {renderButtons()}
    </View>
  );
};
export default ProfileChange;
