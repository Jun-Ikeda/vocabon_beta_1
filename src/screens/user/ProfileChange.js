import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const style = StyleSheet.create({
  content: {
    // flex: 1,
    margin: 20,
  },

});
const ProfileChange = (props) => {
  const {
    accountGeneral, inputState, setInputState, isChanged, setIsChanged,
  } = props;

  return (
    <View style={style.content}>
      <View style={{ marginLeft: 10 }}>
        <Text>Name</Text>
      </View>
      <TextInput
        value={inputState}
        mode="outlined"
        label="Name"
        onChangeText={(newValue) => {
          setInputState(newValue);
          setIsChanged(true);
        }}
      />
    </View>
  );
};
export default ProfileChange;
