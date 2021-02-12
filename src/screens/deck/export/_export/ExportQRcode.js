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

const icon = require('../../../../../assets/icon.png');

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.green6,
    marginHorizontal: '5%',
    marginVertical: '10%',
    borderRadius: 10,
    flex: 1,
  },
  // qrcode: {
  //   // flex: 4,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  qrView: {
    flex: 4,
  },
  qrContentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: Color.defaultBackground,
    borderRadius: 10,
  },
  title: {
    flex: 1,
    marginHorizontal: 20,
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
  carouselView: {
    marginVertical: 5,
    flex: 1,
  },
  paginationView: {
  },
});

const ExportQRcode = (props) => {
  const {
    dataArray, general, setContentVisible,
  } = props;
  const [errorOrNot, setErrorOrNot] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  const [layoutQR, setLayoutQR] = useState({ height: 0, width: 0 });

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
    <View
      style={style.qrContentView}
      onLayout={(e) => setLayoutQR(func.onLayoutContainer(e))}
    >
      <View style={style.title}>
        <Text style={{ fontSize: 20 }}>{`${general.title}  No.${index + 1}`}</Text>
      </View>
      <View style={style.qrView}>
        <SvgQRCode
          value={text}
          size={layoutQR.width * 0.85}
          logo={icon}
          logoSize={40}
          logoBackgroundColor={Color.white1}
          enableLinearGradient
          linearGradient={[Color.green6, Color.green2]}
          onError={() => setErrorOrNot(true)}
        />
      </View>
    </View>

  );

  return (
    <View
      style={style.content}
      onLayout={(e) => setLayout(func.onLayoutContainer(e))}
    >
      <View style={style.carouselView}>
        <DeckCarousel
          data={dataArray}
          layout="tinder"
          layoutCardOffset="10"
          renderItem={renderQRCodeView}
          itemWidth={260}
          sliderWidth={layout.width}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
      <View style={style.paginationView}>
        <Pagination
          dotsLength={dataArray.length}
          inactiveDotStyle={{ backgroundColor: Color.gray2 }}
          activeDotIndex={activeIndex}
          containerStyle={{ padding: 25 }}
      	    // countainerStyle={{ paddingVertical: 10 }}
          dotStyle={{ backgroundColor: Color.gray4 }}
        />
      </View>
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
