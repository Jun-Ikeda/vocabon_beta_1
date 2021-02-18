import React, { useState, useRef, useEffect } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  button: { padding: 10 },
  numContainer: {
    borderWidth: 1, borderBottomColor: 'transparent', borderTopColor: 'transparent', width: 40, alignItems: 'center', justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

const NumberInput = (props) => {
  const { range, num, setNum } = props;
  const [timer, setTimer] = useState(0);
  const [timerIndex, setTimerIndex] = useState(0);
  const refTimerIndex = useRef(timerIndex);
  useEffect(() => {
    refTimerIndex.current = timerIndex;
  }, [timerIndex]);

  const decrease = () => setNum((prev) => {
    const step = Math.floor(refTimerIndex.current / 10) + 1;
    setTimerIndex((prevIndex) => prevIndex + 1);
    return (prev - step > range[0] ? prev - step : range[0]);
  });
  const increase = () => setNum((prev) => {
    const step = Math.floor(refTimerIndex.current / 20) * 2 + 1;
    setTimerIndex((prevIndex) => prevIndex + 1);
    return (prev + step < range[1] ? prev + step : range[1]);
  });
  const startLongPress = (mode) => {
    switch (mode) {
      case 'plus':
        setTimer(setInterval(increase, 100));
        break;
      case 'minus':
        setTimer(setInterval(decrease, 100));
        break;
      default:
    }
  };
  const endLongPress = () => {
    setTimerIndex(0);
    clearInterval(timer);
  };

  const handleInputChange = (text) => {
    if ((/^\d+$/.test(text) || text === '')) {
      if (range[0] >= Number(text)) {
        setNum(range[0]);
      } else if (Number(text) >= range[1]) {
        setNum(range[1]);
      } else {
        setNum(Number(text));
      }
    }
  };

  return (
    <View style={style.container}>
      <TouchableOpacity disabled={range[0] === num} onPress={decrease} style={style.button} onPressIn={() => startLongPress('minus')} onPressOut={endLongPress}>
        <Icon.AntDesign style={style.text} name="minus" />
      </TouchableOpacity>
      <View style={style.numContainer}>
        <TextInput style={style.text} value={String(num)} onChangeText={handleInputChange} />
      </View>
      <TouchableOpacity onPressIn={() => startLongPress('plus')} onPressOut={endLongPress} onPress={increase} disabled={range[1] === num} style={style.button}>
        <Icon.AntDesign style={style.text} name="plus" />
      </TouchableOpacity>
    </View>
  );
};

NumberInput.propTypes = {
  range: PropTypes.shape([PropTypes.number, PropTypes.number]),
  num: PropTypes.number,
  setNum: PropTypes.func,
};

NumberInput.defaultProps = {
  range: [0, 1],
  num: 0,
  setNum: () => {},
};

export default NumberInput;
