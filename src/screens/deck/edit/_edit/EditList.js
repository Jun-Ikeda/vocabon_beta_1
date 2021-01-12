import React, { useState } from 'react';

import {
  View, StyleSheet, TouchableOpacity, LayoutAnimation, FlatList, SafeAreaView,
} from 'react-native';
import { List } from 'react-native-paper';
import { useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';
import { deck, func } from '../../../../config/Const';

const backgroundColor = Color.white1;
const iconSize = 20;

const style = StyleSheet.create({
  box: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  termanddef: {
    // marginVertical: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.black,
  },
  list: {
    backgroundColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listItem: {
    backgroundColor,
    paddingVertical: 0,
  },
  listItemLast: {
    backgroundColor,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingTop: 0,
    paddingBottom: 10,
  },
  editButton: {
    width: 60,
    padding: 20,
    position: 'absolute',
    right: 60,
    top: 10,
  },
});

const EditList = (props) => {
  // props
  const {
    content,
    setVisible,
  } = props;
  // recoil
  // state
  const [expandedIndex, setExpandedIndex] = useState([]);

  const renderMainContent = ({ item, index }) => {
    const { key, value } = item;
    const isExpanded = expandedIndex.includes(index);
    const toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      let newExpandedIndex = [];
      if (isExpanded) {
        newExpandedIndex = expandedIndex.filter((_index) => _index !== index);
        setExpandedIndex(newExpandedIndex);
      } else {
        setExpandedIndex([...expandedIndex, index]);
      }
    };
    return (
      <SafeAreaView style={style.box}>
        <List.Accordion
          expanded={isExpanded}
          onPress={toggleExpand}
          title={value?.term}
          description={deck.formatArrayContent(value?.definition)}
          titleStyle={style.termanddef}
          descriptionStyle={style.termanddef}
          style={[
            style.list,
            {
              borderBottomLeftRadius: isExpanded ? 0 : 10,
              borderBottomRightRadius: isExpanded ? 0 : 10,
            }]}
        >
          <List.Item style={style.listItem} title={`Synonym: ${deck.formatArrayContent(value?.synonym)}`} />
          <List.Item style={style.listItem} title={`Antonym: ${deck.formatArrayContent(value?.antonym)}`} />
          <List.Item style={style.listItem} title={`Prefix: ${deck.formatArrayContent(value?.prefix)}`} />
          <List.Item style={style.listItem} title={`Sufix: ${deck.formatArrayContent(value?.sufix)}`} />
          <List.Item style={style.listItem} title={`ExampleT: ${deck.formatArrayContent(value?.exampleT)}`} />
          <List.Item style={style.listItem} title={`ExampleD: ${deck.formatArrayContent(value?.exampleD)}`} />
          <List.Item style={style.listItemLast} title={`cf: ${deck.formatArrayContent(value?.cf)}`} />
        </List.Accordion>
        <TouchableOpacity
          onPress={async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setVisible(true, key);
          }}
          style={style.editButton}
        >
          <Icon.Feather
            name="edit"
            size={iconSize}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <View
      style={{ flex: 1 }}
    >
      <FlatList
        data={func.convertObjectToArray(content)}
        renderItem={renderMainContent}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

EditList.propTypes = {
  content: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
};

EditList.defaultProps = {
};

export default EditList;
