import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

// import HeaderInMain from '../../../../../components/header/HeaderInMain';
import { useRecoilValue } from 'recoil';
import AddButton from './AddButton';

import Carousel from '../../../../components/deck/carousel/Carousel';
import { decksGeneral } from '../../../../config/deck/Deck';
import { account } from '../../../../config/account/Account';
// import { header } from '../../../../config/Const';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 120,
    // marginTop: 40,
  },
  scrollContainer: {
    flex: 1,
    // paddingTop: header.mainHeaderStyles.headerStyle.height + (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight),
  },
});

/**
 * Home Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('home');
 * props: { navigation }
 * recoil: { decksState }
 * state: {}
 * ```
 */
const Home = (props) => {
  // props
  const { navigation } = props;
  // recoil
  const generals = useRecoilValue(decksGeneral);

  const allDeckIDs = Object.keys(generals);
  const myDeckIDs = allDeckIDs.filter((deckID) => generals[deckID].user === account.general.userID);
  const bookmarkDeckIDs = allDeckIDs.filter((deckID) => account.content?.[deckID]?.bookmark ?? false);

  const renderRow = ({ title, deckIDs }) => (
    <View>
      <Text>{title}</Text>
      <Carousel
        deckIDs={deckIDs} // 情報のやり取りは基本deckIDで
        onPressCard={(deckID) => navigation.navigate('menu', { deckID })}
      />
    </View>
  );

  const renderButton = () => (
    <AddButton navigation={navigation} />
  );

  return (
    <View style={style.container}>
      <ScrollView style={style.scrollContainer}>
        {renderRow({ title: 'LOCAL', deckIDs: myDeckIDs })}
        {renderRow({ title: 'BOOKMARK', deckIDs: bookmarkDeckIDs })}
        {renderRow({ title: 'ALL', deckIDs: allDeckIDs })}
      </ScrollView>
      {renderButton()}
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
