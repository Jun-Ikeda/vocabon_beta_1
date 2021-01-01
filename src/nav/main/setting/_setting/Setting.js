import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { List } from 'react-native-paper';

import Color from '../../../../config/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Color.white1,
  },
  text1: {
    fontSize: 30,
  },
  text2: {
    fontSize: 60,
  },
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
        // icon: 'settings',
      },
      {
        title: 'Account',
        nav: 'account',
        // icon: 'account',
      },
    ];
    return items.map((item) => (
      <View key={item.title.toLowerCase()}>
        <List.Item
          style={style.itemContainer}
          title={item.title}
          titleStyle={style.text1}
          onPress={() => navigation.navigate(item.nav)}
          left={() => <List.Icon icon={item.icon} />}
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
