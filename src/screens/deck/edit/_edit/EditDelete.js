import React, { useState } from 'react';

import {
  View, StyleSheet, TouchableOpacity, Text, FlatList,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';
import {
  atom, RecoilRoot, useRecoilState, useSetRecoilState,
} from 'recoil';
import Color from '../../../../config/Color';
import { deck, func } from '../../../../config/Const';

// const backgroundColor = Color.white1;
// const iconSize = 20;

// export const numChosenCardsState = atom({
//   key: 'numChosenCards',
//   default: 0,
// });

export const checkedIndexState = atom({
  key: 'checkedIndexState',
  default: [],
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.defaultBackground,
  },
  box: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: Color.white1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 82,
  },
  textbox: {
    borderWidth: 0,
    marginLeft: 16,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkbox: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 20,
    alignItems: 'center',
    height: 60,
    width: 60,
  },
});

const EditDelete = (props) => {
  const { content } = props;
  const [checkedIndex, setCheckedIndex] = useRecoilState(checkedIndexState);
  // const setNumChosenCards = useSetRecoilState(numChosenCardsState);

  const renderContent = ({ item, index }) => {
    const { /* key,  */value } = item;
    const toggleChecked = () => {
      if (checkedIndex.includes(index)) {
        let newcheckedIndex = [];
        newcheckedIndex = checkedIndex.filter((_index) => _index !== index);
        setCheckedIndex(newcheckedIndex);
      } else {
        setCheckedIndex([...checkedIndex, index]);
      }
    };
    return (
      <TouchableOpacity
        style={style.box}
        onPress={toggleChecked}
      >
        <View style={style.textbox}>
          <Text style={style.text}>{value.term}</Text>
          <Text style={style.text}>{deck.formatArrayContent(value.definition)}</Text>
        </View>
        <View style={style.checkbox}>
          <Checkbox
            status={checkedIndex.includes(index) ? 'checked' : 'unchecked'}
            onPress={toggleChecked}
            color={Color.cud.blue}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={func.convertObjectToArray(content)}
      renderItem={renderContent}
    />
  );
};

EditDelete.propTypes = {
  content: PropTypes.object,
};

EditDelete.defaultProps = {
  content: {},
};

export default EditDelete;
