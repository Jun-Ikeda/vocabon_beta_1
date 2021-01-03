import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import DeckName from '../../../../components/deck/inputs/DeckName';
import LanguageSelection from '../../../../components/deck/inputs/LanguageSelection';
import { decksContent, decksGeneral } from '../../../../config/deck/Deck';
import { decksState } from '../../../../nav/main/MainNav';

const style = StyleSheet.create({
  itemContainer: {
  },
  itemTitleBox: {
    marginVertical: 20,
  },
  itemTitle: {
    fontSize: 20,
  },
});

/**
 * Property Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('property', { deckID });
 * props: { navigation, route }
 * recoil: {}
 * state: { title, language, general }
 * ```
 */
const Property = (props) => {
  // props
  const { route: { params: { deckID } } } = props;
  // recoil
  const generals = useRecoilValue(decksGeneral);
  // state
  // const [general, setGeneral] = useState(decks[deckID].general);
  const general = generals[deckID];
  const [title, setTitle] = useState(general.title);
  const [language, setLanguage] = useState(general.language);

  return (
    <View>
      <View style={style.itemContainer}>
        <View style={style.itemTitleBox}>
          <Text style={style.itemTitle}>Deck Name</Text>
        </View>
        <DeckName setTitle={setTitle} title={title} />
      </View>

      <View style={style.itemContainer}>
        <View style={style.itemTitleBox}>
          <Text style={style.itemTitle}>Language</Text>
        </View>
        <LanguageSelection setLanguage={setLanguage} language={language} />
      </View>

    </View>

  );
};

Property.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Property;

/* class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'もともとのタイトル名',
      language: {
        term: 'English',
        definition: 'Japanese',
      },
    };
  }

  render() {
    const { title, language } = this.state;
    const { navigation } = this.props;

    return (
      <View>
        <HeaderWithBack title="Property" navigation={navigation} />

        <View style={style.itemContainer}>
          <View style={style.itemTitleBox}>
            <Text style={style.itemTitle}>Deck Name</Text>
          </View>
          <DeckName setState={(state) => this.setState(state)} title={title} />
        </View>

        <View style={style.itemContainer}>
          <View style={style.itemTitleBox}>
            <Text style={style.itemTitle}>Language</Text>
          </View>
          <LanguageSelection setState={(state) => this.setState(state)} language={language} />
        </View>

      </View>

    );
  }
} */

/*
const items = [
    { title: 'Deck Name', elements: 実際の<>タグとか書くところ },
    { title: 'Language', elements: 実際の<>タグとか書くところ },
]

return items.map((item) => {
    return (
        <View style={style.itemContainer}>
          <View style={style.itemTitleBox}>
            <Text style={style.itemTitle}>Language</Text>
          </View>
            {item.elements}
        </View>
    )
})

*/
