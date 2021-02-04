import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { header } from '../../../config/Const';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: header.paddingTop,
  },
  text: {
    fontSize: 40,
  },
  number: {
    fontSize: 48,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

const SlideData = [
  { title: 'slide1', text: 'Welcome to Vocabon!', color: 'red' },
  { title: 'slide2', text: 'Are you ready?', color: 'skyblue' },
  { title: 'slide3', text: "Then let's go!", color: 'green' },
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
      <Text style={style.text}>{slide.text}</Text>
      <Text style={style.number}>
        {index + 1}
        /3
      </Text>
      {index === (SlideData.length - 1) ? <Button onPress={() => navigation.navigate('signup')}>Start</Button> : null}
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
