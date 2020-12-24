import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { header } from '../../config/Const';
import Color from '../../config/Color';

const style = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    top: 0,
  },
  padding: {
    paddingTop: header.paddingTopByOS(),
    // backgroundColor: Color.green2
  },
  headerContainer: {
    flexDirection: 'row',
  },
  left: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Header Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <Header
 *  style={style.header}
 *  renderLeft={() => <Icon />}
 *  renderTitle={() => <Text>Title</Text>}
 *  titleStyle={{alignText: 'center'}} />
 * ```
 */
class Header extends Component {
  renderContent = () => {
    const {
      large,
      medium,
      onPressLeft,
      onPressTitle,
      onPressRight,
      onLongPressLeft,
      onLongPressTitle,
      onLongPressRight,
      renderLeft,
      renderTitle,
      renderRight,
    } = this.props;
    const width = {
      width: large ? header.heightMax : (medium ? header.heightMid : header.heightMin),
    };
    const parts = [
      {
        name: 'left',
        onPress: onPressLeft,
        onLongPress: onLongPressLeft,
        style: [style.left, width],
        render: renderLeft,
      },
      {
        name: 'title',
        onPress: onPressTitle,
        onLongPress: onLongPressTitle,
        style: style.title,
        render: renderTitle,
      },
      {
        name: 'right',
        onPress: onPressRight,
        onLongPress: onLongPressRight,
        style: [style.right, width],
        render: renderRight,
      },
    ];
    return parts.map((part) => (
      <TouchableOpacity
        style={part.style}
        onPress={part.onPress}
        onLongPress={part.onLongPress}
        key={part.name}
      >
        {part.render()}
      </TouchableOpacity>
    ));
  };

  renderAll = () => {
    const {
      style: propsStyle, renderAll, large, medium,
    } = this.props;
    const height = {
      height: large ? header.heightMax : (medium ? header.heightMid : header.heightMin),
    };
    try {
      return (
        <View style={[style.headerContainer, propsStyle, height]}>
          {renderAll()}
        </View>
      );
    } catch (error) {
      return (
        <View style={[style.headerContainer, propsStyle, height]}>
          {this.renderContent()}
        </View>
      );
    }
  };

  render() {
    const { style: propsStyle } = this.props;
    return (
      <View style={[style.container, propsStyle]}>
        <View style={style.padding} />
        {this.renderAll()}
      </View>
    );
  }
}

Header.propTypes = {
  style: PropTypes.object,
  renderLeft: PropTypes.func,
  renderTitle: PropTypes.func,
  renderRight: PropTypes.func,
  renderAll: PropTypes.func,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  onPressLeft: PropTypes.func,
  onLongPressLeft: PropTypes.func,
  onPressTitle: PropTypes.func,
  onLongPressTitle: PropTypes.func,
  onPressRight: PropTypes.func,
  onLongPressRight: PropTypes.func,
};

Header.defaultProps = {
  style: { backgroundColor: Color.green3 },
  renderLeft: () => { },
  renderTitle: () => { },
  renderRight: () => { },
  renderAll: () => { throw new Error('the function is null'); },
  large: false,
  medium: false,
  onPressLeft: () => { },
  onLongPressLeft: () => { },
  onPressTitle: () => { },
  onLongPressTitle: () => { },
  onPressRight: () => { },
  onLongPressRight: () => { },
};

export default Header;
