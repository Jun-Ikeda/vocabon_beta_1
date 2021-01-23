import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, LayoutAnimation, FlatList, Platform, Alert,
} from 'react-native';
import PropTypes from 'prop-types';

import { Button, Divider, Menu } from 'react-native-paper';

import { useNavigationState } from '@react-navigation/native';
import Color from '../../../../config/Color';

import Icon from '../../../../components/Icon';

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
    paddingHorizontal: 5,
  },
  expandIcon: {
    fontSize: 24,
  },
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 15,
    backgroundColor: Color.white1,
  },
  emptyText: {
    fontStyle: 'italic',
  },
});

const Import = (props) => {
  // props
  const { navigation } = props;
  // state
  const [input, setInput] = useState('manzana,apple/plátano,banana/uva,grape');
  const [itemDelimiter, setItemDelimiter] = useState(',');
  const [cardDelimiter, setCardDelimiter] = useState('/');
  const [inputExpand, setInputExpand] = useState(false);

  const routes = useNavigationState((_state) => _state.routes);
  useEffect(() => console.log(routes), []);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    // if (!isChanged) {
    //   return;
    // }
    if (!(Platform.OS === 'web') && input !== '') {
      e.preventDefault();
      Alert.alert(
        'Discard import?',
        'You have unsaved data. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Save',
            onPress: () => {
              navigation.navigate('importoption');
              // saveDeckContent(deckID, content, false);
              // navigation.dispatch(e.data.action);
            },
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    }
  }),
  [navigation]);

  const renderDelimiterInput = () => {
    const inputs = [
      { title: 'ITEM', state: [itemDelimiter, setItemDelimiter] },
      { title: 'CARD', state: [cardDelimiter, setCardDelimiter] },
    ];
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
        {inputs.map((_input) => (
          <View style={{ flex: 1, padding: 5 }} key={_input.title.toLowerCase()}>
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
      <View style={{
        position: 'absolute', bottom: 15, right: 20, flexDirection: 'row',
      }}
      >
        <TouchableOpacity
          style={style.expandButton}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setInputExpand(!inputExpand);
          }}
        >
          <Icon.Ionicons style={style.expandIcon} name={inputExpand ? 'contract' : 'expand'} />
        </TouchableOpacity>
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
    </View>
  );

  const renderList = () => (
    <FlatList
      data={input.split(cardDelimiter)}
      renderItem={({ item: card, index: cardIndex }) => (
        <View style={style.cardContainer}>
          <Text>{`Card${cardIndex + 1}: `}</Text>
          {(card.split(itemDelimiter).map((item, itemIndex) => (
            <Text key={item}>
              {`item${itemIndex + 1}: `}
              {(item === '')
                ? <Text style={style.emptyText}>empty</Text>
                : <Text>{item}</Text>}
            </Text>
          )))}
        </View>
      )}
      contentContainerStyle={{
        paddingBottom: 60,
      }}
      keyExtractor={(item) => item.split(itemDelimiter)[0]}
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
        onPress={() => navigation.navigate('importoption')}
      >
        Import
      </Button>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={{ flex: 1 }}>
        {inputExpand ? null : renderDelimiterInput()}
        {renderInput()}
        {inputExpand ? null : renderList()}
      </View>
      {inputExpand ? null : renderCompileButton()}
    </View>
  );
};

Import.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Import;

export const ImportMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Menu
      visible={showMenu}
      onDismiss={() => setShowMenu(false)}
      anchor={(
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Icon.MaterialCommunityIcons
            name="earth"
            size={30}
            style={{ color: 'black' }}
          />
        </TouchableOpacity>
        )}
    >
      <Menu.Item onPress={() => {}} title="Item 1" />
      <Menu.Item onPress={() => {}} title="Item 2" />
      <Divider />
      <Menu.Item onPress={() => {}} title="Item 3" />
    </Menu>
  );
};
