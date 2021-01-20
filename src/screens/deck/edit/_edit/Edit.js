import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { atom, useRecoilState } from 'recoil';

import { Button } from 'react-native-paper';
import Color from '../../../../config/Color';

import EditList from './EditList';
import EditContent from './EditContent';
import EditButtons from './EditButtons';
import EditHelp from './EditHelp';
import EditAddButton from './EditAddButton';

import { getDeckContent } from '../../../../config/deck/Deck';

export const contentState = atom({
  key: 'contentState',
  default: {},
});
export const contentSearchedState = atom({
  key: 'contentSearchedState',
  default: {},
});
export const selectedVocabIDsState = atom({
  key: 'selectedVocabIDsState',
  default: [],
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.defaultBackground,
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
  const { /* navigation, */ route: { params: { deckID } } } = props;
  // recoil
  const [content, setContent] = useRecoilState(contentState);
  const [contentSearched, setContentSearched] = useRecoilState(contentSearchedState);
  // state
  const [mode, setMode] = useState('edit'); // edit, delete, 今後追加?
  const [helpVisible, setHelpVisible] = useState(false);
  const [searchButtonVisible, setSearchButtonVisible] = useState(true);
  const [editVocabID, setEditVocabID] = useState(Object.keys(content)[0]);
  const [contentVisible, setContentVisible] = useState(false);
  const [addButtonVisible, setAddButtonVisible] = useState(true);

  useEffect(() => {
    const contentInitial = getDeckContent(deckID);
    setContent(contentInitial);
    setContentSearched(contentInitial);
  }, []);

  const renderSaveButton = () => (
    <View style={{
      position: 'absolute', bottom: 0, right: 0, left: 0, padding: 15,
    }}
    >
      <Button color={Color.green2} mode="contained">Save</Button>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={{ flex: 1 }}>
        <EditButtons
          mode={mode}
          setMode={setMode}
          searchButtonVisible={searchButtonVisible}
          setSearchButtonVisible={setSearchButtonVisible}
          helpVisible={helpVisible}
          setHelpVisible={setHelpVisible}
        />
        <EditList
          content={contentSearched}
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
      {renderSaveButton()}
      <EditContent
        vocabID={editVocabID}
        isVisible={contentVisible}
        setVisible={setContentVisible}
      />
      <EditHelp
        isVisible={helpVisible}
        setVisible={setHelpVisible}
      />
    </View>
  );
};

Edit.propTypes = {
  // navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Edit.defaultProps = {

};

export default Edit;
