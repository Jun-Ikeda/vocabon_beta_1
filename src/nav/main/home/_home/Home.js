import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';

// import HeaderInMain from '../../../../../components/header/HeaderInMain';
import { useRecoilState } from 'recoil';
import AddButton from './AddButton';

import { Deck } from '../../../../../dev/TestData';
import Carousel from '../../../../components/deck/carousel/Carousel';
import { decksState } from '../../MainNav';

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
  const [decks, setDecks] = useRecoilState(decksState);

  useEffect(() => {
    // deckIDを配列で取得
    const deckIDs = Object.keys(Deck);
    // deckIDからgeneral, contentを取得
    const newDecks = {};
    for (let i = 0; i < deckIDs.length; i++) {
      newDecks[deckIDs[i]] = { general: Deck[deckIDs[i]].general, content: Deck[deckIDs[i]].content };
    }
    setDecks(newDecks);
  }, []);

  const renderRow = ({ title }) => (
    <View>
      <Text>{title}</Text>
      <Carousel
        deckIDs={Object.keys(decks)} // 情報のやり取りは基本deckIDで
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
