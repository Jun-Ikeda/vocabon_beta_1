import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from '../../config/Color';

const style = StyleSheet.create({
  overlay: {
    flex: 1,
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
*  />
 * ```
 */
class PopUpMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      isVisible,
      renderMenu,
      overlayStyle,
      setVisible,
      onLayout,
    } = this.props;
    if (isVisible) {
      return (
        <View style={StyleSheet.absoluteFill}>
          <TouchableOpacity
            style={[style.overlay, overlayStyle]}
            onPress={() => setVisible(false)}
            onLayout={onLayout}
          />
          {renderMenu()}
        </View>
      );
    }
    return <View />;
  }
}

PopUpMenu.propTypes = {
  isVisible: PropTypes.bool,
  renderMenu: PropTypes.node,
  overlayStyle: PropTypes.object,
  setVisible: PropTypes.func,
  onLayout: PropTypes.func,
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
};

export default PopUpMenu;
