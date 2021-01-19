import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, LayoutAnimation, Text, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import Color from '../../../../config/Color';

import Icon from '../../../../components/Icon';

import { selectedVocabIDsState } from './EditList';
import EditSearch from './EditSearch';
import { contentState } from './Edit';

const iconSize = 20;

const style = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    height: 60,
    paddingHorizontal: 20,
  },
  separateContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    // borderWidth: 1,
  },
  button: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    // borderWidth: 1,
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
  // textinput: {
  //   flex: 1,
  //   // height: 30,
  //   // lineHeight: 30,
  //   fontSize: 18,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   // width: '100%',
  //   paddingLeft: 10,
  //   // borderWidth: 1,
  // },
  // textinputContainer: {
  //   padding: 5,
  //   // borderWidth: 1,
  //   // borderColor: 'teal',
  //   justifyContent: 'center',
  //   // alignItems: 'center',
  //   // width: '60%',
  //   flex: 1,
  // },
  clearbutton: {
    position: 'absolute',
    // borderWidth: 1,
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
  const [selectedVocabIDs, setSelectedVocabIDs] = useRecoilState(/* checkedIndexState */selectedVocabIDsState);

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
          Alert.alert(
            `Are you sure you delete the ${selectedVocabIDs.length} cards you chose? (You cannot undo)`, '',
            [
              {
                text: 'YES',
                onPress: () => {
                  const newContent = JSON.parse(JSON.stringify(content));
                  alert(JSON.stringify(selectedVocabIDs, null, 2));
                  selectedVocabIDs.forEach((vocabID) => {
                    delete newContent[vocabID];
                  });
                  setContent(newContent);
                  // alert(JSON.stringify(selectedVocabIDs, null, 2));
                  setSelectedVocabIDs([]);
                  setMode('edit');
                },
              },
              {
                text: 'NO',
                onPress: () => alert('CANCELED'),
                style: 'cancel',
              },
            ],
            { cancelable: false },
          );
        } else {
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
            // setDeleteVisible(!deleteVisible);
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
  setMode: PropTypes.func,
  mode: 'string',
  // setDeleteVisible: PropTypes.func,
  // deleteVisible: PropTypes.bool,
  setHelpVisible: PropTypes.func,
  helpVisible: PropTypes.bool,
  setSearchButtonVisible: PropTypes.func,
  searchButtonVisible: PropTypes.bool,
};

EditButtons.defaultProps = {
  setMode: () => {},
  mode: 'edit',
  // setDeleteVisible: () => {},
  // deleteVisible: false,
  setHelpVisible: () => {},
  helpVisible: false,
  setSearchButtonVisible: () => {},
  searchButtonVisible: false,
};

export default EditButtons;
