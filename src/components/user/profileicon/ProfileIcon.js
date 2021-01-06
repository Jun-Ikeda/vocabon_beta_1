import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { users } from '../../../config/user/User';

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
  // const generals = useRecoilValue(usersGeneral);
  const general = users[userID];
  const circle = {
    height: size, width: size, borderRadius: size / 2,
  };

  const renderColorIcon = () => (
    <View style={[circle, style.color, { backgroundColor: color || general?.icon.color }]}>
      <Text style={{ color: 'white', fontSize: size * 0.5 }}>
        {char || general?.name?.slice(0, 1)}
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

  // try {
  //   return renderUnTouchable();
  // } catch (error) {
  //   return renderTouchable();
  // }
  return renderTouchable();
};

// (general?.icon.uri === undefined) ? renderColorIcon() : renderImageIcon()

ProfileIcon.propTypes = {
  userID: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object,
};

ProfileIcon.defaultProps = {
  // message: {},
  onPress: () => { throw new Error('the function is null'); },
  size: 54,
  style: {},
};

export default ProfileIcon;
