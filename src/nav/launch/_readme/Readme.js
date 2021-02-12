import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import Color, { getRandomPastel } from '../../../config/Color';
import { header } from '../../../config/Const';
import Icon from '../../../components/Icon';

const screenshot0 = require('../../../../assets/icon.png');
const screenshot1 = require('../../../../assets/screenshots/S__74235908.png');
const screenshot2 = require('../../../../assets/screenshots/S__74235909.png');
const screenshot3 = require('../../../../assets/screenshots/S__74235910.png');
const screenshot4 = require('../../../../assets/screenshots/S__74235911.png');
const screenshot5 = require('../../../../assets/screenshots/S__74235912.png');

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: header.paddingTop,
  },
  backgroundColor: {
    // backgroundColor: getRandomPastel(),
    flex: 1,
  },
  onlyText: {
    marginVertical: 120,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    padding: 30,
  },
  subText: {
    fontSize: 30,
    marginHorizontal: 5,
    textAlign: 'center',
    padding: 30,
  },
  iconRight: {
    fontSize: 40,
    position: 'absolute',
    top: 30,
    right: 20,
    color: Color.gray4,
  },
  iconLeft: {
    fontSize: 40,
    position: 'absolute',
    top: 30,
    left: 20,
    color: Color.gray4,
  },
  picture: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
    marginHorizontal: '15%',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 1000,
  },
  startText: {
    // // resizeMode: 'contain',
    // // height: '70%',
    // // width: 'auto',
    // // marginHorizontal: '15%',
    color: Color.black,
    backgroundColor: getRandomPastel(),
    // backgroundColor:'red',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 100,
    fontSize: 60,
  },
  // startText: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

const SlideData = [
  {
    title: 'slide1',
    color: Color.defaultBackground,
    text: 'Welcome to Vocabon!',
    subText: 'Build up Your Vocabulary',
    img: screenshot0,
  },
  {
    title: 'slide2',
    color: Color.defaultBackground,
    text: '1.Edit',
    subText: 'Add Terms Easily',
    img: screenshot1,
  },
  {
    title: 'slide3',
    color: Color.defaultBackground,
    text: '2.Options',
    subText: 'Detailed Filtering of Cards',
    img: screenshot2,
  },
  {
    title: 'slide4',
    color: Color.defaultBackground,
    text: '3.Play',
    subText: 'Play and Classify',
    img: screenshot3,
  },
  {
    title: 'slide5',
    color: Color.defaultBackground,
    text: '4.Result',
    subText: 'Look-back your playing',
    img: screenshot4,
  },
  {
    title: 'slide6',
    color: Color.defaultBackground,
    text: '5.Analyze',
    subText: 'Check your weakness',
    img: screenshot5,
  },
  {
    title: 'slide7',
    color: Color.defaultBackground,
    text: "Then, let's go!",
    subText: '',
    img: null,
  },
];
const { height: heightInitial, width: widthInitial } = Dimensions.get('window');

const Readme = (props) => {
  // props
  const { navigation } = props;
  // state
  const [layout, setLayout] = useState({ height: heightInitial, width: widthInitial });

  useEffect(() => {
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      setLayout({ width, height });
    });
  }, []);

  const renderSlides = () => SlideData.map((slide, index) => (
    <SafeAreaView
      style={[style.container, { width: layout.width }, { backgroundColor: slide.color }]}
      key={slide.title.toLowerCase()}
    >
      <View style={[style.backgroundColor, { backgroundColor: getRandomPastel() }]}>
        {index === 6 ? null : <Icon.MaterialCommunityIcons name="chevron-triple-right" style={style.iconRight} />}
        {index === 0 ? null : <Icon.MaterialCommunityIcons name="chevron-triple-left" style={style.iconLeft} />}
        <View style={index === SlideData.length - 1 || index === 0 ? style.onlyText : null}>
          <View style={style.page}>
            <Text style={style.text}>{slide.text}</Text>
            {slide.img ? <Image source={slide.img} style={style.picture} /> : null}
            <Text style={style.subText}>{slide.subText}</Text>
            {index === 6
              ? <View style={style.startButton}><TouchableOpacity onPress={() => navigation.navigate('signup')}><Text style={style.startText}>START!</Text></TouchableOpacity></View>
              : null }
          </View>
        </View>
      </View>
    </SafeAreaView>
  ));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {renderSlides()}
      </ScrollView>
    </View>
  );
};

Readme.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Readme;
