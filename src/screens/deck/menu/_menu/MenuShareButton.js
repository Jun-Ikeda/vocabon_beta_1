import React from 'react';
import { Alert, Share } from 'react-native';
import PropTypes from 'prop-types';

// import { useRecoilValue } from 'recoil';
import FloatingButton from '../../../../components/FloatingButton';
// import { decksGeneral } from '../../../../config/deck/Deck';
// import { func } from '../../../../config/Const';
// import { getAccountGeneral } from '../../../../config/account/Account';

const MenuShareButton = (props) => {
  const { deckID } = props;
  // const deckGeneral = useRecoilValue(decksGeneral);
  // const accountGeneral = getAccountGeneral();
  const share = async () => {
    try {
      Alert.alert('Tips', 'Share this ID with your friend and have them paste it after pushing \'＋\' button in the home screen');
      const result = await Share.share({
        message: deckID,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FloatingButton
      onPress={share}
      icon={{ collection: 'Entypo', name: 'share' }}
    />
  );
};

MenuShareButton.propTypes = {
  deckID: PropTypes.string.isRequired,
};

MenuShareButton.defaultProps = {

};

export default MenuShareButton;
