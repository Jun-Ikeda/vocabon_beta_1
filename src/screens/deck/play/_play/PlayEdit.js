// import React, { useState, useEffect } from 'react';

// import {
//   ScrollView,
//   StyleSheet, TouchableOpacity, View,
// } from 'react-native';
// import PropTypes from 'prop-types';
// import { useRecoilValue } from 'recoil';
// import { Button, TextInput } from 'react-native-paper';

// import Color from '../../../../config/Color';
// import { func } from '../../../../config/Const';
// import { saveDeckContent } from '../../../../config/deck/Deck';

// import Icon from '../../../../components/Icon';
// import PopUpMenu from '../../../../components/popup/PopUpMenu';

// import { onEditVocabIDState } from './PlayDetail';

// const style = StyleSheet.create({
//   edit: {
//     fontSize: 50,
//   },
//   cancelButton: {
//     position: 'absolute',
//     top: -15,
//     right: -15,
//     height: 40,
//     width: 40,
//     borderRadius: 40 / 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Color.gray3,
//   },
//   cancelButtonIcon: {
//     fontSize: 24,
//     color: Color.gray1,
//   },
// });

// const PlayEdit = (props) => {
//   // props
//   const {
//     deckID,
//     isVisible,
//     setIsVisible,
//     content,
//     setContent,
//   } = props;
//   // props
//   const onEditVocabID = useRecoilValue(onEditVocabIDState);
//   // state
//   const [term, setTerm] = useState('');
//   const [definition, setDefinition] = useState('');
//   const [exampleT, setExampleT] = useState('');
//   const [exampleD, setExampleD] = useState('');
//   const [synonym, setSynonym] = useState('');
//   const [antonym, setAntonym] = useState('');
//   const [prefix, setPrefix] = useState('');
//   const [suffix, setSuffix] = useState('');
//   const [cf, setCf] = useState('');

//   useEffect(() => {
//     setTerm(content?.[onEditVocabID]?.term);
//     setDefinition(content?.[onEditVocabID]?.definition);
//     setExampleT(content?.[onEditVocabID]?.exampleT);
//     setExampleD(content?.[onEditVocabID]?.exampleD);
//     setSynonym(content?.[onEditVocabID]?.synonym);
//     setAntonym(content?.[onEditVocabID]?.antonym);
//     setPrefix(content?.[onEditVocabID]?.prefix);
//     setSuffix(content?.[onEditVocabID]?.suffix);
//     setCf(content?.[onEditVocabID]?.cf);
//   }, [content, onEditVocabID]);

//   const save = () => {
//     const newVocab = { term, definition };
//     if (!func.isNullOrWhitespace(synonym)) { newVocab.synonym = synonym; }
//     if (!func.isNullOrWhitespace(antonym)) { newVocab.antonym = antonym; }
//     if (!func.isNullOrWhitespace(prefix)) { newVocab.prefix = prefix; }
//     if (!func.isNullOrWhitespace(suffix)) { newVocab.suffix = suffix; }
//     if (!func.isNullOrWhitespace(exampleT)) { newVocab.exampleT = exampleT; }
//     if (!func.isNullOrWhitespace(exampleD)) { newVocab.exampleD = exampleD; }
//     if (!func.isNullOrWhitespace(cf)) { newVocab.cf = cf; }
//     setContent({ ...content, [onEditVocabID]: newVocab });
//     saveDeckContent(deckID, { [onEditVocabID]: newVocab }, true);
//     setIsVisible(false);
//   };

//   const renderEditCancelButton = () => (
//     <TouchableOpacity style={style.cancelButton} onPress={() => setIsVisible(false)}>
//       <Icon.Feather name="x" style={style.cancelButtonIcon} />
//     </TouchableOpacity>
//   );

//   const inputs = [
//     { value: term, onChangeText: setTerm, label: 'Term' },
//     { value: definition, onChangeText: setDefinition, label: 'Definition' },
//     { value: exampleT, onChangeText: setExampleT, label: 'ExampleT' },
//     { value: exampleD, onChangeText: setExampleD, label: 'ExampleD' },
//     { value: synonym, onChangeText: setSynonym, label: 'Synonym' },
//     { value: antonym, onChangeText: setAntonym, label: 'Antonym' },
//     { value: prefix, onChangeText: setPrefix, label: 'Prefix' },
//     { value: suffix, onChangeText: setSuffix, label: 'Suffix' },
//     { value: cf, onChangeText: setCf, label: 'cf' },
//   ];
//   return (
//     <PopUpMenu
//       isVisible={isVisible}
//       containerStyle={{ justifyContent: 'center' }}
//       renderMenu={() => (
//         <View style={{
//           backgroundColor: Color.defaultBackground, borderRadius: 20, flex: 1, marginHorizontal: '10%', marginVertical: '10%',
//         }}
//         >
//           <ScrollView style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
//             {inputs.map((input) => (
//               <View style={{ padding: 10 }} key={input.label.toLowerCase()}>
//                 <TextInput value={input.value} onChangeText={input.onChangeText} label={input.label} mode="outlined" />
//               </View>
//             ))}
//           </ScrollView>
//           <View style={{ padding: 10 }}>
//             <Button mode="contained" color={Color.green2} onPress={save}>Save</Button>
//           </View>
//           {renderEditCancelButton()}
//         </View>
//       )}
//     />
//   );
// };

// PlayEdit.propTypes = {
//   deckID: PropTypes.string.isRequired,
//   isVisible: PropTypes.bool.isRequired,
//   setIsVisible: PropTypes.func.isRequired,
//   content: PropTypes.object.isRequired,
//   setContent: PropTypes.func.isRequired,
// };

// export default PlayEdit;
