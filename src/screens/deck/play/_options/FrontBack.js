import React, { useState } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import CardFlip from 'react-native-card-flip';
import { Switch } from 'react-native-paper';

import Color from '../../../../config/Color';
import { func } from '../../../../config/Const';

const style = StyleSheet.create({
  cardflip: {
    flex: 1,
    // paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // alignItems: 'center',
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
  const card = {};

  const toggle = (item, frontOrback, bool = null) => {
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

  const flip = (side) => {
    card.flip();
  };

  const renderCard = () => {
    const renderFront = () => (
      <View style={style.card}>
        <Text style={{ fontSize: 19, textAlign: 'center', paddingVertical: 10 }}>Front</Text>
        {items.map((item) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
            <Text style={{ flex: 1, fontSize: 18 }}>{item.title}</Text>
            <Switch value={itemVisible.front.includes(item.value)} onValueChange={(bool) => toggle(item.value, 'front', bool)} />
          </View>
        ))}
      </View>
    );
    const renderBack = () => (
      <View style={style.card}>
        <Text style={{ fontSize: 19, textAlign: 'center', paddingVertical: 10 }}>Back</Text>
        {items.map((item) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
            <Text style={{ flex: 1, fontSize: 18 }}>{item.title}</Text>
            <Switch value={itemVisible.back.includes(item.value)} onValueChange={(bool) => toggle(item.value, 'back', bool)} />
          </View>
        ))}
      </View>
    );
    // if (isPortrait) {
    //   return (
    //     <CardFlip
    //       style={style.cardflip}
    //       duration={300}
    //       ref={(cardRef) => { card = cardRef; }}
    //     >
    //       {renderFront()}
    //       {renderBack()}
    //     </CardFlip>
    //   );
    // }
    return (
      <View style={{ flexDirection: 'row' }}>
        {renderFront()}
        {renderBack()}
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
