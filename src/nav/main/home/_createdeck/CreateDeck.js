import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { useSetRecoilState } from 'recoil';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';
import LanguageSelection from '../../../../components/deck/inputs/LanguageSelection';
import DeckName from '../../../../components/deck/inputs/DeckName';

import UUID from '../../../../config/UUID';
import { getRandomImage } from '../../../../config/Unsplash';
import { decksGeneral, saveDeckGeneral, getDeckGeneral } from '../../../../config/deck/Deck';
import { getAccountGeneral } from '../../../../config/account/Account';
import Redescribe from '../../../../components/deck/inputs/Redescribe';

// import { getRandomImage } from '../../../../config/Unsplash';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containers: {
    flex: 1,
    marginHorizontal: 30,
  },
  itemContainer: {
  },
  itemTitleBox: {
    marginVertical: 20,
  },
  itemTitle: {
    fontSize: 20,
  },
  button: {
    width: 180,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Color.green2,
  },
  icon: {
    fontSize: 24,
    color: Color.white1,
  },
  alertMessage: {
    fontSize: 14,
    alignSelf: 'center',
    color: Color.cud.pink,
    paddingBottom: 20,
  },
  alert: {
    flex: 1,
    paddingTop: 40,
  },
});

/**
 * CreateDeck Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('createdeck');
 * props: { navigation }
 * recoil: {}
 * state: { title, language, deckID, thumbnail}
 * ```
 */

const CreateDeck = (props) => {
  // props
  const { navigation } = props;
  // recoil
  const setDeckGeneral = useSetRecoilState(decksGeneral);
  // state
  const [deckID, setDeckID] = useState(UUID.generate(10));
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState({ term: '', definition: '' });
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState({});
  // const [deckGeneral, setDeckGeneral] = useRecoilState(decksGeneral);
  // const general = getDeckGeneral(deckGeneral, deckID);
  //
  const { userID } = getAccountGeneral();

  useEffect(() => {
    (async () => {
      const newThumbnail = await getRandomImage();
      setThumbnail(newThumbnail);
    })();
  }, []);

  const goToHome = () => {
    const deck = { [deckID]: { general: { title, language, thumbnail } } };
    // console.log(deck);
    saveDeckGeneral(setDeckGeneral, deckID, {
      title,
      description,
      user: userID,
      language,
      num: 0,
      thumbnail,
    });
    navigation.goBack();
  };

  const renderOK = () => {
    const { term, definition } = language;
    const isFilled = (term !== '') && (definition !== '') && (title !== '');
    if (isFilled) {
      return (
        <View style={style.alert}>
          <TouchableOpacity
            onPress={goToHome}
            style={style.button}
          >
            <Icon.AntDesign
              style={style.icon}
              name="check"
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={style.alert}>
        <Text style={style.alertMessage}>Fill in all the blanks</Text>
      </View>
    );
  };

  const renderItems = () => {
    const items = [
      {
        title: 'Title',
        element: <DeckName setTitle={setTitle} title={title} />,
      },
      {
        title: 'Language',
        element: <LanguageSelection
          setLanguage={setLanguage}
          language={language}
        />,
      },
      {
        title: 'Description',
        element: <Redescribe
          setDescription={setDescription}
          description={description}
        />,
      },
    ];
    return items.map((item) => (
      <View style={style.itemContainer} key={item.title.toLowerCase()}>
        <View style={style.itemTitleBox}>
          <Text style={style.itemTitle}>{item.title}</Text>
        </View>
        {item.element}
      </View>
    ));
  };

  return (
    <View style={style.container}>
      <View style={style.containers}>
        {renderItems()}
        {renderOK()}
      </View>
    </View>
  );
};

CreateDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
};

CreateDeck.defaultProps = {
};

export default CreateDeck;
