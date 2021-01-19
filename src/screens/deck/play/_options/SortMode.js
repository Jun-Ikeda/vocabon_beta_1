import React from 'react';
import {
  View, Text, StyleSheet,
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
});

const SortMode = (props) => {
  const { sortMode, setSortMode } = props;

  const sortModes = [
    { label: 'Index - smaller to larger', value: 'index' },
    { label: 'Index - larger to smaller', value: 'index-reverse' },
    { label: 'Shuffle', value: 'shuffle' },
    // { label: 'Marks', value: 'marks' },
    // { label: 'Definitions', value: 'definitions' },
    // { label: 'Example', value: 'example' },
    // { label: 'Synonym', value: 'synonym' },
    // { label: 'Antonym', value: 'antonym' },
  ];
  return (
    <View>
      <Text style={{ justifyContent: 'center', fontSize: 20 }}>Sort by</Text>
      <RNPickerSelect
        onValueChange={setSortMode}
        value={sortMode}
        placeholder={{ label: 'Select the language...', value: '' }}
        style={pickerSelectStyles}
        items={sortModes}
        // Icon={() => renderIcon()}
        useNativeAndroidPickerStyle={false}
      />
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
