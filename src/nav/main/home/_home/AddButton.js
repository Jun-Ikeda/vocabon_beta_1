import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Alert, Image, LayoutAnimation, StyleSheet, Text, View,
} from 'react-native';
import { Button, Portal, TextInput } from 'react-native-paper';
import FloatingButton from '../../../../components/FloatingButton';
import { decksGeneral, saveDeckGeneral } from '../../../../config/deck/Deck';
import { func } from '../../../../config/Const';
import { getAccountGeneral } from '../../../../config/account/Account';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';
import { firestore } from '../../../../config/firebase/Firebase';
import { unshortenURI } from '../../../../config/Unsplash';
import langs from '../../../../config/Langs';

const style = StyleSheet.create({
  popupContainer: {
    backgroundColor: 'white',
    flex: 1,
    margin: 60,
    // padding: 20,
    borderRadius: 10,
  },
});

const AddButton = (props) => {
  const { navigation } = props;
  const [idInputVisible, setIDInputVisible] = useState(false);
  const [id, setID] = useState('');
  const [tentativeDeckGeneral, setTentativeDeckGeneral] = useState({});
  const [deckGeneral, setDeckGeneral] = useRecoilState(decksGeneral);
  const accountGeneral = getAccountGeneral();

  const createnew = () => {
    const num = func.convertObjectToArray(deckGeneral).filter((vocab) => vocab.value.user === accountGeneral.userID).length;
    if (num >= 10) {
      Alert.alert('Storage full', 'You can save up to 10 decks.');
    } else {
      navigation.navigate('createdeck');
    }
  };
  const useshared = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTentativeDeckGeneral({});
    setIDInputVisible(true);
    // saveDeckGeneral(setDeckGeneral);
    // navigation.navigate('');
  };
  const getDeckGeneralTentative = () => {
    firestore.collection('deck').doc(id).get().then(async (doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data.user === accountGeneral.userID) {
          Alert.alert('Error', 'This deck is yours');
        } else {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setTentativeDeckGeneral(data);
        }
      } else {
        Alert.alert('Error', 'No deck corresonding to the ID exist');
      }
    });
  };
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <FloatingButton
        onPress={() => {
          Alert.alert('New Deck', 'Would you like to create a new deck or use one your friend shared?', [
            { text: 'Create New', onPress: createnew },
            { text: 'Use Shared', onPress: useshared },
            { text: 'Cancel', onPress: () => {}, style: 'default' },
          ], { cancelable: true });
        }}
        icon={{ collection: 'AntDesign', name: 'plus' }}
      />
      <Portal>
        <PopUpMenu
          isVisible={idInputVisible}
          setVisible={setIDInputVisible}
          renderMenu={() => (
            <View style={style.popupContainer}>
              <Image
                style={{
                  height: '50%', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10,
                }}
                source={{ uri: unshortenURI(tentativeDeckGeneral?.thumbnail?.uri ?? '') }}
              />
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 30 }}>{tentativeDeckGeneral?.title}</Text>
                <Text style={{ fontSize: 18 }}>{`Term in ${langs.filter((lang) => (tentativeDeckGeneral?.language?.term === lang.tag))[0]?.name ?? 'Not Found'}`}</Text>
                <Text style={{ fontSize: 18 }}>{`Definition in ${langs.filter((lang) => (tentativeDeckGeneral?.language?.definition === lang.tag))[0]?.name ?? 'Not Found'}`}</Text>
                <Text style={{ fontSize: 18 }}>{`${tentativeDeckGeneral?.num} words`}</Text>
              </View>
              <Button
                mode="contained"
                color={Color.green2}
                style={{ marginHorizontal: 50, marginVertical: 20 }}
                onPress={() => {
                  saveDeckGeneral(setDeckGeneral, id, tentativeDeckGeneral);
                  setIDInputVisible(false);
                  navigation.navigate('menu', { deckID: id });
                  // Alert.alert('This function is under construction');
                }}
                disabled={Object.keys(tentativeDeckGeneral).length === 0}
              >
                Use this deck
              </Button>
              <TextInput
                value={id}
                onChangeText={setID}
                placeholder="Paste ID here"
                style={{
                  position: 'absolute', right: 20, left: 20, top: 20, opacity: 0.8,
                }}
                right={(
                  <TextInput.Icon
                    name="search-web"
                    disabled={id.length !== 10}
                    onPress={getDeckGeneralTentative}
                  />
                )}
              />
            </View>
          )}
        />
      </Portal>
    </View>
  );
};

// import React from 'react';
// import { StyleSheet, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';

// import Icon from '../../../../components/Icon';
// import Color from '../../../../config/Color';

// const style = StyleSheet.create({
//   addbutton: {
//     position: 'absolute',
//     right: 25,
//     bottom: 25,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Color.green2,
//   },
//   icon: {
//     fontSize: 24,
//     color: Color.white1,
//   },
// });

// /**
//  * AddButton Component in Home Screen
//  * @augments {Component<Props, State>}
//  * Usage :
//  * ```js
//  * <AddButton navigation={navigation} />
//  * ```
//  */
// const AddButton = (props) => {
//   const { navigation } = props;
//   return (
//     <TouchableOpacity
//       onPress={() => { navigation.navigate('createdeck'); }}
//       style={style.addbutton}
//     >
//       <Icon.AntDesign
//         style={style.icon}
//         name="plus"
//       />
//     </TouchableOpacity>
//   );
// };

AddButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

AddButton.defaultProps = {
};

export default AddButton;
