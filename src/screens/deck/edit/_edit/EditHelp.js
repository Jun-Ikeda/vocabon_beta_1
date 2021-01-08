import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

const style = StyleSheet.create({
  item: {
    // flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    flex: 1,
    alignSelf: 'center',
  },
  labelText: {
    fontSize: 15,
    color: Color.gray1,
  },
  desc: {
    flex: 8,
  },
  deskText: {
    fontSize: 20,
  },
  content: {
    // backgroundColor: 'blue',
  },
});

const EditHelp = (props) => {
  const { width } = props;
  const renderItems = () => {
    const items = [
      {
        label: 'Term',
        descEn: 'Word to learn',
        descJp: '学習する言葉',
      },
      {
        label: 'Definition',
        descEn: 'What the Term means',
        descJp: '意味、定義',
      },
      {
        label: 'Synonym',
        descEn: 'Similar word',
        descJp: '類義語',
      },
      {
        label: 'Antonym',
        descEn: 'Opposing word',
        descJp: '対義語',
      },
      {
        label: 'Prefix',
        descEn: 'Letters added to the biginning such as "un", "dis", "sub", etc.',
        descJp: '接頭辞(語頭について意味を変えるもの: un, dis, subなど)',
      },
      {
        label: 'Suffix',
        descEn: 'Letters added to the end such as "ly", "ness", etc.',
        descJp: '接尾辞(語尾について意味を変えるもの: ly, nessなど)',
      },
      {
        label: 'ExampleT',
        descEn: 'Example sentence of the Term',
        descJp: '例文',
      },
      {
        label: 'ExampleD',
        descEn: 'Translation of the example sentence',
        descJp: '例文の翻訳',
      },
      {
        label: 'cf.',
        descEn: 'Should be compared or considered w/ the Term',
        descJp: '比較検討すべき事物',
      },
    ];
    return items.map((item) => (
      <View style={style.item}>
        <View style={style.label}>
          <Text style={style.labelText}>{item.label}</Text>
        </View>
        <View style={style.desc}>
          <Text style={style.descText}>
            {/* {`English: ${item.descEn}`} */}
            {item.descEn}
          </Text>
          <Text style={style.descText}>
            {/* {`Japanese: ${item.descJp}`} */}
            {item.descJp}
          </Text>
        </View>
      </View>
    ));
  };
  return (
    <View style={[style.content, { width: width - 30 }]}>
      {renderItems()}
    </View>
  );
};
export default EditHelp;
