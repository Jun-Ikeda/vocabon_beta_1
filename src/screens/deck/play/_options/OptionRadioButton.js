import React, { useEffect, useState } from 'react';
import {
  LayoutAnimation, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { RadioButton } from 'react-native-paper';

import { func } from '../../../../config/Const';

const OptionRadioButton = (props) => {
  const {
    content, validVocabIDs, setMode, mode, marks, play, suspended,
  } = props;

  const [recentMarkLength, setRecentMarkLength] = useState(0);

  useEffect(() => {
    let newRecentMarkLength = 0;
    Object.values(marks).forEach((mark) => { newRecentMarkLength = mark.includes(play.length - 1) ? newRecentMarkLength + 1 : newRecentMarkLength; });
    setRecentMarkLength(newRecentMarkLength);
  }, []);

  const radiobuttons = [
    {
      value: 'default', title: 'All', visible: true, length: Object.values(content).length, lengthVisible: (mode === 'default'),
    },
    {
      value: 'recentMark', title: 'Recent X cards', visible: true, length: validVocabIDs.length, lengthVisible: (mode === 'recentMark'),
    },
    {
      value: 'custom', title: 'Custom', visible: true, length: validVocabIDs.length, lengthVisible: (mode === 'custom'),
    },
    {
      value: 'suspended', title: 'Suspended', visible: suspended, length: suspended?.validVocabIDs?.length ?? 0, lengthVisible: (mode === 'suspended'),
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
      {radiobuttons.map((radiobutton) => (radiobutton.visible ? (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setMode(radiobutton.value)}
          // onPress={() => func.alertConsole(suspended)}
          key={radiobutton.title.toLowerCase()}
        >
          <RadioButton value={radiobutton.value} style={{ right: 0, left: 0 }} />
          <Text style={{ flex: 1, fontSize: 20, alignSelf: 'center' }}>{radiobutton.title}</Text>
          {radiobutton.lengthVisible ? <Text style={{ fontSize: 20, padding: 5 }}>{radiobutton.length}</Text> : null}
        </TouchableOpacity>
      ) : null))}
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
