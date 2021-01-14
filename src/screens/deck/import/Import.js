import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import Icon from '../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  expandButton: {
    alignSelf: 'flex-end',
  },
  expandIcon: {

  },
});

const Import = (props) => {
  // props
  const {} = props;
  // state
  const [input, setInput] = useState('');
  const [inputExpand, setInputExpand] = useState(false);

  const renderInput = () => (
    <View style={inputExpand ? { flex: 1 } : { height: 120 }}>
      <TextInput
        multiline
        style={style.input}
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={style.expandButton} onPress={() => setInputExpand(!inputExpand)}>
        <Icon.Ionicons style={style.expandIcon} name={inputExpand ? 'contract' : 'expand'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={style.container}>
      {renderInput()}
    </View>
  );
};

export default Import;
