import React, { useState } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import { func } from '../../../../config/Const';
import { getAccountContent } from '../../../../config/account/Account';
import { getDeckContent } from '../../../../config/deck/Deck';

import SortMode from './SortMode';
import OptionStartButton from './OptionStartButton';
import OptionRadioButton from './OptionRadioButton';
import OptionFilter from './OptionFilter';
import FrontBack from './FrontBack';

const getMax = (object, path = '') => {
  const array = Object.values(object);
  if (array.length === 0) return 0;
  return (path === '')
    ? array.reduce((a, b) => (a.length > b.length ? a : b)).length
    : array.reduce((a, b) => (a[path].length > b[path].length ? a : b))[path].length;
};

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
  const [itemVisible, setItemVisible] = useState({ front: ['term'], back: ['definition'] });
  const [sortMode, setSortMode] = useState('shuffle');
  const [expandFilter, setExpandFilter] = useState('Marks');
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
    const renderFilters = () => {
      const items = [
        { title: 'Marks', range: [0, MarksMax], state: [markRange, setMarkRange] },
        { title: 'Examples', range: [0, ExampleMax], state: [exampleRange, setExampleRange] },
        { title: 'Synonyms', range: [0, SynonymMax], state: [synonymRange, setSynonymRange] },
        { title: 'Antonyms', range: [0, AntonymMax], state: [antonymRange, setAntonymRange] },
      ];
      return (
        <OptionFilter items={items} setExpand={setExpandFilter} expand={expandFilter} />
      );
    };
    if (mode === 'custom') {
      return (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
        >
          <SortMode sortMode={sortMode} setSortMode={setSortMode} />
          {renderFilters()}
          <FrontBack itemVisible={itemVisible} setItemVisible={setItemVisible} />
        </ScrollView>
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ /* backgroundColor: 'blue' */ }}>
        <OptionRadioButton content={content} validVocabIDs={validVocabIDs} setMode={setMode} mode={mode} />
      </View>
      {renderCustomSettings()}
      <OptionStartButton itemVisible={itemVisible} navigation={navigation} deckID={deckID} validVocabIDs={validVocabIDs} mode={mode} />
    </View>
  );
};

Options.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Options;
