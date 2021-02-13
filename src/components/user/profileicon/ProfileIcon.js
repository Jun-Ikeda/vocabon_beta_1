import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { getUserGeneral } from '../../../config/user/User';

const style = StyleSheet.create({
  container: {

  },
  color: {
    alignItems: 'center',
    justifyContent: 'center',
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
  const general = getUserGeneral(userID);
  const circle = {
    height: size, width: size, borderRadius: size / 2,
  };
  const isButton = !((onPress.toString() === 'function onPress() {}') || (onPress.toString() === 'function (){}'));

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

  const renderUnTouchable = () => (
    <View style={[style.container, circle, propStyle]}>
      {(general?.icon?.uri === undefined) ? renderColorIcon() : renderImageIcon()}
    </View>
  );

  const renderTouchable = () => (
    <TouchableOpacity
      style={[style.container, circle, propStyle]}
      onPress={onPress}
    >
      {(general?.icon?.uri === undefined) ? renderColorIcon() : renderImageIcon()}
    </TouchableOpacity>
  );

  return isButton ? renderTouchable() : renderUnTouchable();
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
