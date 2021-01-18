import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, FlatList, LayoutAnimation, TouchableOpacity,
} from 'react-native';
import lodash from 'lodash';
import { TextInput } from 'react-native-paper';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';

import { contentState, contentSearchedState } from './Edit';

const iconSize = 20;

const style = StyleSheet.create({
  inputView: {
    padding: 5,
    // borderWidth: 1,
    // borderColor: 'teal',
    justifyContent: 'center',
    // alignItems: 'center',
    // width: '60%',
    flex: 1,
  },
  input: {
    // flex: 1,
    // height: 30,
    // lineHeight: 30,
    fontSize: 18,
    backgroundColor: Color.white1,
    color: Color.black,
    // borderRadius: 5,
    // width: '100%',
    paddingLeft: 10,
    // borderWidth: 1,
  },
  clearbutton: {
    position: 'absolute',
    // borderWidth: 1,
    right: 20,
  },
});

const EditSearch = (props) => {
  // recoil
  const [content, setContent] = useRecoilState(contentState);
  const [contentSearched, setContentSearched] = useRecoilState(contentSearchedState);
  // const
  const array = Object.values(content);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setContentSearched(array);
  }, []);

  const handleSearched = (text) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const formattedQuery = text.toLowerCase();
    const newData = lodash.filter(array, (vocab) => vocab.term.includes(formattedQuery));
    setContentSearched(newData);
    setQuery(text);
    console.log(content);
  };

  return (
    <View
      style={style.inputView}
    >
      <TextInput
        value={query}
        onChangeText={handleSearched}
        placeholder="Search"
        style={style.input}
      />
      <TouchableOpacity
        style={style.clearbutton}
        onPress={() => setQuery('')}
      >
        <Icon.Feather name="delete" size={iconSize} />
      </TouchableOpacity>
    </View>
  );
};

export default EditSearch;
