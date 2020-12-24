import React, { Component } from 'react';
import {
  /* View,  */Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import PopUpMenu from './PopUpMenu';

const style = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
});

/**
 * PopUp Menu with Item Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <PopUpMenuWithItem
 *  isVisible={isVisible}
 *  setVisible={setVisible}
 *  renderMenu={renderMenu}
 *  overlayStyle={overlayStyle}
 *  onLayout={onLayout}
 * />
 * ```
 */
class PopUpMenuWithItem extends Component {
  render() {
    const {
      isVisible,
      renderMenu,
      overlayStyle,
      setVisible,
      onLayout,
    } = this.props;
    return (
      <PopUpMenu
        isVisible={isVisible}
        setVisible={setVisible}
        renderMenu={renderMenu}
        overlayStyle={overlayStyle}
        onLayout={onLayout}
      />
    );
  }
}

PopUpMenuWithItem.propTypes = {
  isVisible: PropTypes.bool,
  renderMenu: PropTypes.node,
  overlayStyle: PropTypes.object,
  setVisible: PropTypes.func,
  onLayout: PropTypes.func,
};

PopUpMenuWithItem.defaultProps = {
  isVisible: false,
  renderMenu: () => (
    <TouchableOpacity style={style.defaultMenu} onPress={() => console.log('Menu is clicked')}>
      <Text style={style.defaultMenuText}>Pop Up Menu</Text>
      <Text style={style.defaultMenuText}>with Item</Text>
    </TouchableOpacity>
  ),
  overlayStyle: {},
  setVisible: () => {},
  onLayout: () => {},
};

export default PopUpMenuWithItem;
