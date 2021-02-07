import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput,
} from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import Color from '../../../../config/Color';

const style = StyleSheet.create({
  optionBox: {
    flex: 2,
    margin: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: Color.white1,
  },
  delimiterInput: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginRight: 10,
  },
  delimiterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  radioContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: Color.gray3, height: 1.5, opacity: 0.5,
  },
});

const ExportOption = (props) => {
  const {
    itemValue, setItemValue, cardValue, setCardValue,
    itemDelimiter, setItemDelimiter, cardDelimiter, setCardDelimiter,
    elementValue,
    setElementValue,
    elementDelimiter,
    setElementDelimiter,
  } = props;

  const [elementCustomInput, setElementCustomInput] = useState(''); // 非表示切り替え？ textinputに書いてある内容を他のボタンおしても変わらないようにしようかなって
  const [itemCustomInput, setItemCustomInput] = useState(''); // 非表示切り替え？ textinputに書いてある内容を他のボタンおしても変わらないようにしようかなって
  const [cardCustomInput, setCardCustomInput] = useState('');

  const renderCustomText = (options) => (
    <TextInput
      value={options.delimiterInputState[0]}
      placeholder="Custom Delimiter"
      onChangeText={(newValue) => {
        (options.delimiterState[1])(newValue);
        (options.delimiterInputState[1])(newValue);
      }}
      style={style.delimiterInput}
    />
  );

  const renderRadioButtons = (options) => (
    <RadioButton.Group
      onValueChange={(newValue) => {
        options.radioState[1](newValue);
        options.delimiterState[1](newValue);
        if (newValue === options.buttonValue3) {
          options.delimiterState[1](options.delimiterInputState[0]);
        }
      }}
      value={options.radioState[0]}
    >
      <TouchableOpacity
        style={style.radioContainer}
        onPress={() => {
          options.radioState[1](options.buttonValue1);
          options.delimiterState[1](options.buttonValue1);
        }}
      >
        <RadioButton value={options.buttonValue1} />
        <Text>{options.buttonTitle1}</Text>
      </TouchableOpacity>
      <Divider style={style.divider} />
      <TouchableOpacity
        style={style.radioContainer}
        onPress={() => {
          options.radioState[1](options.buttonValue2);
          options.delimiterState[1](options.buttonValue2);
        }}
      >
        <RadioButton value={options.buttonValue2} />
        <Text>{options.buttonTitle2}</Text>
      </TouchableOpacity>
      <Divider style={style.divider} />
      <TouchableOpacity
        style={style.radioContainer}
        onPress={() => {
          options.radioState[1](options.buttonValue3);
          options.delimiterState[1](options.delimiterInputState[0]);
        }}
      >
        <RadioButton value={options.buttonValue3} />
        {renderCustomText(options)}
      </TouchableOpacity>
    </RadioButton.Group>
  );

  const options = [
    {
      title: 'Cards',
      buttonTitle1: 'Slash',
      buttonTitle2: 'Change Line',
      buttonValue1: '/',
      buttonValue2: '\n',
      buttonValue3: 'Custom',
      radioState: [cardValue, setCardValue],
      delimiterState: [cardDelimiter, setCardDelimiter],
      delimiterInputState: [cardCustomInput, setCardCustomInput],
    },
    {
      title: 'Items',
      buttonTitle1: 'Semicolon',
      buttonTitle2: 'Tab',
      buttonValue1: ';',
      buttonValue2: '\t',
      buttonValue3: 'Custom',
      radioState: [itemValue, setItemValue],
      delimiterState: [itemDelimiter, setItemDelimiter],
      delimiterInputState: [itemCustomInput, setItemCustomInput],
    },
    {
      title: 'Elements',
      buttonTitle1: 'Comma',
      buttonTitle2: 'Space',
      buttonValue1: ',',
      buttonValue2: ' ',
      buttonValue3: 'Custom',
      radioState: [elementValue, setElementValue],
      delimiterState: [elementDelimiter, setElementDelimiter],
      delimiterInputState: [elementCustomInput, setElementCustomInput],
    },
  ];
  return (
    <View style={style.optionBox}>
      <Text style={{ fontSize: 18, padding: 10 }}> Options </Text>
      <View style={style.delimiterContainer}>
        {options.map((option) => (
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 14, padding: 5 }}>{option.title}</Text>
            {renderRadioButtons(option)}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ExportOption;
