import React from 'react';

import {
  View, StyleSheet, Text, /* TouchableOpacity, */
} from 'react-native';
import { useRecoilValue } from 'recoil';

import SearchBar, { searchTextState } from './SearchBar';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Search Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('search');
 * props: { navigation }
 * recoil: { searchText }
 * state: {}
 * ```
 */
const Search = () => {
  // recoil
  const searchText = useRecoilValue(searchTextState);

  return (
    <View style={style.container}>
      <SearchBar />
      <Text>{searchText}</Text>
    </View>
  );
};

export default Search;
