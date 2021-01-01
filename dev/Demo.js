import React from 'react';
import { View } from 'react-native';

const renderDemo = () => (
  <View>
    aaa
  </View>
);

const Demo = (props) => (
  <View>
    {renderDemo()}
  </View>
);

export default Demo;
