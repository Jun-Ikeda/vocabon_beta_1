import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

const style = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: 'blue',
  },
  item: {
    flex: 1,
    // flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    // flex: 1,
    // alignSelf: 'center',
  },
  labelText: {
    // fontSize: 18,
    color: Color.gray2,
  },
  desc: {
    // flex: 8,
    paddingLeft: 10,
  },
  deskText: {
    fontSize: 20,
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
        descEn: 'Letters added to the biginning',
        descJp: '接頭辞(un, dis, subなど)',
      },
      {
        label: 'Suffix',
        descEn: 'Letters added to the end',
        descJp: '接尾辞(ly, nessなど)',
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
    // const items = [
    //   {
    //     label: 'Term',
    //     descEn: 'Word to learn',
    //     descJp: '学習する言葉',
    //   },
    //   {
    //     label: 'Definition',
    //     descEn: 'What the Term means',
    //     descJp: '意味、定義',
    //   },
    //   {
    //     label: 'Synonym',
    //     descEn: 'Similar word',
    //     descJp: '類義語',
    //   },
    //   {
    //     label: 'Antonym',
    //     descEn: 'Opposing word',
    //     descJp: '対義語',
    //   },
    //   {
    //     label: 'Prefix',
    //     descEn: 'Letters added to the biginning such as "un", "dis", "sub", etc.',
    //     descJp: '接頭辞(語頭について意味を変えるもの: un, dis, subなど)',
    //   },
    //   {
    //     label: 'Suffix',
    //     descEn: 'Letters added to the end such as "ly", "ness", etc.',
    //     descJp: '接尾辞(語尾について意味を変えるもの: ly, nessなど)',
    //   },
    //   {
    //     label: 'ExampleT',
    //     descEn: 'Example sentence of the Term',
    //     descJp: '例文',
    //   },
    //   {
    //     label: 'ExampleD',
    //     descEn: 'Translation of the example sentence',
    //     descJp: '例文の翻訳',
    //   },
    //   {
    //     label: 'cf.',
    //     descEn: 'Should be compared or considered w/ the Term',
    //     descJp: '比較検討すべき事物',
    //   },
    // ];
    return items.map((item) => (
      <View style={style.item}>
        <View style={style.label}>
          <Text style={style.labelText}>{item.label}</Text>
        </View>
        <View style={style.desc}>
          <Text style={style.descText}>
            {item.descEn}
          </Text>
          <Text style={style.descText}>
            {item.descJp}
          </Text>
        </View>
      </View>
    ));
  };
  return (
    <ScrollView style={[style.content, { width: width - 30 }]}>
      {renderItems()}
    </ScrollView>
  );
};
export default EditHelp;
