import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

const style = StyleSheet.create({
  content: {
    flex: 1,
    position: 'absolute',
    padding: 10,
    backgroundColor: Color.white1,
    // alignSelf: 'center',
    // paddingHorizontal: 10,
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
  const { isVisible, setVisible } = props;
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
    <PopUpMenu
      isVisible={isVisible}
      setVisible={setVisible}
      renderMenu={() => (
        <ScrollView style={[style.content]}>
          {renderItems()}
        </ScrollView>
      )}
      containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    />
  );
};

EditHelp.propTypes = {
  isVisible: PropTypes.bool,
  setVisible: PropTypes.func,
};

EditHelp.defaultProps = {
  isVisible: false,
  setVisible: () => {},
};

export default EditHelp;
