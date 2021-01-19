import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, FlatList, LayoutAnimation, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
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
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    fontSize: 18,
    backgroundColor: Color.white1,
    color: Color.black,
    paddingLeft: 20,
  },
  clearbutton: {
    position: 'absolute',
    right: 20,
  },
  searchbarfolder: {
    position: 'absolute',
    left: 10,
  },
});

const EditSearch = (props) => {
  const { setSearchButtonVisible, containerStyle, searchButtonVisible } = props;
  // recoil
  const [content, setContent] = useRecoilState(contentState);
  const [contentSearched, setContentSearched] = useRecoilState(contentSearchedState);
  // const
  // const array = Object.values(content);
  const [text, setText] = useState('');

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const formattedQuery = text.toLowerCase();
    const newData = lodash.filter(content, (vocab) => vocab.term.includes(formattedQuery));
    setContentSearched(newData);
    // setContentSearched(array);
  }, [text, content]);

  return searchButtonVisible ? null : (
    <View
      style={[style.inputView, containerStyle]}
    >
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Search"
        style={style.input}
      />
      <TouchableOpacity
        style={style.searchbarfolder}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setSearchButtonVisible(true);
        }}
      >
        <Icon.Feather name="chevrons-right" size={iconSize} />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.clearbutton}
        onPress={() => setText('')}
      >
        <Icon.Feather name="delete" size={iconSize} />
      </TouchableOpacity>
    </View>
  );
};

EditSearch.propTypes = {
  setSearchButtonVisible: PropTypes.func.isRequired,
};

export default EditSearch;
