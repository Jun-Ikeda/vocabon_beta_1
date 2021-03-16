import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity, Platform, Text, KeyboardAvoidingView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Color from '../../../../config/Color';

import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Icon from '../../../../components/Icon';
import { func } from '../../../../config/Const';
import { contentState } from './Edit';
import UUID from '../../../../config/UUID';

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.white1,
    flex: 1,
    marginHorizontal: '5%',
    marginVertical: '15%',
    borderRadius: 10,
    height: Platform.OS === 'web' ? 500 : null,
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
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
  expandText: {
    backgroundColor:'blue',
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
  const {
    vocabID, isVisible, setVisible, setIsChanged, setEditVocabID,
  } = props;
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
  const [expand, setExpand] = useState(false);
  // ref
  const textinputs = [];

  const isNewVocab = !Object.keys(content).includes(vocabID);

  useEffect(() => {
    // visibleになるたびvocabIDからstateを更新
    const vocab = content[vocabID];
    setTerm(vocab?.term ?? '');
    setDefinition(/* deck.formatArrayContent(vocab?.definition ?? []) */vocab?.definition ?? '');
    setSynonym(/* deck.formatArrayContent(vocab?.synonym ?? []) */vocab?.synonym ?? '');
    setAntonym(/* deck.formatArrayContent(vocab?.antonym ?? []) */vocab?.antonym ?? '');
    setPrefix(/* deck.formatArrayContent(vocab?.prefix ?? []) */vocab?.prefix ?? '');
    setSuffix(/* deck.formatArrayContent(vocab?.suffix ?? []) */vocab?.suffix ?? '');
    setExampleT(/* deck.formatArrayContent(vocab?.exampleT ?? []) */vocab?.exampleT ?? '');
    setExampleD(/* deck.formatArrayContent(vocab?.exampleD ?? []) */vocab?.exampleD ?? '');
    setCf(/* deck.formatArrayContent(vocab?.cf ?? []) */vocab?.cf ?? '');
  }, [isVisible]);

  const save = () => {
    setContent((prev) => {
      const result = JSON.parse(JSON.stringify(prev));
      const newVocab = {};
      newVocab.term = term;
      newVocab.definition = definition;
      if (!func.isNullOrWhitespace(synonym)) { newVocab.synonym = synonym; }
      if (!func.isNullOrWhitespace(antonym)) { newVocab.antonym = antonym; }
      if (!func.isNullOrWhitespace(prefix)) { newVocab.prefix = prefix; }
      if (!func.isNullOrWhitespace(suffix)) { newVocab.suffix = suffix; }
      if (!func.isNullOrWhitespace(exampleT)) { newVocab.exampleT = exampleT; }
      if (!func.isNullOrWhitespace(exampleD)) { newVocab.exampleD = exampleD; }
      if (!func.isNullOrWhitespace(cf)) { newVocab.cf = cf; }
      result[vocabID] = newVocab;
      return result;
    });
    setIsChanged(true);
  };
  const next = () => {
    save();
    setTerm('');
    setDefinition('');
    setSynonym('');
    setAntonym('');
    setPrefix('');
    setSuffix('');
    setExampleT('');
    setExampleD('');
    setCf('');
    setExpand(false);
    setEditVocabID(UUID.generate(8));
    textinputs[0]?.focus();
  };

  const renderTextInputs = () => {
    const items = [
      {
        label: 'Term', value: term, setState: setTerm, isVisible: true,
      },
      {
        label: 'Definition', value: definition, setState: setDefinition, isVisible: true,
      },
      {
        label: 'ExampleT', value: exampleT, setState: setExampleT, isVisible: true,
      },
      {
        label: 'ExampleD', value: exampleD, setState: setExampleD, isVisible: true,
      },
      {
        label: 'Synonym', value: synonym, setState: setSynonym, isVisible: expand,
      },
      {
        label: 'Antonym', value: antonym, setState: setAntonym, isVisible: expand,
      },
      {
        label: 'Prefix', value: prefix, setState: setPrefix, isVisible: expand,
      },
      {
        label: 'Suffix', value: suffix, setState: setSuffix, isVisible: expand,
      },
      {
        label: 'cf.', value: cf, setState: setCf, isVisible: expand,
      },
    ];
    return items.map((item, index) => (item.isVisible ? (
      <View key={item.label.toLowerCase()}>
        <TextInput
          label={item.label}
          value={item.value}
          onChangeText={item.setState}
          style={style.input}
          mode="outlined"
          returnKeyType="next"
          ref={(textinput) => { textinputs[index] = textinput; }}
          autoFocus={index === 0}
          onSubmitEditing={() => { if (!((term === '') || (definition === ''))) next(); }}
        />
      </View>
    ) : null));
  };

  const renderExpandButton = () => 
  <TouchableOpacity
    style={style.expandText} 
    onPress={() => setExpand(!expand)}>
    <Text style={{ fontSize: 20 }}>{expand ? 'Close' : 'More'}</Text>
  </TouchableOpacity>;

  const renderSaveButton = () => (
    <View style={style.buttonsContainer}>
      {isNewVocab ? (
        <View style={style.buttonContainer}>
          <Button
            onPress={next}
            mode="contained"
            color={Color.green2}
            disabled={(term === '') || (definition === '')}
          >
            Next
          </Button>
        </View>
      ) : null}
      <View style={style.buttonContainer}>
        <Button
          onPress={() => {
            save();
            setVisible(false);
          }}
          mode="contained"
          color={Color.green2}
          disabled={(term === '') || (definition === '')}
        >
          Save
        </Button>
      </View>
    </View>
  );

  const renderCancelButton = () => (
    <TouchableOpacity style={style.cancelButton} onPress={() => setVisible(false)}>
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderMenu = () => (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.contentContainer}>
        {renderTextInputs()}
        {renderExpandButton()}
      </ScrollView>
      {renderSaveButton()}
      {renderCancelButton()}
    </View>
  );

  return (
    <PopUpMenu
      isVisible={isVisible}
      renderMenu={renderMenu}
      overlayStyle={style.overlayStyle}
    />
  );
};

EditContent.propTypes = {
  vocabID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  setIsChanged: PropTypes.func.isRequired,
  onSave: PropTypes.func,
};

EditContent.defaultProps = {
  vocabID: null,
  onSave: () => {},
};

EditContent.defaultProps = {
};

export default EditContent;
