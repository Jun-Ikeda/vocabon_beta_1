import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity, Text,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRecoilState, useSetRecoilState } from 'recoil';
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
    // alignItems: 'center',
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
    paddingHorizontal: 15,
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    // marginBottom: 'auto',
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 16,
    color: Color.white1,
    // fontWeight: 'bold',
  },
});

/**
 * EditPopUp Component in Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <EditPopUp
 *    setState={(state) => this.setState(state)}
 *    deleteVisible={true}
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
  const { width, setVisible } = props;
  // recoil
  const [recoilTerm, setRecoilTerm] = useRecoilState(termState);
  const [term, setTerm] = useState(recoilTerm);
  const [recoilDefinition, setRecoilDefinition] = useRecoilState(definitionState);
  const [definition, setDefinition] = useState(recoilDefinition);
  const [recoilSynonym, setRecoilSynonym] = useRecoilState(synonymState);
  const [synonym, setSynonym] = useState(recoilSynonym);
  const [recoilAntonym, setRecoilAntonym] = useRecoilState(antonymState);
  const [antonym, setAntonym] = useState(recoilAntonym);
  const [recoilPrefix, setRecoilPrefix] = useRecoilState(prefixState);
  const [prefix, setPrefix] = useState(recoilPrefix);
  const [recoilSuffix, setRecoilSuffix] = useRecoilState(suffixState);
  const [suffix, setSuffix] = useState(recoilSuffix);
  const [recoilExampleT, setRecoilExampleT] = useRecoilState(exampleTState);
  const [exampleT, setExampleT] = useState(recoilExampleT);
  const [recoilExampleD, setRecoilExampleD] = useRecoilState(exampleDState);
  const [exampleD, setExampleD] = useState(recoilExampleD);
  const [recoilCf, setRecoilCf] = useRecoilState(cfState);
  const [cf, setCf] = useState(recoilCf);

  const renderMenu = () => {
    const items = [
      {
        label: 'Term',
        value: term,
        setState: (newTerm) => {
          setRecoilTerm(newTerm);
          setTerm(newTerm);
        },
      },
      {
        label: 'Definition',
        value: definition,
        setState: (newDefinition) => {
          setRecoilDefinition(newDefinition);
          setDefinition(newDefinition);
        },
      },
      {
        label: 'Synonym',
        value: synonym,
        setState: (newSynonym) => {
          setRecoilSynonym(newSynonym);
          setSynonym(newSynonym);
        },
      },
      {
        label: 'Antonym',
        value: antonym,
        setState: (newAntonym) => {
          setRecoilAntonym(newAntonym);
          setAntonym(newAntonym);
        },
      },
      {
        label: 'Prefix',
        value: prefix,
        setState: (newPrefix) => {
          setRecoilPrefix(newPrefix);
          setPrefix(newPrefix);
        },
      },
      {
        label: 'Suffix',
        value: suffix,
        setState: (newSuffix) => {
          setRecoilSuffix(newSuffix);
          setSuffix(newSuffix);
        },
      },
      {
        label: 'ExampleT',
        value: exampleT,
        setState: (newExampleT) => {
          setRecoilExampleT(newExampleT);
          setExampleT(newExampleT);
        },
      },
      {
        label: 'ExampleD',
        value: exampleD,
        setState: (newExampleD) => {
          setRecoilExampleD(newExampleD);
          setExampleD(newExampleD);
        },
      },
      {
        label: 'cf.',
        value: cf,
        setState: (newCf) => {
          setRecoilCf(newCf);
          setCf(newCf);
        },
      },
    ];
    return items.map((item) => (
      <View key={item.label.toLowerCase()}>
        <TextInput
          label={item.label}
          value={item.value}
          onChangeText={item.setState}
          style={[style.input, { width: width - 30 }]}
          mode="outlined"
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
            style={[style.button, { marginRight: 40 }]}
            onPress={() => setVisible(false)}
          >
            <Text style={style.text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.button, { marginLeft: 40 }]}
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
