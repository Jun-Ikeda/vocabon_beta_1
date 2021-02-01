import React, { useState } from 'react';
import {
  LayoutAnimation, StyleSheet, View,
} from 'react-native';
import PropTypes from 'prop-types';

import Color from '../../../../config/Color';

import VocabList from '../../../../components/deck/list/VocabList';
import Icon from '../../../../components/Icon';

const style = StyleSheet.create({
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
});

const returnValidVocabObject = (content, validVocabIDs) => {
  const result = {};
  for (let i = 0; i < validVocabIDs.length; i++) {
    result[validVocabIDs[i]] = content[validVocabIDs[i]];
  }
  return result;
};

const ResultsDetail = (props) => {
  const {
    content, validVocabIDs, leftVocabID, rightVocabID, renderButtons,
  } = props;
  const validVocabObject = returnValidVocabObject(content, validVocabIDs);

  const [expandVocab, setExpandVocab] = useState('');

  const renderCardRight = (vocab) => {
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
      </View>
    );
  };

  return (
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
      renderCardRight={renderCardRight}
      onPressCard={(vocab) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandVocab(vocab.key);
      }}
      ListHeaderComponent={renderButtons}
      showsVerticalScrollIndicator={false}
    />
  );
};

ResultsDetail.propTypes = {
  content: PropTypes.object.isRequired,
  validVocabIDs: PropTypes.array.isRequired,
  leftVocabID: PropTypes.array.isRequired,
  rightVocabID: PropTypes.array.isRequired,
  renderButtons: PropTypes.func.isRequired,
};

export default ResultsDetail;
