/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import Icon from '../../../../components/Icon';

export const searchTextState = atom({
  key: 'searchTextState',
  default: '',
});

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderBottomWidth: 1,
  },
  buttonsConainer: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 24,
  },
  iconContainer: {
    justifyContent: 'center',
    marginHorizontal: 5,
    // borderWidth: 1,
  },
  textinput: {
    fontSize: 18,
    alignSelf: 'stretch',
    height: 30,
    // backgroundColor: Color.white1,
  },
  textinputContainer: {
    flex: 1,
  },
});

/**
 * SearchBar Component in Search Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <SearchBar />
 * recoil: { searchTextState }
 * ```
 */
const SearchBar = (props) => {
  // state
  const [searchText, setSearchText] = useState('');
  // recoil
  const setRecoilSearchText = useSetRecoilState(searchTextState);

  const renderTextInput = () => (
    <View style={style.textinputContainer}>
      <TextInput
        style={style.textinput}
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          setRecoilSearchText(text);
        }}
        maxLength={100}
      />
    </View>
  );

  const renderButtons = () => {
    const buttons = [{
      icon: { family: 'AntDesign', name: 'filter' },
      onPress: () => {},
    },
    {
      icon: { family: 'Feather', name: 'x' },
      onPress: () => setSearchText(''),
    },
    ];
    return (
      <View style={style.buttonsConainer}>
        {buttons.map((button) => {
          const IconFamily = Icon[button.icon.family];
          return (
            <TouchableOpacity
              style={style.iconContainer}
              onPress={button.onPress}
              key={button.icon.name.toLowerCase()}
            >
              <IconFamily name={button.icon.name} style={style.icon} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={style.container}>
      {renderTextInput()}
      {renderButtons()}
    </View>
  );
};

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default SearchBar;
