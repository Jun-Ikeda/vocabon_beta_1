import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Platform, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import { Button } from 'react-native-paper';
import DeckName from '../../../../components/deck/inputs/DeckName';
import LanguageSelection from '../../../../components/deck/inputs/LanguageSelection';
import { getDeckGeneral, decksGeneral, saveDeckGeneral } from '../../../../config/deck/Deck';
import Color from '../../../../config/Color';
import { func } from '../../../../config/Const';

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
/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!注意 グローバル変数への保存がある!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
deck general
  ローカルstate ユーザーが書き換え、削除などをするたび
    const [title, setTitle] = useState(general.title); 初期値はグローバル変数から
    const [language, setLanguage] = useState(general.language) 初期値はグローバル変数から
    const [isChanged, setIsChanged] = useState(false);
  グローバルstate 戻るとき、変更があった場合(isChangedがtrueだったら)更新
    useEffect(() => {...}, [navigation])
deck general
  ローカルstate なし
  グローバルstate deckContentの更新時、numを更新
*/
const Property = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // recoil
  const [deckGeneral, setDeckGeneral] = useRecoilState(decksGeneral);
  // state
  const general = getDeckGeneral(deckGeneral, deckID);
  const [title, setTitle] = useState(general.title);
  const [language, setLanguage] = useState(general.language);
  const [isChanged, setIsChanged] = useState(false);
  // const isChanged = !((general.title === title) && func.objectEqual(language, general.language));

  const save = async () => {
    await setIsChanged(false);
    saveDeckGeneral(setDeckGeneral, deckID, { title, language });
  };

  // alert before goBack without saving changes
  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    if (!(Platform.OS === 'web') && isChanged) {
      e.preventDefault();
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Save',
            onPress: async () => {
              await save();
              navigation.dispatch(e.data.action);
            },
          },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        ],
      );
    }
  }),
  [navigation, isChanged]);

  const renderButton = () => (
    <View style={{ padding: 20 }}>
      {isChanged ? null : <Text style={{ textAlign: 'center' }}>No change</Text> }
      <Button
        color={Color.green2}
        mode="contained"
        onPress={async () => {
          await save();
          navigation.goBack();
        }}
        disabled={!isChanged}
      >
        Save
      </Button>
    </View>
  );

  const properties = [
    {
      title: 'Deck Name',
      element: <DeckName
        setTitle={(newTitle) => {
          setTitle(newTitle);
          setIsChanged(true);
        }}
        title={title}
      />,
    },
    {
      title: 'Language',
      element: <LanguageSelection
        setLanguage={(newLanguage) => {
          if (!func.objectEqual(language, newLanguage)) {
            setLanguage(newLanguage);
            setIsChanged(true);
          }
        }}
        language={language}
      />,
    },
  ];
  return (
    <View>
      {properties.map((property) => (
        <View style={style.itemContainer} key={property.title.toLowerCase()}>
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
