import React, { useState, useEffect } from 'react';
import {
  FlatList, StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import { TextInput } from 'react-native-paper';
import { deck, func } from '../../../config/Const';
import Color from '../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 15,
    backgroundColor: Color.white1,
    // alignItems: 'center',
    // flexDirection: 'row',
    // height: 80,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    // borderWidth: 1,
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  google: {

  },
});

const VocabList = (props) => {
  const {
    content,
    renderCard,
    onPressCard,
    cardContainer,
    labelVisible: labelVisibleProps,
    itemVisible,
    renderCardRight,
    textStyle,
    itemStyle,
    state,
    contentContainerStyle,
    onEndReached,
    onScroll,
    onScrollToTop,
    searchBar,
    ListHeaderComponent,
    showsVerticalScrollIndicator,
    renderViewContent,
  } = props;
  const manuallyRenderCard = !((renderCard.toString() === 'function renderCard() {}') || (renderCard.toString() === 'function (){}'));
  const onPressCardValid = !((onPressCard.toString() === 'function onPressCard() {}') || (onPressCard.toString() === 'function (){}'));
  const renderViewContentValid = !((renderViewContent.toString() === 'function renderViewContent() {}') || (renderViewContent.toString() === 'function (){}'));
  const stateValid = !(state.length === 0);
  const isButton = onPressCardValid || stateValid;
  const labelVisible = (typeof labelVisibleProps === 'boolean') ? {
    term: labelVisibleProps,
    definition: labelVisibleProps,
    synonym: labelVisibleProps,
    antonym: labelVisibleProps,
    prefix: labelVisibleProps,
    suffix: labelVisibleProps,
    exampleT: labelVisibleProps,
    exampleD: labelVisibleProps,
    cf: labelVisibleProps,
  } : labelVisibleProps;
  const [searchContent, setSearchContent] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newData = lodash.filter(func.convertObjectToArray(content), (vocab) => {
      let i = 0;
      Object.values(vocab.value).forEach((item) => {
        i += (JSON.stringify(item).includes(searchText.toLowerCase()) ? 1 : 0);
      });
      return !(i === 0);
    });
    setSearchContent(func.convertArrayToObject(newData));
  }, [searchText, content]);

  const toggleSelect = (vocabIDsState, vocabID) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const [vocabIDs, setVocabIDs] = vocabIDsState;
    const selected = vocabIDs.includes(vocabID);
    if (selected) {
      const newState = vocabIDs.filter((id) => (id !== vocabID));
      setVocabIDs(newState);
    } else {
      setVocabIDs([...vocabIDs, vocabID]);
    }
  };

  const renderItem = ({ item: vocab }) => {
    const { key, value } = vocab;
    const renderContent = () => (
      <View style={style.card}>
        <View style={style.contentContainer}>
          {deck.items.map((item) => {
            const isVisible = (typeof itemVisible === 'function') ? itemVisible(vocab)[item] : itemVisible[item];
            if (isVisible) {
              if (labelVisible[item]) {
                return <Text style={[style.text, textStyle, itemStyle[item]]} key={item}>{`${item}: ${value?.[item] ?? ''}`}</Text>;
              }
              return <Text style={[style.text, textStyle, itemStyle[item]]} key={item}>{value?.[item] ?? ''}</Text>;
            }
            return null;
          })}
          {renderViewContentValid ? renderViewContent(vocab) : null}
        </View>
        {renderCardRight(vocab)}
      </View>
    );
    const uri = `https://www.google.com/search?q=${value.term}`;
    if (isButton) {
      return (
        <TouchableOpacity
          style={[style.cardContainer, cardContainer]}
          onPress={onPressCardValid ? () => onPressCard(vocab) : () => toggleSelect(state, key)}
          onLongPress={() => Linking.openURL(uri)}
        >
          {renderContent()}
        </TouchableOpacity>
      );
    }
    return (
      <View style={[style.cardContainer, cardContainer]}>
        {renderContent()}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {searchBar ? (
        <View style={{ justifyContent: 'center', padding: 10 }}>
          <TextInput value={searchText} onChangeText={setSearchText} label="Search" />
        </View>
      ) : null}
      <FlatList
        style={style.container}
        data={func.convertObjectToArray(searchContent)}
        keyExtractor={(item) => item.key}
        renderItem={manuallyRenderCard ? renderCard : renderItem}
        contentContainerStyle={contentContainerStyle}
        onEndReached={onEndReached}
        onScroll={onScroll}
        onScrollToTop={onScrollToTop}
        ListHeaderComponentStyle={{ right: 0, left: 0 }}
        ListHeaderComponent={((ListHeaderComponent.toString() === 'function ListHeaderComponent() {}') || (ListHeaderComponent.toString() === 'function (){}')) ? null : ListHeaderComponent}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      />
    </View>
  );
};

VocabList.propTypes = {
  content: PropTypes.object,
  cardContainer: PropTypes.object,
  renderCard: PropTypes.func,
  onPressCard: PropTypes.func,
  renderViewContent: PropTypes.func,
  labelVisible: PropTypes.oneOfType([
    PropTypes.shape({
      term: PropTypes.bool,
      definition: PropTypes.bool,
      synonym: PropTypes.bool,
      antonym: PropTypes.bool,
      prefix: PropTypes.bool,
      suffix: PropTypes.bool,
      exampleT: PropTypes.bool,
      exampleD: PropTypes.bool,
      cf: PropTypes.bool,
    }),
    PropTypes.bool,
  ]),
  itemVisible: PropTypes.oneOfType([
    PropTypes.shape({
      term: PropTypes.bool,
      definition: PropTypes.bool,
      synonym: PropTypes.bool,
      antonym: PropTypes.bool,
      prefix: PropTypes.bool,
      suffix: PropTypes.bool,
      exampleT: PropTypes.bool,
      exampleD: PropTypes.bool,
      cf: PropTypes.bool,
    }),
    PropTypes.func,
  ]),
  renderCardRight: PropTypes.func,
  textStyle: PropTypes.object,
  itemStyle: PropTypes.shape({
    term: PropTypes.object,
    definition: PropTypes.object,
    synonym: PropTypes.object,
    antonym: PropTypes.object,
    prefix: PropTypes.object,
    suffix: PropTypes.object,
    exampleT: PropTypes.object,
    exampleD: PropTypes.object,
    cf: PropTypes.object,
  }),
  state: PropTypes.array,
  contentContainerStyle: PropTypes.object,
  onEndReached: PropTypes.func,
  onScroll: PropTypes.func,
  onScrollToTop: PropTypes.func,
  searchBar: PropTypes.bool,
  ListHeaderComponent: PropTypes.func,
  showsVerticalScrollIndicator: PropTypes.bool,
};

VocabList.defaultProps = {
  content: {},
  cardContainer: {},
  renderCard: () => {},
  onPressCard: () => {},
  labelVisible: false,
  itemVisible: {
    term: true,
    definition: true,
    synonym: false,
    antonym: false,
    prefix: false,
    suffix: false,
    exampleT: false,
    exampleD: false,
    cf: false,
  },
  renderCardRight: () => null,
  textStyle: {},
  itemStyle: {
    term: {},
    definition: {},
    synonym: {},
    antonym: {},
    prefix: {},
    suffix: {},
    exampleT: {},
    exampleD: {},
    cf: {},
  },
  state: [],
  contentContainerStyle: {},
  onEndReached: () => {},
  onScroll: () => {},
  onScrollToTop: () => {},
  searchBar: false,
  renderViewContent: () => {},
  ListHeaderComponent: () => {},
  showsVerticalScrollIndicator: false,
};

export default VocabList;
