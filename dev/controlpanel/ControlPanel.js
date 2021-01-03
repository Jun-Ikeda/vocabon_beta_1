import React from 'react';
import {
  Alert,
  Platform,
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Clipboard from 'expo-clipboard';

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

const alertConsole = (object) => {
  const string = JSON.stringify(object);
  if (Platform.OS === 'web') {
    console.log(object);
    alert('copied');
    Clipboard.setString(string);
  } else {
    Alert.alert(
      'CONSOLE',
      string,
      [{ text: 'Copy', onPress: () => Clipboard.setString(string) }, { text: 'OK', onPress: () => {} }],
    );
  }
};

const renderButtons = () => Button.map((button, index) => {
  const onPress = async () => {
    console.log(`${index + 1}: ${button.title} is called`);
    const result = await button.onPress();
    if (!(result === undefined)) {
      await alertConsole(result);
    }
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
