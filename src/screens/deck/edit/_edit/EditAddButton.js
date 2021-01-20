import React from 'react';
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
  const { setContentVisible, setEditVocabID, isVisible } = props;
  const newVocabID = UUID.generate(8);

  return isVisible ? (
    <FloatingButton
      icon={{ collection: 'AntDesign', name: 'plus' }}
      buttonStyle={{ bottom: 75 }}
      onPress={() => {
        setContentVisible(true);
        setEditVocabID(newVocabID);
      }}
    />
  ) : null;
};

EditAddButton.propTypes = {
  setContentVisible: PropTypes.func.isRequired,
  setEditVocabID: PropTypes.func.isRequired,
};

EditAddButton.defaultProps = {
};

export default EditAddButton;
