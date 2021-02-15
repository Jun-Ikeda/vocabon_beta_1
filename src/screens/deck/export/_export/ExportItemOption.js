import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, ScrollView,
} from 'react-native';
import { Switch } from 'react-native-paper';

import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';
import { func } from '../../../../config/Const';

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white1,
    marginHorizontal: '5%',
    marginVertical: '15%',
    borderRadius: 10,
    flex: 1,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 2,
    justifyContent: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.gray3,
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  cancelButtonIcon: {
    fontSize: 24,
    color: Color.gray1,
  },
  label: {
    color: Color.font1,
    fontSize: 24,
    textAlign: 'left',
  },
});

const ExportItemOption = (props) => {
  const { setContentVisible, elementVisible, setElementVisible } = props;

  const renderCancelButton = () => (
    <TouchableOpacity
      style={style.cancelButton}
      onPress={() => {
        setContentVisible(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderSwitch = () => {
    const items = [
      { title: 'Term', value: 'term' },
      { title: 'Definition', value: 'definition' },
      { title: 'Synonym', value: 'synonym' },
      { title: 'Antonym', value: 'antonym' },
      { title: 'Prefix', value: 'prefix' },
      { title: 'Suffix', value: 'suffix' },
      { title: 'Example in Term\'s Language', value: 'exampleT' },
      { title: 'Example in Definition\'s Language', value: 'exampleD' },
      { title: 'cf', value: 'cf' },
    ];
    return (
      <View style={style.card}>
        {items.map((item) => (
          <View style={style.switchBox}>
            <Text style={{ fontSize: 15 }}>{item.title}</Text>
            <Switch
              value={elementVisible[item.value]}
              onValueChange={() => {
                // func.alertConsole({ value: item.value, elementVisible });
                setElementVisible(() => {
                  const elementVisibleCopy = JSON.parse(JSON.stringify(elementVisible));
                  elementVisibleCopy[item.value] = !elementVisible[item.value];
                  // func.alertConsole({ value: item.value, elementVisibleCopy });
                  return elementVisibleCopy;
                });
              }}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={style.content}>
      <View style={style.title}>
        <Text style={{ fontSize: 20 }}>Item Option</Text>
      </View>
      {renderCancelButton()}
      <ScrollView>{renderSwitch()}</ScrollView>
    </View>
  );
};

export default ExportItemOption;
