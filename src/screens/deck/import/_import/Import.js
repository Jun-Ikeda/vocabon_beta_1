import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Linking, TextInput, TouchableOpacity, LayoutAnimation, Platform, Alert, KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';

import { Button, Divider, Menu } from 'react-native-paper';

import { useIsFocused, useNavigationState } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';
import ImportList from '../ImportList';
import ImportQRcode from '../_importQRcode/ImportQRcode';
import ImportHelp from './ImportHelp';
import { func } from '../../../../config/Const';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 20,
    textAlignVertical: 'top',
    backgroundColor: Color.white1,
    // marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  delimiterInput: {
    // marginHorizontal: 10,
    padding: 10,
    backgroundColor: Color.white1,
    borderRadius: 10,
  },
  expandButton: {
    paddingHorizontal: 5,
  },
  expandIcon: {
    fontSize: 26,
  },
  emptyText: {
    fontStyle: 'italic',
  },
  qrbutton: {
    paddingHorizontal: 5,
  },
  qrIcon: {
    fontSize: 23,
  },
  button: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});

const Import = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // state
  const [input, setInput] = useState('manzana;apple,block/plátano;banana');
  const [elementDelimiter, setElementDelimiter] = useState(',');
  const [itemDelimiter, setItemDelimiter] = useState(';');
  const [cardDelimiter, setCardDelimiter] = useState('/');
  const [inputExpand, setInputExpand] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [inputArray, setInputArray] = useState([]);
  const [qrScannerVisible, setQRScannerVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const isChanged = !((input === 'manzana;apple,block/plátano;banana') || (input === ''));
  const isFocused = useIsFocused();

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    if (!(Platform.OS === 'web') && isChanged && isFocused) {
      e.preventDefault();
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Save',
            onPress: () => navigation.navigate('importoption', {
              input, itemDelimiter, cardDelimiter, deckID,
            }),
          },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        ],
      );
    }
  }),
  [navigation, isChanged, isFocused]);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA).catch((error) => func.alertConsole(error));
      if (status === 'granted') {
        setHasPermission(status === 'granted');
      } else {
        Alert.alert(
          'Camera has been deactivated',
          'Move to Setting？',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Setting', onPress: () => Linking.openURL('app-settings:') },
          ],
        );
      }
    }
    )();
  }, []);

  useEffect(() => {
    if (input === '' || itemDelimiter === '' || cardDelimiter === '' || elementDelimiter === '') {
      setInputArray([]);
    } else {
      setInputArray(input.split(cardDelimiter).map((card) => card.split(itemDelimiter).map((item) => item.split(elementDelimiter))));
    }
  }, [input, elementDelimiter, itemDelimiter, cardDelimiter]);

  const renderDelimiterInput = () => {
    const inputs = [
      { title: 'CARD', state: [cardDelimiter, setCardDelimiter] },
      { title: 'ITEM', state: [itemDelimiter, setItemDelimiter] },
      { title: 'ELEMENT', state: [elementDelimiter, setElementDelimiter] },
    ];
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
        {inputs.map((_input) => (
          <View style={{ flex: 1, padding: 5 }} key={_input.title.toLowerCase()}>
            <Text style={{ /* paddingHorizontal: 10, */ fontSize: 18 }}>{_input.title}</Text>
            <TextInput
              value={_input.state[0]}
              onChangeText={_input.state[1]}
              style={style.delimiterInput}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderInput = () => (
    <View style={{
      marginTop: 10, padding: 10, flex: inputExpand ? 1 : null, height: 240,
    }}
    >
      <Text style={{ fontSize: 18 }}>INPUT</Text>
      <TextInput
        multiline
        style={style.input}
        value={input}
        onChangeText={setInput}
      />
      <View style={{
        position: 'absolute', right: 25, flexDirection: 'row', marginTop: 1.5,
      }}
      >
        <TouchableOpacity
          style={style.qrButton}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setQRScannerVisible(true);
          }}
        >
          <Icon.MaterialCommunityIcons style={style.qrIcon} name="qrcode-scan" />
        </TouchableOpacity>
      </View>
      <View style={{
        position: 'absolute', right: 60, flexDirection: 'row',
      }}
      >
        <TouchableOpacity
          style={style.expandButton}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setInputExpand(!inputExpand);
          }}
        >
          <Icon.Ionicons style={style.expandIcon} name={inputExpand ? 'contract' : 'expand'} />
        </TouchableOpacity>
      </View>
      <View style={{ position: 'absolute', right: 95, flexDirection: 'row' }}>
        <TouchableOpacity style={style.button} onPress={() => setHelpVisible(true)}>
          <Icon.Feather name="help-circle" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHelp = () => (
    <ImportHelp
      isVisible={helpVisible}
      setIsVisible={setHelpVisible}
    />
  );

  const renderCompileButton = () => (
    <View style={{
      padding: 10, position: 'absolute', bottom: 0, right: 0, left: 0,
    }}
    >
      <Button
        color={Color.green3}
        mode="contained"
        disabled={inputArray.length === 0}
        onPress={() => navigation.navigate('importoption', {
          input, elementDelimiter, itemDelimiter, cardDelimiter, deckID,
        })}
      >
        Import
      </Button>
    </View>
  );
  return (
    <KeyboardAvoidingView style={style.container}>
      <View style={{ flex: 1 }}>
        {inputExpand ? null : renderDelimiterInput()}
        {renderInput()}
        {inputExpand ? null : <ImportList inputArray={inputArray} />}
      </View>
      {inputExpand ? null : renderCompileButton()}
      <ImportQRcode
        isContentVisible={qrScannerVisible}
        setContentVisible={setQRScannerVisible}
        setInput={setInput}
        hasPermission={hasPermission}
        cardDelimiter={cardDelimiter}
      />
    </KeyboardAvoidingView>
  );
};

Import.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Import;
