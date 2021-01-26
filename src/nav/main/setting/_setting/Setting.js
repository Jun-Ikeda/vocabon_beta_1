import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider, List } from 'react-native-paper';

import Color from '../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginTop: 10,
    // borderWidth: 2,
    borderRadius: 10,
    // backgroundColor: Color.white1,
  },
  text1: {
    fontSize: 20,
    color: Color.gray1,
  },
  text2: {
    fontSize: 60,
  },
  divider: { backgroundColor: Color.gray3, height: 1.5, opacity: 0.5 },

});

/**
 * Setting Screen
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * navigation.navigate('account');
 * props: { navigation }
 * recoil: {}
 * state: {}
 *
 * ```
 */
const Setting = (props) => {
  // props
  const { navigation } = props;

  const renderItems = () => {
    const items = [
      {
        title: 'General',
        nav: 'general',
        icon: 'equal',
      },
      {
        title: 'Account',
        nav: 'account',
        icon: 'account',
      },
      {
        title: 'Play',
        nav: 'settingplay',
        icon: 'cards',
      },
    ];
    return items.map((item, index) => (
      <View key={item.title.toLowerCase()}>
        {index !== 0 ? <Divider style={style.divider} /> : null}
        <List.Item
          style={style.itemContainer}
          title={item.title}
          titleStyle={style.text1}
          onPress={() => navigation.navigate(item.nav)}
          left={() => <List.Icon icon={item.icon} color={Color.gray1} />}
        />
      </View>
    ));
  };

  return (
    <View style={style.container}>
      {renderItems()}
    </View>
  );
};

Setting.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Setting.defaultProps = {};

export default Setting;
