import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
// import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';

import { readme } from '../../../config/PersistentData';
import Color from '../../../config/Color';
// ?

import HTMLContent from './HTMLContent';
import Icon from '../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 10,
    // paddingHorizontal: 40,
  },
});

const TermsAndCondition = (props) => {
  const { navigation } = props;
  const [checked, setChecked] = useState(false);
  return (
    <View style={style.container}>
      <View style={{ flex: 1, padding: 50, paddingBottom: 20 }}>
        <WebView
          originWhitelist={['*']}
          source={{ html: HTMLContent }}
        />
      </View>
      <TouchableOpacity onPress={() => setChecked((prev) => !prev)} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <Icon.MaterialIcons name={checked ? 'check-box' : 'check-box-outline-blank'} style={{ fontSize: 22, padding: 5, color: checked ? Color.blue2 : Color.black }} />
        <Text style={{ fontSize: 20 }}>Yes I accept terms and conditions</Text>
      </TouchableOpacity>
      <View style={{ padding: 10 }}>
        <Button
          onPress={() => {
            readme.save(true);
            navigation.navigate('signup');
          }}
          mode="contained"
          color={Color.green2}
          disabled={!checked}
        >
          Proceed
        </Button>
      </View>
    </View>
  );
};

TermsAndCondition.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TermsAndCondition;
