import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

// import HeaderInMain from '../../../../../components/header/HeaderInMain';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigationState } from '@react-navigation/native';
import AddButton from './AddButton';

import Carousel from '../../../../components/deck/carousel/Carousel';
import { decksGeneral } from '../../../../config/deck/Deck';
import Color from '../../../../config/Color';

import { currentRouteState } from '../../../../../dev/DocInJapanese';
import { getAccountContent } from '../../../../config/account/Account';
import { func } from '../../../../config/Const';

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
  carouselContainer: {
    // borderWidth: 1,
  },
  rowTitle: {
    fontSize: 20,
    color: Color.gray,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  const general = useRecoilValue(decksGeneral);
  const [allDeckIDs, setAllDeckIDs] = useState(Object.keys(general));

  const setCurrentRoute = useSetRecoilState(currentRouteState);
  useNavigationState(({ routes }) => setCurrentRoute(routes[routes.length - 1].name));

  // const allDeckIDs = Object.keys(general);
  // const myDeckIDs = allDeckIDs.filter((deckID) => getDeckGeneral(general, deckID).user === getAccountGeneral().userID);
  const bookmarkDeckIDs = allDeckIDs.filter((deckID) => getAccountContent(deckID).bookmark);

  useEffect(() => {
    setAllDeckIDs(Object.keys(general));
  }, [general]);

  const renderRow = ({ title, deckIDs }) => (
    <View style={style.carouselContainer}>
      <Text style={style.rowTitle}>{title}</Text>
      <Carousel
        deckIDs={deckIDs} // 情報のやり取りは基本deckIDで
        onPressCard={(deckID) => navigation.navigate('menu', { deckID })}
      />
    </View>
  );

  return (
    <View style={style.container}>
      <ScrollView style={style.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        {allDeckIDs.length === 0 ? null : renderRow({ title: 'LOCAL', deckIDs: allDeckIDs })}
        {bookmarkDeckIDs.length === 0 ? null : renderRow({ title: 'BOOKMARK', deckIDs: bookmarkDeckIDs })}
        {/* {allDeckIDs.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Create Your your first deck by pushing the button below</Text>
          </View>
        ) : null} */}
      </ScrollView>
      <AddButton navigation={navigation} />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
