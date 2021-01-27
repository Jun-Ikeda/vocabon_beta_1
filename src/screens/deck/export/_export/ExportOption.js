import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, View, Dimensions, Text, TouchableOpacity, TextInput,
} from 'react-native';
import { Button, Divider, RadioButton } from 'react-native-paper';
import PropTypes from 'prop-types';

import Color from '../../../../config/Color';

const style = StyleSheet.create({
  container: {
    // flex: 1,
  },
  optionBox: {
    flex: 2,
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 5,
    padding: 10,
    // borderWidth: 2,
    borderRadius: 5,
    backgroundColor: Color.white1,
  },
  delimiterInput: {
    // marginHorizontal: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
});

const ExportOption = (props) => {
  const [itemValue, setItemValue] = useState(', ');
  const [cardValue, setCardValue] = useState('; ');
  const [itemDelimiter, setItemDelimiter] = useState(', ');
  const [cardDelimiter, setCardDelimiter] = useState('; ');

  const renderCustomText = (options) => (
    <TextInput
      value={options.delimiterState[0]}
      onChangeText={(newValue) => { (options.delimiterState[1])(newValue); }}
      multiline
      style={style.delimiterInput}
    />
  );

  const renderRadioButtons = (options) => (
    <RadioButton.Group
      onValueChange={(newValue) => {
        options.radioState[1](newValue);
        options.delimiterState[1](newValue);
      }}
      value={options.radioState[0]}
    >
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          options.radioState[1](options.buttonValue1);
          options.delimiterState[1](options.buttonValue1);
        }}
      >
        <RadioButton value={options.buttonValue1} />
        <Text>{options.buttonTitle1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          options.radioState[1](options.buttonValue2);
          options.delimiterState[1](options.buttonValue2);
        }}
      >
        <RadioButton value={options.buttonValue2} />
        <Text>{options.buttonTitle2}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          options.radioState[1](options.buttonValue3);
          options.delimiterState[1](options.buttonValue3);
        }}
      >
        <RadioButton value={options.buttonValue3} />
        {renderCustomText(options)}
      </TouchableOpacity>
    </RadioButton.Group>
  );

  const renderOptionBox = () => {
    const optionSet = [
      {
        title: 'Between Term and Definition',
        buttonTitle1: 'Comma',
        buttonTitle2: 'Tab',
        buttonValue1: ', ',
        buttonValue2: '\t\t',
        buttonValue3: '',
        radioState: [itemValue, setItemValue],
        delimiterState: [itemDelimiter, setItemDelimiter],
      },
      {
        title: 'Between Terms',
        buttonTitle1: 'Semicolon',
        buttonTitle2: 'Change Line',
        buttonValue1: '; ',
        buttonValue2: '\n',
        buttonValue3: '',
        radioState: [cardValue, setCardValue],
        delimiterState: [cardDelimiter, setCardDelimiter],
      },
    ];
    return (
      <View style={style.optionBox}>
        <Text style={{ fontSize: 20 }}> Options </Text>
        <Divider />
        {/* <FlatListstyle={{ marginVertical: 5 }}options={optionSet}renderItem={({ item }) => (<View><Text style={{ fontSize: 15 }}>{item.title}</Text><TextInputvalue={item.state[0]}onChangeText={item.state[1]}style={style.delimiterInput}/></View>)}/> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {optionSet.map((optionset) => (
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Text style={{ fontSize: 15 }}>{optionset.title}</Text>
              <Divider />
              {renderRadioButtons(optionset)}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View>
      {renderOptionBox()}
    </View>
  );
};

export default ExportOption;
