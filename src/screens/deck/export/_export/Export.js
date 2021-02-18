import React, { useState } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, LayoutAnimation, Share,
} from 'react-native';
import { Button } from 'react-native-paper';

import PropTypes from 'prop-types';
import ExpoClipboard from 'expo-clipboard';
import { useRecoilValue } from 'recoil';
import Color from '../../../../config/Color';
import { decksGeneral, getDeckContent, getDeckGeneral } from '../../../../config/deck/Deck';
import { func } from '../../../../config/Const';
import Icon from '../../../../components/Icon';
import PopUpMenu from '../../../../components/popup/PopUpMenu';

import ExportItemOption from './ExportItemOption';
import ExportOption from './ExportOption';
import ExportQRcode from './ExportQRcode';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataBox: {
    flex: 3,
    margin: 20,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Color.white1,
    justifyContent: 'center',
  },
  // popUp: {
  //   backgroundColor: Color.white1,
  //   flex: 1,
  //   // padding: 20,
  // },
  button: {
    // flex: 1,
    // marginRight: 15,
    // marginTop: 10,
    paddingHorizontal: 10,
  },
});

const Export = (props) => {
  // props
  const { navigation, route: { params: { deckID } } } = props;
  // recoil
  const deckGeneral = useRecoilValue(decksGeneral);
  // state
  // const [layout, setLayout] = useState({ height: 300, width: 300 });
  const [elementValue, setElementValue] = useState(',');
  const [itemValue, setItemValue] = useState(';');
  const [cardValue, setCardValue] = useState('/');
  const [elementDelimiter, setElementDelimiter] = useState(',');
  const [itemDelimiter, setItemDelimiter] = useState(';');
  const [cardDelimiter, setCardDelimiter] = useState('/');

  const [qrContentVisible, setQRContentVisible] = useState(false);
  const [optionContentVisible, setOptionContentVisible] = useState(false);

  const [elementVisible, setElementVisible] = useState({
    term: true,
    definition: true,
    synonym: false,
    antonym: false,
    prefix: false,
    suffix: false,
    exampleT: false,
    exampleD: false,
    cf: false,
  });

  const content = getDeckContent(deckID);
  const general = getDeckGeneral(deckGeneral, deckID);

  const output = func.convertObjectToArray(content).map((element) => func.createItemArray(element,
    func.showEachItem(elementVisible), elementDelimiter)?.join(itemDelimiter))?.join(cardDelimiter) + (cardDelimiter);

  // const output = func.output(content,elementDelimiter,itemDelimiter,cardDelimiter);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: output,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderDataBox = () => (
    <View style={style.dataBox}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 22, padding: 10, flex: 1 }}> Data </Text>
        <TouchableOpacity
          onPress={() => {
            setOptionContentVisible(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          }}
          style={style.button}
        >
          <Icon.Ionicons name="options" style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onShare}
          style={style.button}
        >
          <Icon.Ionicons name="share-outline" style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setQRContentVisible(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          }}
          style={style.button}
        >
          <Icon.MaterialCommunityIcons name="qrcode" style={{ fontSize: 30 }} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <Text>{output}</Text>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Button onPress={() => ExpoClipboard.setString(output)} mode="contained" color={Color.green2}>Copy</Button>
      </View>
    </View>
  );

  const renderQRcode = () => {
    const dataArray = func.separateDeckData(content, elementDelimiter, elementVisible, itemDelimiter, cardDelimiter);
    console.log(dataArray);
    return (
      <ExportQRcode
        dataArray={dataArray}
        general={general}
        setContentVisible={setQRContentVisible}
      />
    );
  };

  return (
    <View style={style.container}>
      <ExportOption
        elementValue={elementValue}
        setElementValue={setElementValue}
        elementDelimiter={elementDelimiter}
        setElementDelimiter={setElementDelimiter}
        itemValue={itemValue}
        setItemValue={setItemValue}
        cardValue={cardValue}
        setCardValue={setCardValue}
        itemDelimiter={itemDelimiter}
        setItemDelimiter={setItemDelimiter}
        cardDelimiter={cardDelimiter}
        setCardDelimiter={setCardDelimiter}
      />
      {renderDataBox()}
      <PopUpMenu
        isVisible={optionContentVisible}
        renderMenu={() => (
          <ExportItemOption
            setContentVisible={setOptionContentVisible}
            elementVisible={elementVisible}
            setElementVisible={setElementVisible}
          />
        )}
        containerStyle={{ justifyContent: 'center' }}
      />
      <PopUpMenu
        isVisible={qrContentVisible}
        renderMenu={renderQRcode}
        containerStyle={{ justifyContent: 'center' }}
      />
    </View>
  );
};

Export.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Export;
