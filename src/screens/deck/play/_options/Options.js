import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation,
} from 'react-native';
import { RadioButton, Button, Divider } from 'react-native-paper';
import PropTypes from 'prop-types';
import NumericInput from 'react-native-numeric-input';
import RangeSlider from 'react-native-range-slider-expo';
import RNPickerSelect from 'react-native-picker-select';

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
    flex: 1,
    justifyContent: 'center',
    fontSize: 18,
  },
  filterExpandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  divider: { backgroundColor: Color.gray3, height: 1.5, opacity: 0.5 },
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
  const [sortMode, setSortMode] = useState('shuffle');
  const [expand, setExpand] = useState('Marks');
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
    const renderSort = () => {
      const sortModes = [
        { label: 'Shuffle', value: 'shuffle' },
        { label: 'Marks', value: 'marks' },
      ];
      return (
        <View>
          <Text style={{ justifyContent: 'center', fontSize: 20 }}>Sort by</Text>
          <RNPickerSelect
            onValueChange={setSortMode}
            value={sortMode}
            placeholder={{ label: 'Select the language...', value: '' }}
            // style={pickerSelectStyles}
            items={sortModes}
            // Icon={() => renderIcon()}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      );
    };
    const renderFilters = () => {
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
      return (
        <View>
          <Text style={{ justifyContent: 'center', fontSize: 20 }}>Filter</Text>
          {items.map((item, index) => (
            <View key={item.title.toLowerCase()}>
              {(index === 0) ? null : <Divider style={style.divider} />}
              <TouchableOpacity
                style={style.filterExpandButton}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setExpand((expand === item.title) ? null : item.title);
                }}
              >
                <Text style={style.title}>{item.title}</Text>
                <Text>{(item.state[0].min === item.range[0] && item.state[0].max === item.range[1]) ? 'ALL' : `${item.state[0].min} ~ ${item.state[0].max}`}</Text>
              </TouchableOpacity>
              {expand === item.title ? (
                <View style={{ paddingHorizontal: 35 }}>
                  <RangeSlider
                    min={item.range[0]}
                    max={item.range[1]}
                    fromValueOnChange={(value) => item.state[1]({ ...item.state[0], min: value })}
                    toValueOnChange={(value) => item.state[1]({ ...item.state[0], max: value })}
                    styleSize={20}
                    initialFromValue={item.state[0].min}
                    initialToValue={item.state[0].max}
                    fromKnobColor={Color.green2}
                    toKnobColor={Color.green2}
                    inRangeBarColor={Color.gray2}
                  />
                </View>
              ) : null}
            </View>
          ))}
        </View>
      );
    };
    if (mode === 'custom') {
      return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 10, paddingBottom: 80 }}>
          {renderSort()}
          {renderFilters()}
        </ScrollView>
      );
    }
    return null;
  };

  const renderRadioButtons = () => {
    const radiobuttons = [
      { value: 'default', title: 'Default', length: Object.values(content).length },
      { value: 'custom', title: 'Custom', length: validVocabIDs.length },
    ];
    return (
      <RadioButton.Group
        onValueChange={setMode}
        value={mode}
      >
        {radiobuttons.map((radiobutton) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value={radiobutton.value} style={{ right: 0, left: 0 }} />
            <Text style={{ flex: 1, fontSize: 20, alignSelf: 'center' }}>{radiobutton.title}</Text>
            <Text style={{ fontSize: 20, padding: 5 }}>{radiobutton.length}</Text>
          </View>
        ))}
      </RadioButton.Group>
    );
  };

  const renderButton = () => {
    const start = () => {
      if (mode === 'custom') {
        navigation.navigate('play', { deckID, validVocabIDs });
      } else if (mode === 'default') {
        navigation.navigate('play', { deckID });
      }
    };
    return (
      <View style={{
        position: 'absolute', bottom: 0, right: 0, left: 0,
      }}
      >
        {mode === 'custom' && validVocabIDs.length === 0 ? <Text style={{ textAlign: 'center' }}>No matched card</Text> : null}
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
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ /* backgroundColor: 'blue' */ }}>
        {renderRadioButtons()}
      </View>
      {renderCustomSettings()}
      {renderButton()}
    </View>
  );
};

Options.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Options;
