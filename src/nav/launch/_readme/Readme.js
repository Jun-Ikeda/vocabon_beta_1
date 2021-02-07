import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { Button } from 'react-native-paper';
import Color from '../../../config/Color';
import { header } from '../../../config/Const';

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
  onlyText: {
    marginVertical: 100,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    padding: 20,
  },
  subText: {
    fontSize: 30,
    marginHorizontal: 25,
    textAlign: 'center',
  },
  // number: {
  //   fontSize: 24,
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  // },
  picture: {
    resizeMode: 'contain',
    height: '80%',
    width: '80%',
    marginHorizontal: '10%',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SlideData = [
  {
    title: 'slide1',
    color: Color.defaultBackground,
    text: 'Welcome to Vocabon!',
    subText: 'Build up Your Vocabulary',
    img: null,
  },
  {
    title: 'slide2',
    color: Color.defaultBackground,
    text: '1.Create',
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
    text: "Then,let's go!",
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
      {/* <Text>{slide.title}</Text> */}
      {/* <Text style={style.text}>{slide.text}</Text> */}
      {/* <Text style={style.number}>
        {index + 1}
        /
        {SlideData.length}
      </Text> */}
      <View style={index === SlideData.length - 1 || index === 0 ? style.onlyText : null}>
        <View style={style.page}>
          <Text style={style.text}>{slide.text}</Text>
          {slide.img ? <Image source={screenshot1} style={style.picture} /> : null}
          <Text style={style.subText}>{slide.subText}</Text>
          {index === 6
            ? <Button onPress={() => navigation.navigate('signup')}>Start</Button>
            : null}
        </View>
      </View>
      {/* {index === (SlideData.length - 7) ? (
        <View style={style.onlyText}>
          <View style={style.page}>
            <Text style={style.text}>{slide.text}</Text>
            <Text style={style.subText}>{slide.subText}</Text>
          </View>
        </View>
      ) : null}
      {index === (SlideData.length - 6) ? (
        <View style={style.page}>
          <Text style={style.text}>
            {slide.text}
          </Text>
          <Text style={style.subText}>
            {slide.subText}
          </Text>
          <Image source={screenshot1} style={style.picture} />
        </View>
      ) : null}
      {index === (SlideData.length - 5) ? (
        <View style={style.page}>
          <Text style={style.text}>
            {slide.text}
          </Text>
          <Text style={style.subText}>
            {slide.subText}
          </Text>
          <Image source={screenshot2} style={style.picture} />
        </View>
      ) : null}
      {index === (SlideData.length - 4) ? (
        <View style={style.page}>
          <Text style={style.text}>
            {slide.text}
          </Text>
          <Text style={style.subText}>
            {slide.subText}
          </Text>
          <Image source={screenshot3} style={style.picture} />
        </View>
      ) : null}
      {index === (SlideData.length - 3) ? (
        <View style={style.page}>
          <Text style={style.text}>
            {slide.text}
          </Text>
          <Text style={style.subText}>
            {slide.subText}
          </Text>
          <Image source={screenshot4} style={style.picture} />
        </View>
      ) : null}
      {index === (SlideData.length - 2) ? (
        <View style={style.page}>
          <Text style={style.text}>
            {slide.text}
          </Text>
          <Text style={style.subText}>
            {slide.subText}
          </Text>
          <Image source={screenshot5} style={style.picture} />
        </View>
      ) : null} */}
      {/* {index === (SlideData.length - 1) ? (
        <View style={style.onlyText}>
          <View style={style.page}>
            <Text style={style.text}>
              {slide.text}
            </Text>
            <Button onPress={() => navigation.navigate('signup')}>Start</Button>
          </View>
        </View>
      ) : null} */}
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
