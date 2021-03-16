import React, { useState, useEffect } from 'react';

import {
  View, StyleSheet, LayoutAnimation, TouchableOpacity, ScrollView,Text, Alert,
} from 'react-native';
import { Portal ,Button} from 'react-native-paper';

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
    // flex:4
    // borderRadius: 10,
    // paddingHorizontal: 5,
    // marginHorizontal: -200,

  },
  graph: {
    // borderRadius: 20,
    // marginHorizontal: -100,
  },
  button: {
    fontSize: 18,
    position: 'absolute',
    top: 15,
    right: 15,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
  },
});

const AnalyzeGraph = (props) => { // props
  const {
    isVisible, setVisible, play, marks,
  } = props;
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  const graphDate = play;
  const [graphMarks, setGraphMarks] = useState([]);
  const [showNum, setShowNum] = useState(0);

  useEffect(() => {
    const newGraphMarks = [];

    graphDate.forEach((date, index) => {
      let sum = 0;
      Object.values(marks).forEach((mark) => { sum = mark.includes(index) ? sum + 1 : sum; });
      newGraphMarks.push(sum);
    });
    setGraphMarks(newGraphMarks);

    // graphMarks=func.separateListItem(graphMarks,5);
    // graphDate=func.separateListItem(graphDate,5);
    // console.log(func.separateListItem(newGraphMarks,2));
    // func.alertConsole(newGraphMarks);
    // func.separateListItem(graphMarks,5)
    console.log(graphMarks);
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

  const renderNavButton=()=>(
    <View style={style.buttonsContainer}>
      {showNum!==graphDate.length-1?(
      <View style={style.buttonContainer}>
        <Button
          onPress={setShowNum(showNum+1)}
          mode="contained"
          color={Color.green2}
        >
          Next
        </Button>
      </View>
      ):null}
      {showNum!==0?(<View style={style.buttonContainer}>
        <Button
          onPress={setShowNum(showNum-1)}
          mode="contained"
          color={Color.green2}
        >
          Back
        </Button>
      </View>):null}
    </View>
  );

  const renderGraph = () => {
    const data = {
      labels: JSON.parse(JSON.stringify(graphDate)),
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
        <BarChart
          style={style.graphContainer}
          data={data}
          width={layout.width}
          height={layout.height}
          chartConfig={chartConfig}
          verticalLabelRotation={50}
        />
        <View style={style.button}>
        </View>
        {renderCancelButton()}
        {/* {renderNavButton()} */}
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
