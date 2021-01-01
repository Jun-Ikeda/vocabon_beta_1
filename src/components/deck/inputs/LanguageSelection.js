import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

import Icon from '../../Icon';

const pickerSelectStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOSContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroidContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
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
  icon: {
    fontSize: 16,
    marginHorizontal: 15,
  },
});

/**
 * LanguageSelection Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <LanguageSelection
 *    setLanguage={() => { function }}
 *    language="string"
 * />
 * ```
 */
const languageList = [
  { label: 'English', value: 'English' },
  { label: 'Japanese', value: 'Japanese' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'French', value: 'French' },
  { label: 'Korean', value: 'Korean' },
];

const LanguageSelection = (props) => {
  const { setLanguage, language } = props;

  const renderIcon = () => (
    <Icon.Entypo name="chevron-thin-down" style={style.icon} />
  );

  const pickers = [
    {
      title: 'Term',
      value: language.term,
      onValueChange: (updateTerm) => setLanguage({
        term: updateTerm, definition: language.definition,
      }),
    },
    {
      title: 'Definition',
      value: language.definition,
      onValueChange: (updateDefinition) => setLanguage({
        term: language.term, definition: updateDefinition,
      }),
    },
  ];

  return (
    <View>
      {pickers.map((picker) => (
        <View key={picker.title.toLowerCase()}>
          <Text>{picker.title}</Text>
          <RNPickerSelect
            onValueChange={picker.onValueChange}
            value={picker.value}
            placeholder={{ label: 'Select the language...', value: '' }}
            style={pickerSelectStyles}
            items={languageList}
            Icon={() => renderIcon()}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      ))}
    </View>
  );
};

LanguageSelection.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  language: PropTypes.shape({ term: '', definition: '' }),
};

LanguageSelection.defaultProps = {
  language: { term: '', definition: '' },
};

export default LanguageSelection;
