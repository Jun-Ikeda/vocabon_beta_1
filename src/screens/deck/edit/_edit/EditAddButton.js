import React from 'react';
import PropTypes from 'prop-types';

import FloatingButton from '../../../../components/FloatingButton';

/**
 * EditAddButton Component in Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <EditAddButton />
 * ```
 */
const EditAddButton = (props) => {
  const { } = props;
  return (
    <FloatingButton icon={{ collection: 'AntDesign', name: 'plus' }} />
  );
};

EditAddButton.propTypes = {
};

EditAddButton.defaultProps = {
};

export default EditAddButton;
