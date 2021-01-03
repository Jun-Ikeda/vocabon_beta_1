import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

// import HeaderInMain from '../../../../../components/header/HeaderInMain';
import { useSetRecoilState } from 'recoil';
import AddButton from './AddButton';

import { Deck } from '../../../../../dev/TestData';
import Carousel from '../../../../components/deck/carousel/Carousel';
import { decksContent, decksGeneral } from '../../../../config/deck/Deck';
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
  const setGeneral = useSetRecoilState(decksGeneral);
  // deckIDを配列で取得
  const deckIDs = Object.keys(Deck);

  useEffect(() => {
    // deckIDからgeneralを取得, decksGeneralに代入
    const newGeneral = {};
    for (let i = 0; i < deckIDs.length; i++) {
      newGeneral[deckIDs[i]] = Deck[deckIDs[i]].general;
    }
    console.log(newGeneral);
    setGeneral(newGeneral);

    // deckIDからcontentを取得, decksContentに代入
    for (let i = 0; i < deckIDs.length; i++) {
      decksContent[deckIDs[i]] = Deck[deckIDs[i]].content;
    }
  }, []);

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
