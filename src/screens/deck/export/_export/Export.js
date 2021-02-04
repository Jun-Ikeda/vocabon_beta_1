import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import ExpoClipboard from 'expo-clipboard';

import PropTypes from 'prop-types';
import Color from '../../../../config/Color';
import { getDeckContent } from '../../../../config/deck/Deck';
import { func } from '../../../../config/Const';
import PopUpMenu from '../../../../components/popup/PopUpMenu';

import ExportOption from './ExportOption';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataBox: {
    flex: 3,
    margin: 20,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Color.white1,
    justifyContent: 'center',
  },
  popUp: {
    backgroundColor: Color.white1,
    borderRadius: 10,
  },
});

const Export = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // state
  // const [layout, setLayout] = useState({ height: 300, width: 300 });
  const [itemValue, setItemValue] = useState(', ');
  const [cardValue, setCardValue] = useState('; ');
  const [itemDelimiter, setItemDelimiter] = useState(', ');
  const [cardDelimiter, setCardDelimiter] = useState('; ');

  const [contentVisible, setContentVisible] = useState(false);

  const content = getDeckContent(deckID);

  // const renderExportTypes = () => {//   const exportButtons = [//     {//       title: 'JSON',//       onPress: () => func.alert('Export as JSON'),//       textStyle: {}, //       flex: 1,//     },//     {//       title: 'Excel',//       onPress: () => func.alert('Export as Excel'),//       textStyle: {},//       flex: 1,//     },//     {//       title: 'Copy',//       onPress: () => func.alert('Export as a Copy'),//       textStyle: {},//       flex: 1,//     },//   ];//   if (visible) {//     return exportButtons.map((button) => (//       <View style={[{ borderWidth: 1 }]}>//         <Button title={button.title} onPress={button.onPress} />//       </View>//     ));//   }//   return null;// };

  const renderMenu = () => (
    <View style={style.container}>
      <Text> this is the popup screen </Text>
      <TouchableOpacity
        onPress={() => setContentVisible(false)}
        style={{ borderWidth: 1 }}
      >
        <Text>Press</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDataBox = () => {
    const contentArray = func.convertObjectToArray(content);
    const output = contentArray.map((element) => [element.value.term, element.value.definition].join(itemDelimiter)).join(cardDelimiter);
    // const deckString = deckItems.map((element) => element.map)// const deckString = JSON.stringify(deckItems, null, 4);

    return (
      <View style={style.dataBox}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 22, padding: 10 }}> Data </Text>
          <TouchableOpacity
            onPress={() => setContentVisible(true)}
            style={{ borderWidth: 1 }}
          >
            <Text> Press </Text>

          </TouchableOpacity>

        </View>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <Text>{output}</Text>
        </ScrollView>
        <View style={{ padding: 10 }}>
          <Button onPress={() => ExpoClipboard.setString(output)} mode="contained" color={Color.green2}>Copy</Button>
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>

      <ExportOption
        itemValue={itemValue}
        setItemValue={setItemValue}
        cardValue={cardValue}
        setCardValue={setCardValue}
        itemDelimiter={itemDelimiter}
        setItemDelimiter={setItemDelimiter}
        cardDelimiter={cardDelimiter}
        setCardDelimiter={setCardDelimiter}
      />
      {renderDataBox()}
      <PopUpMenu
        isVisible={contentVisible}
        renderMenu={renderMenu}
        overlayStyle={style.popUp}
      />
    </View>
  );
};

Export.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
Export.defaultPrps = {

};

export default Export;
