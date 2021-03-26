import React, { useState, useEffect } from 'react';

import {
  View, StyleSheet, LayoutAnimation, TouchableOpacity, ScrollView,Text, Alert,
} from 'react-native';
import { Portal ,Button} from 'react-native-paper';
import DeckCarousel, { Pagination } from 'react-native-snap-carousel';
import { BarChart } from 'react-native-chart-kit';
import Color from '../../../../config/Color';
import { func } from '../../../../config/Const';
import Icon from '../../../../components/Icon';
import PopUpMenu from '../../../../components/popup/PopUpMenu';
import { result } from 'lodash';

const style = StyleSheet.create({
  container: {
    backgroundColor: Color.white1,
    marginHorizontal: '5%',
    marginVertical: '10%',
    flex: 1,
    borderRadius: 10,
  },
  graphContainer: {
  },
  graph: {
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
  carouselView: {
    // marginVertical: 5,
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
  },
  paginationView: {
    // height: 60,
    marginHorizontal: 5,
  },
});

const AnalyzeGraph = (props) => { // props
  const {
    isVisible, setVisible, play, marks,
  } = props;
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  // const graphDate = play;
  const [graphDate, setGraphDate] = useState(play);
  const [graphMarks, setGraphMarks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNum, setShowNum] = useState(0);

  useEffect(() => {
    const newGraphMarks = [];
    
    graphDate.forEach((date, index) => {
      let sum = 0;
      Object.values(marks).forEach((mark) => { sum = mark.includes(index) ? sum + 1 : sum; });
      newGraphMarks.push(sum);
    });
    setGraphMarks(newGraphMarks);
  }, []);

  // useEffect(()=>{
  //   setGraphMarks(func.separateListItem(graphMarks,5));
  //   setGraphDate(func.separateListItem(graphDate,5));
  //   func.alertConsole(graphDate,'h')
  // },[]);

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

  // const renderNavButton=()=>(
  //   <View style={style.buttonsContainer}>
  //     {showNum!==graphDate.length-1?(
  //     <View style={style.buttonContainer}>
  //       <Button
  //         onPress={setShowNum(showNum+1)}
  //         mode="contained"
  //         color={Color.green2}
  //       >
  //         Next
  //       </Button>
  //     </View>
  //     ):null}
  //     {showNum!==0?(<View style={style.buttonContainer}>
  //       <Button
  //         onPress={setShowNum(showNum-1)}
  //         mode="contained"
  //         color={Color.green2}
  //       >
  //         Back
  //       </Button>
  //     </View>):null}
  //   </View>
  // );

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
        {/* <View style={style.carouselView}>
          <DeckCarousel
            data={graphMarks}
            layout="tinder"
            layoutCardOffset="10"
            renderItem={()=>
            ( <BarChart
                style={style.graphContainer}
                data={data}
                width={layout.width}
                height={layout.height}
                chartConfig={chartConfig}
                verticalLabelRotation={50}
              />)
            }
            // itemWidth={260}
            sliderWidth={layout.width}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
      </View> */}
      {/* <View style={style.paginationView}>
        <Pagination
          dotsLength={graphMarks.length}
          inactiveDotStyle={{ backgroundColor: Color.white1 }}
          activeDotIndex={activeIndex}
          containerStyle={{ padding: 25 }}
          countainerStyle={{ paddingVertical: 10 }}
          dotStyle={{ backgroundColor: Color.white3 }}
        />
      </View> */}
        {/* <View style={style.button}>
        </View> */}
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
