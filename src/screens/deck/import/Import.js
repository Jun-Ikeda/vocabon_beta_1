import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, LayoutAnimation, FlatList,
} from 'react-native';

import { Button } from 'react-native-paper';
import Color from '../../../config/Color';

import Icon from '../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 20,
    textAlignVertical: 'top',
    backgroundColor: Color.white1,
    // marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  delimiterInput: {
    // marginHorizontal: 10,
    padding: 10,
    backgroundColor: Color.white1,
    borderRadius: 10,
  },
  expandButton: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    // alignSelf: 'flex-end',
  },
  expandIcon: {
    fontSize: 24,
  },
});

const Import = (props) => {
  // props
  const {} = props;
  // state
  const [input, setInput] = useState('');
  const [itemDelimiter, setItemDelimiter] = useState('');
  const [cardDelimiter, setCardDelimiter] = useState('');
  const [inputExpand, setInputExpand] = useState(false);

  const renderDelimiterInput = () => {
    const inputs = [
      { title: 'ITEM', state: [itemDelimiter, setItemDelimiter] },
      { title: 'CARD', state: [cardDelimiter, setCardDelimiter] },
    ];
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
        {inputs.map((_input) => (
          <View style={{ flex: 1, padding: 5 }}>
            <Text style={{ /* paddingHorizontal: 10, */ fontSize: 18 }}>{_input.title}</Text>
            <TextInput
              value={_input.state[0]}
              onChangeText={_input.state[1]}
              style={style.delimiterInput}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderInput = () => (
    <View style={inputExpand ? { flex: 1, padding: 10 } : { height: 240, padding: 10 }}>
      <Text style={{ fontSize: 18 }}>INPUT</Text>
      <TextInput
        multiline
        style={style.input}
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity
        style={style.expandButton}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setInputExpand(!inputExpand);
        }}
      >
        <Icon.Ionicons style={style.expandIcon} name={inputExpand ? 'contract' : 'expand'} />
      </TouchableOpacity>
    </View>
  );

  const renderList = () => (
    <FlatList
      // style={inputExpand ? { position: 'absolute', elevation: 0 } : null}
      data={input.split(cardDelimiter)}
      renderItem={({ item: card }) => (
        <View style={{ padding: 10 }}>
          {(card.split(itemDelimiter).map((_item, index) => <Text>{`item${index + 1}: ${_item}`}</Text>))}
        </View>
      )}
    />
  );

  const renderCompileButton = () => (
    <View style={{
      padding: 10, position: 'absolute', bottom: 0, right: 0, left: 0,
    }}
    >
      <Button
        color={Color.green3}
        mode="contained"
        onPress={() => alert('aaa')}
      >
        Compile
      </Button>
    </View>
  );

  return (
    <View style={style.container}>
      {inputExpand ? null : renderDelimiterInput()}
      {renderInput()}
      {inputExpand ? null : renderList()}
      {inputExpand ? null : renderCompileButton()}
    </View>
  );
};

export default Import;
