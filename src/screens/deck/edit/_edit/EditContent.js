import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity, Platform, Text,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Color from '../../../../config/Color';

import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Icon from '../../../../components/Icon';
import { deck } from '../../../../config/Const';
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
  const {
    vocabID, isVisible, setVisible, setIsChanged, setEditVocabID, onSave,
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

  const isNewVocab = !Object.keys(content).includes(vocabID);

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
    return items.map((item) => (item.isVisible ? (
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
    ) : null));
  };

  const renderExpandButton = () => <TouchableOpacity onPress={() => setExpand(!expand)}><Text>{expand ? 'Close' : 'More'}</Text></TouchableOpacity>;

  const renderSaveButton = () => {
    const save = () => {
      setContent((prev) => {
        let result = JSON.parse(JSON.stringify(prev));
        if (isNewVocab) {
          result = {
            ...result,
            [vocabID]: {
              term, definition, synonym, antonym, prefix, suffix, exampleT, exampleD, cf,
            },
          };
        } else {
          result[vocabID] = {
            term, definition, synonym, antonym, prefix, suffix, exampleT, exampleD, cf,
          };
        }
        return result;
      });
      // onSave();
      setIsChanged(true);
    };
    const next = () => {
      setTerm('');
      setDefinition('');
      setSynonym('');
      setAntonym('');
      setPrefix('');
      setSuffix('');
      setExampleT('');
      setExampleD('');
      setCf('');
      save();
      setExpand(false);
      setEditVocabID(UUID.generate(8));
    };
    return (
      <View style={style.buttonsContainer}>
        {isNewVocab ? (
          <Button
            onPress={next}
            mode="contained"
            color={Color.green2}
            disabled={(term === '') || (definition === '')}
          >
            Next
          </Button>
        ) : null}
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
