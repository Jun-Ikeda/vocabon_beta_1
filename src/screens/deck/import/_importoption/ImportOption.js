import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigationState } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import Color from '../../../../config/Color';
import ImportList from '../ImportList';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Icon from '../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  butonContainer: {
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0,
    padding: 10,
  },
});

const ImportOption = (props) => {
  // props
  const { navigation, route: { params: { input, itemDelimiter, cardDelimiter } } } = props;
  const inputArray = input.split(cardDelimiter).map((card) => card.split(itemDelimiter)); // [ ['manzana', 'apple'], ['platano', 'banana'], ['soy', 'be', 'yo soy estudiante'] ]
  const itemNumber = (inputArray.length === 0) ? 0 : inputArray.reduce((a, b) => (a.length > b.length ? a : b)).length; // itemは最大何個あるか 上の例だと'soy'のカードがitem3まであるので3
  // state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [labels, setLabels] = useState([...Array(itemNumber).map(() => undefined)]);

  const isMin = currentCardIndex === 0;
  const isMax = currentCardIndex === inputArray.length - 1;

  const renderHeader = () => (
    <View style={{ borderWidth: 1, flexDirection: 'row', padding: 20 }}>
      <TouchableOpacity
        style={{ borderWidth: 1, width: 60, textAlign: 'center' }}
        onPress={() => {
          if (!isMin) {
            setCurrentCardIndex(currentCardIndex - 1);
          }
        }}
      >
        <Text>Previous</Text>
      </TouchableOpacity>
      <Text style={{ flex: 1, textAlign: 'center' }}>{`Card${currentCardIndex + 1}`}</Text>
      <TouchableOpacity
        style={{ borderWidth: 1, width: 60, textAlign: 'center' }}
        onPress={() => {
          if (!isMax) {
            setCurrentCardIndex(currentCardIndex + 1);
          }
        }}
      >
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCard = () => (
    <View style={{
      backgroundColor: 'white', borderWidth: 1, flex: 1, margin: 40, borderRadius: 20,
    }}
    >
      {inputArray[currentCardIndex].map((item, index) => (
        <Text>{`${labels?.[index] ?? `item${index}`} ${item}`}</Text>
      ))}
    </View>
  );

  const renderImportButton = () => (
    <View style={style.butonContainer}>
      <Button color={Color.green2} mode="contained" onPress={/* () => navigation.navigate('menu') */ () => console.log(inputArray)}>Import</Button>
    </View>
  );

  return (
    <View style={style.container}>
      {renderHeader()}
      {renderCard()}
      {renderImportButton()}
    </View>
  );
};

ImportOption.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ImportOption;

/*
const ImportOption = (props) => {
  // props
  const { navigation, route: { params: { input, itemDelimiter, cardDelimiter } } } = props;
  const inputArray = input.split(cardDelimiter).map((card) => card.split(itemDelimiter)); // [ ['manzana', 'apple'], ['platano', 'banana'] ]
  const itemNumber = (inputArray.length === 0) ? 0 : inputArray.reduce((a, b) => (a.length > b.length ? a : b)).length;
  // state
  const [isVisible, setIsVisible] = useState(false);
  const [onEditItemIndex, setOnEditItemIndex] = useState(0);
  const [text, setText] = useState('');
  const [label, setLabel] = useState([...Array(itemNumber)].map(() => ''));

  const routes = useNavigationState((_state) => _state.routes);
  useEffect(() => console.log(routes), []);

  const renderList = () => (
    <ImportList
      labels={label}
      input={input}
      cardDelimiter={cardDelimiter}
      itemDelimiter={itemDelimiter}
      onPress={(_, itemIndex) => {
        setOnEditItemIndex(itemIndex);
        setText(label[itemIndex]);
        setIsVisible(true);
      }}
    />
  );

  const renderImportButton = () => (
    <View style={style.butonContainer}>
      <Button color={Color.green2} mode="contained" onPress={() => navigation.navigate('menu') () => console.log(inputArray)}>Import</Button>
      </View>
      );

      const renderEditLabel = () => (
        <PopUpMenu
          renderMenu={() => (
            <View style={{ flex: 1, margin: 50, backgroundColor: Color.white1 }}>
              <TextInput value={text} onChangeText={setText} />
              <Button
                mode="contained"
                color={Color.green2}
                onPress={() => {
                  setLabel((prev) => {
                    const prevCopy = JSON.parse(JSON.stringify(prev));
                    prevCopy[onEditItemIndex] = text;
                    return prevCopy;
                  });
                  setText('');
                  setIsVisible(false);
                }}
              >
                Save
              </Button>
            </View>
          )}
          isVisible={isVisible}
          setVisible={setIsVisible}
        />
      );

      return (
        <View style={style.container}>
          <Text>{itemNumber}</Text>
          {renderList()}
          {renderImportButton()}
          {renderEditLabel()}
        </View>
      );
    }; */
