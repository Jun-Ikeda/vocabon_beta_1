import React, { useState, useEffect } from 'react';
import {
  View, ScrollView, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { Button, Divider } from 'react-native-paper';
import { func } from '../../../../config/Const';
import { getAccountContent } from '../../../../config/account/Account';
import { getDeckContent } from '../../../../config/deck/Deck';

import SortMode from './SortMode';
import OptionStartButton from './OptionStartButton';
import OptionRadioButton from './OptionRadioButton';
import OptionFilter from './OptionFilter';
import FrontBack from './FrontBack';
import Color from '../../../../config/Color';

import { playhistory, playoption } from '../../../../config/PersistentData';

const style = StyleSheet.create({
  divider: {
    backgroundColor: Color.gray3,
    height: 1.5,
    opacity: 0.5,
  },
});

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
  const { marks, play } = getAccountContent(deckID);
  const content = getDeckContent(deckID);

  const MarksMax = getMax(marks);
  // const ExampleMax = getMax(content, 'exampleT');
  // const SynonymMax = getMax(content, 'synonym');
  // const AntonymMax = getMax(content, 'antonym');

  const [suspended, setSuspended] = useState({});
  const [mode, setMode] = useState('custom');
  const [itemVisible, setItemVisible] = useState({ front: ['term'], back: ['definition'] });
  const [sortMode, setSortMode] = useState('shuffle');
  const [expandFilter, setExpandFilter] = useState('Index');
  const [indexRange, setIndexRange] = useState({ min: 0, max: Object.values(content).length });
  const [markRange, setMarkRange] = useState({ min: 0, max: MarksMax });
  // const [exampleRange, setExampleRange] = useState({ min: 0, max: ExampleMax });
  // const [synonymRange, setSynonymRange] = useState({ min: 0, max: SynonymMax });
  // const [antonymRange, setAntonymRange] = useState({ min: 0, max: AntonymMax });

  useEffect(() => {
    (async () => {
      const playoptionData = await playoption.get();
      const { sortMode: sortModeStorage, visibleItem, filter } = playoptionData;
      setSortMode(sortModeStorage);
      setItemVisible(visibleItem);
      const newIndexRange = { ...indexRange, ...filter.index };
      if (indexRange.max <= filter.index.max) { newIndexRange.max = indexRange.max; }
      setIndexRange(newIndexRange);
      const newMarkRange = { ...markRange, ...filter.mark };
      if (markRange.max <= filter.mark.max) { newMarkRange.max = markRange.max; }
      setMarkRange(newMarkRange);
    })();
    (async () => {
      const playhistoryData = await playhistory.get(deckID);
      setSuspended(playhistoryData);
    })();
  }, []);

  const saveCurrentOption = () => {
    playoption.save(sortMode, { index: indexRange, mark: markRange }, itemVisible);
  };

  const returnValidVocabIDs = () => {
    switch (mode) {
      case 'custom':
        return func.convertObjectToArray(content).filter((vocab, index) => {
          const inIndexRange = (index + 1 >= indexRange.min) && (index + 1 <= indexRange.max);
          const inMarksRange = (marks[vocab.key]?.length ?? 0) >= markRange.min && (marks[vocab.key]?.length ?? 0) <= markRange.max;
          // const inExampleRange = vocab.value.exampleT.length >= exampleRange.min && vocab.value.exampleT.length <= exampleRange.max;
          // const inSynonymRange = vocab.value.synonym.length >= synonymRange.min && vocab.value.synonym.length <= synonymRange.max;
          // const inAntonymRange = vocab.value.antonym.length >= antonymRange.min && vocab.value.antonym.length <= antonymRange.max;
          return inIndexRange && inMarksRange;/*  && inExampleRange && inSynonymRange && inAntonymRange; */
        }).map((vocab) => vocab.key);
      case 'recentMark':
        return func.convertObjectToArray(marks).filter((vocab) => vocab.value.includes(play.length - 1)).map((vocab) => vocab.key);
      default:
        return Object.keys(content);
    }
  };
  const validVocabIDs = returnValidVocabIDs();

  const items = [
    {
      title: 'Index', range: [1, Object.values(content).length], state: [indexRange, setIndexRange], visible: validVocabIDs.length > 1,
    },
    {
      title: 'X', range: [0, MarksMax], state: [markRange, setMarkRange], visible: !(MarksMax === 0),
    },
    // {
    //   title: 'Examples', range: [0, ExampleMax], state: [exampleRange, setExampleRange], visible: !(ExampleMax === 0),
    // },
    // {
    //   title: 'Synonyms', range: [0, SynonymMax], state: [synonymRange, setSynonymRange], visible: !(SynonymMax === 0),
    // },
    // {
    //   title: 'Antonyms', range: [0, AntonymMax], state: [antonymRange, setAntonymRange], visible: !(AntonymMax === 0),
    // },
  ];

  return (
    <View style={{ flex: 1 }}>
      <OptionRadioButton content={content} validVocabIDs={validVocabIDs} setMode={setMode} mode={mode} marks={marks} play={play} suspended={suspended} />
      {mode === 'custom' ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
        >
          <SortMode sortMode={sortMode} setSortMode={setSortMode} />
          <Divider style={style.divider} />
          <OptionFilter items={items} setExpand={setExpandFilter} expand={expandFilter} />
          <Divider style={style.divider} />
          <FrontBack itemVisible={itemVisible} setItemVisible={setItemVisible} />
        </ScrollView>
      ) : null}
      <OptionStartButton
        itemVisible={itemVisible}
        navigation={navigation}
        deckID={deckID}
        validVocabIDs={validVocabIDs}
        mode={mode}
        sortMode={sortMode}
        saveCurrentOption={saveCurrentOption}
        suspended={suspended}
      />
    </View>
  );
};

Options.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Options;
