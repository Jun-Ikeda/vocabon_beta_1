import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, ScrollView, Platform, Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Color from '../config/Color';
// import PickerListItem from './PickerListItem';

class DynamicallySelectedPicker extends React.Component {
  constructor(props) {
    super(props);
    // set picker item height for android and ios
    const { height, transparentItemRows, initialSelectedIndex } = props;
    let itemHeight = height / (transparentItemRows * 2 + 1);
    // In ios we have to manually ceil items height to eliminate distortion in the visualization, when we have big data.
    if (Platform.OS === 'ios') {
      itemHeight = Math.ceil(itemHeight);
    }
    this.state = {
      itemHeight,
      itemIndex: initialSelectedIndex,
    };
  }

  /**
   * Generate fake items for picker top and bottom.
   * @param n
   * @returns {[]}
   */
  fakeItems(n = 3) {
    const itemsArr = [];
    for (let i = 0; i < n; i++) {
      itemsArr[i] = {
        value: -1,
        label: '',
      };
    }
    return itemsArr;
  }

  /**
   * Get extended picker items length.
   * @returns {number}
   */
  allItemsLength() {
    return this.extendedItems().length - this.props.transparentItemRows * 2;
  }

  /**
   *
   * @param event
   */
  onScroll(event) {
    const { items, onScroll } = this.props;
    const tempIndex = this.getItemTemporaryIndex(event);
    if (
      this.state.itemIndex !== tempIndex
      && tempIndex >= 0
      && tempIndex < this.allItemsLength()
    ) {
      this.setItemIndex(tempIndex);
      onScroll({ index: tempIndex, item: items[tempIndex] });
    }
  }

  /**
   *
   * @param event
   * @returns {number}
   */
  getItemTemporaryIndex(event) {
    return Math.round(
      event.nativeEvent.contentOffset.y / this.state.itemHeight,
    );
  }

  /**
   *
   * @param index
   */
  setItemIndex(index) {
    this.setState({
      itemIndex: index,
    });
  }

  /**
   * Add fake items to make picker almost like IOS native wheel picker.
   * @returns {*[]}
   */
  extendedItems() {
    const { transparentItemRows } = this.props;
    return [
      ...this.fakeItems(transparentItemRows),
      ...this.props.items,
      ...this.fakeItems(transparentItemRows),
    ];
  }

  /**
   *
   * @param item
   * @param index
   * @returns {*}
   */
  renderPickerListItem(item, index) {
    const { itemHeight } = this.state;
    const { allItemsColor, itemColor } = this.props;
    return (
      <View
        key={index}
        style={[
          styles.listItem,
          {
            height: itemHeight,
          },
        ]}
      >
        <Text
          style={{
            color: itemColor || allItemsColor,
          }}
        >
          {item.label}
        </Text>
      </View>
    );
  }

  render() {
    const { itemIndex, itemHeight } = this.state;
    const {
      width,
      height,
      topGradientColors,
      bottomGradientColors,
      selectedItemBorderColor,
      transparentItemRows,
    } = this.props;
    return (
      <View style={{ height, width }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            this.onScroll(event);
          }}
          scrollEventThrottle
          initialScrollIndex={itemIndex}
          snapToInterval={itemHeight}
          // contentContainerStyle={{ backgroundColor: 'white' }}
        >
          {this.extendedItems().map((item, index) => this.renderPickerListItem(item, index))}
        </ScrollView>
        <View
          style={[
            styles.gradientWrapper,
            {
              top: 0,
              // borderBottomWidth: 1,
              // borderBottomColor: selectedItemBorderColor,
            },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={topGradientColors}
            style={[
              styles.pickerGradient,
              {
                height: transparentItemRows * itemHeight,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.gradientWrapper,
            {
              bottom: 0,
              // borderTopWidth: 1,
              // borderTopColor: selectedItemBorderColor,
            },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={bottomGradientColors}
            style={[
              styles.pickerGradient,
              { height: transparentItemRows * itemHeight },
            ]}
          />
        </View>
      </View>
    );
  }
}
DynamicallySelectedPicker.defaultProps = {
  items: [{ value: 0, label: 'No items', itemColor: 'red' }],
  onScroll: () => {},
  width: 300,
  height: 300,
  initialSelectedIndex: 0,
  transparentItemRows: 3,
  allItemsColor: '#000',
  selectedItemBorderColor: '#cecece',
  topGradientColors: [
    'rgba( 255, 255, 255, 1 )',
    'rgba( 255, 255, 255, 0.9 )',
    'rgba( 255, 255, 255, 0.7 )',
    'rgba( 255, 255, 255, 0.5 )',
  ],
  bottomGradientColors: [
    'rgba( 255, 255, 255, 0.5 )',
    'rgba( 255, 255, 255, 0.7 )',
    'rgba( 255, 255, 255, 0.9 )',
    'rgba( 255, 255, 255, 1 )',
  ],
};
DynamicallySelectedPicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      itemColor: PropTypes.string,
    }),
  ),
  onScroll: PropTypes.func,
  initialSelectedIndex: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  allItemsColor: PropTypes.string,
  selectedItemBorderColor: PropTypes.string,
  topGradientColors: PropTypes.array,
  bottomGradientColors: PropTypes.array,
};
const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientWrapper: {
    position: 'absolute',
    width: '100%',
  },
  pickerGradient: {
    width: '100%',
  },
});

export default DynamicallySelectedPicker;
