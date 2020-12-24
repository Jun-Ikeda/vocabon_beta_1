import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

/**
 * Template Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <TempComponent
 *  message="Hi, use me in this way" />
 * ```
 */
class TempComponent extends Component {
  render() {
    const { message } = this.props;
    return (
      <View style={style.container}>
        <Text>{message}</Text>
      </View>
    );
  }
}

TempComponent.propTypes = {
  message: PropTypes.string,
};

TempComponent.defaultProps = {
  message: 'This is Template Component',
};

export default TempComponent;
