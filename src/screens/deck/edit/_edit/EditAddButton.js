import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FloatingButton from '../../../../components/FloatingButton';
import UUID from '../../../../config/UUID';

/**
 * EditAddButton Component in Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <EditAddButton />
 * ```
 */
const EditAddButton = (props) => {
  const { setContentVisible, setEditVocabID } = props;
  const newVocabID = UUID.generate(8);
  return (
    <FloatingButton
      icon={{ collection: 'AntDesign', name: 'plus' }}
      onPress={() => {
        setContentVisible(true);
        setEditVocabID(newVocabID);
      }}
    />
  );
};

EditAddButton.propTypes = {
  setContentVisible: PropTypes.func.isRequired,
  setEditVocabID: PropTypes.func.isRequired,
};

EditAddButton.defaultProps = {
};

export default EditAddButton;
