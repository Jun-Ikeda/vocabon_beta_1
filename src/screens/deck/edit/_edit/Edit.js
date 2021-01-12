import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { atom, RecoilRoot, useRecoilState } from 'recoil';

import { func } from '../../../../config/Const';
import Color from '../../../../config/Color';

import EditList from './EditList';
import EditContent from './EditContent';
import EditButtons from './EditButtons';
import EditDelete from './EditDelete';
import EditHelp from './EditHelp';

import { decksContent } from '../../../../config/deck/Deck';
import PopUpMenu from '../../../../components/popup/PopUpMenu';

export const termState = atom({
  key: 'termState',
  defalut: '',
});
export const definitionState = atom({
  key: 'definitionState',
  defalut: [],
});
export const synonymState = atom({
  key: 'synonymState',
  defalut: [],
});
export const antonymState = atom({
  key: 'antonymState',
  defalut: [],
});
export const prefixState = atom({
  key: 'prefixState',
  defalut: [],
});
export const suffixState = atom({
  key: 'suffixState',
  defalut: [],
});
export const exampleTState = atom({
  key: 'exampleTState',
  defalut: [],
});
export const exampleDState = atom({
  key: 'exampleDState',
  defalut: [],
});
export const cfState = atom({
  key: 'cfState',
  defalut: [],
});
export const helpVisibleState = atom({
  key: 'helpVisibleState',
  default: false,
});

export const contentState = atom({
  key: 'contentState',
  default: {},
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.defaultBackground,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  containers: {
    flex: 1,
  },
  popview: {
    position: 'absolute',
    top: '10%',
    bottom: '10%',
    left: '5%',
    right: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Color.white1,
    backgroundColor: 'blue',
    // paddingTop: 6,
    // paddingHorizontal: 15,
    // paddingBottom: 10,いらないあとで値が必要もうほかのファイルでmarginでしていした
    borderRadius: 10,
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
  // const generals = useRecoilValue(decksGeneral);
  // state
  const [helpVisible, setHelpVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [searchButtonVisible, setSearchButtonVisible] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  // const [helpVisible, setHelpVisible] = useState(false);
  // const [layout, setLayout] = useState({ height: 300, width: 300 });

  useEffect(() => {
    setContent(decksContent[deckID]);
  }, []);

  const renderDeleteView = () => <EditDelete content={content} />;

  // const renderBasicView = () => (
  //   <EditList
  //     content={content}
  //     setVisible={setEditVisible}
  //   />
  // );

  const renderContentPopUp = () => {
    const renderMenuView = () => (
      <EditContent
        // width={layout.width}
        setVisible={setEditVisible}
      />
    );
    return (
      <PopUpMenu
        isVisible={editVisible}
        // setVisible={setEditVisible}
        renderMenu={renderMenuView}
        overlayStyle={style.overlayStyle}
        // onPress={() => {}}
      />
    );
  };

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
        {deleteVisible ? renderDeleteView() : null/* renderBasicView() */}
      </View>
      {/* {renderContentPopUp()} */}
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
