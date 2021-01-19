import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, View, Dimensions, Text,
} from 'react-native';
import { Button } from 'react-native-paper';
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
    flex: 1,
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
});

const Export = (props) => {
  const { navigation, route: { params: { deckID } } } = props;
  const string = JSON.stringify(getDeckContent(deckID), null, 4);
  // const [visible, setVisible] = useState(false);

  const [layout, setLayout] = useState({ height: 300, width: 300 });

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
  const renderOptionBox = () => (
    <View style={style.optionBox}>
      <Text style={{ fontSize: 20, borderBottomWidth: 1 }}> Options </Text>
    </View>
  );

  const renderDataBox = () => (
    <View style={style.dataBox}>
      <Text style={{ fontSize: 20, marginBottom: 10, borderBottomWidth: 1 }}> Data </Text>
      <ScrollView persistentScrollbar>
        <Text>{string}</Text>
      </ScrollView>
      <Button onPress={() => ExpoClipboard.setString(string)}>Copy</Button>
      {/* <Button title="Export" onPress={() => setVisible(!visible)} />
      {renderExportTypes()} */}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text>tab bar</Text>
      <View style={{ flex: 1 }}>
        <View style={StyleSheet.absoluteFill} onLayout={(e) => setLayout(func.onLayoutContainer(e))} />
        {/* <ScrollView horizontal pagingEnabled in > */}
        <View style={{ flex: 2 }}>
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
