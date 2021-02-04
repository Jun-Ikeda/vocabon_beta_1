import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from './Icon';

class TagsInput extends React.Component {
  focus() { this.input.focus(); }

  blur() { this.input.blur(); }

  clear() { this.input.clear(); }

  isFocused() { return this.input.isFocused(); }

  setNativeProps(nativeProps) { this.input.setNativeProps(nativeProps); }

  renderLabel = (text, style) => (
    <Text style={style}>
      {text}
    </Text>
  );

  renderLeftElement = (element, style) => (
    <View style={StyleSheet.flatten([style.leftElement, style])}>
      {element}
    </View>
  );

  renderRightElement = (element, style) => (
    <View style={StyleSheet.flatten([style.rightElement, style])}>
      {element}
    </View>
  );

  renderPushButton = () => (
    <TouchableOpacity
      onPress={this.createNewTag}
      style={style.pushButtonContainer}
    >
      <Icon.AntDesign name="plussquareo" size={25} />
    </TouchableOpacity>
  );

  // If characters remain in the input field after input is completed, add them to the tag.
  createNewTag = () => {
    const { tags, updateState } = this.props;
    if (tags.tag) {
      const tempArray = tags.tagsArray.concat(tags.tag);
      const tempObject = {
        tag: '',
        tagsArray: [...new Set(tempArray)], // Deduplication
      };
      updateState(tempObject);
      return this.input.clear();
    }
  }

  onChangeText = (text, tags, updateState, keysForTags, keysForTagsArray) => {
    if (keysForTagsArray) {
      return this.onChangeText2(text, tags, updateState, keysForTagsArray);
    }

    let keysStr;
    if (typeof keysForTags === 'string') {
      keysStr = keysForTags;
    } else {
      keysStr = ' ';
    }

    if (text.includes(keysStr)) {
      if (text === keysStr) {
        return;
      }
      const tempTag = text.replace(keysStr, '');
      const tempArray = tags.tagsArray.concat(tempTag);
      const tempObject = {
        tag: '',
        tagsArray: [...new Set(tempArray)], // Deduplication
      };
      updateState(tempObject);
      return this.input.clear();
    }
    const tempObject = {
      tag: text,
      tagsArray: tags.tagsArray,
    };
    return updateState(tempObject);
  };

  onChangeText2 = (text, tags, updateState, keysForTagsArray) => {
    // Escaping special characters.
    const keys = keysForTagsArray.map((str) => (`${str}`).replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, '\\$1'));

    const regexp = new RegExp(keys.join('|'));

