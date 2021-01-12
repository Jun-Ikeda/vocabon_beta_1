import React, { useState } from 'react';
import {
  View, TouchableOpacity, StyleSheet, LayoutAnimation, Text, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  atom, RecoilRoot, useRecoilState, useRecoilValue,
} from 'recoil';

import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';
import { func } from '../../../../config/Const';
import { checkedIndexState } from './EditDelete';
import { helpVisibleState } from './Edit';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import EditHelp from './EditHelp';

const iconSize = 20;

const style = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearbutton: {
    position: 'absolute',
    marginLeft: 20,
    borderWidth: 1,
    margin: 60,
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
  textinput: {
    height: 30,
    lineHeight: 30,
    fontSize: 18,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '80%',
    paddingLeft: 10,
    borderWidth: 1,
  },
  textinputContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
});

const EditButtons = (props) => {
  // props
  const {
    setDeleteVisible, deleteVisible, helpVisible, setHelpVisible, searchButtonVisible,
    setSearchButtonVisible,
  } = props;
  // recoil
  const [checkedIndex, setCheckedIndex] = useRecoilState(checkedIndexState);
  // state
  const [searchText, setSearchText] = useState('');
  const [layout, setLayout] = useState({ height: 300, width: 300 });

  const renderSearch = () => {
    if (searchButtonVisible) {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={() => setSearchButtonVisible(false)}
        >
          <Icon.Feather name="search" size={iconSize} />
        </TouchableOpacity>
      );
    }
    return (
      <View>
        <View style={style.textinputContainer}>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            style={style.textinput}
            mode="outlined"
          />
        </View>
        <TouchableOpacity
          style={style.clearbutton}
          onPress={() => setSearchText('')}
        >
          <Icon.Feather name="x" size={iconSize} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTrashButton = () => (
    <TouchableOpacity
      style={style.button}
      onPress={() => {
        if (deleteVisible === false) {
          setDeleteVisible(!deleteVisible);
        } else if (checkedIndex.length !== 0) {
          const stringToAlert = `Are you sure you delete the ${checkedIndex.length} cards you chose? (You cannot undo)`;
          alert(stringToAlert);
        } else {
          alert(':V');
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Icon.FontAwesome
        name="trash"
        size={iconSize}
        style={{ color: deleteVisible ? Color.cud.red : Color.black }}
      />
      {(deleteVisible === true && checkedIndex.length !== 0) ? (
        <View style={style.counterview}>
          <Text style={style.textintrashbin}>
            {checkedIndex.length}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );

  const renderHelpButton = () => {
    if (deleteVisible === false) {
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
    if (deleteVisible === true) {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={() => setCheckedIndex([])}
        >
          <Icon.Feather name="x" size={iconSize} />
        </TouchableOpacity>

      );
    }
    return (null);
  };

  const renderBackButton = () => {
    if (deleteVisible === true) {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            setDeleteVisible(!deleteVisible);
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
  setDeleteVisible: PropTypes.func,
  deleteVisible: PropTypes.bool,
  setHelpVisible: PropTypes.func,
  helpVisible: PropTypes.bool,
  setSearchButtonVisible: PropTypes.func,
  searchButtonVisible: PropTypes.bool,
};

EditButtons.defaultProps = {
  setDeleteVisible: () => {},
  deleteVisible: false,
  setHelpVisible: () => {},
  helpVisible: false,
  setSearchButtonVisible: () => {},
  searchButtonVisible: false,
};

export default EditButtons;
