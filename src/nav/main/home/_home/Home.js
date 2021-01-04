import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

// import HeaderInMain from '../../../../../components/header/HeaderInMain';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AddButton from './AddButton';

import { Deck, User } from '../../../../../dev/TestData';
import Carousel from '../../../../components/deck/carousel/Carousel';
import { decksContent, decksGeneral } from '../../../../config/deck/Deck';
import { usersGeneral } from '../../../../config/user/User';
// import { decksState } from '../../MainNav';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
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

  const deckIDs = Object.keys(generals);

  const renderRow = ({ title }) => (
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
        {renderRow({ title: 'LOCAL' })}
        {renderRow({ title: 'BOOKMARK' })}
        {renderRow({ title: 'BOOKMARK' })}
      </ScrollView>
      {renderButton()}
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
