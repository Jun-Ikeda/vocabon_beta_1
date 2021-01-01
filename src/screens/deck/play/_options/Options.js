import React, { Component, useState } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { RadioButton, Button, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import NumericInput from 'react-native-numeric-input';
import Color from '../../../../config/Color';

const MarksMax = 10;
const ExamplesMax = 3;
const SynonymsMax = 5;
const AntonymsMax = 5;

const style = StyleSheet.create({
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',

  },
});

/**
 * Options Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('options', { deckID });
 * props: { navigation, route }
 * recoil: {}
 * state: { ... }
 *
 * ```
 */

const Options = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // state
  const [mode, setMode] = useState('default');
  const [checked, setChecked] = useState(false);
  const [marksMin, setMarksMin] = useState(0);
  const [marksMax, setMarksMax] = useState(MarksMax);
  const [examplesMin, setExamplesMin] = useState(0);
  const [examplesMax, setExamplesMax] = useState(ExamplesMax);
  const [synonymsMin, setSynonymsMin] = useState(0);
  const [synonymsMax, setSynonymsMax] = useState(SynonymsMax);
  const [antonymsMin, setAntonymsMin] = useState(0);
  const [antonymsMax, setAntonymsMax] = useState(AntonymsMax);

  const renderCustomSettings = () => {
    const items = [
      {
        title: 'Marks',
        range: [0, MarksMax],
        valueMin: marksMin,
        valueMax: marksMax,
        setStateMin: setMarksMin,
        setStateMax: setMarksMax,
      },
      {
        title: 'Examples',
        range: [0, ExamplesMax],
        valueMin: examplesMin,
        valueMax: examplesMax,
        setStateMin: setExamplesMin,
        setStateMax: setExamplesMax,
      },
      {
        title: 'Synonyms',
        range: [0, SynonymsMax],
        valueMin: synonymsMin,
        valueMax: synonymsMax,
        setStateMin: setSynonymsMin,
        setStateMax: setSynonymsMax,
      },
      {
        title: 'Antonyms',
        range: [0, AntonymsMax],
        valueMin: antonymsMin,
        valueMax: antonymsMax,
        setStateMin: setAntonymsMin,
        setStateMax: setAntonymsMax,
      },
    ];
    if (mode === 'custom') {
      return (
        <View>
          <Text>Sort by ...</Text>
          {items.map((item) => (
            <View key={item.title.toLowerCase()}>
              <Text style={{ justifyContent: 'center' }}>{item.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={style.counterBox}>
                  <Text style={{ padding: 30 }}>Min</Text>
                  <NumericInput
                    type="plus-minus"
                    value={item.valueMin}
                    minValue={item.range[0]}
                    maxValue={item.valueMax}
                    onChange={item.setStateMin}
                    rounded
                    rightButtonBackgroundColor={Color.green3}
                    leftButtonBackgroundColor={Color.green3}
                  />
                </View>
                <View style={style.counterBox}>
                  <Text style={{ padding: 30 }}>Max</Text>
                  <NumericInput
                    type="plus-minus"
                    value={item.valueMax}
                    minValue={item.valueMin}
                    maxValue={item.range[1]}
                    onChange={item.setStateMax}
                    rounded
                    rightButtonBackgroundColor={Color.green3}
                    leftButtonBackgroundColor={Color.green3}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderRadioButtons = () => (
    <RadioButton.Group
      onValueChange={setMode}
      value={mode}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value="default" style={{ right: 0, left: 0 }} />
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Default</Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="custom" style={{ right: 0, left: 0 }} />
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>Custom</Text>
        </View>
        {renderCustomSettings()}
      </View>
    </RadioButton.Group>
  );

  return (
    <View>
      {renderRadioButtons()}
      <Button mode="contained" onPress={() => navigation.navigate('play', { deckID })}>
        Start
      </Button>
    </View>
  );
};

Options.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Options;

/* const Options = (props) => {
  // props
  const { navigation, route: { params: { id } } } = props;
  // state
  const [mode, setMode] = useState('default');
  const [checked, setChecked] = useState(false);
  const [marks, setMarks] = useState({ min: 0, max: MarksMax });
  const [examples, setExamples] = useState({ min: 0, max: ExamplesMax });
  const [synonyms, setSynonyms] = useState({ min: 0, max: SynonymsMax });
  const [antonyms, setAntonyms] = useState({ min: 0, max: AntonymsMax });

  const renderCustomSettings = () => {
    const items = [
      {
        title: 'Marks',
        range: [0, MarksMax],
        value: marks,
        setState: setMarks,
      },
      {
        title: 'Examples',
        range: [0, ExamplesMax],
        value: examples,
        setState: setExamples,
      },
      {
        title: 'Synonyms',
        range: [0, SynonymsMax],
        value: synonyms,
        setState: setSynonyms,
      },
      {
        title: 'Antonyms',
        range: [0, AntonymsMax],
        value: antonyms,
        setState: setAntonyms,
      },
    ];
    if (mode === 'custom') {
      return (
        <View>
          <Text>Sort by ...</Text>
          {items.map((item) => (
            <View key={item.title.toLowerCase()}>
              <Text style={{ justifyContent: 'center' }}>{item.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={style.counterBox}>
                  <Text style={{ padding: 30 }}>Min</Text>
                  <NumericInput
                    type="plus-minus"
                    value={item.value.min}
                    minValue={item.range[0]}
                    maxValue={item.range[1]}
                    onChange={(min) => {
                      if (min > item.value.max) {
                        item.setState({ min, max: min });
                      } else {
                        item.setState({ ...item.value, min });
                      }
                    }}
                    rounded
                    rightButtonBackgroundColor={Color.green3}
                    leftButtonBackgroundColor={Color.green3}
                  />
                </View>
                <View style={style.counterBox}>
                  <Text style={{ padding: 30 }}>Max</Text>
                  <NumericInput
                    type="plus-minus"
                    value={item.value.min}
                    minValue={item.range[0]}
                    maxValue={item.range[1]}
                    onChange={(max) => {
                      if (max < item.value.min) {
                        item.setState({ min: max, max });
                      } else {
                        item.setState({ ...item.value, max });
                      }
                    }}
                    rounded
                    rightButtonBackgroundColor={Color.green3}
                    leftButtonBackgroundColor={Color.green3}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderRadioButtons = () => (
    <RadioButton.Group
      onValueChange={setMode}
      value={mode}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value="default" style={{ right: 0, left: 0 }} />
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Default</Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="custom" style={{ right: 0, left: 0 }} />
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>Custom</Text>
        </View>
        {renderCustomSettings()}
      </View>
    </RadioButton.Group>
  );

  return (
    <View>
      {renderRadioButtons()}
      <Button mode="contained" onPress={() => navigation.navigate('play', { id })}>
        Start
      </Button>
    </View>
  );
};const Options = (props) => {
  // props
  const { navigation, route: { params: { id } } } = props;
  // state
  const [mode, setMode] = useState('default');
  const [checked, setChecked] = useState(false);
  const [marksMin, setMarksMin] = useState(0);
  const [marksMax, setMarksMax] = useState(MarksMax);
  const [examplesMin, setExamplesMin] = useState(0);
  const [examplesMax, setExamplesMax] = useState(ExamplesMax);
  const [synonymsMin, setSynonymsMin] = useState(0);
  const [synonymsMax, setSynonymsMax] = useState(SynonymsMax);
  const [antonymsMin, setAntonymsMin] = useState(0);
  const [antonymsMax, setAntonymsMax] = useState(AntonymsMax);

  const renderCustomSettings = () => {
    const items = [
      {
        title: 'Marks',
        range: [0, MarksMax],
        valueMin: marksMin,
        valueMax: marksMax,
        setStateMin: setMarksMin,
        setStateMax: setMarksMax,
      },
      {
        title: 'Examples',
        range: [0, ExamplesMax],
        valueMin: examplesMin,
        valueMax: examplesMax,
        setStateMin: setExamplesMin,
        setStateMax: setExamplesMax,
      },
      {
        title: 'Synonyms',
        range: [0, SynonymsMax],
        valueMin: synonymsMin,
        valueMax: synonymsMax,
        setStateMin: setSynonymsMin,
        setStateMax: setSynonymsMax,
      },
      {
        title: 'Antonyms',
        range: [0, AntonymsMax],
        valueMin: antonymsMin,
        valueMax: antonymsMax,
        setStateMin: setAntonymsMin,
        setStateMax: setAntonymsMax,
      },
    ];
    if (mode === 'custom') {
      return (
        <View>
          <Text>Sort by ...</Text>
          {items.map((item) => (
            <View key={item.title.toLowerCase()}>
              <Text style={{ justifyContent: 'center' }}>{item.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={style.counterBox}>
                  <Text style={{ padding: 30 }}>Min</Text>
                  <NumericInput
                    type="plus-minus"
                    value={item.valueMin}
                    minValue={item.range[0]}
                    maxValue={item.valueMax}
                    onChange={item.setStateMin}
                    rounded
                    rightButtonBackgroundColor={Color.green3}
                    leftButtonBackgroundColor={Color.green3}
                  />
                </View>
                <View style={style.counterBox}>
                  <Text style={{ padding: 30 }}>Max</Text>
                  <NumericInput
                    type="plus-minus"
                    value={item.valueMax}
                    minValue={item.valueMin}
                    maxValue={item.range[1]}
                    onChange={item.setStateMax}
                    rounded
                    rightButtonBackgroundColor={Color.green3}
                    leftButtonBackgroundColor={Color.green3}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderRadioButtons = () => (
    <RadioButton.Group
      onValueChange={setMode}
      value={mode}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value="default" style={{ right: 0, left: 0 }} />
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Default</Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="custom" style={{ right: 0, left: 0 }} />
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>Custom</Text>
        </View>
        {renderCustomSettings()}
      </View>
    </RadioButton.Group>
  );

  return (
    <View>
      {renderRadioButtons()}
      <Button mode="contained" onPress={() => navigation.navigate('play', { id })}>
        Start
      </Button>
    </View>
  );
}; */

/*
<View key={item.title.toLowerCase()}>
<View style={style.counterBox}>
  <Text style={{ padding: 30 }}>Example</Text>
  <NumericInput
   value={item.valueMax}
   onChange={item.setStateMax}
   totalWidth={240}
   totalHeight={50}
   iconSize={25}
   step={1.5}
   valueType="real"
   rounded
   textColor="#B0228C"
   iconStyle={{ color: 'white' }}
   rightButtonBackgroundColor="#EA3788"
   leftButtonBackgroundColor="#E56B70"
  />
</View>
class PlayOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'default',
      checked: false,
      marksMin: 0,
      marksMax: MarksMax,
      examplesMin: 0,
      examplesMax: ExamplesMax,
      synonymsMin: 0,
      synonymsMax: SynonymsMax,
      antonymsMin: 0,
      antonymsMax: AntonymsMax,
    };
  }

  // handleInputChange = (text) => {
  //   const { text } = this.state;
  //   if (/^\d+$/.test(text)) {
  //     this.setState({
  //       text: text
  //     });
  //   }
  // }

  renderHeader = () => {
    const { navigation } = this.props;
    return (
      <HeaderWithBack navigation={navigation} title="Options" />
    );
  }

  renderRadioButtons = () => {
    const { mode } = this.state;
    const { checked } = this.state;
    return (
      <RadioButton.Group
        onValueChange={(newMode) => this.setState({ mode: newMode })}
        value={mode}
        checked1={checked}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="default" style={{ right: 0, left: 0 }} />
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>Default</Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="custom" style={{ right: 0, left: 0 }} />
            <Text style={{ fontSize: 20, alignSelf: 'center' }}>Custom</Text>
          </View>
          {this.renderCustomSettings()}
        </View>
      </RadioButton.Group>
    );
  }

  renderCustomSettings = () => {
    const {
      mode, marksMin,
      marksMax,
      examplesMin,
      examplesMax,
      synonymsMin,
      synonymsMax,
      antonymsMin,
      antonymsMax,

    } = this.state;
    const items = [
      {
        title: 'Marks',
        max: MarksMax,
        valueMin: marksMin,
        valueMax: marksMax,
        setStateMin: (newMarksMin) => this.setState({ marksMin: newMarksMin }),
        setStateMax: (newMarksMax) => this.setState({ marksMax: newMarksMax }),
      },
      {
        title: 'Examples',
        max: ExamplesMax,
        valueMin: examplesMin,
        valueMax: examplesMax,
        setStateMin: (newExamplesMin) => this.setState({ examplesMin: newExamplesMin }),
        setStateMax: (newExamplesMax) => this.setState({ examplesMax: newExamplesMax }),
      },
      {
        title: 'Synonyms',
        max: SynonymsMax,
        valueMin: synonymsMin,
        valueMax: synonymsMax,
        setStateMin: (newSynonymsMin) => this.setState({ synonymsMin: newSynonymsMin }),
        setStateMax: (newSynonymsMax) => this.setState({ synonymsMax: newSynonymsMax }),
      },
      {
        title: 'Antonyms',
        max: AntonymsMax,
        valueMin: antonymsMin,
        valueMax: antonymsMax,
        setStateMin: (newAntonymsMin) => this.setState({ antonymsMin: newAntonymsMin }),
        setStateMax: (newAntonymsMax) => this.setState({ antonymsMax: newAntonymsMax }),
      },
    ];
    if (mode === 'custom') {
      return (
        <View>
          <Text>Sort by ...</Text>
          {items.map((item) => (
            <View style={{ }}>
              <Text style={{ justifyContent: 'center' }}>{item.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={style.counterBox}>
                  <Text style={{ padding: 30 }}>Min</Text>
                  <NumericInput
                    type="up-down"
                    value={item.valueMin}
                    minValue={0}
                    maxValue={item.valueMax}
                    onChange={item.setStateMin}
                  />
                </View>
                <View style={style.counterBox}>
                  <Text style={{ padding: 30 }}>Max</Text>
                  <NumericInput
                    type="up-down"
                    value={item.valueMax}
                    minValue={item.valueMin}
                    maxValue={item.max}
                    onChange={item.setStateMax}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    }
    return null;
  }

  render() {
    const { value } = this.state;
    return (
      <View>
        {this.renderHeader()}
        {this.renderRadioButtons()}
        <Button mode="contained" onPress={() => alert(value)}>
          Start
        </Button>
      </View>
    );
  }
} */

/*
const { myNumber, value } = this.state;
    const onChangeText = (text) => {
      let newText = '';
      const numbers = '0123456789';
      for (let i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
          newText += text[i];
        } else {
          your call back function
          alert('please enter numbers only');
        }
      }
      this.setState({ myNumber: newText });
    };
    if (value === 'custom') {
      return (
        <View>
          <TextInput
            placeholder="Enter a value that determine the range"
            keyboardType="numeric"
            onChangeText={onChangeText}
            value={myNumber}
            maxLength={10}
          />
          <CheckBox
            checkedIcon="dot-circsle-o"
            uncheckedIcon="circle-o"
            title="checkbox 1"
            checkedColor="red"
            checked={checked}
            onPress={() => this.setState({ checked: !checked })}
          />
          <View>
            <CheckBox />
            <Text style={{ marginTop: 5 }}> this is checkbox</Text>
          </View>
          <View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
          </View>
          );
        }
        return null;
*/

/*
間違えた回数で絞り込み 0~37
意味が何個あるか 1~4
例文の数 0~3
synonymの数
antonymの数
cfの数
suffixがあるか
prefixがあるか
*/

/* class PlayOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
    };
  }

  render() {
    const { checked } = this.state;
    return (
      <View>
        <Text> PlayOption </Text>
        <RadioButton
          value="first"
          status={checked === 0 ? 'checked' : 'unchecked'}
          onPress={() => this.setState({ checked: 0 })}
        />
        <RadioButton
          value="second"
          status={checked === 1 ? 'checked' : 'unchecked'}
          onPress={() => this.setState({ checked: 1 })}
        />
      </View>
    );
  }
} */

/*
標準再生
範囲指定再生
間違えた回数によって...みたいな

  renderCustomItemsButton = () => {
    const { value } = this.state;
    const { checked } = this.state;
    if (value === 'custom') {
      return (
        <View>
          <RadioButton.Group
            onValueChange={(newValue) => this.setState({ value: newValue })}
            value={value}
            checked1={checked}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="nigateonly" style={{ right: 0, left: 0 }} />
              <Text style={{ fontSyze: 20, alignSelf: 'center' }}>Default</Text>
            </View>
          </RadioButton.Group>
        </View>
      );
    }
  }

this.state = {
    checked: 0
}

<RadioButton
    value="first"
    status={ checked === 0 ? 'checked' : 'unchecked' }
    onPress={() => this.setState({ checked: 0 })}
/>
<RadioButton
    value="second"
    status={ checked === 1 ? 'checked' : 'unchecked' }
    onPress={() => this.setState({ checked: 1 })}
/>

this.state = {
  text: ''
}

const { text } = this.state;

<TextInput
  value={text}
  onChangeText={newText => this.setState({ text: newText })}
/>
*/
