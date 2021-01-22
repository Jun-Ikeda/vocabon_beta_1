import React, { useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Switch } from 'react-native-paper';

import Color from '../../../../config/Color';

const style = StyleSheet.create({
  cardflip: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: Color.white1,
    borderRadius: 20,
  },
  label: {
    color: Color.font1,
    fontSize: 22,
    textAlign: 'left',
  },

});

const FrontBack = (props) => {
  // props
  const { itemVisible, setItemVisible } = props;
  // state
  const [isVisible, setIsVisible] = useState(true);

  const setBool = (item, frontOrback, bool = null) => {
    if (bool) {
      setItemVisible({ ...itemVisible, [frontOrback]: [...itemVisible[frontOrback], item] });
    } else {
      const newItemVisible = itemVisible[frontOrback].filter((_item) => (_item !== item));
      setItemVisible({ ...itemVisible, [frontOrback]: newItemVisible });
    }
  };

  const items = [
    { title: 'Term', value: 'term' },
    { title: 'Definition', value: 'definition' },
    { title: 'Synonym', value: 'synonym' },
    { title: 'Antonym', value: 'antonym' },
    { title: 'Prefix', value: 'prefix' },
    { title: 'Suffix', value: 'suffix' },
    { title: 'Example in Term\'s Language', value: 'exampleT' },
    { title: 'Example in Definition\'s Language', value: 'exampleD' },
    { title: 'cf', value: 'cf' },
  ];

  const renderCard = () => {
    const frontAndBack = [
      { title: 'Front', path: 'front' },
      { title: 'Back', path: 'back' },
    ];
    return (
      <View style={{ flexDirection: 'row' }}>
        {frontAndBack.map((side) => (
          <View style={style.card} key={side.title.toLowerCase()}>
            <Text style={{ fontSize: 19, textAlign: 'center', paddingVertical: 10 }}>{side.title}</Text>
            {items.map((item) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }} key={item.title.toLowerCase()}>
                <Text style={{ flex: 1, fontSize: 18 }}>{item.title}</Text>
                <Switch value={itemVisible[side.path].includes(item.value)} onValueChange={(bool) => setBool(item.value, side.path, bool)} />
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ }}>
      <TouchableOpacity onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsVisible(!isVisible);
      }}
      >
        <Text style={{ fontSize: 20 }}>Visible Items</Text>
      </TouchableOpacity>
      {isVisible ? renderCard() : null}
    </View>
  );
};

FrontBack.propTypes = {
  itemVisible: PropTypes.object.isRequired,
  setItemVisible: PropTypes.func.isRequired,
};

export default FrontBack;
