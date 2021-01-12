import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { atom, RecoilRoot, useRecoilState } from 'recoil';

import { Button } from 'react-native-paper';
import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';

import EditList from './EditList';
import EditContent from './EditContent';
import EditButtons from './EditButtons';
import EditDelete from './EditDelete';
import EditHelp from './EditHelp';

import { decksContent } from '../../../../config/deck/Deck';

export const contentState = atom({
  key: 'contentState',
  default: {},
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
  // state
  const [editVocabID, setEditVocabID] = useState(Object.keys(content)[0]);
  const [helpVisible, setHelpVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [searchButtonVisible, setSearchButtonVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setContent(decksContent[deckID]);
  }, []);

  const renderDeleteView = () => <EditDelete content={content} />;

  const renderBasicView = () => (
    <EditList
      content={content}
      setVisible={(isVisible, vocabID) => {
        setEditVocabID(vocabID);
        setContentVisible(isVisible);
      }}
    />
  );

  const renderContentPopUp = () => (
    <EditContent
      vocabID={editVocabID}
      isVisible={contentVisible}
      setVisible={setContentVisible}
    />
  );

  const renderHelpPopUp = () => (
    <EditHelp
      isVisible={helpVisible}
      setVisible={setHelpVisible}
    />
  );

  return (
    <View style={style.container}>
      <View style={{ flex: 1 }}>
        <EditButtons
          deleteVisible={deleteVisible}
          setDeleteVisible={setDeleteVisible}
          searchButtonVisible={searchButtonVisible}
          setSearchButtonVisible={setSearchButtonVisible}
          helpVisible={helpVisible}
          setHelpVisible={setHelpVisible}
        />
        {deleteVisible ? renderDeleteView() : renderBasicView()}
      </View>
      <Button onPress={() => func.alertConsole(editVocabID)}>aaa</Button>
      {renderContentPopUp()}
      {renderHelpPopUp()}
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
