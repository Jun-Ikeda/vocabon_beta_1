import React, { Component } from 'react';
import {
  View, StyleSheet, Image, ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from '../../config/Color';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
  },
});

/**
 * ImageOverlay
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <ImageOverlay
 *  style={}
 *  source={{ uri }}
 *  overlayStyle={}
 *  overlayColor="black"
 *  overlayOpacity={0.4}
 * />
 * ```
 */
class ImageOverlay extends Component {
  render() {
    const {
      style, source, overlayStyle, overlayColor, overlayOpacity,
    } = this.props;
    return (
      <View>
        <Image style={style} source={source} />
        <View style={[
          styles.overlay,
          overlayStyle,
          { opacity: overlayOpacity, backgroundColor: overlayColor }]}
        />
      </View>
    );
  }
}

ImageOverlay.propTypes = {
  // style: PropTypes.object,
  style: ViewPropTypes.style,
  source: PropTypes.object,
  overlayStyle: PropTypes.object,
  overlayColor: PropTypes.string,
  overlayOpacity: PropTypes.number,
};

ImageOverlay.defaultProps = {
  style: {},
  source: {},
  overlayStyle: {},
  overlayColor: Color.black,
  overlayOpacity: 0.3,
};

export default ImageOverlay;
