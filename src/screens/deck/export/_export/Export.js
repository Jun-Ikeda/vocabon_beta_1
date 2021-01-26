import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, View, Dimensions, Text, TouchableOpacity, TextInput,
} from 'react-native';
import { Button, Divider, RadioButton } from 'react-native-paper';
import ExpoClipboard from 'expo-clipboard';

import PropTypes from 'prop-types';
import Color from '../../../../config/Color';
import { getDeckContent } from '../../../../config/deck/Deck';
import { func } from '../../../../config/Const';

const { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    flex: 1,
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
  dataBox: {
    flex: 5,
    marginHorizontal: 30,
    padding: 10,
    // borderWidth: 2,
    borderRadius: 5,
    backgroundColor: Color.white1,
    justifyContent: 'center',

  },
  delimiterInput: {
    // marginHorizontal: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
});

const Export = (props) => {
  const { navigation, route: { params: { deckID } } } = props;
  // const [visible, setVisible] = useState(false);

  const [layout, setLayout] = useState({ height: 300, width: 300 });
  const [itemValue, setItemValue] = useState('\t');
  const [cardValue, setCardValue] = useState(';');
  const [itemDelimiter, setItemDelimiter] = useState('');
  const [itemDelimiterCustom, setItemDelimiterCustom] = useState(',');
  const [cardDelimiter, setCardDelimiter] = useState('');
  const [cardDelimiterCustom, setCardDelimiterCustom] = useState('/');

  const content = getDeckContent(deckID);

  // const renderExportTypes = () => {
  //   const exportButtons = [
  //     {
  //       title: 'JSON',
  //       onPress: () => func.alert('Export as JSON'),
  //       textStyle: {},
  //       flex: 1,
  //     },
  //     {
  //       title: 'Excel',
  //       onPress: () => func.alert('Export as Excel'),
  //       textStyle: {},
  //       flex: 1,
  //     },
  //     {
  //       title: 'Copy',
  //       onPress: () => func.alert('Export as a Copy'),
  //       textStyle: {},
  //       flex: 1,
  //     },
  //   ];
  //   if (visible) {
  //     return exportButtons.map((button) => (
  //       <View style={[{ borderWidth: 1 }]}>
  //         <Button title={button.title} onPress={button.onPress} />
  //       </View>
  //     ));
  //   }
  //   return null;
  // };
  const renderCustomText = (options) => (
    <TextInput
      value={options.delimeterstatecustom[0]}
      onChangeText={options.delimeterstatecustom[1]}
      style={style.delimiterInput}
    />
  );

  const renderRadioButtons = (options) => (
    <RadioButton.Group onValueChange={(newValue) => options.radiostate[1](newValue)} value={options.radiostate[0]}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          options.radiostate[1](options.buttonValue1);
          options.delimiterstate[1](options.buttonValue1);
          console.log(options.delimiterstate[0]);
        }}
      >
        <RadioButton
          value={options.buttonValue1}
        />
        <Text>{options.buttonTitle1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          options.radiostate[1](options.buttonValue2);
          options.delimiterstate[1](options.buttonValue2);
        }}
      >
        <RadioButton
          value={options.buttonValue2}
        />
        <Text>{options.buttonTitle2}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => options.radiostate[1](options.buttonValue3)}
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
        buttonTitle1: 'Tab',
        buttonTitle2: 'Comma',
        buttonValue1: '\t\t',
        buttonValue2: ', ',
        buttonValue3: 'custom',
        radiostate: [itemValue, setItemValue],
        delimiterstate: [itemDelimiter, setItemDelimiter],
        delimeterstatecustom: [itemDelimiterCustom, setItemDelimiterCustom],
      },
      {
        title: 'Between Terms',
        buttonTitle1: 'Semicolon',
        buttonTitle2: 'Change Line',
        buttonValue1: '; ',
        buttonValue2: '\n',
        buttonValue3: 'custom',
        radiostate: [cardValue, setCardValue],
        delimiterstate: [cardDelimiter, setCardDelimiter],
        delimeterstatecustom: [cardDelimiterCustom, setCardDelimiterCustom],
      },
    ];
    return (
      <View style={style.optionBox}>
        <Text style={{ fontSize: 20 }}> Options </Text>
        <Divider />
        {/* <FlatList
          style={{ marginVertical: 5 }}
          options={optionSet}
          renderItem={({ item }) => (
            <View>
              <Text style={{ fontSize: 15 }}>{item.title}</Text>
              <TextInput
                value={item.state[0]}
                onChangeText={item.state[1]}
                style={style.delimiterInput}
              />
            </View>
          )}
        /> */}
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

  const renderDataBox = () => {
    const contentArray = func.convertObjectToArray(content);
    const output = contentArray.map((element) => [element.value.term, element.value.definition].join(itemDelimiter)).join(cardDelimiter);
    // const deckString = deckItems.map((element) => element.map)
    // const deckString = JSON.stringify(deckItems, null, 4);

    return (
      <View style={style.dataBox}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}> Data </Text>
        <Divider />
        <ScrollView persistentScrollbar>
          <Text>{output}</Text>
        </ScrollView>
        <Button onPress={() => ExpoClipboard.setString(output)} mode="contained" color={Color.green2}>Copy</Button>
        {/* <Button title="Export" onPress={() => setVisible(!visible)} />
        {renderExportTypes()} */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>\t bar</Text>
      <View style={{ flex: 1 }}>
        <View style={StyleSheet.absoluteFill} onLayout={(e) => setLayout(func.onLayoutContainer(e))} />
        {/* <ScrollView horizontal pagingEnabled in > */}
        <View style={{ flex: 2 }}>
          {renderOptionBox()}
          {renderDataBox()}
          {/* {unstable_renderSubtreeIntoContainer} */}
        </View>
        {/* <View style={layout}>
          <Text>{JSON.stringify(content)}</Text>
          <Button title="JSON" />
          <Button title="Excel" />
          <Button title="Copy" />
        </View> */}
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

Export.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
Export.defaultProps = {

};

export default Export;
