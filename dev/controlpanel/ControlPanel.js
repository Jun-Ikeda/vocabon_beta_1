import React from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import Button from './Button';

const style = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 2,
  },
});

const renderButtons = () => Button.map((button, index) => {
  const onPress = async () => {
    console.log(`${index + 1}: ${button.title} is called`);
    await button.onPress();
    console.log(`${index + 1}: ${button.title} ended`);
  };
  return (
    <TouchableOpacity
      style={[
        style.button,
        {
          backgroundColor:
              button.title.indexOf('temp') !== -1 ? 'red' : 'white',
        },
      ]}
      onPress={onPress}
      key={button.title.toLowerCase()}
    >
      <Text
        style={{
          color: button.title.indexOf('temp') !== -1 ? 'white' : 'black',
        }}
      >
        {button.title}
      </Text>
    </TouchableOpacity>
  );
});

const ControlPanel = () => (
  <View>
    <ScrollView showsVerticalScrollIndicator={false} horizontal>
      {renderButtons()}
    </ScrollView>
  </View>
);

export default ControlPanel;
