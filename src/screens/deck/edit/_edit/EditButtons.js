import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, LayoutAnimation, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import Color from '../../../../config/Color';

import Icon from '../../../../components/Icon';

import { selectedVocabIDsState, contentState } from './Edit';

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
    mode, setMode, setHelpVisible, setIsChanged,
  } = props;
  // recoil
  const [content, setContent] = useRecoilState(contentState);
  const [selectedVocabIDs, setSelectedVocabIDs] = useRecoilState(selectedVocabIDsState);

  const buttons = [
    {
      title: 'unselectAll',
      icon: { collection: 'Feather', name: 'x' },
      visible: mode === 'delete',
      onPress: () => setSelectedVocabIDs([]),
      element: null,
    },
    {
      title: 'closeDelete',
      icon: { collection: 'AntDesign', name: 'back' },
      visible: mode === 'delete',
      onPress: () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMode('edit');
      },
      element: null,
    },
    {
      title: 'help',
      icon: { collection: 'Feather', name: 'help-circle' },
      visible: mode === 'edit',
      onPress: () => setHelpVisible(true),
      element: null,
    },
    {
      title: 'trash',
      icon: { collection: 'FontAwesome', name: 'trash' },
      visible: true,
      onPress: () => {
        if (mode !== 'delete') {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setMode('delete');
        } else if (selectedVocabIDs.length !== 0) {
          const newContent = JSON.parse(JSON.stringify(content));
          // console.log({ selectedVocabIDs });
          selectedVocabIDs.forEach((vocabID) => {
            delete newContent[vocabID];
          });
          setContent(newContent);
          setSelectedVocabIDs([]);
          setMode('edit');
          setIsChanged(true);
        } else {
          // alert(':V');
          console.log(':V');
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
      element: (mode === 'delete' && selectedVocabIDs.length !== 0) ? (
        <View style={style.counterview}>
          <Text style={style.textintrashbin}>
            {selectedVocabIDs.length}
          </Text>
        </View>
      ) : null,
    },
  ];

  return (
    <View style={style.container}>
      {buttons.map((button) => {
        const IconComponent = Icon[button.icon.collection];
        return (button.visible ? (
          <TouchableOpacity
            style={style.button}
            onPress={button.onPress}
            key={button.title.toLowerCase()}
          >
            <IconComponent
              name={button.icon.name}
              size={iconSize}
            />
            {button.element}
          </TouchableOpacity>
        ) : null);
      })}
    </View>
  );
};

EditButtons.propTypes = {
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  setHelpVisible: PropTypes.func.isRequired,
  setIsChanged: PropTypes.func.isRequired,
};

EditButtons.defaultProps = {};

export default EditButtons;
