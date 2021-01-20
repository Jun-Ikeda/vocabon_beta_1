import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, LayoutAnimation, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import Color from '../../../../config/Color';

import Icon from '../../../../components/Icon';

import { selectedVocabIDsState, contentState } from './Edit';
import EditSearch from './EditSearch';

const iconSize = 20;

const style = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
  },
  separateContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
  },
  button: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  trashbutton: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textintrashbin: {
    fontSize: 12,
    color: Color.white1,
  },
  counterview: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Color.cud.red,
    position: 'absolute',
    right: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearbutton: {
    position: 'absolute',
    right: 20,
  },
});

const EditButtons = (props) => {
  // props
  const {
    mode, setMode, helpVisible, setHelpVisible, searchButtonVisible, setSearchButtonVisible,
  } = props;
  // recoil
  const [content, setContent] = useRecoilState(contentState);
  const [selectedVocabIDs, setSelectedVocabIDs] = useRecoilState(selectedVocabIDsState);

  const renderSearch = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <EditSearch searchButtonVisible={searchButtonVisible} setSearchButtonVisible={setSearchButtonVisible} />
      {searchButtonVisible ? (
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setSearchButtonVisible(false);
          }}
        >
          <Icon.Feather name="search" size={iconSize} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
  const renderTrashButton = () => (
    <TouchableOpacity
      style={style.button}
      onPress={() => {
        if (/* deleteVisible === false */mode !== 'delete') {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setMode('delete');
        } else if (selectedVocabIDs.length !== 0) {
          const deleteVocab = () => {
            const newContent = JSON.parse(JSON.stringify(content));
            console.log({ selectedVocabIDs });
            selectedVocabIDs.forEach((vocabID) => {
              delete newContent[vocabID];
            });
            setContent(newContent);
            setSelectedVocabIDs([]);
            setMode('edit');
          };
          deleteVocab();
          /*
          func.alert(
            `Are you sure you delete the ${selectedVocabIDs.length} cards you chose? (You cannot undo)`, '',
            [
              { text: 'YES', onPress: deleteVocab },
              { text: 'NO', onPress: () => alert('CANCELED'), style: 'cancel' },
            ],
            { cancelable: false },
          );
          if (Platform.OS === 'web') {
            deleteVocab();
          }
         */ } else {
          alert(':V');
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Icon.FontAwesome
        name="trash"
        size={iconSize}
        style={{ color: /* deleteVisible */mode === 'delete' ? Color.cud.red : Color.black }}
      />
      {(/* deleteVisible === true */mode === 'delete' && selectedVocabIDs.length !== 0) ? (
        <View style={style.counterview}>
          <Text style={style.textintrashbin}>
            {selectedVocabIDs.length}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );

  const renderHelpButton = () => {
    if (/* deleteVisible === false */mode === 'edit') {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={() => setHelpVisible(!helpVisible)}
        >
          <Icon.Feather name="help-circle" size={iconSize} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderCancelButton = () => {
    if (/* deleteVisible === true */mode === 'delete') {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={() => setSelectedVocabIDs([])}
        >
          <Icon.Feather name="x" size={iconSize} />
        </TouchableOpacity>

      );
    }
    return (null);
  };

  const renderBackButton = () => {
    if (/* deleteVisible === true */mode === 'delete') {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setMode('edit');
          }}
        >
          <Icon.AntDesign
            name="back"
            size={iconSize}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={style.container}>
      {renderSearch()}
      {renderCancelButton()}
      {renderBackButton()}
      {renderHelpButton()}
      {renderTrashButton()}
    </View>
  );
};

EditButtons.propTypes = {
  setMode: PropTypes.func.isRequired,
  mode: 'string'.isRequired,
  setHelpVisible: PropTypes.func.isRequired,
  helpVisible: PropTypes.bool.isRequired,
  setSearchButtonVisible: PropTypes.func.isRequired,
  searchButtonVisible: PropTypes.bool.isRequired,
};

EditButtons.defaultProps = {};

export default EditButtons;
