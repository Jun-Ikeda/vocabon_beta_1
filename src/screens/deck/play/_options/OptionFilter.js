import React, { useState } from 'react';
import {
  LayoutAnimation, Text, TouchableOpacity, View, StyleSheet, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-paper';
// eslint-disable-next-line import/no-unresolved
import RangeSlider from 'react-native-range-slider-expo';

import Color from '../../../../config/Color';

const style = StyleSheet.create({
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 18,
  },
  filterExpandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  divider: { backgroundColor: Color.gray3, height: 1.5, opacity: 0.5 },
});

const OptionFilter = (props) => {
  const { items, setExpand, expand } = props;
  const [isVisible, setIsVisible] = useState(true);

  const renderTitle = () => (
    <TouchableOpacity onPress={() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsVisible(!isVisible);
    }}
    >
      <Text style={{ justifyContent: 'center', fontSize: 20 }}>Filter</Text>
    </TouchableOpacity>
  );

  const renderFilterTitle = (item) => (
    <TouchableOpacity
      style={style.filterExpandButton}
      onPress={() => {
        if (item.visible) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpand((expand === item.title) ? null : item.title);
        } else {
          Alert.alert(`All cards has ${item.state[0].max} ${item.title.toLowerCase()}`);
        }
      }}
    >
      <Text style={style.title}>{item.title}</Text>
      <Text>
        {(item.state[0].min === item.range[0] && item.state[0].max === item.range[1])
          ? `ALL (${item.state[0].min} ~ ${item.state[0].max})`
          : `${item.state[0].min} ~ ${item.state[0].max}`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {renderTitle()}
      {isVisible ? (items.map((item, index) => (
        <View key={item.title.toLowerCase()}>
          {(index === 0) ? null : <Divider style={style.divider} />}
          {renderFilterTitle(item)}
          {(expand === item.title) && item.visible ? (
            <View style={{ paddingHorizontal: 35 }}>
              <RangeSlider
                min={item.range[0]}
                max={item.range[1]}
                fromValueOnChange={(value) => item.state[1]({ ...item.state[0], min: value })}
                toValueOnChange={(value) => item.state[1]({ ...item.state[0], max: value })}
                styleSize={20}
                initialFromValue={item.state[0].min}
                initialToValue={item.state[0].max}
                fromKnobColor={Color.green2}
                toKnobColor={Color.green2}
                inRangeBarColor={Color.gray2}
              />
            </View>
          ) : null}
        </View>
      ))) : null}
    </View>
  );
};

OptionFilter.propTypes = {
  items: PropTypes.array.isRequired,
  setExpand: PropTypes.func.isRequired,
  expand: PropTypes.string,
};

OptionFilter.defaultProps = {
  expand: null,
};

export default OptionFilter;
