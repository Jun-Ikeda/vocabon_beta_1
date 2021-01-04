import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation,
  ScrollView,
  StatusBar,
  Switch,
  Animated,
} from 'react-native';
import { Entypo, AntDesign } from 'react-native-vector-icons';

// TouchableOpacity, icons, .map .filter, {renderButtons()}, state

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const pi = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

const e = '2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274';

const App = () => {
  const [isinitialized, setIsinitialized] = useState(false);
  const loadingAnim = useRef(new Animated.Value(0)).current;
  const rotate = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const textColor = loadingAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['black', '#e0e0e0', 'black', '#e0e0e0', 'black'],
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([
    {
      title: 'pi', content: pi, visible: true, expanded: false, selected: false,
    },
    {
      title: 'e', content: e, visible: true, expanded: false, selected: false,
    },
  ]);
  const [editVisible, setEditVisible] = useState(false);
  const [hideMode, setHideMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(0.5),
        Animated.timing(loadingAnim, {
          toValue: 1,
          duration: 2000,
        }),
      ]),
      {
        iterations: 3,
      },
    ).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsinitialized(true);
    });
  }, []);

  // useEffect(() => {
  //   setIsinitialized(true);
  // });

  const renderTopButtons = () => {
    const buttons = [
      {
        icon: (
          <Entypo
            name="eye-with-line"
            style={{ fontSize: 20, color: deleteMode ? 'gray' : 'black' }}
          />
        ),
        onPress: () => {
          setHideMode(!hideMode);
          // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        },
        disabled: deleteMode,
      },
      {
        icon: (
          <Entypo
            name="trash"
            style={{ fontSize: 20, color: hideMode ? 'gray' : 'black' }}
          />
        ),
        onPress: () => {
          setDeleteMode(!deleteMode);
          const notesCopy = notes.slice();
          for (let i = 0; i < notes.length; i++) {
            notesCopy[i].selected = false;
          }
          setNotes(notesCopy);
          // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        },
        disabled: hideMode,
      },
    ];
    let backgroundColor = null;
    let title = '';
    if (deleteMode) {
      backgroundColor = '#ed5858';
      title = 'Select notes to delete';
    } else if (hideMode) {
      backgroundColor = '#588fed';
      title = 'Toggle the switch';
    }
    return (
      <View style={[styles.topButtonsContainer, { backgroundColor }]}>
        <View style={styles.topButtonTitleContainer}>
          <Text>{title}</Text>
        </View>
        {buttons.map((button) => (
          <TouchableOpacity
            onPress={button.onPress}
            style={styles.topButton}
            disabled={button.disabled}
          >
            {button.icon}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderNotes = () => notes.map((note, index) => {
    const toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const notesCopy = notes.slice();
      notesCopy[index].expanded = !notes[index].expanded;
      setNotes(notesCopy);
    };
    const toggleSelected = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const notesCopy = notes.slice();
      notesCopy[index].selected = !notes[index].selected;
      setNotes(notesCopy);
    };
    const toggleVisible = () => {
      const notesCopy = notes.slice();
      notesCopy[index].visible = !notes[index].visible;
      setNotes(notesCopy);
    };
    const openEdit = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setEditedIndex(index);
      setTitle(note.title);
      setContent(note.content);
      console.log(editedIndex);
      setEditVisible(true);
    };
    if (note.visible || hideMode) {
      return (
        <View style={{ flexDirection: 'row' }}>
          {hideMode ? (
            <Switch
              style={{ marginTop: 30 }}
              onValueChange={toggleVisible}
              value={notes[index].visible}
            />
          ) : null}
          <TouchableOpacity
            onLongPress={deleteMode ? () => {} : openEdit}
            onPress={deleteMode ? toggleSelected : toggleExpand}
            style={[styles.card, { backgroundColor: note.selected ? '#e6e6e6' : 'white' }]}
          >
            <Text style={{ fontSize: 18, padding: 5 }}>{note.title}</Text>
            {note.expanded ? (
              <Text style={{ padding: 5 }}>{note.content}</Text>
            ) : null}
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  });

  const renderFloatingButton = () => {
    if (hideMode || deleteMode) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setEditVisible(true);
        }}
        style={styles.floating}
      >
        <AntDesign name="plus" style={styles.floatingIcon} />
      </TouchableOpacity>
    );
  };

  const renderPopUp = () => {
    const discard = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setEditVisible(false);
      setTitle('');
      setContent('');
    };
    const save = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (editedIndex === -1) {
        console.log(`if ${editedIndex}`);
        setNotes([...notes, {
          title, content, visible: true, expanded: false,
        }]);
      } else {
        console.log(`else ${editedIndex}`);
        const notesCopy = notes.slice();
        notesCopy[editedIndex].title = title;
        notesCopy[editedIndex].content = content;
        setNotes(notesCopy);
        setEditedIndex(-1);
      }
      setEditVisible(false);
      setTitle('');
      setContent('');
    };
    if (editVisible) {
      return (
        <View style={[styles.absoluteFull, styles.popupContainer]}>
          <TouchableOpacity
            style={[styles.absoluteFull, styles.popupOverlay]}
            onPressIn={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setEditVisible(false);
            }}
          />
          <View style={styles.popup}>
            <View style={styles.popupInputContainer}>
              <Text style={{ fontSize: 20 }}>Title</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.titleInput}
              />
            </View>
            <View style={[styles.popupInputContainer, { flex: 1 }]}>
              <Text style={{ fontSize: 20 }}>Content</Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                style={styles.contentInput}
                multiline
              />
            </View>
            <View style={styles.popupButtonContainer}>
              <View style={styles.popupButton}>
                <Button onPress={discard} title="Discard" />
              </View>
              <View style={styles.popupButton}>
                <Button onPress={save} title="Save" />
              </View>
            </View>
          </View>
        </View>
      );
    }
  };
  const renderDeleteButton = () => {
    if (deleteMode) {
      const deleteNote = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const notesCopy = notes.slice();
        const result = notesCopy.filter((note) => !note.selected);
        setNotes(result);
      };
      return (
        <Button color="red" onPress={deleteNote} title="Delete Selected Notes" />
      );
    }
    return null;
  };

  const renderLoadingScreen = () => {
    const it = 'be';
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Animated.Text style={{ color: textColor }}>Loading</Animated.Text>
        <Animated.View style={[styles.animatedContainer, { transform: [{ rotate }] }]}>
          <View style={styles.animatedCricle} />
        </Animated.View>
      </View>
    );
  };

  if (isinitialized) {
    return (
      <View style={styles.container}>
        {renderTopButtons()}
        <ScrollView>{renderNotes()}</ScrollView>
        {renderFloatingButton()}
        {renderDeleteButton()}
        <Button onPress={() => console.log(notes)} />
        {renderPopUp()}
      </View>
    );
  }
  return renderLoadingScreen();
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: StatusBar.currentHeight,
  },

  topButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 40,
  },
  topButton: {
    paddingHorizontal: 10,
  },
  topButtonTitleContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },

  floating: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  floatingIcon: {
    color: 'white',
    fontSize: 24,
  },

  popupContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupOverlay: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  popup: {
    width: '90%',
    height: '80%',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
  },
  popupInputContainer: {},
  titleInput: {
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  contentInput: {
    flex: 1,
    borderColor: '#d9d9d9',
    borderWidth: 1,
  },
  popupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  popupButton: {
    width: '30%',
  },

  absoluteFull: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },

  animatedContainer: {
    height: '40%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  animatedCricle: {
    height: 16, width: 16, borderRadius: 16 / 2, backgroundColor: '#4287f5',
  },
});
