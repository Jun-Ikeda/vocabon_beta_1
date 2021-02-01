import React, { useEffect, useState } from 'react';
import {
  LayoutAnimation, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { RadioButton } from 'react-native-paper';

import { func } from '../../../../config/Const';

const OptionRadioButton = (props) => {
  const {
    content, validVocabIDs, setMode, mode, marks, play,
  } = props;

  const [recentMarkLength, setRecentMarkLength] = useState(0);

  useEffect(() => {
    let newRecentMarkLength = 0;
    Object.values(marks).forEach((mark) => { newRecentMarkLength = mark.includes(play.length - 1) ? newRecentMarkLength + 1 : newRecentMarkLength; });
    setRecentMarkLength(newRecentMarkLength);
  }, []);

  const radiobuttons = [
    {
      value: 'default', title: 'All', length: Object.values(content).length, lengthVisible: true,
    },
    {
      value: 'recentMark', title: 'Recent X cards', length: validVocabIDs.length, lengthVisible: (mode === 'recentMark'),
    },
    {
      value: 'custom', title: 'Custom', length: validVocabIDs.length, lengthVisible: (mode === 'custom'),
    },
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
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setMode(radiobutton.value)}
          key={radiobutton.title.toLowerCase()}
        >
          <RadioButton value={radiobutton.value} style={{ right: 0, left: 0 }} />
          <Text style={{ flex: 1, fontSize: 20, alignSelf: 'center' }}>{radiobutton.title}</Text>
          {radiobutton.lengthVisible ? <Text style={{ fontSize: 20, padding: 5 }}>{radiobutton.length}</Text> : null}
        </TouchableOpacity>
      ))}
    </RadioButton.Group>
  );
};

OptionRadioButton.propTypes = {
  content: PropTypes.object.isRequired,
  validVocabIDs: PropTypes.array.isRequired,
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default OptionRadioButton;
