import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Portal, Badge } from 'react-native-paper';

import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.defaultBackground,
    marginHorizontal: '8%',
    marginVertical: '16%',
    borderRadius: 10,
    padding: 10,
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
  cancelButtonIcon: {
    fontSize: 24,
    color: Color.gray1,
  },
  item: {
    flex: 1,
    // flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    // flex: 1,
    // alignSelf: 'center',
  },
  labelText: {
    // fontSize: 18,
    color: Color.gray2,
  },
  desc: {
    // flex: 8,
    paddingLeft: 10,
  },
  deskText: {
    fontSize: 20,
  },
  google: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: Color.white1,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  textBox: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotBox: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  dot: {
    marginHorizontal: 10,
    backgroundColor: 'black',
  },
});

const ImportHelp = (props) => {
  const { isVisible, setIsVisible } = props;

  const renderCancelButton = () => (
    <TouchableOpacity style={style.cancelButton} onPress={() => setIsVisible(false)}>
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderInputDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Input</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>{'Enter or copy the data you want to import in the \'INPUT\' section'}</Text>
          </View>
        </View>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>To let the application distinguish cards, items, or elements from each other, enter each delimiter symbols between them</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCardItemElementDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Card, Item, Element</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>{'\'Cards\' refer to each term. There should be at least a \'Term\' and a \'Definition\' for each card'}</Text>
          </View>
        </View>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>{'\'Items\' are things such as \'Term\',\'Definition\',\'Synonym\'. Each \'Card\' should contain multiple \'Items\''}</Text>
          </View>
        </View>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>{'\'Elements\' are used if there are multiple definitions, synonyms, antonyms etc. in a single term'}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderDelimiterDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Custom Delimiters</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>You can custom each delimiter</Text>
          </View>
        </View>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>{'For example, if you enter : in the \'CARD\' section, letters surrounded by : will be recognized as cards'}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderQRDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>QR code</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>Click the QR code button to read data from QR codes</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderOptionDescription = () => (
    <View>
      <View style={{ marginLeft: 15, marginBottom: 5 }}>
        <Text style={{ color: Color.gray4 }}>Option Screen</Text>
      </View>
      <View style={style.google}>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>{'The option screen will be shown if you press the \'Import\' button'}</Text>
          </View>
        </View>
        <View style={style.textBox}>
          <View style={style.dotBox}>
            <Badge style={style.dot} size={8} />
          </View>
          <View style={{ flex: 7 }}>
            <Text>Identify each items </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMenu = () => (
    <View style={style.container}>
      <ScrollView>
        {renderInputDescription()}
        {renderCardItemElementDescription()}
        {renderDelimiterDescription()}
        {renderQRDescription()}
        {renderOptionDescription()}
      </ScrollView>
      <View style={{ marginLeft: 15, marginBottom: 5 }} />
      {renderCancelButton()}
    </View>
  );
  return (
    <Portal>
      <PopUpMenu
        isVisible={isVisible}
        renderMenu={renderMenu}
        containerStyle={{ justifyContent: 'center' }}
      />
    </Portal>
  );
};

ImportHelp.propTypes = {
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.bool,
};

ImportHelp.defaultProps = {
  isVisible: false,
  setIsVisible: () => {},
};

export default ImportHelp;
