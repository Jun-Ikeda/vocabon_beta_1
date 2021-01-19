import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity, Text,
} from 'react-native';
import { Portal, TextInput } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Color from '../../../../config/Color';

import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Icon from '../../../../components/Icon';
import { deck } from '../../../../config/Const';
import { contentState } from './Edit';

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.white1,
    marginHorizontal: '5%',
    marginVertical: '15%',
    borderRadius: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    lineHeight: 60,
    fontSize: 18,
    marginVertical: 5,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.green2,
  },
  buttonsContainer: {
    margin: 10,
  },
  buttonTitle: {
    fontSize: 16,
    color: Color.white1,
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
});

/**
 * EditContent Component in Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <EditContent
 *    setState={(state) => this.setState(state)}
 *    deleteVisible={true}
 * />
 * props: { width }
 * recoil: {
 *   termState,
 *   definitionState,
 *   synonymState,
 *   antonymState,
 *   prefixState,
 *   suffixState,
 *   exampleTState,
 *   exampleDState,
 *   cfState, }
 * state: {}
 *
 * ```
 */

const EditContent = (props) => {
  // props
  const { vocabID, isVisible, setVisible } = props;
  // recoil
  const [content, setContent] = useRecoilState(contentState);
  // state
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonym, setSynonym] = useState('');
  const [antonym, setAntonym] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [exampleT, setExampleT] = useState('');
  const [exampleD, setExampleD] = useState('');
  const [cf, setCf] = useState('');

  useEffect(() => {
    // visibleになるたびvocabIDからstateを更新
    const vocab = content[vocabID];
    setTerm(vocab?.term ?? '');
    setDefinition(deck.formatArrayContent(vocab?.definition ?? []));
    setSynonym(deck.formatArrayContent(vocab?.synonym ?? []));
    setAntonym(deck.formatArrayContent(vocab?.antonym ?? []));
    setPrefix(deck.formatArrayContent(vocab?.prefix ?? []));
    setSuffix(deck.formatArrayContent(vocab?.suffix ?? []));
    setExampleT(deck.formatArrayContent(vocab?.exampleT ?? []));
    setExampleD(deck.formatArrayContent(vocab?.exampleD ?? []));
    setCf(deck.formatArrayContent(vocab?.cf ?? []));
  }, [isVisible]);

  const renderTextInputs = () => {
    const items = [
      { label: 'Term', value: term, setState: setTerm },
      { label: 'Definition', value: definition, setState: setDefinition },
      { label: 'Synonym', value: synonym, setState: setSynonym },
      { label: 'Antonym', value: antonym, setState: setAntonym },
      { label: 'Prefix', value: prefix, setState: setPrefix },
      { label: 'Suffix', value: suffix, setState: setSuffix },
      { label: 'ExampleT', value: exampleT, setState: setExampleT },
      { label: 'ExampleD', value: exampleD, setState: setExampleD },
      { label: 'cf.', value: cf, setState: setCf },
    ];
    return items.map((item) => (
      <View key={item.label.toLowerCase()}>
        <TextInput
          multiline
          label={item.label}
          value={item.value}
          onChangeText={item.setState}
          style={style.input}
          mode="outlined"
        />
      </View>
    ));
  };

  const renderSaveButton = () => {
    const save = () => {
      setContent((prev) => {
        const result = JSON.parse(JSON.stringify(prev));
        result[vocabID] = {
          term,
          definition,
          synonym,
          antonym,
          prefix,
          suffix,
          exampleT,
          exampleD,
          cf,
        };
        return result;
      });
      setVisible(false);
    };
    return (
      <View style={style.buttonsContainer}>
        <TouchableOpacity
          style={style.button}
          onPress={save}
        >
          <Text style={style.buttonTitle}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCancelButton = () => (
    <TouchableOpacity style={style.cancelButton} onPress={() => setVisible(false)}>
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderMenu = () => (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.contentContainer}>
        {renderTextInputs()}
        {renderSaveButton()}
      </ScrollView>
      {renderCancelButton()}
    </View>
  );

  return (
  // <Portal>
    <PopUpMenu
      isVisible={isVisible}
      renderMenu={renderMenu}
      overlayStyle={style.overlayStyle}
    />
  // </Portal>
  );
};

EditContent.propTypes = {
  vocabID: PropTypes.string,
  isVisible: PropTypes.bool,
  setVisible: PropTypes.func,

};

EditContent.defaultProps = {
  vocabID: '',
  isVisible: false,
  setVisible: () => {},
};

export default EditContent;
