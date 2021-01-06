import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Rakugaki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  render() {
    const { array } = this.state;
    return (
      <TouchableOpacity onPress={() => {
        array.push('aaa')
        this.setState({ array })
      }}>
        <Text> Rakugaki </Text>
      </TouchableOpacity>
    );
  }
}

//-----------------------------------------------------------

import React from 'react';
import { Text, View } from 'react-native';

let message = 'hennko-mae'

const Rakugaki = (props) => {
  const [array, setArray] = useState('');
  return(
    <TouchalbeOpacity onPress={() => {
      message = 'hennko-go'
    }}>
        <Text>{message}</Text>
    </TouchalbeOpacity>
);}

export default Rakugaki;


