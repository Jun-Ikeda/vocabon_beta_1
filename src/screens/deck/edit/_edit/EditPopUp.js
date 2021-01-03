import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Color from '../../../../config/Color';

import {
  termState,
  definitionState,
  synonymState,
  antonymState,
  prefixState,
  suffixState,
  exampleTState,
  exampleDState,
  cfState,
} from './Edit';

const style = StyleSheet.create({
  menu: {
    paddingVertical: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 30,
    lineHeight: 30,
    fontSize: 18,
  },
  button: {
    // width: 180,
    flex: 1,
    height: 25,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Color.green2,
    // marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    // fontWeight: 'bold',
  }
});

/**
 * EditPopUp Component in Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <EditPopUp
 *    setState={(state) => this.setState(state)}
 *    deleteVisible={ture}
 * />
 * props: { width }
 * recoil: {
 *   termState,
 *   definitionState,
 *   synonymState,
 *   antonymState,
 *   prefixState,
 *   suffixState,
 *   exampleTState,
 *   exampleDState,
 *   cfState, }
 * state: {}
 *
 * ```
 */

const EditPopUp = (props) => {
  // props
  const { width,setVisible } = props;
  // recoil
  const [term, setTerm] = useRecoilState(termState);
  const [definition, setDefinition] = useRecoilState(definitionState);
  const [synonym, setSynonym] = useRecoilState(synonymState);
  const [antonym, setAntonym] = useRecoilState(antonymState);
  const [prefix, setPrefix] = useRecoilState(prefixState);
  const [suffix, setSuffix] = useRecoilState(suffixState);
  const [exampleT, setExampleT] = useRecoilState(exampleTState);
  const [exampleD, setExampleD] = useRecoilState(exampleDState);
  const [cf, setCf] = useRecoilState(cfState);

  const renderMenu = () => {
    const items = [
      {
        label: 'Term',
        value: term,
        setState: (newTerm) => setTerm(newTerm),
      },
      {
        label: 'Definition',
        value: definition,
        setState: (newDefinition) => setDefinition(newDefinition),
      },
      {
        label: 'Synonym',
        value: synonym,
        setState: (newSynonym) => setSynonym(newSynonym),
      },
      {
        label: 'Antonym',
        value: antonym,
        setState: (newAntonym) => setAntonym(newAntonym),
      },
      {
        label: 'Prefix',
        value: prefix,
        setState: (newPrefix) => setPrefix(newPrefix),
      },
      {
        label: 'Suffix',
        value: suffix,
        setState: (newSuffix) => setSuffix(newSuffix),
      },
      {
        label: 'ExampleT',
        value: exampleT,
        setState: (newExampleT) => setExampleT(newExampleT),
      },
      {
        label: 'ExampleD',
        value: exampleD,
        setState: (newExampleD) => setExampleD(newExampleD),
      },
      {
        label: 'cf.',
        value: cf,
        setState: (newCf) => setCf(newCf),
      },
    ];
    return items.map((item) => (
      <View key={item.label.toLowerCase()}>
        <TextInput
          label={item.label}
          value={item.value}
          style={[style.input, { width: width - 30 }]}
          mode="outlined"
          onChangeText={item.setState}
        />
      </View>
    ));
  };
  return (
    <ScrollView>
      <View style={style.menu}>
        {renderMenu()}
        <View style={style.buttons}>
          <TouchableOpacity 
            style={[style.button, { marginRight: 10 }]}
            onPress={() => setVisible(false)}
          >
            <Text style={style.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[style.button, { marginLeft: 10 }]}
            onPress={() => {
              setVisible(false);
              console.log('saved');
            }}
            >
            <Text style={style.text}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

EditPopUp.propTypes = {
  width: PropTypes.number,

};

EditPopUp.defaultProps = {
  width: 0,
};

export default EditPopUp;

// class EditPopUp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   renderMenu = () => {
// const {
//   term, definition, antonym, prefix, suffix, exampleT, exampleD, cf,
//   setState, width,
// } = this.props;
// const items = [
//   {
//     label: 'Term',
//     value: term,
//     setState: (newTerm) => setState({ term: newTerm }),
//   },
//   {
//     label: 'Definition',
//     value: definition,
//     setState: (newDefinition) => setState({ definition: newDefinition }),
//   },
//   {
//     label: 'Antonym',
//     value: antonym,
//     setState: (newAntonym) => setState({ antonym: newAntonym }),
//   },
//   {
//     label: 'Prefix',
//     value: prefix,
//     setState: (newPrefix) => setState({ prefix: newPrefix }),
//   },
//   {
//     label: 'Suffix',
//     value: suffix,
//     setState: (newSuffix) => setState({ suffix: newSuffix }),
//   },
//   {
//     label: 'ExampleT',
//     value: exampleT,
//     setState: (newExampleT) => setState({ exampleT: newExampleT }),
//   },
//   {
//     label: 'ExampleD',
//     value: exampleD,
//     setState: (newExampleD) => setState({ exampleD: newExampleD }),
//   },
//   {
//     label: 'cf.',
//     value: cf,
//     setState: (newCf) => setState({ cf: newCf }),
//   },
// ];
// return items.map((item) => (
//   <View style={style.menu}>
//     <TextInput
//       label={item.label}
//       value={item.value}
//       style={[style.input, { width: width - 30 }]}
//       mode="outlined"
//       onChangeText={item.setState}
//     />
//   </View>
// ));
//   }

//   render() {
//     return this.renderMenu();
//   }
// }
