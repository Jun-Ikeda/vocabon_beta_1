import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 一個のファイルにつき一個しかできない
export default classdanostringdanoobjectdano;
// 何個でも
export { nanika, nandemo, ii, nannkodemo };

import NanikaDefaultDeExportSaretaYatsu, { nanika, nandemo, ii, nannkodemo } from 'soutaipasu';

const arrowfunction = (a, b) => {
  const sum = a + b;
  return sum;
};

const style = StyleSheet.create({
  text: {
    : 20
  }
})

// fucntion addition(a, b) {
//   return a + b;
// }

const k = [1, 2, 3, 4, 5]; // 再代入不可
var i = 'aifdoaji'; // 
let j = 0; // 再代入可

const addition = (a,b) => {
  return a + b;
}

const answer = addition(3,4)

export default class Rakugaki extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Header renderTitle={() => {
          return <Text>Kore ga taitoru</Text>
        }} />
        <Text style={{ fontSize: 20 }}> Rakugaki </Text>
      </View>
    );
  }
}

/* 
string 文字列
const message = 'Hi, good morning';

number 数字
const i = 0;

array 配列
const hairetsu = [1, 2, 3, 'どんな', 'データも', '入れられる'];
hairetu[0] <- 0番目のデータ（この場合は1）が出てくる
hairetu[5] <- '入れられる'が出てくる
const sum = hairetsu[0] + hairetsu[2]; <- ４になる
*データの再入力
hairetsu[5] = '入れられます'; //とすると
[1, 2, 3, 'どんな', 'データも', '入れられます'] //になる
*データの追加
hairetsu.push('!')
[1, 2, 3, 'どんな', 'データも', '入れられる', '!']
hairetsu.shif(0)
[0, 1, 2, 3, 'どんな', 'データも', '入れられる']

object オブジェクト
const obj = { fname: 'Jun', lname: 'Ikeda', age: 16 }
*取り出し
obj.fname <- 'Jun'
console.log(obj.fname) <- コンソールにJunが表示される
*再代入
obj.fname = 'Hayato';
obj.age = 0;
obj['age'] = 0;
*データの追加
obj.number = 5403;
{ fname: 'Jun', lname: 'Ikeda', age: 16, number: 5403 }

objectとarrayの変換
Object.values(obj) <- ['Jun', 'Ikeda', 16];
Object.keys(obj) <- ['fname', 'lname', 'age'];

*/
クラスコンポーネント（現在）
<Nantoka fuga="" />
class Nantoka extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoge: ''
    }
  }

  renderItem = () => {
    reafdf
  }

  render() {
    const {hoge} = this.state;
    return (
      <View>
        <Button onPress={() => this.setState({hoge: 'aaa'})} />
        <Text>aaa</Text>
        {this.renderItem()}
      </View>
    )
  }
}

export default Nantoka;
// --------------------------------------
関数コンポーネント (クラスじゃないからthisがない)

<Kantoka honyarara='idajfidaof' />
navigation.navigate('kantoka', {id:  'djaofdji'})

import React, {useState} from 'react'

export const decksState = atom({
  key: 'decksState',
  default: {}
})

const Kantoka = (props) => {
  const [text, setText] = useState('shokichi')
  const decks = useRecoilValue(decksState)
  const {navigation, route } = props;
  const id = route.params.id;

  const renderItem = () => {
    hidaofjdeaio
  }

  return (
    <View>
      <Button onPress={()=>setText('henkougo')} />
      <Text>{text}</Text>
    </View>
  )
}

export default Kantoka

// ----------------------------------------------------
クラスコンポーネント（ファリサイ派）-古い方
class Pharisee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'shokichi'
    }
  }

  render() {
    const { nanntokakantoka } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text>This is Pharisee screen</Text>
        <Button onPress={() => this.setState({ text: 'henko-go' })} />
      </View>
    )
  }
}

export default Pharisee;

関数コンポーネント（原始キリスト教）
const Christianity = (props) => {
  // props
  const { nanntokakantoka } = props;
  // state
  const [text, setText] = useState('shokiti');

  const renderButton = () => {
    return (
      <Button onPress={() => setText('henko-go')} />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>This is Pharisee screen</Text>
      <Text>{text}</Text>
      {renderButton()}
    </View>
  )
}

export defalut Christianity



