import React, { useState } from 'react';

import {
  Text, View, StyleSheet, TouchableOpacity, onPress,
} from 'react-native';
import { Portal } from 'react-native-paper';

import { BarChart } from 'react-native-chart-kit';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';
import PopUpMenu from '../../../../components/popup/PopUpMenu';

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.white1,
    marginHorizontal: '5%',
    // marginVertical: '15%',
    borderRadius: 10,
  },
  graph: {

  },
});

const AnalyzeGraph = (props) => {
  const { isVisible, setVisible, play } = props;

  const renderGraph = () => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
        },
      ],
    };

    return (
      <View style={style.container}>
        <BarChart
          style={style.graph}
          data={data}
          width={300}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          verticalLabelRotation={30}
        />
      </View>
    );
  };

  return (
    <Portal>
      <PopUpMenu
        isVisible={isVisible}
        setVisible={setVisible}
        renderMenu={renderGraph}
        containerStyle={{ justifyContent: 'center' }}
      />
    </Portal>
  );
};

export default AnalyzeGraph;
