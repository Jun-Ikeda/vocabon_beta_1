import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import PropTypes from 'prop-types';

import Color from '../../config/Color';

import Icon from '../../components/Icon';

import TempScreen from '../../../dev/template/TempScreen';

const Tab = createMaterialBottomTabNavigator();

const renderIcon = ({ icon }) => {
  const renderIconReturn = ({ focused }) => (
    <Icon.Ionicons
      size={24}
      name={icon}
      style={{
        color: Color.white1,
        opacity: focused ? 1 : 0.4,
      }}
    />
  );
  renderIconReturn.propTypes = {
    tintColor: PropTypes.string.isRequired,
    focused: PropTypes.bool.isRequired,
  };
  return renderIconReturn;
};

class MainNav extends Component {
  render() {
    return (
      <Tab.Navigator shifting>
        <Tab.Screen
          name="home"
          component={TempScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: Color.green2,
            tabBarIcon: renderIcon({ icon: 'md-home' }),
          }}
        />
        <Tab.Screen
          name="search"
          component={TempScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarColor: Color.red1,
            tabBarIcon: renderIcon({ icon: 'md-search' }),
          }}
        />
        <Tab.Screen
          name="settings"
          component={TempScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarColor: Color.blue1,
            tabBarIcon: renderIcon({ icon: 'md-settings' }),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default MainNav;
