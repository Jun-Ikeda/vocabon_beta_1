import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Color from '../../config/Color';

import Header from './Header';
import Icon from '../Icon';
// import Color from '../../config/Color';

const style = StyleSheet.create({
  headerIcon: {
    fontSize: 28,
    color: Color.white1,
  },
  title: {
    color: Color.white1, fontSize: 22, alignSelf: 'flex-start', paddingHorizontal: 25,
  },
});

/**
 * Header Component with back button
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <HeaderWithBack
 *  navigation={this.props.navigation} !REQUIRED!
 *  titleStyle={}
 *  title={'Title'}
 *  iconStyle={}
 * />
 * ```
 */
class HeaderWithBack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressLeft = () => {
    const { navigation, onPressLeft } = this.props;
    try {
      onPressLeft();
    } catch (error) {
      navigation.goBack();
    }
  };

  renderTitle = () => {
    const { renderCenter, titleStyle, title } = this.props;
    try {
      return renderCenter();
    } catch (error) {
      return <Text style={[style.title, titleStyle]}>{title}</Text>;
    }
  };

  render() {
    const {
      iconStyle,
      style: headerStyle,
      renderRight,
      renderAll,
      large,
      onLongPressLeft,
      onPressTitle,
      onLongPressTitle,
      onPressRight,
      onLongPressRight,
    } = this.props;
    return (
      <Header
        renderLeft={() => (
          <Icon.Ionicons
            name="ios-arrow-back"
            style={[headerStyle.headerIcon, style.headerIcon, iconStyle]}
          />
        )}
        renderTitle={() => this.renderTitle()}
        onPressLeft={this.onPressLeft}
        // style={{ backgroundColor: 'blue' }}
        style={headerStyle}
        // renderLeft={renderLeft}
        // renderTitle={renderTitle}
        renderRight={renderRight}
        renderAll={renderAll}
        large={large}
        onLongPressLeft={onLongPressLeft}
        onPressTitle={onPressTitle}
        onLongPressTitle={onLongPressTitle}
        onPressRight={onPressRight}
        onLongPressRight={onLongPressRight}
      />
    );
  }
}

HeaderWithBack.propTypes = {
  style: PropTypes.object,
  renderRight: PropTypes.func,
  renderAll: PropTypes.func,
  large: PropTypes.bool,
  onPressLeft: PropTypes.func,
  onLongPressLeft: PropTypes.func,
  onPressTitle: PropTypes.func,
  onLongPressTitle: PropTypes.func,
  onPressRight: PropTypes.func,
  onLongPressRight: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  renderCenter: PropTypes.func,
  titleStyle: PropTypes.object,
  title: PropTypes.string,
  iconStyle: PropTypes.object,
};

HeaderWithBack.defaultProps = {
  style: { backgroundColor: Color.green3 },
  renderRight: () => { },
  renderAll: () => { throw new Error('the function is null'); },
  large: false,
  onPressLeft: () => { throw new Error('the function is null'); },
  onLongPressLeft: () => { },
  onPressTitle: () => { },
  onLongPressTitle: () => { },
  onPressRight: () => { },
  onLongPressRight: () => { },
  renderCenter: () => { throw new Error('the function is null'); },
  titleStyle: { },
  title: '',
  iconStyle: { },
};

export default HeaderWithBack;
