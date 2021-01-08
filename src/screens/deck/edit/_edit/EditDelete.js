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

const backgroundColor = Color.white1;
const iconSize = 20;

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
    const { key, value } = item;
    const toggleChecked = () => {
      if (checkedIndex.includes(index)) {
        let newcheckedIndex = [];
        newcheckedIndex = checkedIndex.filter((_index) => _index !== index);
        setCheckedIndex(newcheckedIndex);
        // setNumChosenCards(newcheckedIndex.length);
      } else {
        // checkedIndex.push(index);
        // newcheckedIndex = checkedIndex;
        // setNumChosenCards(checkedIndex.length + 1);
        setCheckedIndex([...checkedIndex, index]);
      }
    };
    // const isDeleted = checkedIndex.includes(index);
    // const toggleChecked = () => {
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //   let newcheckedIndex = [];
    //   if (isDeleted) {
    //     newcheckedIndex = checkedIndex.filter((_index) => _index !== index);
    //     setCheckedIndex(newcheckedIndex);
    //   } else {
    //     setCheckedIndex([...checkedIndex, index]);
    //   }
    // };
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
    // <View style={style.container}>
    //   {renderContent()}
    // </View>
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
// export const chosenCardsNum = numChosenCards;

/*
const content = {
  'dajfid': { 内容1 }
  'djaofjdia': { 内容2 }
}

[
  {key: 'dajfid', value: `{ 内容1 }' }
]

*/

/* renderCheckBox =() => {
  const { checked } = this.state;
  return (
    <View style={style.box}>
      <CheckBox
        status={checked ? 'checked' : 'unchecked'}
        onPress={(bool) => this.setState({ checked: bool })}
      />
    </View>
  );
}

renderMainContents =() => {
  const { expandedIndexes } = this.state;
  const { deckC, onPressEditIcon, setVisible } = this.props;
  return deckC.map((content, index) => {
    const toggleExpand = () => {
      let newExpandedIndexes = [];
      if (expandedIndexes.includes(index)) {
        newExpandedIndexes = expandedIndexes.filter((_index) => _index !== index);
      } else {
        expandedIndexes.push(index);
        newExpandedIndexes = expandedIndexes;
      }
      this.setState({ expandedIndexes: newExpandedIndexes });
    };
    return (
      <View
        style={style.box}
      >
        <List.Accordion
          expand={expandedIndexes.includes(index)}
          onPress={toggleExpand}
          title={content.term}
          description={deck.formatArrayContent(content.definition)}
          titleStyle={style.termanddef}
          descriptionStyle={style.termanddef}
          style={[
            style.list,
            {
              borderBottomLeftRadius: expandedIndexes.includes(index) ? 0 : 10,
              borderBottomRightRadius: expandedIndexes.includes(index) ? 0 : 10,
            }]}
        >
          <List.Item style={style.listItem} title={`Antonym: ${deck.formatArrayContent(content.antonym)}`} />
          <List.Item style={style.listItem} title={`Prefix: ${deck.formatArrayContent(content.prefix)}`} />
          <List.Item style={style.listItem} title={`Suffix: ${deck.formatArrayContent(content.suffix)}`} />
          <List.Item style={style.listItem} title={`ExampleT: ${deck.formatArrayContent(content.exampleT)}`} />
          <List.Item style={style.listItem} title={`ExampleD: ${deck.formatArrayContent(content.exampleD)}`} />
          <List.Item style={style.listItemLast} title={`Cf: ${deck.formatArrayContent(content.cf)}`} />
        </List.Accordion>
        <TouchableOpacity
          onPress={() => {
            onPressEditIcon(content);
            setVisible(true);
          }}
          style={style.editButton}
        >
          <Icon.Feather
            name="edit"
            size={iconSize}
          />
        </TouchableOpacity>
      </View>
    );
  });
}

  render() {
    return this.renderMainContents();
  }
} */
