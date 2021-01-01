import React, { Component, useState } from 'react';

import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { List, CheckBox, Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';
import { deck } from '../../../../config/Const';

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

const EditDelete = (props) => {
  const { content } = props;
  const [checkedIndex, setCheckedIndex] = useState([]);

  const renderContent = () => content.map((vocab, index) => {
    const toggleChecked = () => {
      let newcheckedIndex = [];
      if (checkedIndex.includes(index)) {
        newcheckedIndex = checkedIndex.filter((_index) => _index !== index);
      } else {
        checkedIndex.push(index);
        newcheckedIndex = checkedIndex;
      }
      setCheckedIndex(newcheckedIndex);
    };
    return (
      <View
        style={style.box}
      >
        <View style={style.textbox}>
          <Text style={style.text}>{vocab.term}</Text>
          <Text style={style.text}>{deck.formatArrayContent(vocab.definition)}</Text>
        </View>
        <View style={style.checkbox}>
          <Checkbox
            status={checkedIndex.includes(index) ? 'checked' : 'unchecked'}
            onPress={toggleChecked}
            color={Color.cud.blue}
          />
        </View>
      </View>
    );
  });

  return (
    <View style={style.container}>
      {renderContent()}
    </View>
  );
};

EditDelete.propTypes = {
  content: PropTypes.array,
};

EditDelete.defaultProps = {
  content: [],
};

export default EditDelete;

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
