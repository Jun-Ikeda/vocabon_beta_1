import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,LayoutAnimation
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
        label: 'e.g. in Term\'s language',
        descEn: 'e.g. sentence of the Term',
        descJp: '例文',
      },
      {
        label: 'e.g. in Definition\'s language',
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
    <TouchableOpacity 
    style={style.cancelButton} 
    onPress={() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setVisible(false);
    }
    }>
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderMenu = () => (
    <View style={style.container}>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Tips</Text>
      </View>
      <View style={style.google}>
        <Text>Press each card to expand it</Text>
        <Text>Long-press to google each term directly</Text>
        <Text>{'You can add a tag by \'/\''}</Text>
      </View>
      <View style={{ marginLeft: 15, marginBottom: 5 }} />
      <ScrollView style={style.contentContainer}>
        {renderItems()}
      </ScrollView>
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

EditHelp.propTypes = {
  isVisible: PropTypes.bool,
  setVisible: PropTypes.func,
};

EditHelp.defaultProps = {
  isVisible: false,
  setVisible: () => {},
};

export default EditHelp;
