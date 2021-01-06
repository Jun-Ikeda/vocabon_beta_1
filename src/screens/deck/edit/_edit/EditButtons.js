import React, { useState } from 'react';
import {
  View, TouchableOpacity, StyleSheet, LayoutAnimation, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  atom, RecoilRoot, useRecoilState, useRecoilValue,
} from 'recoil';

import Icon from '../../../../components/Icon';
import Color from '../../../../config/Color';
import { func } from '../../../../config/Const';
import { numChosenCardsState } from './EditDelete';
import { helpVisibleState } from './Edit';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import EditHelp from './EditHelp';

const iconSize = 20;

const style = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
  },
  button: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashbutton: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textintrashbin: {
    fontSize: 12,
    // fontWeight: 'bold',
    position: 'absolute',
    right: 10,
    bottom: 15,
    width: 15,
    height: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    color: Color.white1,
    backgroundColor: Color.cud.red,
  },
});

/**
 * EditButtons Component in Edit Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <EditButtons
 *    setState={(state) => this.setState(state)}
 *    deleteVisible={true}
 * />
 * props: { setState, deleteVisible }
 * recoil: {}
 * state: {}
 *
 * ```
 */
const EditButtons = (props) => {
  // props
  const { setVisible, deleteVisible } = props;
  // recoil
  const numChosenCards = useRecoilValue(numChosenCardsState);
  const [helpVisible, setHelpVisible] = useRecoilState(helpVisibleState);
  // state
  const [layout, setLayout] = useState({ height: 300, width: 300 });

  const renderCounter = () => {
    if (deleteVisible === true) {
      return (
        <View>
          <Text style={style.textintrashbin}>
            {numChosenCards}
          </Text>
        </View>
      );
    }
    return (null);
  };

  const renderTrashBin = () => (
    <TouchableOpacity
      style={style.button}
      onPress={() => {
        if (deleteVisible === false) {
          setVisible(!deleteVisible);
        } else {
          const stringToAlert = `Are you sure you delete the ${numChosenCards} cards you chose? (You cannot undo)`;
          alert(stringToAlert);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Icon.FontAwesome
        name="trash"
        size={iconSize}
        style={{ color: deleteVisible ? Color.cud.red : Color.black }}
      />
      {/* <Text style={style.textintrashbin}>
        {numChosenCards}
      </Text> */}
      {renderCounter()}
    </TouchableOpacity>
  );

  const renderHelp = () => {
    if (deleteVisible === false) {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            setHelpVisible(!helpVisible);
          }}
        >
          <Icon.Feather
            name="help-circle"
            size={iconSize}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  // const renderHelpPopUp = () => {
  //   const renderHelpView = () => (
  //     <View
  //       style={style.menuview}
  //       onLayout={(e) => setLayout(func.onLayoutContainer(e))}
  //     >
  //       <View style={style.popview}>
  //         <EditHelp
  //           width={layout.width}
  //           setVisible={setHelpVisible}
  //         />
  //       </View>
  //     </View>
  //   );
  //   return (
  //     <PopUpMenu
  //       isVisible={helpVisible}
  //       setVisible={setHelpVisible}
  //       renderMenu={renderHelpView}
  //       overlayStyle={style.overlayStyle}
  //       onPress={() => setHelpVisible(false)}
  //     />
  //   );
  // };

  const renderBackButton = () => {
    if (deleteVisible === true) {
      return (
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            setVisible(!deleteVisible);
          }}
        >
          <Icon.Feather
            name="x-circle"
            size={iconSize}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={style.container}>
      {renderBackButton()}
      {renderHelp()}
      {renderTrashBin()}
      {/* {renderHelpPopUp()} */}
    </View>
  );
};

EditButtons.propTypes = {
  setVisible: PropTypes.func,
  deleteVisible: PropTypes.bool,
};

EditButtons.defaultProps = {
  setVisible: () => {},
  deleteVisible: false,
  // backVisible: false,
};

export default EditButtons;
