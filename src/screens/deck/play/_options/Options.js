import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button, Divider, List } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import { getAccountContent } from '../../../../config/account/Account';
import Color from '../../../../config/Color';
import { func } from '../../../../config/Const';
import { getDeckContent } from '../../../../config/deck/Deck';
import { playhistory } from '../../../../config/PersistentData';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOSContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroidContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  // eslint-disable-next-line react-native/no-unused-styles
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
});

const Options = (props) => {
  const { navigation, route: { params: { deckID } } } = props;
  const [mode, setMode] = useState('all');

  const deckContent = getDeckContent(deckID);
  const { marks, play } = getAccountContent(deckID);

  const [isLoading, setIsLoading] = useState(true);
  const [sortMode, setSortMode] = useState('shuffle');
  const [recent, setRecent] = useState({});
  const [custom, setCustom] = useState({});

  useEffect(() => {
    (async () => {
      const playhistoryData = await playhistory.get(deckID);
      /* {
        validVocabIDs, sortMode, itemVisible, leftVocabID, rightVocabID,
      } or flase */
      if (playhistoryData) {
        Alert.alert(
          'Suspended',
          'You have a suspended history. Would you continue from the middle or restart?',
          [{ text: 'Continue', style: 'default', onPress: () => {} }, { text: 'Restart', style: 'cancel', onPress: () => setIsLoading(false) }],
        );
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const playMax = play.length - 1;
      const newRecent = func.convertArrayToObject(func.convertObjectToArray(marks).filter(({ value }) => value?.marks?.includes(playMax)));
      setRecent(newRecent);
    })();
  }, [isLoading]);

  const renderSort = () => {
    const sortModes = [
      { label: 'Index - Ascending', value: 'index' },
      { label: 'Index - Descending', value: 'index-reverse' },
      { label: 'Shuffle', value: 'shuffle' },
    ];
    return (
      <View style={{ flexDirection: 'row' }}>
        <List.Item
          title="Sort"
          right={() => (
            <RNPickerSelect
              onValueChange={setSortMode}
              value={sortMode}
              style={pickerSelectStyles}
              items={sortModes}
              useNativeAndroidPickerStyle={false}
            />
          )}
        />
      </View>
    );
  };

  const renderCardFilter = () => {
    const items = [
      { title: 'All', value: 'all', num: func.convertObjectToArray(deckContent).length },
      { title: 'Recent X', value: 'recent', num: 0 },
      { title: 'Custom', value: 'custom', num: 0 },
    ];
    return (
      <View>
        <Text>Filter</Text>
        {items.map((item, index) => (
          <View>
            {index === 0 ? null : <Divider />}
            <List.Item
              title={item.title}
              onPress={() => setMode(item.value)}
              left={() => <List.Icon color={Color.green6} icon={item.value === mode ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline'} /* color={Color.gray1} */ />}
              right={() => <Text style={{ fontSize: 22, alignSelf: 'center' }}>{item.num}</Text>}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderStartButton = () => {
    let params = {};
    switch (mode) {
      case 'all':
        params = { deckID };
        break;
      default:
    }
    // const params = {
    //   deckID,
    //   validVocabIDs: {},
    //   sortMode: {},
    //   itemVisible: {},
    //   leftVocabID: {},
    //   rightVocabID: {},
    // };
    const navigate = () => navigation.dispatch((state) => {
      const routes = [
        ...state.routes.filter((route) => route.name !== 'options'),
        { name: 'play', params },
      ];
      return CommonActions.reset({ ...state, routes, index: routes.length - 1 });
    });
    return (
      <View style={{ padding: 10 }}>
        <Button color={Color.green2} mode="contained" onPress={navigate}>Play</Button>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={{ flex: 1 }}>
        {renderSort()}
        {renderCardFilter()}
      </View>
      <Text>{JSON.stringify(playhistory)}</Text>
      <Text>{JSON.stringify(recent)}</Text>
      {renderStartButton()}
    </View>
  );
};

Options.propTypes = {
  navigation: PropTypes.object.isRequired,

};

export default Options;

// import React, { useState, useEffect } from 'react';
// import {
//   View, ScrollView, StyleSheet,
// } from 'react-native';
// import PropTypes from 'prop-types';

// import { Button, Divider } from 'react-native-paper';
// import { func } from '../../../../config/Const';
// import { getAccountContent } from '../../../../config/account/Account';
// import { getDeckContent } from '../../../../config/deck/Deck';

// import SortMode from './SortMode';
// import OptionStartButton from './OptionStartButton';
// import OptionRadioButton from './OptionRadioButton';
// import OptionFilter from './OptionFilter';
// import FrontBack from './FrontBack';
// import Color from '../../../../config/Color';

// import { playhistory, playoption } from '../../../../config/PersistentData';

// const style = StyleSheet.create({
//   divider: {
//     backgroundColor: Color.gray3,
//     height: 1.5,
//     opacity: 0.5,
//   },
// });

// const getMax = (object, path = '') => {
//   const array = Object.values(object);
//   if (array.length === 0) return 0;
//   return (path === '')
//     ? array.reduce((a, b) => (a.length > b.length ? a : b)).length
//     : array.reduce((a, b) => (a[path].length > b[path].length ? a : b))[path].length;
// };

// /**
//  * Options Screen
//  * @augments {Component<Props, State>}
//  * Usage :
//  * ```js
//  * navigation.navigate('options', { deckID });
//  * props: { navigation, route }
//  * recoil: {}
//  * state: { ... }
//  *
//  * ```
//  */
// const Options = (props) => {
//   // props
//   const { navigation, route: { params: { deckID } } } = props;
//   // state
//   const { marks, play } = getAccountContent(deckID);
//   const content = getDeckContent(deckID);

//   const MarksMax = getMax(marks);
//   // const ExampleMax = getMax(content, 'exampleT');
//   // const SynonymMax = getMax(content, 'synonym');
//   // const AntonymMax = getMax(content, 'antonym');

//   const [suspended, setSuspended] = useState({});
//   const [mode, setMode] = useState('custom');
//   const [itemVisible, setItemVisible] = useState({ front: ['term'], back: ['definition'] });
//   const [sortMode, setSortMode] = useState('shuffle');
//   const [expandFilter, setExpandFilter] = useState('Index');
//   const [indexRange, setIndexRange] = useState({ min: 0, max: Object.values(content).length });
//   const [markRange, setMarkRange] = useState({ min: 0, max: MarksMax });
//   // const [exampleRange, setExampleRange] = useState({ min: 0, max: ExampleMax });
//   // const [synonymRange, setSynonymRange] = useState({ min: 0, max: SynonymMax });
//   // const [antonymRange, setAntonymRange] = useState({ min: 0, max: AntonymMax });

//   useEffect(() => {
//     (async () => {
//       const playoptionData = await playoption.get();
//       const { sortMode: sortModeStorage, visibleItem, filter } = playoptionData;
//       setSortMode(sortModeStorage);
//       setItemVisible(visibleItem);
//       const newIndexRange = { ...indexRange, ...filter.index };
//       if (indexRange.max <= filter.index.max) { newIndexRange.max = indexRange.max; }
//       setIndexRange(newIndexRange);
//       const newMarkRange = { ...markRange, ...filter.mark };
//       if (markRange.max <= filter.mark.max) { newMarkRange.max = markRange.max; }
//       setMarkRange(newMarkRange);
//     })();
//     (async () => {
//       const playhistoryData = await playhistory.get(deckID);
//       setSuspended(playhistoryData);
//     })();
//   }, []);

//   const saveCurrentOption = () => {
//     playoption.save(sortMode, { index: indexRange, mark: markRange }, itemVisible);
//   };

//   const returnValidVocabIDs = () => {
//     switch (mode) {
//       case 'custom':
//         return func.convertObjectToArray(content).filter((vocab, index) => {
//           const inIndexRange = (index + 1 >= indexRange.min) && (index + 1 <= indexRange.max);
//           const inMarksRange = (marks[vocab.key]?.length ?? 0) >= markRange.min && (marks[vocab.key]?.length ?? 0) <= markRange.max;
//           // const inExampleRange = vocab.value.exampleT.length >= exampleRange.min && vocab.value.exampleT.length <= exampleRange.max;
//           // const inSynonymRange = vocab.value.synonym.length >= synonymRange.min && vocab.value.synonym.length <= synonymRange.max;
//           // const inAntonymRange = vocab.value.antonym.length >= antonymRange.min && vocab.value.antonym.length <= antonymRange.max;
//           return inIndexRange && inMarksRange;/*  && inExampleRange && inSynonymRange && inAntonymRange; */
//         }).map((vocab) => vocab.key);
//       case 'recentMark':
//         return func.convertObjectToArray(marks).filter((vocab) => vocab.value.includes(play.length - 1)).map((vocab) => vocab.key);
//       default:
//         return Object.keys(content);
//     }
//   };
//   const validVocabIDs = returnValidVocabIDs();

//   const items = [
//     {
//       title: 'Index', range: [1, Object.values(content).length], state: [indexRange, setIndexRange], visible: validVocabIDs.length > 1,
//     },
//     {
//       title: 'X', range: [0, MarksMax], state: [markRange, setMarkRange], visible: !(MarksMax === 0),
//     },
//     // {
//     //   title: 'Examples', range: [0, ExampleMax], state: [exampleRange, setExampleRange], visible: !(ExampleMax === 0),
//     // },
//     // {
//     //   title: 'Synonyms', range: [0, SynonymMax], state: [synonymRange, setSynonymRange], visible: !(SynonymMax === 0),
//     // },
//     // {
//     //   title: 'Antonyms', range: [0, AntonymMax], state: [antonymRange, setAntonymRange], visible: !(AntonymMax === 0),
//     // },
//   ];

//   return (
//     <View style={{ flex: 1 }}>
//       <OptionRadioButton content={content} validVocabIDs={validVocabIDs} setMode={setMode} mode={mode} marks={marks} play={play} suspended={suspended} />
//       {mode === 'custom' ? (
//         <ScrollView
//           style={{ flex: 1 }}
//           contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
//         >
//           <SortMode sortMode={sortMode} setSortMode={setSortMode} />
//           <Divider style={style.divider} />
//           <OptionFilter items={items} setExpand={setExpandFilter} expand={expandFilter} />
//           <Divider style={style.divider} />
//           <FrontBack itemVisible={itemVisible} setItemVisible={setItemVisible} />
//         </ScrollView>
//       ) : null}
//       <OptionStartButton
//         itemVisible={itemVisible}
//         navigation={navigation}
//         deckID={deckID}
//         validVocabIDs={validVocabIDs}
//         mode={mode}
//         sortMode={sortMode}
//         saveCurrentOption={saveCurrentOption}
//         suspended={suspended}
//       />
//     </View>
//   );
// };

// Options.propTypes = {
//   navigation: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
// };

// export default Options;
