import React, { useState } from 'react';

import {
  View, StyleSheet, TouchableOpacity, LayoutAnimation, FlatList,
} from 'react-native';
import { List } from 'react-native-paper';
import { useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';
import { deck } from '../../../../config/Const';
import {
  termState,
  definitionState,
  synonymState,
  antonymState,
  prefixState,
  suffixState,
  exampleTState,
  exampleDState,
  cfState,
} from './Edit';

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

const EditContent = (props) => {
  // props
  const {
    content,
    setVisible,
  } = props;
  // recoil
  const setTerm = useSetRecoilState(termState);
  const setDefinition = useSetRecoilState(definitionState);
  const setSynonym = useSetRecoilState(synonymState);
  const setAntonym = useSetRecoilState(antonymState);
  const setPrefix = useSetRecoilState(prefixState);
  const setSuffix = useSetRecoilState(suffixState);
  const setExampleT = useSetRecoilState(exampleTState);
  const setExampleD = useSetRecoilState(exampleDState);
  const setCf = useSetRecoilState(cfState);
  // state
  const [expandedIndex, setExpandedIndex] = useState([]);

  // const content = contentProps.filter((_, index) => index < 50);

  const renderMainContent = ({ item, index }) => {
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
      <View
        style={style.box}
        // key={item?.term.toLowerCase()}
      >
        <List.Accordion
          expanded={isExpanded}
          onPress={toggleExpand}
          title={item?.term}
          description={deck.formatArrayContent(item?.definition)}
          titleStyle={style.termanddef}
          descriptionStyle={style.termanddef}
          style={[
            style.list,
            {
              borderBottomLeftRadius: isExpanded ? 0 : 10,
              borderBottomRightRadius: isExpanded ? 0 : 10,
            }]}
        >
          <List.Item style={style.listItem} title={`Synonym: ${deck.formatArrayContent(item?.synonym)}`} />
          <List.Item style={style.listItem} title={`Antonym: ${deck.formatArrayContent(item?.antonym)}`} />
          <List.Item style={style.listItem} title={`Prefix: ${deck.formatArrayContent(item?.prefix)}`} />
          <List.Item style={style.listItem} title={`Sufix: ${deck.formatArrayContent(item?.sufix)}`} />
          <List.Item style={style.listItem} title={`ExampleT: ${deck.formatArrayContent(item?.exampleT)}`} />
          <List.Item style={style.listItem} title={`ExampleD: ${deck.formatArrayContent(item?.exampleD)}`} />
          <List.Item style={style.listItemLast} title={`Cf: ${deck.formatArrayContent(item?.cf)}`} />
        </List.Accordion>
        <TouchableOpacity
          onPress={async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Android, iOSでのみ見える簡易アニメーション setStateで突然変わるところをアニメーションにできる
            await setTerm(deck.formatArrayContent(item?.term));
            await setDefinition(deck.formatArrayContent(item?.definition)); // 行数の右にあるコメント機能を使おう１２７に書いてみた
            await setSynonym(deck.formatArrayContent(item?.synonym));
            await setAntonym(deck.formatArrayContent(item?.antonym));
            await setPrefix(deck.formatArrayContent(item?.prefix));
            await setSuffix(deck.formatArrayContent(item?.suffix));
            await setExampleT(deck.formatArrayContent(item?.exampleT));
            await setExampleD(deck.formatArrayContent(item?.exampleD));
            await setCf(deck.formatArrayContent(item?.cf));
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
  };

  return (
    <FlatList
      data={content}
      renderItem={renderMainContent}
      keyExtractor={(item, index) => index}
    />
  );
};

EditContent.propTypes = {
  content: PropTypes.array,
};

EditContent.defaultProps = {
  content: [],
};

export default EditContent;

/*
class EditContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndexes: [],
      checked: false,
    };
  }

  renderCheckBox =() => {
    const { checked } = this.state;
    return (
      <View style={style.box}>
        <CheckBox
          status={checked ? 'checked' : 'unchecked'}
          onPress={(bool) =>
            this.setState({ checked: bool })}
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
            <List.Item style={style.listItem} title={`Sufix: ${deck.formatArrayContent(content.sufix)}`} />
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
}
*/
