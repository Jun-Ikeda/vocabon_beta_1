import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Color from '../config/Color';
import Icon from './Icon';

const style = StyleSheet.create({
  addbutton: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: Color.white1,
  },
});

/**
 * FloatingButton Component in Home Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <FloatingButton navigation={navigation} />
 * ```
 */
const FloatingButton = (props) => {
  const {
    onPress, buttonStyle, iconStyle, color, icon: { collection, name },
  } = props;
  const onPressIsFunc = !((onPress.toString() === 'function onPress() {}') || (onPress.toString() === 'function (){}'));
  const IconComponent = Icon[collection];

  return onPressIsFunc ? (
    <TouchableOpacity
      onPress={onPress}
      style={[style.addbutton, buttonStyle, { backgroundColor: color }]}
    >
      <IconComponent style={[style.icon, iconStyle]} name={name} />
    </TouchableOpacity>
  ) : (
    <View style={[style.addbutton, buttonStyle, { backgroundColor: color }]}>
      <IconComponent style={[style.icon, iconStyle]} name={name} />
    </View>
  );
};

FloatingButton.propTypes = {
  onPress: PropTypes.func,
  buttonStyle: PropTypes.object,
  color: PropTypes.string,
  icon: PropTypes.shape({
    collection: PropTypes.string,
    name: PropTypes.string,
  }),
  iconStyle: PropTypes.object,
};

FloatingButton.defaultProps = {
  onPress: () => {},
  buttonStyle: {},
  iconStyle: {},
  color: Color.green2,
  icon: { collection: '', name: '' },
};

export default FloatingButton;
