import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import NumericInput from 'react-native-numeric-input';
import RangeSlider from 'react-native-range-slider-expo';

import { func } from '../../../../config/Const';
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
  title: {
    justifyContent: 'center', padding: 20, paddingBottom: 10, fontSize: 20,
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
  const [markRange, setMarkRange] = useState({ min: 0, max: MarksMax });
  const [exampleRange, setExampleRange] = useState({ min: 0, max: ExampleMax });
  const [synonymRange, setSynonymRange] = useState({ min: 0, max: SynonymMax });
  const [antonymRange, setAntonymRange] = useState({ min: 0, max: AntonymMax });

  const validVocabIDs = func.convertObjectToArray(content).filter((vocab) => {
    const inMarksRange = marks[vocab.key].length >= markRange.min && marks[vocab.key].length <= markRange.max;
    const inExampleRange = vocab.value.exampleT.length >= exampleRange.min && vocab.value.exampleT.length <= exampleRange.max;
    const inSynonymRange = vocab.value.synonym.length >= synonymRange.min && vocab.value.synonym.length <= synonymRange.max;
    const inAntonymRange = vocab.value.antonym.length >= antonymRange.min && vocab.value.antonym.length <= antonymRange.max;
    return inMarksRange && inExampleRange && inSynonymRange && inAntonymRange;
  }).map((vocab) => vocab.key);

  const renderCustomSettings = () => {
    const items = [
      {
        title: 'Marks',
        range: [0, MarksMax],
        state: [markRange, setMarkRange],
      },
      {
        title: 'Examples',
        range: [0, ExampleMax],
        state: [exampleRange, setExampleRange],
      },
      {
        title: 'Synonyms',
        range: [0, SynonymMax],
        state: [synonymRange, setSynonymRange],
      },
      {
        title: 'Antonyms',
        range: [0, AntonymMax],
        state: [antonymRange, setAntonymRange],
      },
    ];
    if (mode === 'custom') {
      return (
        <ScrollView style={{ flex: 1, marginVertical: 20 }}>
          <Text style={{ justifyContent: 'center', fontSize: 20 }}>Filter</Text>
          {items.map((item) => (
            <View key={item.title.toLowerCase()}>
              <Text style={style.title}>
                {item.title}
              </Text>
              <View style={{ /* flexDirection: 'row' */ paddingHorizontal: 35 }}>
                <RangeSlider
                  min={item.range[0]}
                  max={item.range[1]}
                  fromValueOnChange={(value) => item.state[1]({ ...item.state[0], min: value })}
                  toValueOnChange={(value) => item.state[1]({ ...item.state[0], max: value })}
                  styleSize="small"
                  initialFromValue={item.state[0].min}
                  initialToValue={item.state[0].max}
                  fromKnobColor={Color.green2}
                  toKnobColor={Color.green2}
                  inRangeBarColor={Color.gray2}
                />
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
        <Text style={{ flex: 1, fontSize: 20, alignSelf: 'center' }}>Default</Text>
        <Text style={{ fontSize: 20, padding: 5 }}>{Object.values(content).length}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value="custom" style={{ right: 0, left: 0 }} />
        <Text style={{ flex: 1, fontSize: 20, alignSelf: 'center' }}>Custom</Text>
        <Text style={{ fontSize: 20, padding: 5 }}>{validVocabIDs.length}</Text>
      </View>
    </RadioButton.Group>
  );

  const start = () => {
    if (mode === 'custom') {
      navigation.navigate('play', { deckID, validVocabIDs });
    } else if (mode === 'default') {
      navigation.navigate('play', { deckID });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ /* backgroundColor: 'blue' */ }}>
        {renderRadioButtons()}
      </View>
      {renderCustomSettings()}
      <View style={{}}>
        {mode === 'custom' && validVocabIDs.length === 0 ? <Text>No matched card</Text> : null}
        <Button
          color={Color.green2}
          style={{ margin: 15 }}
          mode="contained"
          onPress={start}
          disabled={mode === 'custom' && validVocabIDs.length === 0}
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
