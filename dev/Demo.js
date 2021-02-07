/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
} from 'react-native';
import RangeSlider from 'react-native-range-slider-expo';
// import {  } from 'react-native-paper';
import lodash from 'lodash';
import { Button } from 'react-native-paper';
import SvgQRCode from 'react-native-qrcode-svg';
import TagsInput from '../src/components/TagsInput';
import VocabList from '../src/components/deck/vocab/VocabList';
import ProfileIcon from '../src/components/user/profileicon/ProfileIcon';
import Color, { PastelColors } from '../src/config/Color';
import { decksContent } from '../src/config/deck/Deck';
import DemoBarCodeScanner from './DemoBarCodeScanner';
// import Icon from '../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: mainColor,
  },
  // textInput: {
  //   height: 40,
  //   borderColor: Color.background2,
  //   borderWidth: 1,
  //   marginTop: 8,
  //   borderRadius: 5,
  //   alignSelf: 'stretch',
  //   padding: 3,
  // },
  taginput: {
    // flex: 1,
  },
  tag: {
    backgroundColor: Color.font1,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  tagText: {
    // color: mainColor,
  },
  deleteIcon: {
    color: Color.font5,
    fontSize: 25,
  },
});

const Demo = (props) => (
  <View style={{
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    paddingTop: 200,
    backgroundColor: Color.defaultBackground,
  }}
  >
    {/* {renderProfileIcon()} */}
    {/* {renderVocabList()} */}
    {/* {renderRangeBar()} */}
    {/* {renderSearchFlatList()} */}
    {/* {renderTagsInput()} */}
    {/* {qrcode()} */}
    <DemoBarCodeScanner />
  </View>
);

export default Demo;

const renderTagsInput = () => {
  const [tags, setTags] = useState({ tag: '', tagsArray: [] });
  let tagsinput = {};

  return (
    <View style={style.container}>
      <Button onPress={() => tagsinput.createNewTag()}>Push</Button>
      <TagsInput
        updateState={(state) => setTags(state)}
        tags={tags}
        placeholder="Tags..."
        // label="Press space to add a tag"
        labelStyle={{ color: Color.gray1 }}
        leftElementContainerStyle={{ marginLeft: 3 }}
        containerStyle={style.taginput}
        inputContainerStyle={style.textInput}
        keysForTagsArray={['.']}
        autoCorrect={false}
        tagStyle={style.tag}
        ref={(tagsinputRef) => { tagsinput = tagsinputRef; }}
        tagTextStyle={style.tagText}
        pushButtonVisible
      />
    </View>
  );
};

const renderVocabList = () => {
  const [expandVocabIDs, setExpandVocabIDs] = useState([]);
  const id = 'xn>EfhY:2*';
  // const expandVocabIDs = ['qIDjbgc-', 'MdmRNj0Y'];
  // const accountContent = account.content?.[id] ?? { marks: {}, play: [], bookmark: false };
  return (
    <VocabList
      content={decksContent[id]}
      // itemVisible={{
      //   term: true, definition: true, exampleD: true, exampleT: true, synonym: true,
      // }}
      itemVisible={(vocab) => ({ term: true, definition: true, synonym: expandVocabIDs.includes(vocab.key) })}
      // labelVisible
      // renderCard={({ item }) => <Text>{item.value.term}</Text>}
      // onPressCard={(vocab) => func.alertConsole(vocab.value.term)}
      state={[expandVocabIDs, setExpandVocabIDs]}
      // renderCardRight={(vocab) => (
      //   <View style={{ padding: 10, backgroundColor: 'skyblue' }}>
      //     <Text>{accountContent.marks[vocab.key].length}</Text>
      //   </View>
      // )}
      itemStyle={{
        term: { color: 'yellow' },
        synonym: { fontSize: 30 },
      }}
    />
  );
};

const renderProfileIcon = () => PastelColors.map((color) => (
  <ProfileIcon char="V" color={color} onPress={() => console.log({ color })} />
));

