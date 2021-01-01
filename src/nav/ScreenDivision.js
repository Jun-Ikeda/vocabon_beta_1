import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { func } from '../config/Const';

import Nav from './Nav';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  tabularasa: {
    flex: 1,
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  majorNavContainer: {
    flex: 4,
  },
  minorNavContainer: {
    flex: 7,
  },
});

const ScreenDivision = (/* props */) => {
  const [isExamined, setIsexamined] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const onLayout = (e) => {
    const { height, width } = func.onLayoutContainer(e);
    setIsPortrait(height > width);
    setIsexamined(true);
  };

  const renderMinorNav = () => {
    if (!(isPortrait)) {
      return (
        <View style={style.minorNavContainer}>
          <Nav />
        </View>
      );
    }
    return null;
  };

  const renderMajorNav = () => (
    <View style={style.majorNavContainer}>
      <Nav />
    </View>
  );

  const renderNavs = () => {
    if (isExamined) {
      return (
        <View
          style={style.landscapeContainer}
        >
          {renderMinorNav()}
          {renderMajorNav()}
        </View>
      );
    }
    return <View style={style.tabularasa} />;
  };

  return (
    <View
      style={style.container}
      onLayout={onLayout}
    >
      {renderNavs()}
    </View>
  );
};

export default ScreenDivision;
