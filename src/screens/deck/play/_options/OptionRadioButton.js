import React from 'react';
import { LayoutAnimation, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { RadioButton } from 'react-native-paper';

const OptionRadioButton = (props) => {
  const {
    content, validVocabIDs, setMode, mode,
  } = props;

  const radiobuttons = [
    { value: 'default', title: 'Default', length: Object.values(content).length },
    { value: 'custom', title: 'Custom', length: validVocabIDs.length },
  ];
  return (
    <RadioButton.Group
      onValueChange={(value) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMode(value);
      }}
      value={mode}
    >
      {radiobuttons.map((radiobutton) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value={radiobutton.value} style={{ right: 0, left: 0 }} />
          <Text style={{ flex: 1, fontSize: 20, alignSelf: 'center' }}>{radiobutton.title}</Text>
          <Text style={{ fontSize: 20, padding: 5 }}>{radiobutton.length}</Text>
        </View>
      ))}
    </RadioButton.Group>
  );
};

OptionRadioButton.propTypes = {
  content: PropTypes.object.isRequired,
  validVocabIDs: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default OptionRadioButton;
