import React from 'react';
import { Button, TouchableOpacity, View, Text } from 'react-native';
import GlobalStateTest from './GlobalStateTest';

const renderDemo = () => (
  <View>
    <Text>
      {GlobalStateTest.test}
    </Text>
  </View>
);

const Demo = (props) => (
  <View>
    {renderDemo()}
  </View>
);

export default Demo;
