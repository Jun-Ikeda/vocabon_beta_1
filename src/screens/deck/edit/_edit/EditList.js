import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, LayoutAnimation,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import Color from '../../../../config/Color';

import Icon from '../../../../components/Icon';
import VocabList from '../../../../components/deck/list/VocabList';

import { selectedVocabIDsState } from './Edit';

const backgroundColor = Color.white1;
const iconSize = 20;

const style = StyleSheet.create({
  box: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  termanddef: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.black,
  },
  list: {
    backgroundColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listItem: {
    backgroundColor,
    paddingVertical: 0,
  },
  listItemLast: {
    backgroundColor,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingTop: 0,
    paddingBottom: 10,
  },
  editButton: {
    padding: 20,
  },
  checkbox: {
    padding: 12.5,
  },
});
const EditList = (props) => {
  // props
  const {
    content,
    setVisible,
    mode,
    setAddButtonVisible,
    // ref,
  } = props;
  // recoil
  // state
  const [offset, setOffset] = useState(0);
  const [selectedVocabIDs, setSelectedVocabIDs] = useRecoilState(selectedVocabIDsState);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedVocabIDs([]);
  }, [mode]);

  const renderEditButton = (vocab) => (
    <TouchableOpacity
      onPress={async () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setVisible(true, vocab.key);
      }}
      style={style.editButton}
    >
      <Icon.Feather name="edit" size={iconSize} />
    </TouchableOpacity>
  );

  const renderCheckBox = (vocab) => (
    <View style={style.checkbox}>
      <Checkbox
        status={selectedVocabIDs.includes(vocab.key) ? 'checked' : 'unchecked'}
              // onPress={toggleChecked}
        color={Color.cud.blue}
        pointerEvents="none"
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <VocabList
        content={content}
        searchBar
        itemVisible={mode === 'delete'
          ? { term: true, definition: true }
          : (vocab) => ({
            term: true,
            definition: true,
            synonym: selectedVocabIDs.includes(vocab.key),
            antonym: selectedVocabIDs.includes(vocab.key),
            prefix: selectedVocabIDs.includes(vocab.key),
            suffix: selectedVocabIDs.includes(vocab.key),
            exampleT: selectedVocabIDs.includes(vocab.key),
            exampleD: selectedVocabIDs.includes(vocab.key),
            cf: selectedVocabIDs.includes(vocab.key),
          })}
        itemStyle={{
          term: { fontSize: 20 },
          definition: { fontSize: 20 },
        }}
        labelVisible={{
          synonym: true,
          antonym: true,
          prefix: true,
          suffix: true,
          exampleT: true,
          exampleD: true,
          cf: true,
        }}
        state={[selectedVocabIDs, setSelectedVocabIDs]}
        renderCardRight={(vocab) => {
          if (mode === 'edit') {
            return renderEditButton(vocab);
          } if (mode === 'delete') {
            return renderCheckBox(vocab);
          }
          return null;
        }}
        contentContainerStyle={{ paddingBottom: 60 }}
        onScroll={(event) => {
          const currentOffset = event.nativeEvent.contentOffset.y;
          const direction = currentOffset > offset ? 'down' : 'up';
          setOffset(currentOffset);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setAddButtonVisible(direction === 'up');
        }}
        onScrollToTop={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setAddButtonVisible(true);
        }}
        // ref={ref}
      />
    </View>
  );
};
EditList.propTypes = {
  content: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  setAddButtonVisible: PropTypes.func.isRequired,
};

EditList.defaultProps = {
};

export default EditList;

// const EditList = (props) => {
//   // props
//   const {
//     content,
//     setVisible,
//   } = props;
//   // recoil
//   // state
//   const [expandedIndex, setExpandedIndex] = useState([]);

//   const renderMainContent = ({ item, index }) => {
//     const { key, value } = item;
//     const isExpanded = expandedIndex.includes(index);
//     const toggleExpand = () => {
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//       let newExpandedIndex = [];
//       if (isExpanded) {
//         newExpandedIndex = expandedIndex.filter((_index) => _index !== index);
//         setExpandedIndex(newExpandedIndex);
//       } else {
//         setExpandedIndex([...expandedIndex, index]);
//       }
//     };
//     return (
//       <SafeAreaView style={style.box}>
//         <List.Accordion
//           expanded={isExpanded}
//           onPress={toggleExpand}
//           title={value?.term}
//           description={deck.formatArrayContent(value?.definition)}
//           titleStyle={style.termanddef}
//           descriptionStyle={style.termanddef}
//           style={[
//             style.list,
//             {
//               borderBottomLeftRadius: isExpanded ? 0 : 10,
//               borderBottomRightRadius: isExpanded ? 0 : 10,
//             }]}
//         >
//           <List.Item style={style.listItem} title={`Synonym: ${deck.formatArrayContent(value?.synonym)}`} />
//           <List.Item style={style.listItem} title={`Antonym: ${deck.formatArrayContent(value?.antonym)}`} />
//           <List.Item style={style.listItem} title={`Prefix: ${deck.formatArrayContent(value?.prefix)}`} />
//           <List.Item style={style.listItem} title={`Sufix: ${deck.formatArrayContent(value?.sufix)}`} />
//           <List.Item style={style.listItem} title={`ExampleT: ${deck.formatArrayContent(value?.exampleT)}`} />
//           <List.Item style={style.listItem} title={`ExampleD: ${deck.formatArrayContent(value?.exampleD)}`} />
//           <List.Item style={style.listItemLast} title={`cf: ${deck.formatArrayContent(value?.cf)}`} />
//         </List.Accordion>
//         <TouchableOpacity
//           onPress={async () => {
//             LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//             setVisible(true, key);
//           }}
//           style={style.editButton}
//         >
//           <Icon.Feather
//             name="edit"
//             size={iconSize}
//           />
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   };

//   return (
//     <View
//       style={{ flex: 1 }}
//     >
//       <FlatList
//         data={func.convertObjectToArray(content)}
//         renderItem={renderMainContent}
//         keyExtractor={(item, index) => index}
//       />
//     </View>
//   );
// };
