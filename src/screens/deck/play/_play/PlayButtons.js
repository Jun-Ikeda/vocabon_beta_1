import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';

const style = StyleSheet.create({
  container: {
    // backgroundColor: 'skyblue',
    // height: 120,
    // flex: 1
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // flex: 1,
    // backgroundColor: 'red',
  },
  // containerThree: {
  //   flex: 1,
  //   borderRadius: 100,
  //   // backgroundColor: Color.white1,
  //   backgroundColor: 'blue',
  //   paddingVertical: 5,
  //   margin: 3,
  // },
  button: {
    // borderWidth: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Color.white1,
    // backgroundColor: 'blue',
    paddingVertical: 10,
    margin: 10,
  },
  icon: { fontSize: 30 },
});

/**
 * Buttons Component in Play Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <PlayButtons
 *  finished={true or false}
 *  flip={() => { function }}
 *  swipeLeft={() => { function }}
 *  swipeRight={() => { function }}
 *  swipeBack={() => { function }}
 *  />
 * ```
 */

const PlayButtons = (props) => {
  const {
    finished, flip, swipeLeft, swipeRight, swipeBack,
  } = props;

  const renderButton = ({ collection, name, onPress }) => {
    const IconComponent = Icon[collection];
    return (
      <TouchableOpacity style={style.button} onPress={onPress} key={name.toLowerCase()}>
        <IconComponent name={name} style={style.icon} />
      </TouchableOpacity>
    );
  };

  const renderThreeButtons = () => {
    const buttons = [
      {
        collection: 'Entypo',
        name: 'cross',
        // style: style.containerThree,
        onPress: () => swipeLeft(),
      },
      {
        collection: 'MaterialIcons',
        name: 'flip',
        // style: style.containerThree,
        onPress: () => flip(),
      },
      {
        collection: 'Entypo',
        name: 'check',
        // style: style.containerThree,
        onPress: () => swipeRight(),
      },
    ];
    if (!(finished)) {
      return buttons.map(renderButton);
    }
    return null;
  };

  const renderBackButton = () => {
    const button = {
      collection: 'AntDesign',
      name: 'back',
      onPress: () => swipeBack(),
    };
    return renderButton(button);
  };

  return (
    <View style={style.container}>
      <View style={style.columnContainer}>
        {renderThreeButtons()}
      </View>
      <View style={style.columnContainer}>
        {renderBackButton()}
      </View>
    </View>
  );
};

PlayButtons.propTypes = {
  finished: PropTypes.bool,
  flip: PropTypes.func,
  swipeLeft: PropTypes.func,
  swipeRight: PropTypes.func,
  swipeBack: PropTypes.func,
};

PlayButtons.defaultProps = {
  finished: false,
  flip: () => {},
  swipeLeft: () => {},
  swipeRight: () => {},
  swipeBack: () => {},
};

export default PlayButtons;

/*
class PlayButtons extends Component {
  renderButton = (button) => {
    const { collection, name, onPress } = button;
    const IconComponent = Icon[collection];
    return (
      <TouchableOpacity style={style.button} onPress={onPress} key={button.name.toLowerCase()}>
        <IconComponent name={name} style={style.icon} />
      </TouchableOpacity>
    );
  }

  renderThreeButtons = () => {
    const {
      flip, swipeLeft, swipeRight, finished,
    } = this.props;
    const buttons = [
      {
        collection: 'Entypo',
        name: 'cross',
        onPress: () => swipeLeft(),
      },
      {
        collection: 'MaterialIcons',
        name: 'flip',
        onPress: () => flip(),
      },
      {
        collection: 'Entypo',
        name: 'check',
        onPress: () => swipeRight(),
      },
    ];
    if (!(finished)) {
      return buttons.map(this.renderButton);
    }
    return null;
  }

  renderBackButton = () => {
    const { swipeBack } = this.props;
    const button = {
      collection: 'AntDesign',
      name: 'back',
      onPress: () => swipeBack(),
    };
    return this.renderButton(button);
  }

  render() {
    return (
      <View>
        <View style={style.container}>
          {this.renderThreeButtons()}
        </View>
        <View style={style.container}>
          {this.renderBackButton()}
        </View>
      </View>
    );
  }
} */
