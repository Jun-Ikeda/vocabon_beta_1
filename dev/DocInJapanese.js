import React from 'react';

import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { atom, useRecoilState } from 'recoil';
import Color from '../src/config/Color';
import { header } from '../src/config/Const';

export const currentRouteState = atom({
  key: 'currentRouteState',
  default: '',
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white1,
    paddingTop: header.paddingTop,
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
  // const [visibleParagraph, setVisibleParagraph] = useState('');
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
          <Text>単語帳を作成、編集、再生</Text>
          <Text>①　まずは右下の＋ボタンからCreate Deckというタイトルの画面を開く</Text>
          <Text>②　単語帳のタイトルと、単語(Term)と定義(Definition)の言語を決める。単語帳の説明をDescriptionに書いて付け加えることができる。</Text>
          <Text>③　☑ボタンを押して単語帳を保存する。作成した単語帳はホーム画面に追加されるので、タップする</Text>
          <Text>④　単語帳のメニューが開くので、Editを押して遷移する</Text>
          <Text>⑤　画面右下のプラスボタンを押し、新規単語の追加をする</Text>
          <Text>※　一つの単語に複数の定義、例文、同義語などを追加する場合、入力ボックス右のボタンを押すか、スペースなどで区切ることができる</Text>
          <Text>⑥　追加が完了したら、画面下のSaveボタンを押す。</Text>
          <Text>⑦　メニューに戻ったらPlayを押し、Optionsという画面でDefaultを選択して画面下のPlayを押す</Text>
          <Text>⑧　タップして裏返し、スワイプで分からなかった単語を分類する</Text>
          <Text>⑨　再生が終了すると、ボタンが出現し、結果が表示される。Menuを押すと再生が終了する。</Text>
        </View>
        <View style={style.h1Container}>
          <Text style={style.h1}>2. Home</Text>
          <Text>作成した単語帳は全てここで見ることができる。新しく作成した単語帳は古いものの右側に追加されていく</Text>
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
