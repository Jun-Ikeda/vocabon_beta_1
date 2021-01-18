import React, { useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import CardFlip from 'react-native-card-flip';
import { Switch } from 'react-native-paper';

import Color from '../../../../config/Color';

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
  const [isFront, setIsFront] = useState(true);

  // const [term, setTerm] = useState({ front: true, back: false });
  // const [definition, setDefinition] = useState({ front: false, back: true });
  // const [synonym, setSynonym] = useState({ front: false, back: false });
  // const [antonym, setAntonym] = useState({ front: false, back: false });
  // const [prefix, setPrefix] = useState({ front: false, back: false });
  // const [suffix, setSuffix] = useState({ front: false, back: false });
  // const [exampleT, setExampleT] = useState({ front: true, back: false });
  // const [exampleD, setExampleD] = useState({ front: false, back: true });
  // const [cf, setCf] = useState({ front: false, back: false });
  let card = {};

  const toggle = (item, frontOrback, _add = null) => {
    const remove = () => {
      const newItemVisible = itemVisible[frontOrback].filter((_item) => (_item !== item));
      setItemVisible({ ...itemVisible, [frontOrback]: newItemVisible });
    };
    const add = () => {
      setItemVisible({ ...itemVisible, [frontOrback]: [...itemVisible[frontOrback], item] });
    };
    if (_add === null) {
      if (itemVisible[frontOrback].includes(item)) {
        remove();
      } else {
        add();
      }
    } else if (_add) {
      add();
    } else {
      remove();
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
    setIsFront((side === 'front'));
    card.flip();
  };

  return (
    <View style={{ flex: 1, height: 500 }}>
      <Text style={{ fontSize: 20 }}>Visible Items</Text>
      <CardFlip
        style={style.cardflip}
        duration={300}
        ref={(cardRef) => { card = cardRef; }}
      >
        <TouchableOpacity style={style.card} onPress={() => flip('back')}>
          <Text style={{ fontSize: 19, textAlign: 'center', paddingVertical: 10 }}>Front</Text>
          {items.map((item) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
              <Text style={{ flex: 1, fontSize: 18 }}>{item.title}</Text>
              <Switch value={itemVisible.front.includes(item.value)} onValueChange={(front) => toggle(item.value, 'front', front)} />
            </View>
          ))}
        </TouchableOpacity>
        <TouchableOpacity style={style.card} onPress={() => flip('front')}>
          <Text style={{ fontSize: 19, textAlign: 'center', paddingVertical: 10 }}>Back</Text>
          {items.map((item) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
              <Text style={{ flex: 1, fontSize: 18 }}>{item.title}</Text>
              <Switch value={itemVisible.back.includes(item.value)} onValueChange={(back) => toggle(item.value, 'back', back)} />
            </View>
          ))}
        </TouchableOpacity>
      </CardFlip>
    </View>
  );
};

FrontBack.propTypes = {
  itemVisible: PropTypes.object.isRequired,
  setItemVisible: PropTypes.func.isRequired,
};

export default FrontBack;
