import HomeNav from './home/HomeNav';

export default HomeNav;

// import React from 'react';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import PropTypes from 'prop-types';

// import Color from '../../config/Color';

// import Icon from '../../components/Icon';

// import HomeNav from './home/HomeNav';
// import SearchNav from './search/SearchNav';
// import SettingNav from './setting/SettingNav';

// // import TempScreen from '../../../dev/template/TempScreen';

// const Tab = createMaterialBottomTabNavigator();

// const renderIcon = ({ icon }) => {
//   const renderIconReturn = ({ focused }) => (
//     <Icon.Ionicons
//       size={24}
//       name={icon}
//       style={{
//         color: Color.white1,
//         opacity: focused ? 1 : 0.4,
//       }}
//     />
//   );
//   renderIconReturn.propTypes = {
//     tintColor: PropTypes.string.isRequired,
//     focused: PropTypes.bool.isRequired,
//   };
//   return renderIconReturn;
// };

// const MainNav = () => (
//   <Tab.Navigator shifting>
//     <Tab.Screen
//       name="homenav"
//       component={HomeNav}
//       options={{
//         tabBarLabel: 'Home',
//         tabBarColor: Color.green2,
//         tabBarIcon: renderIcon({ icon: 'md-home' }),
//       }}
//     />
//     <Tab.Screen
//       name="searchnav"
//       component={SearchNav}
//       options={{
//         tabBarLabel: 'Search',
//         tabBarColor: Color.red1,
//         tabBarIcon: renderIcon({ icon: 'md-search' }),
//       }}
//     />
//     <Tab.Screen
//       name="settingsnav"
//       component={SettingNav}
//       options={{
//         tabBarLabel: 'Settings',
//         tabBarColor: Color.blue1,
//         tabBarIcon: renderIcon({ icon: 'md-settings' }),
//       }}
//     />
//   </Tab.Navigator>
// );

// export default MainNav;
