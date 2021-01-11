import React from 'react';
import {
  Button,
  FlatList, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { func } from '../../../config/Const';
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
});

const VocabList = (props) => {
  const {
    content, renderCard, onPressCard, cardContainer, labelVisible, itemVisible, renderCardRight, textStyle, itemStyle,
  } = props;
  const manuallyRenderCard = !(renderCard.toString() === 'function renderCard() {}');
  const isButton = !(onPressCard.toString() === 'function onPressCard() {}');

  const renderItem = ({ item: vocab, index }) => {
    const { key, value } = vocab;
    const renderContent = () => (
      <View style={style.card}>
        <View style={style.contentContainer}>
          {Object.keys(value).map((item) => {
            if (itemVisible[item]) {
              if (labelVisible) {
                return (
                  <Text style={[style.text, textStyle, itemStyle[item]]}>{`${item}: ${value[item]}`}</Text>
                );
              }
              return (
                <Text style={[style.text, textStyle, itemStyle[item]]}>{value[item]}</Text>
              );
            }
            return null;
          })}
        </View>
        {renderCardRight(vocab)}
      </View>
    );
    if (isButton) {
      return (
        <TouchableOpacity style={[style.cardContainer, cardContainer]} onPress={() => onPressCard(vocab)}>
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
    <FlatList
      style={style.container}
      data={func.convertObjectToArray(content)}
      renderItem={manuallyRenderCard ? renderCard : renderItem}
    />
  );
};

VocabList.propTypes = {
  content: PropTypes.object,
  cardContainer: PropTypes.object,
  renderCard: PropTypes.func,
  onPressCard: PropTypes.func,
  labelVisible: PropTypes.bool,
  itemVisible: PropTypes.shape({
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
};

export default VocabList;
