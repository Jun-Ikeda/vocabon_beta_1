import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Color from '../../config/Color';

import Header from './Header';

const style = StyleSheet.create({
  header: {
    backgroundColor: Color.defaultBackground,
  },
  headerContainer: {
    flex: 1,
    paddingLeft: 36,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 26,
  },
});

/**
 * Header Component in Main screens
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <HeaderInMain
 *  message="Hi, use me in this way" />
 * ```
 */
class HeaderInMain extends Component {
  renderAll = () => {
    const { title } = this.props;
    return (
      <View style={style.headerContainer}>
        <Text style={style.headerTitle}>{title}</Text>
      </View>
    );
  }

  render() {
    return (
      <Header medium renderAll={this.renderAll} style={style.header} />
    );
  }
}

HeaderInMain.propTypes = {
  title: PropTypes.string,
};

HeaderInMain.defaultProps = {
  title: '',
};

export default HeaderInMain;
