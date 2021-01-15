/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  Button, TouchableOpacity, View, Text, StyleSheet,
} from 'react-native';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import VocabList from '../src/components/deck/list/VocabList';
import ProfileIcon from '../src/components/user/profileicon/ProfileIcon';
import { account } from '../src/config/account/Account';
import Color, { PastelColors } from '../src/config/Color';
import { func } from '../src/config/Const';
import { decksContent } from '../src/config/deck/Deck';
import TestData, { User } from './TestData';

const Demo = (props) => (
  <View style={{
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    backgroundColor: Color.defaultBackground,
  }}
  >
    {/* {renderProfileIcon()} */}
    {/* {renderVocabList()} */}
    {renderRangeBar()}
  </View>
);

export default Demo;

const renderVocabList = () => {
  const [expandVocabIDs, setExpandVocabIDs] = useState([]);
  const id = 'xn>EfhY:2*';
  // const expandVocabIDs = ['qIDjbgc-', 'MdmRNj0Y'];
  const accountContent = account.content?.[id] ?? { marks: {}, play: [], bookmark: false };
  return (
    <VocabList
      content={decksContent[id]}
      // itemVisible={{
      //   term: true, definition: true, exampleD: true, exampleT: true, synonym: true,
      // }}
      itemVisible={(vocab) => ({ term: true, definition: true, synonym: expandVocabIDs.includes(vocab.key) })}
      // labelVisible
      // renderCard={({ item }) => <Text>{item.value.term}</Text>}
      // onPressCard={(vocab) => func.alertConsole(vocab.value.term)}
      state={[expandVocabIDs, setExpandVocabIDs]}
      // renderCardRight={(vocab) => (
      //   <View style={{ padding: 10, backgroundColor: 'skyblue' }}>
      //     <Text>{accountContent.marks[vocab.key].length}</Text>
      //   </View>
      // )}
      itemStyle={{
        term: { color: 'yellow' },
        synonym: { fontSize: 30 },
      }}
    />
  );
};

const renderProfileIcon = () => PastelColors.map((color) => (
  <ProfileIcon char="V" color={color} onPress={() => console.log({ color })} />
));

const renderRangeBar = () => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [value, setValue] = useState(0);
  return (
    <View style={styles.container}>
      <View>
        <RangeSlider
          min={5}
          max={25}
          fromValueOnChange={(value) => setFromValue(value)}
          toValueOnChange={(value) => setToValue(value)}
          initialFromValue={11}
        />
        <Text>
          from value:
          {fromValue}
        </Text>
        <Text>
          to value:
          {toValue}
        </Text>
      </View>
      <View>
        <Slider
          min={0}
          max={40}
          step={4}
          valueOnChange={(value) => setValue(value)}
          initialValue={12}
          knobColor="red"
          valueLabelsBackgroundColor="black"
          inRangeBarColor="purple"
          outOfRangeBarColor="orange"
        />
        <Text>
          value:
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
