import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from '../../config/Color';

const style = StyleSheet.create({
  overlay: {
    backgroundColor: Color.gray1,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  defaultMenu: {
    height: 200,
    width: 150,
    backgroundColor: Color.white2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultMenuText: {
    color: Color.white3,
    fontSize: 20,
  },
});

/**
 * PopUpMenu Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <PopUpMenu
 *  isVisible={isVisible}
 *  setVisible={setVisible}
 *  renderMenu={renderMenu}
 *  overlayStyle={overlayStyle}
 *  onLayout={onLayout}
 *  onPress={onPress}
*  />
 * ```
 */
const PopUpMenu = (props) => {
  const {
    isVisible,
    renderMenu,
    overlayStyle,
    setVisible,
    onLayout,
    containerStyle,
  } = props;
  const overlayTouchable = !((setVisible.toString() === 'function setVisible() {}') || (setVisible.toString() === 'function (){}'));

  if (isVisible) {
    return (
      <View style={[StyleSheet.absoluteFill, containerStyle]}>
        {overlayTouchable ? (
          <TouchableOpacity
            style={[overlayStyle, style.overlay]}
            onLayout={onLayout}
            onPressIn={() => setVisible(false)}
          />
        ) : (
          <View
            style={[overlayStyle, style.overlay]}
            onLayout={onLayout}
          />
        )}
        {renderMenu()}
      </View>
    );
  }
  return null;
};

PopUpMenu.propTypes = {
  isVisible: PropTypes.bool,
  renderMenu: PropTypes.func,
  overlayStyle: PropTypes.object,
  setVisible: PropTypes.func,
  onLayout: PropTypes.func,
  containerStyle: PropTypes.object,
};

PopUpMenu.defaultProps = {
  isVisible: false,
  renderMenu: () => (
    <TouchableOpacity style={style.defaultMenu} onPress={() => console.log('Menu is clicked')}>
      <Text style={style.defaultMenuText}>Pop Up Menu</Text>
    </TouchableOpacity>
  ),
  overlayStyle: {},
  setVisible: () => {},
  onLayout: () => {},
  containerStyle: {},
};

export default PopUpMenu;
