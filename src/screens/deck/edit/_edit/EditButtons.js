import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';

const iconSize = 20;

const style = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
  },
  button: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * EditButtons Component in Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <EditButtons
 *    setState={(state) => this.setState(state)}
 *    deleteVisible={true}
 * />
 * props: { setState, deleteVisible }
 * recoil: {}
 * state: {}
 *
 * ```
 */
const EditButtons = (props) => {
  // props
  const { setVisible, deleteVisible } = props;

  const renderTrashBin = () => (
    <TouchableOpacity
      style={style.button}
      onPress={() => {
        setVisible(!deleteVisible);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Icon.FontAwesome
        name="trash"
        size={iconSize}
        style={{ color: deleteVisible ? Color.gray2 : Color.black }}
      />
    </TouchableOpacity>
  );

  const renderHelp = () => (
    <TouchableOpacity
      style={style.button}
    >
      <Icon.Feather
        name="help-circle"
        size={iconSize}
      />
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      {renderTrashBin()}
      {renderHelp()}
    </View>
  );
};

EditButtons.propTypes = {
  setVisible: PropTypes.func,
  deleteVisible: PropTypes.bool,
};

EditButtons.defaultProps = {
  setVisible: () => {},
  deleteVisible: false,
};

export default EditButtons;

/* class EditButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderTrashBin = () => {
    const { navigation, setState, deleteVisible } = this.props;
    return (
      <TouchableOpacity
        style={style.button}
        onPress={() => setState({ deleteVisible: !deleteVisible })}
      >
        <Icon.FontAwesome
          name="trash"
          size={iconSize}
          style={{ color: deleteVisible ? Color.gray2 : Color.black }}
        />
      </TouchableOpacity>
    );
  }

  renderHelp = () => (
    <TouchableOpacity
      style={style.button}
    >
      <Icon.Feather
        name="help-circle"
        size={iconSize}
      />
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={style.container}>
        {this.renderTrashBin()}
        {this.renderHelp()}
      </View>
    );
  }
} */