const renderRangeBar = () => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [value, setValue] = useState(0);
  return (
    <View style={styles.container}>
      <View>
        <RangeSlider
          min={5}
          max={25}
          fromValueOnChange={(value) => setFromValue(value)}
          toValueOnChange={(value) => setToValue(value)}
          initialFromValue={11}
        />
        <Text>
          from value:
          {fromValue}
        </Text>
        <Text>
          to value:
          {toValue}
        </Text>
      </View>
      <View>
        <Slider
          min={0}
          max={40}
          step={4}
          valueOnChange={(value) => setValue(value)}
          initialValue={12}
          knobColor="red"
          valueLabelsBackgroundColor="black"
          inRangeBarColor="purple"
          outOfRangeBarColor="orange"
        />
        <Text>
          value:
          {value}
        </Text>
      </View>
    </View>
  );
};

const qrcode = () => {
  const [qrvisible, setQRvisible] = useState(false);
  return (
    <View>
      <Button onPress={() => setQRvisible(true)}>AAA</Button>
      <SvgQRCode value="https://qiita.com/jigengineer/items/00bbfa10defc0c2f2fad" />
    </View>
  );
};

const object = {
  'qy%nQmid': {
    term: 'apple',
    definition: ['リンゴ', 'アップル'],
    synonym: [],
    antonym: ['Microsoft', 'Google', 'Federal Government', 'Epic Games'],
    prefix: [],
    suffix: [],
    exampleT: ['I hate Apple'],
    exampleD: ['私はアップル社が嫌いです'],
    cf: ['grape', 'banana', 'facebook', 'twitter', 'instagram', 'huawei'],
  },
  '>pA|x-V<': {
    term: 'hippopotomonstrosesquipedaliophobia',
    definition: ['長い単語恐怖症'],
    synonym: [],
    antonym: ['short tale lover'],
    prefix: [],
    suffix: ['phobia'],
    exampleT: ['suffer from hippopotomonstrosesquipedaliophobia'],
    exampleD: ['長い単語恐怖症にさらされている'],
    cf: ['neophobia', 'technophobia', 'anthropophobia'],
  },
  lnz24x4C: {
    term: 'follow',
    definition: ['～（の後）に続く'],
    synonym: ['come after', 'go after', 'pursue'],
    antonym: ['lead', 'flout'],
    prefix: [],
    suffix: [],
    exampleT: ['Follow me home if you dare to.'],
    exampleD: ['あなたは彼に従うべきである'],
    cf: ['escort', 'attend'],
  },
  '6:LSsg9s': {
    term: 'consider',
    definition: ['～考慮する'],
    synonym: ['comtemplate', 'review'],
    antonym: ['ignore'],
    prefix: [],
    suffix: [],
    exampleT: ['all things considered'],
    exampleD: ['全ての事象を考慮した'],
    cf: [],
  },
};

const renderSearchFlatList = () => {
  const array = Object.values(object);
  const array2 = array.filter((vocab) => vocab.term.length < 7);
  const [query, setQuery] = useState('');
  const [data, setData] = useState(array);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const newData = lodash.filter(array, (vocab) => vocab.term.includes(formattedQuery));
    setData(newData);
    setQuery(text);
    // this.setState({ data, query: text });
  };

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextInput
        // autoCapitalize="none"
        // autoCorrect={false}
        onChangeText={handleSearch}
        // status="info"
        placeholder="Search"
        style={{
          borderRadius: 25,
          borderColor: '#333',
          backgroundColor: '#fff',
        }}
        textStyle={{ color: '#000' }}
        // clearButtonMode="always"
      />
    </View>
  );
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Text>{item.term}</Text>
      )}
      keyExtractor={((item) => item.term.toLowerCase())}
      ListHeaderComponent={renderHeader()}
    />
  );
};

const styles = StyleSheet.create({});
