import React, { useState, useEffect } from 'react';

import {
  View, Text, StyleSheet, ScrollView, Dimensions,
} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // width: ScreenWidth,
    // backgroundColor: 'skyblue',
    // marginVertical: 10,
    // borderRadius: 20,
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

// kochiya

const SlideData = [
  { title: 'slide1', text: 'Welcome to Vocabon!', color: 'red' },
  { title: 'slide2', text: 'Are you ready?', color: 'skyblue' },
  { title: 'slide3', text: "Then let's go!", color: 'green' },
];
const { height: heightInitial, width: widthInitial } = Dimensions.get('window');
// const renderSlides = () => (SlideData.map((slide, index) => (
//   <View>
//     <Text>{slide.title}</Text>
//     <Text>{slide.text}</Text>
//     <Text>
//       {index + 1}
//       /3
//     </Text>
//   </View>
// )));

// const Readme = () => (
//   <ScrollView style={style.container} horizontal pagingEnabled>
//     {renderSlides()}
//   </ScrollView>
// );

const Readme = (props) => {
  // state
  const [layout, setLayout] = useState({ height: heightInitial, width: widthInitial });

  useEffect(() => {
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      setLayout({ width, height });
    });
  }, []);

  const renderSlides = () => SlideData.map((slide, index) => (
    <View
      style={[style.container, { width: layout.width }, { backgroundColor: slide.color }]}
      key={index}
    >
      {/* <Text>{slide.title}</Text> */}
      <Text style={style.text}>{slide.text}</Text>
      <Text style={style.number}>
        {index + 1}
        /3
      </Text>
    </View>
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

/* class Readme extends React.Component {
  renderSlides() {
    return SlideData.map((slide, index) => (
      <View
        style={style.container}
        key={index}
      >
        <Text>{slide.title}</Text>
        <Text>{slide.text}</Text>
        <Text>
          {index + 1}
          /3
        </Text>
      </View>
    ));
  }

  render() {
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
      >
        {this.renderSlides()}
      </ScrollView>
      </View>
    );
  }
} */

export default Readme;
