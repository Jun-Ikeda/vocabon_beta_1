import React from 'react';
import {
  Button, TouchableOpacity, View, Text,
} from 'react-native';
import ProfileIcon from '../src/components/user/profileicon/ProfileIcon';
import { PastelColors } from '../src/config/Color';
import { User } from './TestData';

const renderProfileIcon = () => {
  const it = 'be';
  return PastelColors.map((color) => (
    <ProfileIcon char="V" color={color} onPress={() => console.log({ color })} />
  ));
};

const Demo = (props) => (
  <View style={{
    flex: 1, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
  }}
  >
    {renderProfileIcon()}
  </View>
);

export default Demo;
