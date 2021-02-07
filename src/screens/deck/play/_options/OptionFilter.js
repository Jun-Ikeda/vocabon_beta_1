import React, { useState } from 'react';
import {
  LayoutAnimation, Text, TouchableOpacity, View, StyleSheet, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-paper';
// eslint-disable-next-line import/no-unresolved
// import RangeSlider from 'react-native-range-slider-expo';
import { RangeSlider } from '@sharcoux/slider';

import Color from '../../../../config/Color';

const style = StyleSheet.create({
  labelContainer: {
    paddingVertical: 10,
  },
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
  divider: {
    backgroundColor: Color.gray3,
    height: 1.5,
    opacity: 0.5,
  },
});

const OptionFilter = (props) => {
  const { items, setExpand, expand } = props;
  const [isVisible, setIsVisible] = useState(true);

  const renderTitle = () => (
    <TouchableOpacity
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsVisible(!isVisible);
      }}
      style={style.labelContainer}
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
            <View style={{ /* paddingHorizontal: 35 */height: 50 }}>
              <RangeSlider
                range={[item.range[0], item.range[1]]}
                minimumValue={item.range[0]}
                maximumValue={item.range[1]}
                step={1}
                outboundColor={Color.gray3}
                inboundColor={Color.gray2}
                thumbTintColor={Color.green2}
                thumbStyle={undefined}
                trackStyle={undefined}
                enabled
                trackHeight={5}
                thumbSize={20}
                slideOnTap
                onValueChange={(range) => item.state[1]({ min: range[0], max: range[1] })}
                onSlidingStart={undefined}
                onSlidingComplete={undefined}
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
