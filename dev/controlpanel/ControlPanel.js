import React, { useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import Button from './Button';
import { func } from '../../src/config/Const';
import { decksContent } from '../../src/config/deck/Deck';
import { account } from '../../src/config/account/Account';

const style = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 2,
  },
});

const ControlPanel = () => {
  const [panelVisible, setPanelVisible] = useState(false);
  // Button.push({ title: 'Toggle Panel Visible', onPress: () => setPanelVisible(!panelVisible) });

  const renderButtons = () => Button.map((button, index) => {
    const onPress = async () => {
      console.log(`${index + 1}: ${button.title} is called`);
      const result = await button.onPress();
      if (!(result === undefined)) {
        await func.alertConsole(result);
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

  return (
    <View>
      {panelVisible ? (
        <ScrollView style={{ height: 150 }}>
          <Text>{JSON.stringify(account, null, 4)}</Text>
        </ScrollView>
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false} horizontal>
        {renderButtons()}
        <TouchableOpacity
          style={style.button}
          onPress={() => setPanelVisible(!panelVisible)}
          // key={button.title.toLowerCase()}
        >
          <Text>Toggle Panel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ControlPanel;
