import React, { useState } from 'react';

import {
  Text, View, StyleSheet, TouchableOpacity, onPress,
} from 'react-native';

import { StackedBarChart } from 'react-native-chart-kit';
import Color from '../../../../config/Color';
import Icon from '../../../../components/Icon';

const iconSize = 20;
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});

const AnalyzeButtons = (props) => {
  const renderGraph = () => {
    const data = {
      labels: ['Test1', 'Test2'],
      legend: ['L1', 'L2', 'L3'],
      data: [
        [60, 60, 60],
        [30, 30, 60],
      ],
      barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
    };
    return (
      <StackedBarChart
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        data={data}
        height={220}
        width={Dimensions.get('window').width}
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
      />
    );
  };

  const buttons = [
    {
      title: 'graph',
      icon: { collection: 'Ionicons', name: 'bar-chart' },
      //   onPress: () => renderGraph(),

    },
  ];
  return (
    <View>
