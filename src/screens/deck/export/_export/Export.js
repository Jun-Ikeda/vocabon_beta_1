import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, View, Dimensions, Text, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { decksContent } from '../../../../config/deck/Deck';
import { func } from '../../../../config/Const';

const { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Export = (props) => {
  const { navigation, route: { params: { deckID } } } = props;
  const content = decksContent[deckID];
  const [visible, setVisible] = useState(false);

  const [layout, setLayout] = useState({ height: 300, width: 300 });

  const renderExportTypes = () => {
    const exportButtons = [
      {
        title: 'JSON',
        onPress: () => func.alert('Export as JSON'),
        textStyle: {},
        flex: 1,
      },
      {
        title: 'Excel',
        onPress: () => func.alert('Export as Excel'),
        textStyle: {},
        flex: 1,
      },
      {
        title: 'Copy',
        onPress: () => func.alert('Export as a Copy'),
        textStyle: {},
        flex: 1,
      },
    ];
    if (visible) {
      return exportButtons.map((button) => (
        <View style={[{ borderWidth: 1 }]}>
          <Button title={button.title} onPress={button.onPress} />
        </View>
      ));
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>tab bar</Text>
      <Button title="Export" onPress={() => setVisible(!visible)} />
      {renderExportTypes()}
      <View style={{ flex: 1 }}>
        <View style={StyleSheet.absoluteFill} onLayout={(e) => setLayout(func.onLayoutContainer(e))} />
        <ScrollView horizontal pagingEnabled in>
          <ScrollView style={layout}>
            <Text>{JSON.stringify(content, null, 4)}</Text>
          </ScrollView>
          <View style={layout}>
            <Text>{JSON.stringify(content)}</Text>
            <Button title="JSON" />
            <Button title="Excel" />
            <Button title="Copy" />
          </View>
        </ScrollView>
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
