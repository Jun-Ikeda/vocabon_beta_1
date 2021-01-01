import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

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
    height: 60,
    lineHeight: 60,
    fontSize: 20,
  },
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
  const { width } = props;
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
      <View style={style.menu} key={item.label.toLowerCase()}>
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
      {renderMenu()}
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
