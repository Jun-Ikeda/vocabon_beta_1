import React, { useState } from 'react';

import {
  LayoutAnimation, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { Portal } from 'react-native-paper';
import VocabList from '../../../../components/deck/list/VocabList';
import Icon from '../../../../components/Icon';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';

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
    modalVisible, setModalVisible, validVocabIDs, content,
  } = props;
  // state
  const [expandVocab, setExpandVocab] = useState(null);

  const validVocabObject = returnValidVocabObject(content, validVocabIDs);

  const renderCancelButton = () => (
    <TouchableOpacity style={style.cancelButton} onPress={() => setModalVisible(false)}>
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  return (
    <Portal>
      <PopUpMenu
        isVisible={modalVisible}
        setVisible={setModalVisible}
        renderMenu={() => (
          <View style={{
            backgroundColor: Color.defaultBackground, marginHorizontal: '10%', marginVertical: '10%', flex: 1,
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
              // renderCardRight={(vocab) => <Text>{marks?.[vocab.key]?.length ?? 0}</Text>}
              onPressCard={(vocab) => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setExpandVocab(vocab.key);
              }}
            />
            {renderCancelButton()}
          </View>
        )}
      />
    </Portal>
  );
};

export default PlayDetail;
