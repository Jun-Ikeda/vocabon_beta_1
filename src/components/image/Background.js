import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Color from '../../config/Color';

const style = StyleSheet.create({
  image: {
    flex: 1,
  },
});

/**
 * Background Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <Background
 *   imageStyle={{ height: 200, width: 'auto'}}
 *   imageSource={{ uri: 'https://source.unsplash.com/random' }}
 *   blurRadius={2}
 *   overlayColor="#ffffff"
 *   overlayOpacity={0.3}
 *   overlayStyle={}
 * />
 * ```
 */
class Background extends Component {
  render() {
    const {
      imageStyle, imageSource, blurRadius, overlayColor, overlayOpacity, overlayStyle,
    } = this.props;
    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'blue' }]}>
        <Image
          style={[style.image, imageStyle]}
          source={imageSource}
          blurRadius={blurRadius}
        />
        <View style={[
          StyleSheet.absoluteFill,
          overlayStyle,
          { backgroundColor: overlayColor, opacity: overlayOpacity },
        ]}
        />
      </View>
    );
  }
}

Background.propTypes = {
  imageStyle: PropTypes.object,
  imageSource: PropTypes.shape({ uri: PropTypes.string }),
  blurRadius: PropTypes.number,
  overlayColor: PropTypes.string,
  overlayOpacity: PropTypes.number,
  overlayStyle: PropTypes.object,
};

Background.defaultProps = {
  imageStyle: {},
  imageSource: { uri: '' },
  blurRadius: 0,
  overlayColor: Color.white1,
  overlayOpacity: 1,
  overlayStyle: {},
};

export default Background;
