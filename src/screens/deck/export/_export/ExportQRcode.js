import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, LayoutAnimation,
} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';

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
  qrcode: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
});

const ExportQRcode = (props) => {
  const { data, general, setContentVisible } = props;
  // const dataLength = data.length;

  const renderCancelButton = () => (
    <TouchableOpacity
      style={style.cancelButton}
      onPress={() => {
        setContentVisible(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  // const divideContent = () => (
  //   console.log(Math.floor(dataLength / 10) + 1)

  // );

  return (
    <View style={style.content}>
      <View style={style.title}>
        <Text style={{ fontSize: 20 }}>{general.title}</Text>
      </View>
      <View style={style.qrcode}>
        <SvgQRCode
          value={data}
          size={240}
          enableLinearGradient
          linearGradient={[Color.green6, Color.green2]}
        />
      </View>
      {renderCancelButton()}
      {/* {divideContent()} */}
    </View>
  );
};

export default ExportQRcode;
