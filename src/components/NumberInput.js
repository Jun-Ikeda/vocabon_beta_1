import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import Icon from './Icon';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  button: { padding: 10 },
  numContainer: {
    borderWidth: 1, borderBottomColor: 'transparent', borderTopColor: 'transparent', width: 50, alignItems: 'center', justifyContent: 'center',
  },
});

const NumberInput = (props) => {
  const { range } = props;
  const [num, setNum] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerIndex, setTimerIndex] = useState(0);

  const decrease = () => setNum(async (prev) => {
    let step = 0;
    await setTimerIndex((prevIndex) => {
      step = Math.floor(prevIndex / 10) + 1;
      return prevIndex + 1;
    });
    // console.log(step);
    return (prev - step > range[0] ? prev - step : range[0]);
  });
  const increase = () => setNum(async (prev) => {
    let step = 0;
    await setTimerIndex((prevIndex) => {
      step = Math.floor(prevIndex / 10) + 1;
      console.log(step);
      return prevIndex + 1;
    });
    // console.log(step);
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
  return (
    <View style={style.container}>
      <TouchableOpacity disabled={range[0] === num} style={style.button} onPressIn={() => startLongPress('minus')} onPressOut={endLongPress}>
        <Icon.AntDesign name="minus" />
      </TouchableOpacity>
      <View style={style.numContainer}>
        <Text>
          {num}
        </Text>
      </View>
      <TouchableOpacity onPressIn={() => startLongPress('plus')} onPressOut={endLongPress} disabled={range[1] === num} style={style.button}>
        <Icon.AntDesign name="plus" />
      </TouchableOpacity>
      <Text>{timerIndex}</Text>
    </View>
  );
};

NumberInput.propTypes = {
  range: PropTypes.shape([PropTypes.number, PropTypes.number]),
};

NumberInput.defaultProps = {
  range: [0, 1],
};

export default NumberInput;
