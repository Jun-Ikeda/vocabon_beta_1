import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  LayoutAnimation,
  ScrollView,
  StyleSheet, Switch, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Button, Divider, List, Portal, TextInput,
} from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { RangeSlider } from '@sharcoux/slider';
import RNPickerSelect from 'react-native-picker-select';

import { divide } from 'lodash';
import { useRecoilValue } from 'recoil';
import { getAccountContent, getAccountGeneral } from '../../../../config/account/Account';
import Color from '../../../../config/Color';
import { deck, func, header } from '../../../../config/Const';
import {
  decksContent, decksGeneral, getDeckContent, getDeckGeneral,
} from '../../../../config/deck/Deck';
import { playhistory, playoption } from '../../../../config/PersistentData';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Icon from '../../../../components/Icon';
import DynamicallySelectedPicker from '../../../../components/DynamicallySelectedPicker';
import NumberInputRange from '../../../../components/numberinput/NumberInputRange';
import { storage } from '../../../../config/firebase/Firebase';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: Color.gray3,
    height: 1.5,
    opacity: 0.5,
    marginHorizontal: 5,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
    padding: 10,
    backgroundColor: Color.white1,
    borderRadius: 20,
  },
  cancelButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray3,
  },
  cancelButtonIcon: {
    fontSize: 24,
    color: Color.gray1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOSContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroidContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: {
    fontSize: 16,
    color: Color.gray5,
    padding: 10,
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroid: {
    fontSize: 16,
    color: Color.gray5,
    padding: 10,
    // paddingRight: 30, // to ensure the text is never behind the icon
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
  const deckGeneralState = useRecoilValue(decksGeneral);

  const deckContent = getDeckContent(deckID);
  const general = getDeckGeneral(deckGeneralState, deckID);
  const { marks, play } = getAccountContent(deckID);
  const accountGeneral = getAccountGeneral();

  const [isLoading, setIsLoading] = useState(true);
  const allKeys = Object.keys(deckContent);
  const [recentKeys, setRecentKeys] = useState([]);
  const [customKeys, setCustomKeys] = useState([]);

  const { height: heightInitial, width: widthInitial } = Dimensions.get('screen');
  const [screen, setScreen] = useState({ height: heightInitial, width: widthInitial });
  useEffect(() => {
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      setScreen({ width, height });
    });
  }, []);

  const [deckContentLoaded, setDeckContentLoaded] = useState(false);
  // load deck content
  useEffect(() => {
    if ((general?.user === accountGeneral.userID/* my deck */ || Object.keys(deckContent).length !== 0/* other's deck previously loaded */) && accountGeneral.name !== 'Guest User') {
      setDeckContentLoaded(true);
    } else {
      (async () => {
        await storage.ref('deck').child(deckID).getDownloadURL().then((url) => fetch(url)
          .then(async (response) => response.json())
          .then(async (result) => {
            // apply to recoil/global
            decksContent[deckID] = result;
          }));
        setDeckContentLoaded(true);
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      const playhistoryData = await playhistory.get(deckID);
      const navigate = () => navigation.dispatch((state) => {
        const routes = [
          ...state.routes.filter((route) => route.name !== 'options'),
          { name: 'play', params: { deckID, ...playhistoryData } },
        ];
        return CommonActions.reset({ ...state, routes, index: routes.length - 1 });
      });

      // const playMax = play?.length ?? 0 - 1;
      // const newRecent = func.convertArrayToObject(func.convertObjectToArray(marks).filter(({ value }) => value?.includes(playMax)));
      // setRecentKeys(Object.keys(newRecent));
      // alert(JSON.stringify(marks));

      if (playhistoryData) {
        Alert.alert(
          'Suspended',
          'You have a suspended history. Would you continue from the middle or restart?',
          [{
            text: 'Continue',
            style: 'default',
            onPress: navigate,
          }, { text: 'Restart', style: 'cancel', onPress: () => setIsLoading(false) }],
        );
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const playMax = (play?.length ?? 0) - 1;
      const newRecent = func.convertArrayToObject(func.convertObjectToArray(marks).filter(({ value }) => value?.includes(playMax)));
      setRecentKeys(Object.keys(newRecent));
    })();
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      const data = await playoption.get();
      if (data) {
        setMode(data.mode);
        setSortMode(data.sortMode);
        setItemConfig(data.visibleItem);
        setIndexMax(data.filter.index[1]);
        setIndexMin(data.filter.index[0]);
        setXMax(data.filter.x[1]);
        setXMin(data.filter.x[0]);
      }
    })();
  }, []);

  const [sortMode, setSortMode] = useState('shuffle');
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
          style={{ flex: 1 }}
          right={() => (
            <View style={{ flex: 10 }}>
              <RNPickerSelect
                onValueChange={setSortMode}
                value={sortMode}
                style={pickerSelectStyles}
                items={sortModes}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          )}
        />
      </View>
    );
  };

  const [itemConfig, setItemConfig] = useState({ front: ['term'], back: ['definition'] });
  const [itemConfigVisible, setItemConfigVisible] = useState(false);
  const renderItemConfig = () => (
    <List.Item
      title="Visible Items"
      onPress={() => setItemConfigVisible(!itemConfigVisible)}
      right={() => (
        <View style={{ flex: 1 }}>
          <Text style={{
            color: Color.gray5, fontSize: 16, alignSelf: 'flex-end', textAlign: 'right',
          }}
          >
            {`front: ${deck.formatArrayContent(itemConfig.front)}`}
          </Text>
          <Text style={{
            color: Color.gray5, fontSize: 16, alignSelf: 'flex-end', textAlign: 'right',
          }}
          >
            {`back: ${deck.formatArrayContent(itemConfig.back)}`}
          </Text>
        </View>
      )}
    />
  );
  const renderItemConfigPopUp = () => {
    const renderMenu = () => {
      const setBool = (item, frontOrback, bool = null) => {
        if (bool) {
          setItemConfig({ ...itemConfig, [frontOrback]: [...itemConfig[frontOrback], item] });
        } else {
          const newItemVisible = itemConfig[frontOrback].filter((_item) => (_item !== item));
          setItemConfig({ ...itemConfig, [frontOrback]: newItemVisible });
        }
      };
      return (
        <View style={{
          flex: 1, backgroundColor: Color.defaultBackground, margin: '5%', borderRadius: 10,
        }}
        >
          <ScrollView contentContainerStyle={{ flexDirection: screen.height > screen.width ? 'column' : 'row', flex: screen.height > screen.width ? 0 : 1 }}>
            <View style={style.card}>
              <Text style={{ fontSize: 19, textAlign: 'center', paddingVertical: 10 }}>Front</Text>
              {deck.items.map((item) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }} key={item.title.toLowerCase()}>
                  <Text style={{ flex: 1, fontSize: 18 }}>{item.title}</Text>
                  <Switch value={itemConfig.front.includes(item.key)} onValueChange={(bool) => setBool(item.key, 'front', bool)} />
                </View>
              ))}
            </View>
            <View style={style.card}>
              <Text style={{ fontSize: 19, textAlign: 'center', paddingVertical: 10 }}>Back</Text>
              {deck.items.map((item) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }} key={item.title.toLowerCase()}>
                  <Text style={{ flex: 1, fontSize: 18 }}>{item.title}</Text>
                  <Switch value={itemConfig.back.includes(item.key)} onValueChange={(bool) => setBool(item.key, 'back', bool)} />
                </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={style.cancelButton} onPress={() => setItemConfigVisible(false)}>
            <Icon.Feather name="x" style={style.cancelButtonIcon} />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <Portal>
        <PopUpMenu isVisible={itemConfigVisible} setVisible={setItemConfigVisible} renderMenu={renderMenu} containerStyle={{ paddingTop: header.paddingTop }} />
      </Portal>
    );
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [customPopUpVisible, setCustomPopUpVisible] = useState(false);
  const XMax = Object.keys(marks).length === 0 ? 0 : func.convertObjectToArray(marks).reduce((a, b) => (a.value.length > b.value.length ? a : b)).value.length;
  const initialCustomProperty = { index: [1, allKeys.length], x: [0, XMax] };
  const [indexMin, setIndexMin] = useState(initialCustomProperty.index[0]);
  const [indexMax, setIndexMax] = useState(initialCustomProperty.index[1]);
  const [xMin, setXMin] = useState(initialCustomProperty.x[0]);
  const [xMax, setXMax] = useState(initialCustomProperty.x[1]);
  useEffect(() => {
    const newCustomKeys = allKeys.filter((vocabID, index) => {
      const indexInRange = (indexMin - 1 <= index) && (index <= indexMax - 1);
      const xInRange = xMin <= (marks?.[vocabID]?.length ?? 0) && (marks?.[vocabID]?.length ?? 0) <= xMax;
      return indexInRange && xInRange;
    });
    setCustomKeys(newCustomKeys);
  }, [indexMin, indexMax, xMin, xMax]);
  const renderCardFilter = () => {
    const items = [
      { title: 'All', value: 'all', num: allKeys.length },
      { title: 'Recent X', value: 'recent', num: recentKeys.length },
      { title: 'Custom', value: 'custom', num: customKeys.length },
    ];
    let validVocabIDsYetToBeSorted = [];
    switch (mode) {
      case 'all':
        validVocabIDsYetToBeSorted = allKeys;
        break;
      case 'recent':
        validVocabIDsYetToBeSorted = recentKeys;
        break;
      case 'custom':
        validVocabIDsYetToBeSorted = customKeys;
        break;
      default:
    }
    return (
      <View>
        <List.Item
          title="Filter"
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsExpanded(!isExpanded);
          }}
          right={() => <Text style={{ alignSelf: 'center', color: Color.gray5, fontSize: 16 }}>{validVocabIDsYetToBeSorted.length}</Text>}
        />
        {isExpanded ? <Divider style={style.divider} /> : null}
        {isExpanded ? (
          <View style={{
            margin: 10, padding: 10, backgroundColor: Color.white5, borderRadius: 20,
          }}
          >
            {items.map((item, index) => {
              const disabled = (item.value !== 'custom') && item.num === 0;
              const textColor = disabled ? Color.gray2 : Color.black;
              const iconColor = disabled ? Color.gray2 : Color.green6;
              return (
                <View>
                  <List.Item
                    title={item.title}
                    titleStyle={{ color: textColor }}
                    onPress={() => {
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                      if (item.value === 'custom') { setCustomPopUpVisible(true); }
                      setMode(item.value);
                    }}
                    left={() => <List.Icon color={iconColor} icon={item.value === mode ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline'} /* color={Color.gray1} */ />}
                    right={() => <Text style={{ fontSize: 22, alignSelf: 'center', color: textColor }}>{item.num}</Text>}
                    disabled={disabled}
                  />
                  {(index === items.length - 1) ? null : <Divider style={style.divider} />}
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  };
  const renderCustomPopUp = () => {
    const items = [
      {
        title: 'Index',
        range: [1, allKeys.length],
        min: indexMin,
        max: indexMax,
        setMin: setIndexMin,
        setMax: setIndexMax,
      },
      {
        title: <Icon.Feather name="x" style={{ fontSize: 30, color: Color.cud.red }} />,
        range: [0, XMax],
        min: xMin,
        max: xMax,
        setMin: setXMin,
        setMax: setXMax,
      },
    ];
    const renderMenu = () => (
      <View
        style={{
          backgroundColor: Color.defaultBackground, margin: '10%', borderRadius: 20, padding: 10, flex: 1, paddingTop: header.paddingTop,
        }}
      >
        <ScrollView>
          {items.map((item, index) => (
            <View>
              {index !== 0 ? <Divider style={style.divider} /> : null}
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 26, flex: 1 }}>{item.title}</Text>
                  <Text style={{ fontSize: 18 }}>{`${item.min} ~ ${item.max}`}</Text>
                </View>
                <NumberInputRange
                  range={item.range}
                  min={item.min}
                  max={item.max}
                  setMin={item.setMin}
                  setMax={item.setMax}
                />
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={style.cancelButton} onPress={() => setCustomPopUpVisible('')}>
          <Icon.Feather name="x" style={style.cancelButtonIcon} />
        </TouchableOpacity>
      </View>
    );
    return (
      <Portal>
        <PopUpMenu isVisible={customPopUpVisible} setVisible={setCustomPopUpVisible} renderMenu={renderMenu} containerStyle={{ justifyContent: 'center' }} />
      </Portal>
    );
  };

  const renderStartButton = () => {
    let validVocabIDsYetToBeSorted = [];
    switch (mode) {
      case 'all':
        validVocabIDsYetToBeSorted = allKeys;
        break;
      case 'recent':
        validVocabIDsYetToBeSorted = recentKeys;
        break;
      case 'custom':
        validVocabIDsYetToBeSorted = customKeys;
        break;
      default:
    }
    const validVocabIDsSorted = deck.sortVocabs(validVocabIDsYetToBeSorted, sortMode);
    const params = {
      deckID,
      validVocabIDs: validVocabIDsSorted,
      sortMode,
      itemVisible: itemConfig,
      leftVocabID: [],
      rightVocabID: [],
    };
    const navigate = () => navigation.dispatch((state) => {
      const routes = [
        ...state.routes.filter((route) => route.name !== 'options'),
        { name: 'play', params },
      ];
      return CommonActions.reset({ ...state, routes, index: routes.length - 1 });
    });
    return (
      <View style={{ padding: 10 }}>
        <Button
          color={Color.green2}
          mode="contained"
          onPress={() => {
            playoption.save(sortMode, { index: [indexMin, indexMax], x: [xMin, xMax] }, itemConfig, mode);
            navigate();
          }}
          disabled={validVocabIDsYetToBeSorted.length === 0}
        >
          Play
        </Button>
      </View>
    );
  };

  return deckContentLoaded ? (
    <View style={style.container}>
      <ActivityIndicator animating={isLoading} />
      <ScrollView style={{ flex: 1 }}>
        {renderSort()}
        <Divider style={style.divider} />
        {renderItemConfig()}
        <Divider style={style.divider} />
        {renderCardFilter()}
      </ScrollView>
      {renderStartButton()}
      {renderItemConfigPopUp()}
      {renderCustomPopUp()}
    </View>
  ) : <View style={style.container}><ActivityIndicator animating /></View>;
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
