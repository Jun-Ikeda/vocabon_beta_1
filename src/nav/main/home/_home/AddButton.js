import React from 'react';
import PropTypes from 'prop-types';

import FloatingButton from '../../../../components/FloatingButton';

const AddButton = (props) => {
  const { navigation } = props;
  return (
    <FloatingButton onPress={() => navigation.navigate('createdeck')} icon={{ collection: 'AntDesign', name: 'plus' }} />
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
