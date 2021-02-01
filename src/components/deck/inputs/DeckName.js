import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, TextInput, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import Color from '../../../config/Color';
import { titleMaxLength } from '../../../config/Const';

import Icon from '../../Icon';

// const maintextColor = Color.gray2;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    justifyContent: 'space-between',
    backgroundColor: Color.white1,
    // borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: Color.gray2,
  },
  textinput: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'stretch',
    height: 30,
  },
  count: {
    color: Color.gray3,
  },
  countcontainer: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  icon: {
    color: Color.black,
    fontSize: 25,
  },
  iconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});

/**
 * DeckName Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <DeckName
 *    setTitle={() => { function }}
 *    title="string"
 * />
 * ```
 */
const DeckName = (props) => {
  const { title, setTitle } = props;
  let input = {};
  useEffect(() => {
    try {
      input.focus();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderIcon = () => (
    <TouchableOpacity
      style={style.iconContainer}
      onPress={() => {
        setTitle('');
        input.focus();
      }}
    >
      <Icon.Ionicons name="md-close" style={style.icon} />
    </TouchableOpacity>
  );

  const renderCount = () => (
    <View style={style.countcontainer}>
      <Text style={style.count}>
        {`${title.length}/${titleMaxLength}`}
      </Text>
    </View>
  );

  const renderTextInput = () => (
    <TextInput
      style={style.textinput}
      value={title}
      onChangeText={setTitle}
      maxLength={titleMaxLength}
      ref={(ref) => {
        input = ref;
      }}
    />
  );

  return (
    <View style={style.container}>
      {renderTextInput()}
      {renderCount()}
      {renderIcon()}
    </View>
  );
};

DeckName.propTypes = {
  setTitle: PropTypes.func.isRequired,
  title: PropTypes.string,
};

DeckName.defaultProps = {
  title: '',
};

export default DeckName;
