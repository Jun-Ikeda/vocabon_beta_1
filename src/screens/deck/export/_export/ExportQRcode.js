import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SvgQRCode from 'react-native-qrcode-svg';
import DeckCarousel, { Pagination } from 'react-native-snap-carousel';
import Icon from '../../../../components/Icon';
import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.defaultBackground,
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
    marginHorizontal: 10,
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
  const {
    dataArray, general, setContentVisible,
  } = props;
  const [errorOrNot, setErrorOrNot] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [layout, setLayout] = useState({ height: 0, width: 0 });

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

  const renderQRCodeView = ({ item: text, index }) => (
    <View style={{ flex: 1 }}>
      <View style={style.title}>
        <Text style={{ fontSize: 20 }}>{`${general.title}  No.${index + 1}`}</Text>
      </View>
      <SvgQRCode
        value={text}
        size={260}
        enableLinearGradient
        linearGradient={[Color.green6, Color.green2]}
        onError={() => setErrorOrNot(true)}
      />
    </View>

  );

  return (
    <View
      style={style.content}
      onLayout={(e) => setLayout(func.onLayoutContainer(e))}
    >
      <DeckCarousel
        data={dataArray}
        renderItem={renderQRCodeView}
        itemWidth={260}
        sliderWidth={layout.width}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={dataArray.length}
        inactiveDotStyle={{ backgroundColor: Color.gray2 }}
        activeDotIndex={activeIndex}
        containerStyle={{ padding: 25 }}
          // countainerStyle={{ paddingVertical: 10 }}
        dotStyle={{ backgroundColor: Color.gray4 }}
      />
      {renderCancelButton()}
    </View>
  );
};

ExportQRcode.propTypes = {
  dataArray: PropTypes.array.isRequired,
  general: PropTypes.object.isRequired,
  setContentVisible: PropTypes.func.isRequired,
};

export default ExportQRcode;
