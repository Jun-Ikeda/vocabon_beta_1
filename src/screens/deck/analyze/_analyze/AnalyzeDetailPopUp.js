import React from 'react';
import { Text, View, StyleSheet,LayoutAnimation,TouchableOpacity } from 'react-native';

import { Button, Portal, Divider } from 'react-native-paper';
import { func } from '../../../../config/Const';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';

const iconSize = 25;

const style = StyleSheet.create({
  text: {
    fontSize: iconSize,
  },
  detailcontainer: {
    // paddingHorizontal: '8%',
    // paddingVertical: 20,
    padding:20,
    marginHorizontal: '5%',
    marginVertical: '15%',
    backgroundColor: Color.defaultBackground,
    borderRadius: 10,
    flex: 1,
  },
  detailtext: {
    fontSize: 20,
    marginLeft: 20,
    marginVertical: 5,
  },
  detailbutton: {
    margin:10,
    height: 40,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupmenu: {
    marginHorizontal: '20%',
  },
  divider: { 
    backgroundColor: Color.gray3, 
    height: 1, 
    opacity: 0.8, 
    marginLeft:20, 
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
  descriptionView: {
    backgroundColor: Color.white1,
    borderRadius: 10,
  },
});

const AnalyzeDetailPopUp = (props) => {
  const { marks, play, detailVisibleID, setDetailVisibleID, index, setIndex, ascendOrDescend, setAscendOrDescend, content, contentSorted } = props;
    let dateList = [];
    let iconName = '';
    if (ascendOrDescend === true) {
      dateList = play.sort((a, b) => (a > b ? -1 : 1));
      iconName = 'chevron-up';
    } else {
      dateList = play.sort((a, b) => (b > a ? -1 : 1));
      iconName = 'chevron-down';
    }

    const returnNextOrPrevID = (nextOrPrev) => {
      const indexList = Object.keys(contentSorted);
      setIndex(indexList.indexOf(detailVisibleID));
      let newIndex;
      if (nextOrPrev === true) {
        if (index >= indexList.length - 1) {
          newIndex = 0;
        } else {
          newIndex = index + 1;
        }
      } else if (nextOrPrev === false) {
        if (index <= 0) {
          newIndex = indexList.length - 1;
        } else {
          newIndex = index - 1;
        }
      }
      setIndex(newIndex);
      setDetailVisibleID(indexList[newIndex]);
      console.log(newIndex);
    };

    const renderCancelButton = () => (
      <TouchableOpacity
        style={style.cancelButton}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setDetailVisibleID('');
        }}
      >
        <Icon.Feather name="x" style={style.cancelButtonIcon} />
      </TouchableOpacity>
    );

    return (
      <Portal>
        <PopUpMenu
          style={style.popupmenu}
          isVisible={!(detailVisibleID === '')}
          setVisible={() => setDetailVisibleID('')}
          renderMenu={() => (
            <View style={style.detailcontainer}>
              {renderCancelButton()}
              <View style={{ flex: 1 }}>
                <View style={{ marginLeft: 15, marginBottom: 5 }}>
                  <Text style={{ color: Color.gray4, fontSize: 18 }}>{`Term & Def`}</Text>
                </View>
                <View style={style.descriptionView}>
                  <Text style={style.detailtext}>{content[detailVisibleID]?.term}</Text>
                  <Divider style={style.divider} /> 
                  <Text style={style.detailtext}>{content[detailVisibleID]?.definition}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin:5,
                  }}
                >
                  <Icon.Feather name="x" size={iconSize} color={Color.cud.red} />
                  <View style={{ marginLeft: 15, marginBottom: 5 }}>
                    <Text style={{ color: Color.gray4, fontSize: 18 }}>History</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: Color.white1, borderRadius: 10 , }}>
                  {marks[detailVisibleID]?.map((time,index) => 
                  <View>
                    <Text style={style.detailtext}>{func.formatDate(dateList[time])}</Text>
                    {index !== marks[detailVisibleID].length-1 ? <Divider style={style.divider} /> : null}
                  </View> 
                  )}
                </View>
                
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    returnNextOrPrevID(false);
                  }}
                  style={style.detailbutton}
                  color={Color.green2}
                  mode='contained'
                >
                  <Text style={{ }}>BACK</Text>
                </Button>
                <Button
                  style={style.detailbutton}
                  color={Color.green2}
                  mode='contained'
                  onPress={() => setAscendOrDescend(!ascendOrDescend)}
                >
                  <Icon.Entypo name={iconName} size={iconSize * 0.66} color={Color.white1} />
                </Button>
                <Button
                  onPress={() => {
                    returnNextOrPrevID(true);
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  }}
                  style={style.detailbutton}
                  color={Color.green2}
                  mode='contained'
                >
                  <Text style={{ }}>NEXT</Text>
                </Button>
              </View>
            </View>
          )}
        />
      </Portal>
    );
  };

export default AnalyzeDetailPopUp;
