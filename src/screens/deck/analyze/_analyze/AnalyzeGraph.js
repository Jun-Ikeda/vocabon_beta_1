import React, { useState, useEffect } from 'react';

import {
  View, StyleSheet, LayoutAnimation, TouchableOpacity, ScrollView,
} from 'react-native';
import { Portal } from 'react-native-paper';

import { BarChart } from 'react-native-chart-kit';
import Color from '../../../../config/Color';
import { func } from '../../../../config/Const';
import Icon from '../../../../components/Icon';
import PopUpMenu from '../../../../components/popup/PopUpMenu';

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.white1,
    marginHorizontal: '5%',
    marginVertical: '10%',
    flex: 1,
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  graphContainer: {
    borderRadius: 10,
    // paddingHorizontal: 5,
    // marginHorizontal: -200,

  },
  graph: {
    borderRadius: 20,
    // marginHorizontal: -100,
  },
  chartTitle: {
    fontSize: 18,

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
});

const AnalyzeGraph = (props) => { // props
  const {
    isVisible, setVisible, play, marks,
  } = props;
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  const graphDate = play;
  const [graphMarks, setGraphMarks] = useState([]);

  useEffect(() => {
    const newGraphMarks = [];

    graphDate.forEach((date, index) => {
      let sum = 0;
      Object.values(marks).forEach((mark) => { sum = mark.includes(index) ? sum + 1 : sum; });
      newGraphMarks.push(sum);
    });
    setGraphMarks(newGraphMarks);
    console.log(newGraphMarks);
    console.log(graphDate);
  }, []);

  const renderCancelButton = () => (
    <TouchableOpacity
      style={style.cancelButton}
      onPress={() => {
        setVisible(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}
    >
      <Icon.Feather name="x" style={style.cancelButtonIcon} />
    </TouchableOpacity>
  );

  const renderGraph = () => {
    const data = {
      labels: JSON.parse(JSON.stringify(play)),
      datasets: [
        {
          data: graphMarks,
        },
      ],
    };

    const chartConfig = {
      // backgroundColor: Color.green3,
      backgroundGradientFrom: Color.green6,
      backgroundGradientTo: Color.green2,
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: style.graph,
    };

    return (
      <View
        horizontal
        onContentSizeChange={(width) => setLayout({ width })}
        style={style.container}
        onLayout={(e) => setLayout(func.onLayoutContainer(e))}
      >
        {/* <Text style={style.chartTitle}> Marks </Text> */}
        <BarChart
          style={style.graphContainer}
          data={data}
          width={layout.width}
          height={layout.height}
          chartConfig={chartConfig}
          verticalLabelRotation={50}
        />
        {renderCancelButton()}
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
