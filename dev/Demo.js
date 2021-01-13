/* eslint-disable no-use-before-define */
import React from 'react';
import { useState } from 'react';
import {
  Button, TouchableOpacity, View, Text,
} from 'react-native';
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
    {renderVocabList()}
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
      labelVisible
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

// const renderProfileIcon = () => PastelColors.map((color) => (
//   <ProfileIcon char="V" color={color} onPress={() => console.log({ color })} />
// ));
