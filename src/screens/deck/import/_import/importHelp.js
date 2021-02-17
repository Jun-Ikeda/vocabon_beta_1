import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Portal } from 'react-native-paper';

import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.defaultBackground,
    marginHorizontal: '8%',
    marginVertical: '16%',
    borderRadius: 10,
    padding: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Color.white1,
  },
  cancelButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray3,
  },
  cancelButtonIcon: {
    fontSize: 24,
    color: Color.gray1,
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
  google: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: Color.white1,
    borderRadius: 10,
  },
});

const ImportHelp = (props) => {
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
        label: 'Example in Term\'s language',
        descEn: 'Example sentence of the Term',
        descJp: '例文',
      },
      {
        label: 'Example in Definition\'s language',
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
      <View style={style.item} key={item.label.toLowerCase()}>
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

  const renderCancelButton = () => (
    <TouchableOpacity style={style.cancelButton} onPress={() => setVisible(false)}>
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderBlock = (title, something) => (
    <View style={{ marginLeft: 15, marginBottom: 5 }}>
      <Text style={{ color: Color.gray4 }}>
        {' '}
        {title}
        {' '}
      </Text>
    </View>
    // {something}
  );

  const renderInputDescription = () => (
    <View style={style.google}>
      <Text>Enter or Copy data you want to import in the "INPUT" section </Text>
      <Text>To let the application distinguish cards, items, or elements from each other, enter symbols written on each delimiter section between them. </Text>
    </View>
  );

  renderCardItemElementDescription = () => (
    <View style={style.google}>
      <Text>"Cards" refers to each term. There should be at least a "Term" and a "Definition" for each card</Text>
      <Text>"Items" are things such as "Term","Definition","Synonym". Each "Card" should contain multiple "Items" </Text>
      <Text>"Elements" are used when, for example, if there are multiple definitons in a single term.  </Text>
    </View>
  );

  const renderDelimiterDescription = () => (
    <View style={style.google}>
      <Text>You can custom each delimiter</Text>
      <Text>For example, if you enter ":" in "CARD" section, letters surrounded by ":" will be recognized as each card.</Text>
    </View>
  );

  const renderOptionDescription = () => (
    <View style={style.google}>
      <Text> The option screen will be shown if you press the "Import" button</Text>
      <Text> Assign any one of 　</Text>
    </View>
  );

  const renderMenu = () => (
    <View style={style.container}>
      {renderBlock('Input', renderInputDescription())}
      {renderBlock('', renderInputDescription())}
      <ScrollView style={style.contentContainer}>
        {renderItems()}
      </ScrollView>
      <View style={{ marginLeft: 15, marginBottom: 5 }} />
      {renderCancelButton()}
    </View>
  );
  return (
    <Portal>
      <PopUpMenu
        isVisible={isVisible}
        setVisible={setVisible}
        renderMenu={renderMenu}
        containerStyle={{ justifyContent: 'center' }}
      />
    </Portal>
  );
};

ImportHelp.propTypes = {
  isVisible: PropTypes.bool,
  setVisible: PropTypes.func,
};

ImportHelp.defaultProps = {
  isVisible: false,
  setVisible: () => {},
};

export default ImportHelp;
