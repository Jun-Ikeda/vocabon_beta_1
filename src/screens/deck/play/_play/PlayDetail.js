import React, { useState } from 'react';

import {
  LayoutAnimation, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { atom, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import Color from '../../../../config/Color';

import VocabList from '../../../../components/deck/vocab/VocabList';
import Icon from '../../../../components/Icon';
import PopUpMenu from '../../../../components/popup/PopUpMenu';

export const onEditVocabIDState = atom({
  key: 'onEditVocabIDState',
  default: '',
});

const style = StyleSheet.create({
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
  iconMarked: {
    color: Color.cud.red,
    fontSize: 24,
    marginRight: 24,
  },
  iconClear: {
    color: Color.green2,
    fontSize: 24,
    marginRight: 24,
  },
  iconEditButton: {
    color: Color.gray4,
    fontSize: 24,
  },
  edit: {
    fontSize: 50,
  },
});

const returnValidVocabObject = (content, validVocabIDs) => {
  const result = {};
  for (let i = 0; i < validVocabIDs.length; i++) {
    result[validVocabIDs[i]] = content[validVocabIDs[i]];
  }
  return result;
};
const PlayDetail = (props) => {
  // props
  const {
    modalVisible, setModalVisible, validVocabIDs, content, leftVocabID, rightVocabID, setEditVisible, identity,
  } = props;
  // recoil
  const setOnEditVocabID = useSetRecoilState(onEditVocabIDState);
  // state
  const [expandVocab, setExpandVocab] = useState(null);

  const validVocabObject = returnValidVocabObject(content, validVocabIDs);

  const renderCancelButton = () => (
    <TouchableOpacity style={style.cancelButton} onPress={() => setModalVisible(false)}>
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderCardRightButtons = (vocab) => {
    const renderIcon = () => {
      if (leftVocabID.includes(vocab.key)) {
        return (<Icon.AntDesign name="close" style={style.iconMarked} />);
      } if (rightVocabID.includes(vocab.key)) {
        return (<Icon.AntDesign name="check" style={style.iconClear} />);
      } return null;
    };
    return (
      <View style={{ flexDirection: 'row' }}>
        {renderIcon()}
        <TouchableOpacity
          onPress={async () => {
            await setOnEditVocabID(vocab.key);
            setEditVisible(true);
          }}
        >
          {identity ? <Icon.Feather name="edit" style={style.iconEditButton} /> : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <PopUpMenu
      isVisible={modalVisible}
      setVisible={setModalVisible}
      renderMenu={() => (
        <View style={{
          backgroundColor: Color.defaultBackground, marginHorizontal: '10%', marginVertical: '10%', flex: 1, borderRadius: 20,
        }}
        >
          <VocabList
            content={validVocabObject}
            itemVisible={(vocab) => ({
              term: true,
              definition: true,
              synonym: vocab.key === expandVocab,
              antonym: vocab.key === expandVocab,
              prefix: vocab.key === expandVocab,
              suffix: vocab.key === expandVocab,
              exampleT: vocab.key === expandVocab,
              exampleD: vocab.key === expandVocab,
              cf: vocab.key === expandVocab,
            })}
            labelVisible={{
              synonym: true,
              antonym: true,
              prefix: true,
              suffix: true,
              exampleT: true,
              exampleD: true,
              cf: true,
            }}
            renderCardRight={renderCardRightButtons}
            onPressCard={(vocab) => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setExpandVocab(vocab.key);
            }}
            searchBar
          />
          {renderCancelButton()}
        </View>
      )}
    />
  );
};

PlayDetail.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  validVocabIDs: PropTypes.array.isRequired,
  content: PropTypes.object.isRequired,
  leftVocabID: PropTypes.array.isRequired,
  rightVocabID: PropTypes.array.isRequired,
  setEditVisible: PropTypes.func.isRequired,
};

export default PlayDetail;
