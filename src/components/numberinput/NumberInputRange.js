import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import NumberInput from './NumberInput';

const NumberInputRange = (props) => {
  const {
    range, min, setMin, max, setMax,
  } = props;
  // const [max, setMax] = useState(0);
  // const [min, setMin] = useState(0);

  // const setMax = (value) => setState((prev) => {
  //   const prevCopy = prev.slice();
  //   prevCopy[1] = value;
  //   return prevCopy;
  // });
  // const setMin = (value) => setState((prev) => {
  //   const prevCopy = prev.slice();
  //   prevCopy[0] = value;
  //   return prevCopy;
  // });

  useEffect(() => { if (min > max) setMax(min); }, [min]);
  useEffect(() => { if (min > max) setMin(max); }, [max]);
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <NumberInput range={range} num={min} setNum={setMin} />
      <NumberInput range={range} num={max} setNum={setMax} />
    </View>
  );
};

NumberInputRange.propTypes = {
  range: PropTypes.shape([PropTypes.number, PropTypes.number]),
  min: PropTypes.number,
  setMin: PropTypes.func,
  max: PropTypes.number,
  setMax: PropTypes.func,

};

NumberInputRange.defaultProps = {
  range: [0, 1],
  min: 0,
  setMin: () => {},
  max: 1,
  setMax: () => {},
};

export default NumberInputRange;
