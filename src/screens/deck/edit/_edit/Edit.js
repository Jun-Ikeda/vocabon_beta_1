import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Alert, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { atom, useRecoilState } from 'recoil';

import { Button } from 'react-native-paper';
import Color from '../../../../config/Color';

import EditList from './EditList';
import EditContent from './EditContent';
import EditButtons from './EditButtons';
import EditHelp from './EditHelp';
import EditAddButton from './EditAddButton';

import { getDeckContent, saveDeckContent } from '../../../../config/deck/Deck';

export const contentState = atom({
  key: 'contentState',
  default: { key: 'value' },
});
// export const contentSearchedState = atom({
//   key: 'contentSearchedState',
//   default: {},
// });
export const selectedVocabIDsState = atom({
  key: 'selectedVocabIDsState',
  default: [],
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.defaultBackground,
  },
  startButtonContainer: {
    position: 'absolute', bottom: 0, right: 0, left: 0, padding: 15,
  },
});

/**
 * Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('edit', { deckID });
 * props: { navigation, route };
 * recoil: { decksState };
 * state: { layout, deckID, general };
 *
 * ```
 */
const Edit = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // recoil
  const [content, setContent] = useRecoilState(contentState);
  // state
  const [mode, setMode] = useState('edit'); // edit, delete, 今後追加?
  const [helpVisible, setHelpVisible] = useState(false);
  const [editVocabID, setEditVocabID] = useState(Object.keys(content)[0]);
  const [contentVisible, setContentVisible] = useState(false);
  const [addButtonVisible, setAddButtonVisible] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  const contentInitial = getDeckContent(deckID);

  useEffect(() => {
    setContent(contentInitial);
  }, []);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    // if (!isChanged) {
    //   return;
    // }
    alert(mode);
    if (!(Platform.OS === 'web') && isChanged) {
      e.preventDefault();
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Save',
            onPress: () => {
              saveDeckContent(deckID, content, false);
              navigation.dispatch(e.data.action);
            },
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    }
  }),
  [navigation]);

  const renderSaveButton = () => (
    <View style={style.startButtonContainer}>
      <Button
        onPress={() => {
          alert(isChanged);
          // saveDeckContent(deckID, content, false);
          // navigation.goBack();
        }}
        color={Color.green2}
        mode="contained"
        disabled={!isChanged}
      >
        Save
      </Button>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={{ flex: 1 }}>
        <EditButtons
          mode={mode}
          setMode={setMode}
          setHelpVisible={setHelpVisible}
          setIsChanged={setIsChanged}
        />
        <EditList
          content={content}
          setVisible={(isVisible, vocabID) => {
            setEditVocabID(vocabID);
            setContentVisible(isVisible);
          }}
          mode={mode}
          setAddButtonVisible={setAddButtonVisible}
        />
      </View>
      <EditAddButton
        isVisible={addButtonVisible}
        setContentVisible={setContentVisible}
        setEditVocabID={setEditVocabID}
      />
      {!contentVisible ? renderSaveButton() : null}
      <EditContent
        vocabID={editVocabID}
        isVisible={contentVisible}
        setVisible={setContentVisible}
        setIsChanged={setIsChanged}
      />
      <EditHelp
        isVisible={helpVisible}
        setVisible={setHelpVisible}
      />
    </View>
  );
};

Edit.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Edit.defaultProps = {

};

export default Edit;
