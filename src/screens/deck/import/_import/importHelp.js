import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Portal, Badge } from 'react-native-paper';

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
  textBox: {
    flexDirection: 'row',
  },
});

const ImportHelp = (props) => {
  const { isVisible, setIsVisible } = props;

  // const renderItems = () => {
  //   const items = [ß
  //     {
  //       label: 'Term',
  //       descEn: 'Word to learn',
  //       descJp: '学習する言葉',
  //     },
  //     {
  //       label: 'Definition',
  //       descEn: 'What the Term means',
  //       descJp: '意味、定義',
  //     },
  //     {
  //       label: 'Synonym',
  //       descEn: 'Similar word',
  //       descJp: '類義語',
  //     },
  //     {
  //       label: 'Antonym',
  //       descEn: 'Opposing word',
  //       descJp: '対義語',
  //     },
  //     {
  //       label: 'Prefix',
  //       descEn: 'Letters added to the biginning',
  //       descJp: '接頭辞(un, dis, subなど)',
  //     },
  //     {
  //       label: 'Suffix',
  //       descEn: 'Letters added to the end',
  //       descJp: '接尾辞(ly, nessなど)',
  //     },
  //     {
  //       label: 'Example in Term\'s language',
  //       descEn: 'Example sentence of the Term',
  //       descJp: '例文',
  //     },
  //     {
  //       label: 'Example in Definition\'s language',
  //       descEn: 'Translation of the example sentence',
  //       descJp: '例文の翻訳',
  //     },
  //     {
  //       label: 'cf.',
  //       descEn: 'Should be compared or considered w/ the Term',
  //       descJp: '比較検討すべき事物',
  //     },
  //   ];
  //   return items.map((item) => (
  //     <View style={style.item} key={item.label.toLowerCase()}>
  //       <View style={style.label}>
  //         <Text style={style.labelText}>{item.label}</Text>
  //       </View>
  //       <View style={style.desc}>
  //         <Text style={style.descText}>
  //           {item.descEn}
  //         </Text>
  //         <Text style={style.descText}>
  //           {item.descJp}
  //         </Text>
  //       </View>
  //     </View>
  //   ));
  // };

  const renderCancelButton = () => (
    <TouchableOpacity style={style.cancelButton} onPress={() => setIsVisible(false)}>
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderInputDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Input</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <Badge />
          <Text>{'Enter or Copy data you want to import in the \'INPUT\' section \n'}</Text>
        </View>
        <View style={style.textBox}>
          <Badge />
          <Text>To let the application distinguish cards, items, or elements from each other, enter symbols written on each delimiter section between them.</Text>
        </View>
      </View>
    </View>
  );

  const renderCardItemElementDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Card, Item, Elementy</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <Badge />
          <Text>{'\'Cards\' refers to each term. There should be at least a \'Term\' and a \'Definition\' for each card \n'}</Text>
        </View>
        <View style={style.textBox}>
          <Badge />
          <Text>{'\'Items\' are things such as \'Term\',\'Definition\',\'Synonym\'. Each \'Card\' should contain multiple \'Items\'\n'}</Text>
        </View>
        <View style={style.textBox}>
          <Badge />
          <Text>{'\'Elements\' are used when, for example, if there are multiple definitons in a single term.'}</Text>
        </View>
      </View>
    </View>
  );

  const renderDelimiterDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Custom Delimiters</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <Badge />
          <Text>{'You can custom each delimiter\n'}</Text>
        </View>
        <View style={style.textBox}>
          <Badge />
          <Text>{'For example, if you enter \':\' in \'CARD\' section, letters surrounded by \':\' will be recognized as each card.'}</Text>
        </View>
      </View>
    </View>
  );

  const renderOptionDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Option Screen</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <Badge />
          <Text>{'The option screen will be shown if you press the \'Import\' button\n'}</Text>
        </View>
        <View style={style.textBox}>
          <Badge />
          <Text> Assign any one of these items bellow to each item</Text>
        </View>
      </View>
    </View>
  );

  const renderMenu = () => (
    <ScrollView style={style.container}>
      {renderInputDescription()}
      {renderCardItemElementDescription()}
      {renderDelimiterDescription()}
      {renderOptionDescription()}
      {/* <ScrollView style={style.contentContainer}>
        {renderItems()}
      </ScrollView> */}
      <View style={{ marginLeft: 15, marginBottom: 5 }} />
      {renderCancelButton()}
    </ScrollView>
  );
  return (
    <Portal>
      <PopUpMenu
        isVisible={isVisible}
        renderMenu={renderMenu}
        containerStyle={{ justifyContent: 'center' }}
      />
    </Portal>
  );
};

ImportHelp.propTypes = {
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
};

ImportHelp.defaultProps = {
  isVisible: false,
  setIsVisible: () => {},
};

export default ImportHelp;