    if (regexp.test(text)) {
      if (keysForTagsArray.includes(text)) {
        // The following processing is required because multiple characters may be specified as one delimiter.
        const tempObject = {
          tag: '',
          tagsArray: tags.tagsArray,
        };
        updateState(tempObject);
        return this.input.clear();
      }
      const tempTag = text.replace(regexp, '');
      const tempArray = tags.tagsArray.concat(tempTag);
      const tempObject = {
        tag: '',
        tagsArray: [...new Set(tempArray)], // Deduplication
      };
      updateState(tempObject);
      return this.input.clear();
    }
    const tempObject = {
      tag: text,
      tagsArray: tags.tagsArray,
    };
    return updateState(tempObject);
  };

  deleteTag = (tagToDelete, tags, updateState) => {
    const tempArray = tags.tagsArray;
    tempArray.splice(tagToDelete, 1);

    const tempObject = {
      tag: tags.tag,
      tagsArray: tempArray,
    };
    updateState(tempObject);
  };

  render() {
    const {
      containerStyle,
      disabled,
      disabledInputStyle,
      inputContainerStyle,
      leftElement,
      leftElementContainerStyle,
      rightElement,
      rightElementContainerStyle,
      inputStyle,
      label,
      labelStyle,
      tags,
      tagStyle,
      tagTextStyle,
      tagsViewStyle,
      updateState,
      keysForTag,
      keysForTagsArray,
      deleteElement,
      deleteIconStyles,
      customElement,
      pushButtonVisible,
    } = this.props;

    const { props } = this;

    return (
      <View style={StyleSheet.flatten([style.container, containerStyle])}>
        {label ? this.renderLabel(label, StyleSheet.flatten([style.labelStyle, labelStyle])) : null}
        <View style={StyleSheet.flatten(StyleSheet.flatten([style.inputContainer, inputContainerStyle]))}>
          {leftElement ? this.renderLeftElement(leftElement, leftElementContainerStyle) : null}
          <TextInput
            underlineColorAndroid="transparent"
            editable={!disabled}
            ref={(ref) => {
              this.input = ref;
            }}
            style={StyleSheet.flatten([
              style.input,
              inputStyle,
              disabled && style.disabledInput,
              disabled && disabledInputStyle,
            ])}
            {...props}
            value={tags.tag}
            onChangeText={(text) => this.onChangeText(text, tags, updateState, keysForTag, keysForTagsArray)}
          />
          {pushButtonVisible ? this.renderPushButton() : (rightElement ? this.renderRightElement(rightElement, rightElementContainerStyle) : null)}
        </View>
        {customElement || null}
        <View style={StyleSheet.flatten([style.tagsView, tagsViewStyle])}>
          {tags.tagsArray.map((item, count) => (
            <View
              style={StyleSheet.flatten([style.tag, tagStyle])}
              key={count}
            >
              <Text style={StyleSheet.flatten([style.tagText, tagTextStyle])}>{item}</Text>
              <TouchableOpacity onPressIn={() => this.deleteTag(count, tags, updateState)}>
                {deleteElement || (
                <Icon.AntDesign name="close" />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

TagsInput.propTypes = {
  disabled: PropTypes.bool,
  leftElement: PropTypes.element,
  rightElement: PropTypes.element,
  customElement: PropTypes.element,
  label: PropTypes.string,
  tags: PropTypes.object,
  updateState: PropTypes.func,
  keysForTag: PropTypes.string,
  keysForTagsArray: PropTypes.arrayOf(PropTypes.string),
  containerStyle: /* ViewPropTypes.style */PropTypes.object,
  inputContainerStyle: /* ViewPropTypes.style */PropTypes.object,
  inputStyle: /* TextInput.propTypes.style */PropTypes.object,
  disabledInputStyle: /* ViewPropTypes.style */PropTypes.object,
  leftElementContainerStyle: /* ViewPropTypes.style */PropTypes.object,
  rightElementContainerStyle: /* ViewPropTypes.style */PropTypes.object,
  labelStyle: /* Text.propTypes.style */PropTypes.object,
  deleteIconStyles: /* ViewPropTypes.style */PropTypes.object,
  pushButtonVisible: PropTypes.bool,
};

TagsInput.defaultProps = {
  disabled: false,
  leftElement: null,
  rightElement: null,
  customElement: null,
  label: '',
  tags: {},
  updateState: () => {},
  keysForTag: '',
  keysForTagsArray: [],
  containerStyle: {},
  inputContainerStyle: {},
  inputStyle: {},
  disabledInputStyle: {},
  leftElementContainerStyle: {},
  rightElementContainerStyle: {},
  labelStyle: {},
  deleteIconStyles: {},
  pushButtonVisible: false,
};

const style = {
  container: {
    width: '100%',
    paddingHorizontal: 10,
    // flex: 1,
    // backgroundColor: 'red',
  },
  disabledInput: {
    opacity: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    // paddingRight: 10,
    // marginHorizontal: 10,
    // backgroundColor: 'teal',
    // flex: 1,
  },
  leftElement: {
    // height: 40,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginLeft: 10,
  },
  rightElement: {
    // height: 40,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginRight: 10,
  },
  input: {
    color: 'black',
    fontSize: 18,
    // lineHeight: 60,
    flex: 1,
    // minHeight: 40,
    // marginLeft: 5,
    // marginRight: 5,
  },
  tagsView: {
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    height: 26,
    borderRadius: 13,
    backgroundColor: '#979797',
    minWidth: 40,
    maxWidth: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 5,
    // margin: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  tagText: {
    marginHorizontal: 5,
  },
  labelStyle: {
    fontSize: 12,
    // marginTop: 12,
    // marginBottom: -4,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    opacity: 0.5,
    // marginLeft: 5,
  },
  pushButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default TagsInput;
