import React from 'react';
import {
  Text, View, StyleSheet, TextInput, TouchableOpacity, Button, KeyboardAvoidingView, ScrollView,
} from 'react-native';
import Color from '../../../config/Color';
import Icon from '../../Icon';

const iconSize = 20;

const style = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
  },
  textinput: {
    padding: 10,
    fontSize: 16,
    height: 120,
    // borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.gray2,
    backgroundColor: Color.white1,
    textAlignVertical: 'top',
  },
  clearbuttonContainer: {
    // position: 'absolute',
    // color: Color.gray1,
    // right: 0,
    // borderWidth: 1,
  },
  clearButton: {
    color: Color.gray2,
  },
});

const Redescribe = (props) => {
  const { description, setDescription } = props;
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" style={style.container}>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          style={style.textinput}
          placeholder="(ex) Chemistry..."
        />
        <View style={{
          position: 'absolute', right: 5, bottom: 0, top: 5,
        }}
        >
          <TouchableOpacity style={style.clearbuttonContainer}>
            <Icon.Ionicons
              name="md-close"
              size={iconSize}
              style={style.clearButton}
              onPress={() => setDescription('')}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Redescribe;

/* import React, { useState, View } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { } from 'react-native-paper';
import PropTypes from 'prop-types';
import Color from '../../../config/Color';
import Icon from '../../Icon';

const Redescribe = (props) => {
  // props
  const { description, setDescription } = props;

  return (
    <View style={style.container}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        multiline
        style={style.textinput}
      />
      <TouchableOpacity style={style.clearbutton}>
        <Icon.Entypo name="cross" />
      </TouchableOpacity>
    </View>
  );
};

Redescribe.propTypes = {

};

Redescribe.defaultProps = {

};

export default Redescribe;
 */
