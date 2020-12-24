import React, { Component } from 'react';
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

class ScreenDivision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExamined: false,
      isPortrait: false,
    };
  }

  onLayout = (e) => {
    const { height, width } = func.onLayoutContainer(e);
    this.setState({ isPortrait: height > width, isExamined: true });
  }

  renderMinorNav = () => {
    const { isPortrait } = this.state;
    if (!(isPortrait)) {
      return (
        <View style={style.minorNavContainer}>
          <Nav />
        </View>
      );
    }
    return null;
  }

  renderMajorNav = () => (
    <View style={style.majorNavContainer}>
      <Nav />
    </View>
  )

  renderNavs() {
    const { isExamined } = this.state;
    if (isExamined) {
      return (
        <View
          style={style.landscapeContainer}
        >
          {this.renderMajorNav()}
          {/* {this.renderMinorNav()} */}
        </View>
      );
    }
    return <View style={style.tabularasa} />;
  }

  render() {
    return (
      <View
        style={style.container}
        onLayout={this.onLayout}
      >
        {this.renderNavs()}
      </View>
    );
  }
}

export default ScreenDivision;
