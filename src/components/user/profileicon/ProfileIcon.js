import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image, Text, Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import { getUserGeneral } from '../../../config/user/User';
import { getAccountGeneral } from '../../../config/account/Account';

const bean = require('../../../../assets/Aboutusmame.png');
const coo = require('../../../../assets/cat.jpg');

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
  },
  picture: {
    resizeMode: 'contain',
  },
});

/**
 * ProfileIcon Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <ProfileIcon
 *  message="Hi, use me in this way" />
 * ```
 */
const ProfileIcon = (props) => {
  // props
  const {
    userID, onPress, size, style: propStyle, color, char, // color, char暫時
  } = props;
  // recoil
  const accountGeneral = getAccountGeneral();
  const general = getUserGeneral(userID);
  const circle = {
    height: size, width: size, borderRadius: size / 2,
  };
  const isButton = !((onPress.toString() === 'function onPress() {}') || (onPress.toString() === 'function (){}'));
  const username = accountGeneral?.name;
  const isCat = username === 'ねこ' || username === '猫' || username === 'ネコ' || username.toLowerCase() === 'cat' || username.toLowerCase() === 'kitten';
  const isMame = username === 'まめ学生' || username.toLowerCase() === 'Bean Student' || username === 'まめ' || username === 'student';

  const renderColorIcon = () => (
    <View style={[circle, style.color, { backgroundColor: color || general?.icon.color }]}>
      <Text style={{ color: 'white', fontSize: size * 0.5 }}>
        {char || general?.name?.slice(0, 1).toUpperCase()}
      </Text>
    </View>
  );

  const renderImageIcon = () => (
    <Image source={{ uri: general?.icon.uri }} style={circle} />
  );

  const renderIcon = () => {
    if (username === 'Guest User') {
      return <Icon.Octicons name="gist-secret" style={[style.icon, { fontSize: size * 0.8 }]} />;
    } if (isMame) {
      return (<Image source={bean} style={[style.picture, { width: size, height: size }]} />);
    } if (isCat) {
      return <Image source={coo} style={[style.picture, { width: size, height: size, borderRadius: size / 2 }]} />;
    } if (general?.icon?.uri === undefined) {
      return renderColorIcon();
    }
    return renderImageIcon();
  };

  const renderUnTouchable = () => (
    <View style={[style.container, circle, propStyle]}>
      {renderIcon()}
    </View>
  );

  const renderTouchable = () => (
    <TouchableOpacity
      style={[style.container, circle, propStyle]}
      onPress={onPress}
    >
      {renderIcon()}
    </TouchableOpacity>
  );

  if (isButton) {
    return renderTouchable();
  }
  if (isCat) {
    return (
      <TouchableOpacity
        style={[style.container, circle, propStyle]}
        onPress={() => Linking.openURL('https://photos.app.goo.gl/MreMfbyMeaESbM2BA')}
      >
        {renderIcon()}
      </TouchableOpacity>
    );
  }
  return renderUnTouchable();
};

ProfileIcon.propTypes = {
  userID: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object,
};

ProfileIcon.defaultProps = {
  // message: {},
  onPress: () => {},
  size: 54,
  style: {},
};

export default ProfileIcon;
