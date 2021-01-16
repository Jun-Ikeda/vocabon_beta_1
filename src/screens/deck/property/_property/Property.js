import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import { Button } from 'react-native-paper';
import DeckName from '../../../../components/deck/inputs/DeckName';
import LanguageSelection from '../../../../components/deck/inputs/LanguageSelection';
import { getDeckGeneral, decksGeneral } from '../../../../config/deck/Deck';

const style = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 30,
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
  const { navigation, route: { params: { deckID } } } = props;
  // recoil
  const generals = useRecoilValue(decksGeneral);
  // state
  const general = getDeckGeneral(generals, deckID);
  const [title, setTitle] = useState(general.title);
  const [language, setLanguage] = useState(general.language);

  const renderButton = () => {
    const isChanged = !((general.title === title) && (general.language === language));
    const save = () => {
      navigation.goBack();
    };
    return (
      <View>
        {isChanged ? null : <Text>Nothing is changed</Text> }
        <Button mode="contained" onPress={save} disabled={!isChanged}>Save</Button>
      </View>
    );
  };

  const properties = [
    {
      title: 'deckname',
      element: <DeckName setTitle={setTitle} title={title} />,
    },
    {
      title: 'languageselection',
      element: <LanguageSelection setLanguage={setLanguage} language={language} />,
    },
  ];
  return (
    <View>
      {properties.map((property) => (
        <View style={style.itemContainer}>
          <View style={style.itemTitleBox}>
            <Text style={style.itemTitle}>{property.title}</Text>
          </View>
          {property.element}
        </View>
      ))}
      {renderButton()}
    </View>
  );
};

Property.propTypes = {
  navigation: PropTypes.object.isRequired,
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
