import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import NumericInput from 'react-native-numeric-input';

import Color from '../../../../config/Color';
import { getAccountContent } from '../../../../config/account/Account';
import { getDeckContent } from '../../../../config/deck/Deck';

const getMax = (object, path = '') => {
  const array = Object.values(object);
  if (array.length === 0) return 0;
  return (path === '')
    ? array.reduce((a, b) => (a.length > b.length ? a : b)).length
    : array.reduce((a, b) => (a[path].length > b[path].length ? a : b))[path].length;
};

const style = StyleSheet.create({
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

/**
 * Options Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('options', { deckID });
 * props: { navigation, route }
 * recoil: {}
 * state: { ... }
 *
 * ```
 */
const Options = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // state
  const { marks } = getAccountContent(deckID);
  const content = getDeckContent(deckID);

  const MarksMax = getMax(marks);
  const ExampleMax = getMax(content, 'exampleT');
  const SynonymMax = getMax(content, 'synonym');
  const AntonymMax = getMax(content, 'antonym');

  const [mode, setMode] = useState('custom');
  const [marksMin, setMarksMin] = useState(0);
  const [marksMax, setMarksMax] = useState(MarksMax);
  const [examplesMin, setExamplesMin] = useState(0);
  const [examplesMax, setExamplesMax] = useState(ExampleMax);
  const [synonymsMin, setSynonymsMin] = useState(0);
  const [synonymsMax, setSynonymsMax] = useState(SynonymMax);
  const [antonymsMin, setAntonymsMin] = useState(0);
  const [antonymsMax, setAntonymsMax] = useState(AntonymMax);

  const renderCustomSettings = () => {
    const items = [
      {
        title: 'Marks',
        range: [0, MarksMax],
        valueMin: marksMin,
        valueMax: marksMax,
        setStateMin: setMarksMin,
        setStateMax: setMarksMax,
      },
      {
        title: 'Examples',
        range: [0, ExampleMax],
        valueMin: examplesMin,
        valueMax: examplesMax,
        setStateMin: setExamplesMin,
        setStateMax: setExamplesMax,
      },
      {
        title: 'Synonyms',
        range: [0, SynonymMax],
        valueMin: synonymsMin,
        valueMax: synonymsMax,
        setStateMin: setSynonymsMin,
        setStateMax: setSynonymsMax,
      },
      {
        title: 'Antonyms',
        range: [0, AntonymMax],
        valueMin: antonymsMin,
        valueMax: antonymsMax,
        setStateMin: setAntonymsMin,
        setStateMax: setAntonymsMax,
      },
      {
        title: 'Antonyms',
        range: [0, AntonymMax],
        valueMin: antonymsMin,
        valueMax: antonymsMax,
        setStateMin: setAntonymsMin,
        setStateMax: setAntonymsMax,
      },
      {
        title: 'Antonyms',
        range: [0, AntonymMax],
        valueMin: antonymsMin,
        valueMax: antonymsMax,
        setStateMin: setAntonymsMin,
        setStateMax: setAntonymsMax,
      },
    ];
    if (mode === 'custom') {
      return (
        <ScrollView style={{ flex: 1, marginVertical: 20 }}>
          <Text style={{ justifyContent: 'center', fontSize: 20 }}>Sort by ...</Text>
          {items.map((item) => (
            <View key={item.title.toLowerCase()}>
              <Text style={{
                justifyContent: 'center', padding: 20, paddingBottom: 10, fontSize: 20,
              }}
              >
                {item.title}
                {' '}
                {item.range[1]}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={style.counterBox}>
                  <Text style={{ justifyContent: 'center', padding: 20, fontSize: 20 }}>Min</Text>
                  <NumericInput
                    type="plus-minus"
                    value={item.valueMin}
                    minValue={item.range[0]}
                    maxValue={item.valueMax}
                    onChange={item.setStateMin}
                    rounded
                    rightButtonBackgroundColor={Color.defaultBackground}
                    leftButtonBackgroundColor={Color.defaultBackground}
                    totalHeight={60}
                  />
                </View>
                <View style={style.counterBox}>
                  <Text style={{ padding: 20, fontSize: 20 }}>Max</Text>
                  <NumericInput
                    type="plus-minus"
                    value={item.valueMax}
                    minValue={item.valueMin}
                    maxValue={item.range[1]}
                    onChange={item.setStateMax}
                    rounded
                    rightButtonBackgroundColor={Color.defaultBackground}
                    leftButtonBackgroundColor={Color.defaultBackground}
                    totalHeight={60}
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    }
    return null;
  };

  const renderRadioButtons = () => (
    <RadioButton.Group
      onValueChange={setMode}
      value={mode}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value="default" style={{ right: 0, left: 0 }} />
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Default</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value="custom" style={{ right: 0, left: 0 }} />
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Custom</Text>
      </View>
    </RadioButton.Group>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ /* backgroundColor: 'blue' */ }}>
        {renderRadioButtons()}
      </View>
      {renderCustomSettings()}
      <View style={{}}>
        <Button
          color={Color.green2}
          style={{ margin: 15 }}
          mode="contained"
          onPress={() => navigation.navigate('play', { deckID })}
        >
          Start
        </Button>
      </View>
    </View>
  );
};

Options.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Options;
