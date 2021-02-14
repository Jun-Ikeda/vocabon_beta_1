import * as React from 'react';
import {
  Text, View, ScrollView, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, Alert, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { Button, Portal } from 'react-native-paper';
import Icon from '../../../../components/Icon';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

import { func } from '../../../../config/Const';

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white1,
    marginHorizontal: '5%',
    marginVertical: '15%',
    borderRadius: 10,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    margin: 5,
    // padding: 20,
  },
  qrcode: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    backgroundColor: Color.defaultBackground,
  },
  popUp: {
    backgroundColor: Color.defaultBackground,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray3,
  },
  cancelButtonIcon: {
    fontSize: 24,
    color: Color.gray1,
  },
  ButtonIcon: {
    fontSize: 24,
    color: Color.white1,
  },
  result: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.white1,
  },
});

const ImportQRcode = (props) => {
  const {
    isContentVisible, setContentVisible, hasPermission, setInput, cardDelimiter,
  } = props;
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(''); // そのときにスキャンしたデータ
  // const [dataLog, setDataLog] = useState(''); // 今までにスキャンした集計したデータ
  const [preScannedData, setPreScannedData] = useState('');

  const renderCancelButton = () => (scanned
    ? null
    : (
      <TouchableOpacity
        style={style.cancelButton}
        onPress={() => {
          setContentVisible(false);
          setScannedData('');
          setPreScannedData('');
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}
      >
        <Icon.Feather name="x" style={style.cancelButtonIcon} />
      </TouchableOpacity>
    ));

  const handleBarCodeScanned = ({ data }) => {
    if (data === null) {
      Alert.alert('Oops!', 'Read slowly');
    } else {
      setScanned(true);
      // setScannedData(data);
      setPreScannedData(scannedData);
      setScannedData((prev) => (prev === '' ? data : scannedData + cardDelimiter + data));
    }
  };

  const renderAfterScanned = () => {
    const buttons = [
      {
        icon: { name: 'md-refresh-outline' },
        onPress: () => {
          setScanned(false);
          // setScannedData('');
          setScannedData(preScannedData);
        },
      },
      {
        icon: { name: 'ios-add-sharp' },
        onPress: () => {
          setScanned(false);
          // setDataLog((pre) => `${pre}${scannedData}`);
        },
      },
      {
        icon: { name: 'ios-checkmark' },
        onPress: () => {
          setScanned(false);
          // setDataLog((pre) => `${pre}${scannedData}`);
          setInput((prev) => (prev === '' ? scannedData : prev + cardDelimiter + scannedData));
          setScannedData('');
          setContentVisible(false);
        },
      },
      {
        icon: { name: 'close-outline' },
        onPress: () => {
          setScanned(false);
          setContentVisible(false);
          setScannedData('');
          setPreScannedData('');
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        },
      },
    ];
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <ScrollView style={style.result}>
          <Text style={{ fontSize: 18 }}>{scannedData}</Text>
        </ScrollView>
        <View style={style.buttonsContainer}>
          {buttons.map((button) => (
            <View style={style.buttonContainer}>
              <Button onPress={button.onPress} mode="contained" color={Color.green2}>
                <Icon.Ionicons name={button.icon.name} style={style.ButtonIcon} />
              </Button>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderCamera = () => {
    if (hasPermission === null) {
      return (
        <Text>Requesting for camera permission</Text>
      );
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={style.qrcode}>
        {scanned ? (
          renderAfterScanned()
        )
          : (
            <BarCodeScanner
              onBarCodeScanned={scanned ? () => {} : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          )}
      </View>
    );
  };

  return (
    <Portal>
      <PopUpMenu
        isVisible={isContentVisible}
        renderMenu={() => (
          <View style={style.content}>
            {renderCamera()}
            {renderCancelButton()}
          </View>
        )}
        // overlayStyle={style.popUp}
        // containerStyle={{ justifyContent: 'center' }}
      />
    </Portal>
  );
};

ImportQRcode.propTypes = {
  isContentVisible: PropTypes.bool.isRequired,
  setContentVisible: PropTypes.func.isRequired,
  hasPermission: PropTypes.bool.isRequired,
  setInput: PropTypes.func.isRequired,
  cardDelimiter: PropTypes.string.isRequired,
};

export default ImportQRcode;
