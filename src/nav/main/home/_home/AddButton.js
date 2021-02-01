import React from 'react';
import PropTypes from 'prop-types';

import { useRecoilValue } from 'recoil';
import { Alert } from 'react-native';
import FloatingButton from '../../../../components/FloatingButton';
import { decksGeneral } from '../../../../config/deck/Deck';
import { func } from '../../../../config/Const';
import { getAccountGeneral } from '../../../../config/account/Account';

const AddButton = (props) => {
  const { navigation } = props;
  const deckGeneral = useRecoilValue(decksGeneral);
  const accountGeneral = getAccountGeneral();
  return (
    <FloatingButton
      onPress={() => {
        const num = func.convertObjectToArray(deckGeneral).filter((vocab) => vocab.value.user === accountGeneral.userID).length;
        if (num >= 10) {
          Alert.alert('Storage full', 'You can save up to 10 decks.');
        } else {
          navigation.navigate('createdeck');
        }
      }}
      icon={{ collection: 'AntDesign', name: 'plus' }}
    />
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
