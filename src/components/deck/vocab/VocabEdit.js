import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity, Platform, Text, LayoutAnimation, Alert,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import Color from '../../../config/Color';

import PopUpMenu from '../../popup/PopUpMenu';
import Icon from '../../Icon';
import UUID from '../../../config/UUID';
import TagsInput from '../../TagsInput';
import { deck, func } from '../../../config/Const';

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.defaultBackground,
    flex: 1,
    marginHorizontal: '5%',
    marginVertical: '5%',
    borderRadius: 10,
    paddingTop: 10,
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
  expandButton: {
    margin: 15,
    height: 30,
    borderRadius: 3,
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

const initialTag = { tag: '', tagsArray: [] };

const VocabEdit = (props) => {
  // props
  const {
    content, setContent, vocabID, isVisible, setVisible, setIsChanged, setEditVocabID,
  } = props;
  // recoil
  // state
  const [term, setTerm] = useState(initialTag);
  const [definition, setDefinition] = useState(initialTag);
  const [synonym, setSynonym] = useState(initialTag);
  const [antonym, setAntonym] = useState(initialTag);
  const [prefix, setPrefix] = useState(initialTag);
  const [suffix, setSuffix] = useState(initialTag);
  const [exampleT, setExampleT] = useState(initialTag);
  const [exampleD, setExampleD] = useState(initialTag);
  const [cf, setCf] = useState(initialTag);
  const [expand, setExpand] = useState(false);
  // ref
  // const textinputs = {};
  const tagsinputs = [];

  const isReady = !(((term.tagsArray.length === 0) && term.tag === '') || ((definition.tagsArray.length === 0) && definition.tag === ''));

  const isNewVocab = !Object.keys(content).includes(vocabID);

  const createNewTag = ([state, setState]) => {
    const newTagsArray = (state.tag === '') ? state.tagsArray : [...state.tagsArray, state.tag];
    setState({ tag: '', tagsArray: newTagsArray });
    return { tag: '', tagsArray: newTagsArray };
  };

  useEffect(() => {
    // visibleになるたびvocabIDからstateを更新
    const vocab = content[vocabID];
    setTerm({ ...initialTag, tagsArray: vocab?.term ?? [] });
    setDefinition({ ...initialTag, tagsArray: vocab?.definition ?? [] });
    setSynonym({ ...initialTag, tagsArray: vocab?.synonym ?? [] });
    setAntonym({ ...initialTag, tagsArray: vocab?.antonym ?? [] });
    setPrefix({ ...initialTag, tagsArray: vocab?.prefix ?? [] });
    setSuffix({ ...initialTag, tagsArray: vocab?.suffix ?? [] });
    setExampleT({ ...initialTag, tagsArray: vocab?.exampleT ?? [] });
    setExampleD({ ...initialTag, tagsArray: vocab?.exampleD ?? [] });
    setCf({ ...initialTag, tagsArray: vocab?.cf ?? [] });
    tagsinputs[0]?.focus();
  }, [isVisible]);

  const save = () => {
    // const offensive = func.detectSwearWordArray([
    //   term.tag,
    //   ...term.tagsArray,
    //   definition.tag,
    //   ...definition.tagsArray,
    //   synonym.tag,
    //   ...synonym.tagsArray,
    //   antonym.tag,
    //   ...antonym.tagsArray,
    //   prefix.tag,
    //   ...prefix.tagsArray,
    //   suffix.tag,
    //   ...suffix.tagsArray,
    //   exampleT.tag,
    //   ...exampleT.tagsArray,
    //   exampleD.tag,
    //   ...exampleD.tagsArray,
    //   cf.tag,
    //   ...cf.tagsArray,
    // ]);
    // if (offensive.length !== 0) {
    //   Alert.alert('Violation of terms', `Offensive words are contained: ${JSON.stringify(offensive)}`);
    //   return false;
    // }
    const newTerm = createNewTag([term, setTerm]);
    const newDefinition = createNewTag([definition, setDefinition]);
    const newSynonym = createNewTag([synonym, setSynonym]);
    const newAntonym = createNewTag([antonym, setAntonym]);
    const newPrefix = createNewTag([prefix, setPrefix]);
    const newSuffix = createNewTag([suffix, setSuffix]);
    const newExampleT = createNewTag([exampleT, setExampleT]);
    const newExampleD = createNewTag([exampleD, setExampleD]);
    const newCf = createNewTag([cf, setCf]);
    setContent((prev) => {
      const result = JSON.parse(JSON.stringify(prev));
      const newVocab = {};
      newVocab.term = func.badwordsArray(newTerm.tagsArray);
      newVocab.definition = func.badwordsArray(newDefinition.tagsArray);
      if (newSynonym.length !== 0) { newVocab.synonym = func.badwordsArray(newSynonym.tagsArray); }
      if (newAntonym.length !== 0) { newVocab.antonym = func.badwordsArray(newAntonym.tagsArray); }
      if (newPrefix.length !== 0) { newVocab.prefix = func.badwordsArray(newPrefix.tagsArray); }
      if (newSuffix.length !== 0) { newVocab.suffix = func.badwordsArray(newSuffix.tagsArray); }
      if (newExampleT.length !== 0) { newVocab.exampleT = func.badwordsArray(newExampleT.tagsArray); }
      if (newExampleD.length !== 0) { newVocab.exampleD = func.badwordsArray(newExampleD.tagsArray); }
      if (newCf.length !== 0) { newVocab.cf = func.badwordsArray(newCf.tagsArray); }
      result[vocabID] = newVocab;
      // alert(JSON.stringify(result));
      console.log(result);
      return result;
    });
    setIsChanged(true);
    return true;
  };
  const next = () => {
    if (save()) {
      setTerm(initialTag);
      setDefinition(initialTag);
      setSynonym(initialTag);
      setAntonym(initialTag);
      setPrefix(initialTag);
      setSuffix(initialTag);
      setExampleT(initialTag);
      setExampleD(initialTag);
      setCf(initialTag);
      setExpand(false);
      setEditVocabID(UUID.generate(8));
      tagsinputs[0]?.focus();
    }
  };

  const renderTextInputs = () => {
    const onSubmitEditing = () => { if (isReady) next(); };
    const items = [
      {
        label: 'Term', value: term, setState: setTerm, isVisible: true, keysForTags: ['/'],
      },
      {
        label: 'Definition', value: definition, setState: setDefinition, isVisible: true, keysForTags: ['/'],
      },
      {
        label: 'e.g. in Term\'s language', value: exampleT, setState: setExampleT, isVisible: true, keysForTags: ['/'],
      },
      {
        label: 'e.g. in Definition\'s language', value: exampleD, setState: setExampleD, isVisible: true, keysForTags: ['/'],
      },
      {
        label: 'Synonym', value: synonym, setState: setSynonym, isVisible: expand, keysForTags: ['/'],
      },
      {
        label: 'Antonym', value: antonym, setState: setAntonym, isVisible: expand, keysForTags: ['/'],
      },
      {
        label: 'Prefix', value: prefix, setState: setPrefix, isVisible: expand, keysForTags: ['/'],
      },
      {
        label: 'Suffix', value: suffix, setState: setSuffix, isVisible: expand, keysForTags: ['/'],
      },
      {
        label: 'cf.', value: cf, setState: setCf, isVisible: expand, keysForTags: ['/'],
      },
    ];
    return (
      <View style={{ flex: 1 }}>
        {/* {renderTermTextInput()} */}
        {items.map((item, index) => (item.isVisible ? (
          <View key={item.label.toLowerCase()}>
            <TagsInput
              label={item.label}
              updateState={(state) => item.setState(state)}
              tags={item.value}
              keysForTagsArray={item.keysForTags}
              style={style.input}
              mode="outlined"
              ref={(textinput) => { tagsinputs[index] = textinput; }}
              returnKeyType="next"
              onSubmitEditing={onSubmitEditing}
              pushButtonVisible
            />
          </View>
        ) : null))}
      </View>
    );
  };

  const renderExpandButton = () => (
    <Button
      style={style.expandButton}
      mode="contained"
      color={Color.green2}
      onPress={() => {
        setExpand(!expand);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Text style={{}}>{expand ? 'Close' : 'More'}</Text>
    </Button>
  );

  const renderSaveButton = () => (
    <View style={style.buttonsContainer}>
      {isNewVocab ? (
        <View style={style.buttonContainer}>
          <Button
            onPress={next}
            mode="contained"
            color={Color.green2}
            disabled={!isReady}
          >
            Next
          </Button>
        </View>
      ) : null}
      <View style={style.buttonContainer}>
        <Button
          onPress={() => {
            if (save()) setVisible(false);
          }}
          mode="contained"
          color={Color.green2}
          disabled={!isReady}
        >
          Save
        </Button>
      </View>
    </View>
  );

  const renderCancelButton = () => (
    <TouchableOpacity
      style={style.cancelButton}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setVisible(false);
      }}
    >
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

VocabEdit.propTypes = {
  content: PropTypes.object.isRequired,
  setContent: PropTypes.func.isRequired,
  vocabID: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  setIsChanged: PropTypes.func,
  setEditVocabID: PropTypes.func.isRequired,
};

VocabEdit.defaultProps = {
  vocabID: null,
  setIsChanged: () => {},
};

export default VocabEdit;

/* const EditContent = (props) => {
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
    setDefinition(vocab?.definition ?? '');
    setSynonym(vocab?.synonym ?? '');
    setAntonym(vocab?.antonym ?? '');
    setPrefix(vocab?.prefix ?? '');
    setSuffix(vocab?.suffix ?? '');
    setExampleT(vocab?.exampleT ?? '');
    setExampleD(vocab?.exampleD ?? '');
    setCf(vocab?.cf ?? '');
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

  const renderExpandButton = () => <TouchableOpacity onPress={() => setExpand(!expand)}><Text>{expand ? 'Close' : 'More'}</Text></TouchableOpacity>;

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
}; */
