import React, { useState } from 'react';

import {
  Platform,
  ScrollView,
  StatusBar, StyleSheet, Text, View,
} from 'react-native';
import { atom, useRecoilState } from 'recoil';
import Color from '../src/config/Color';

export const currentRouteState = atom({
  key: 'currentRouteState',
  default: '',
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white1,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  document: {
    padding: 15,
  },
  title: {
    fontSize: 32,
  },
  h1: {
    fontSize: 26,
  },
  h1Container: {
    padding: 10,
  },
  h2: {
    fontSize: 22,
  },
  h2Container: {
    padding: 5,
  },
  footerText: {
    fontSize: 14,
    color: Color.gray2,
  },
});

const DocInJapanese = () => {
  const [visibleParagraph, setVisibleParagraph] = useState('');
  const currentRoute = useRecoilState(currentRouteState);

  const menuContents = [
    { title: '(i) Play', route: 'play' },
    { title: '(ii) Analyze', route: 'analyze' },
    { title: '(iii) Edit', route: 'edit' },
    { title: '(iv) Property', route: 'property' },
    { title: '(v) Import', route: 'import' },
    { title: '(vi) Export', route: 'export' },
    { title: '(vii) Other', route: null },
  ];

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.document}>
        <Text style={style.title}>{currentRoute}</Text>
        <Text style={style.title}>校内限定公開用説明書</Text>
        <View style={style.h1Container}>
          <Text style={style.h1}>1. 基本操作</Text>
          <Text>①　単語帳を作成、編集する：まずは右下の＋ボタンからCreate Deckというタイトルの画面を開く</Text>
          <Text>②　</Text>
        </View>
        <View style={style.h1Container}>
          <Text style={style.h1}>2. Home</Text>
        </View>
        <View style={style.h1Container}>
          <Text style={style.h1}>3. Menu</Text>
          {menuContents.map((content) => (
            <View style={style.h2Container}>
              <Text style={style.h2}>{content.title}</Text>
            </View>
          ))}
        </View>
        <Text style={style.footerText}>{'開発者:\n池田隼、IちかわDいすけ、IわさきSんぺい、OくだYうと、KちやJんせい、鈴木柾孝'}</Text>
      </ScrollView>
    </View>
  );
};

export default DocInJapanese;
