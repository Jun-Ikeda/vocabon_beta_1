import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

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

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    paddingVertical: 10,
  },
});

const SortMode = (props) => {
  const { sortMode, setSortMode } = props;
  const [isVisible, setIsVisible] = useState(true);

  const sortModes = [
    { label: 'Index - Ascending', value: 'index' },
    { label: 'Index - Descending', value: 'index-reverse' },
    { label: 'Shuffle', value: 'shuffle' },
    // { label: 'Marks', value: 'marks' },
    // { label: 'Definitions', value: 'definitions' },
    // { label: 'Example', value: 'example' },
    // { label: 'Synonym', value: 'synonym' },
    // { label: 'Antonym', value: 'antonym' },
  ];
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsVisible(!isVisible);
        }}
        style={style.labelContainer}
      >
        <Text style={{ justifyContent: 'center', fontSize: 20 }}>Sort by</Text>
      </TouchableOpacity>
      {isVisible ? (
        <RNPickerSelect
          onValueChange={setSortMode}
          value={sortMode}
          placeholder={{ label: 'Select sort mode...', value: '' }}
          style={pickerSelectStyles}
          items={sortModes}
          useNativeAndroidPickerStyle={false}
        />
      ) : null}
    </View>
  );
};

SortMode.propTypes = {
  sortMode: PropTypes.string.isRequired,
  setSortMode: PropTypes.func.isRequired,
};

SortMode.defaultProps = {

};

export default SortMode;
