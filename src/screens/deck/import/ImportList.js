import React from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';

import Color from '../../../config/Color';

const style = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 15,
    backgroundColor: Color.white1,
  },
});

const ImportList = (props) => {
  const {
    input, cardDelimiter, itemDelimiter, labels, onPress,
  } = props;
  const isButton = !((onPress.toString() === 'function onPress() {}') || (onPress.toString() === 'function (){}'));

  return (
    <FlatList
      data={input.split(cardDelimiter)}
      renderItem={({ item: card, index: cardIndex }) => (
        <View style={style.cardContainer}>
          <Text>{`Card${cardIndex + 1}: `}</Text>
          {(card.split(itemDelimiter).map((item, itemIndex) => {
            const renderText = () => (
              <Text key={item}>
                {`${(labels[itemIndex] !== '' && labels[itemIndex] !== undefined) ? labels[itemIndex] : `item${itemIndex + 1}`}: `}
                {(item === '')
                  ? <Text style={style.emptyText}>empty</Text>
                  : <Text>{item}</Text>}
              </Text>
            );
            return isButton ? <TouchableOpacity onPress={() => onPress(cardIndex, itemIndex)}>{renderText()}</TouchableOpacity> : <View>{renderText()}</View>;
          }))}
        </View>
      )}
      contentContainerStyle={{
        paddingBottom: 60,
      }}
      keyExtractor={(item) => item.split(itemDelimiter)[0]}
    />
  );
};

ImportList.propTypes = {
  input: PropTypes.string,
  itemDelimiter: PropTypes.string,
  cardDelimiter: PropTypes.string,
  labels: PropTypes.array,
  onPress: PropTypes.func,
};

ImportList.defaultProps = {
  input: '',
  itemDelimiter: '',
  cardDelimiter: '',
  labels: [],
  onPress: () => {},
};

export default ImportList;
