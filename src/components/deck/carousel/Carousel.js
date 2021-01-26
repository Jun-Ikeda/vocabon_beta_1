import React, { useState, useEffect } from 'react';

import {
  View, StyleSheet, Dimensions,
} from 'react-native';
import DeckCarousel, { Pagination } from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import Color from '../../../config/Color';
import { func } from '../../../config/Const';
import CarouselCard from './CarouselCard';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Carousel Component
 * @augments {Component<Props, State>}
 * Usage :
 * ```js
 * <Carousel
 *    deckIDs={[array]}
 *    countainerStyle={{ style }}
 *    onPressCard={() => { function }}
 * />
 *
 * ```
 */
const Carousel = (props) => {
  //
  const { height: heightInitial, width: widthInitial } = Dimensions.get('screen');
  // props
  const { deckIDs, onPressCard, countainerStyle } = props;
  // state
  const [layout, setLayout] = useState({ height: 0, width: 0 });
  const [screen, setScreen] = useState({ height: heightInitial, width: widthInitial });
  const [activeIndex, setActiveIndex] = useState(0);
  // ref
  let carousel = {};

  useEffect(() => {
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      setScreen({ width, height });
    });
  }, []);

  const cardStyle = (screen.height > screen.width) ? {
    width: layout.width * 0.8,
    height: layout.width * 0.5,
  } : {
    width: layout.width * 0.6,
    height: layout.width * 0.4,
  };

  const renderItem = ({ item: deckID/* , index */ }) => (
    <CarouselCard
      deckID={deckID}
      onPress={() => onPressCard(deckID)}
      cardStyle={{
        ...cardStyle,
        borderRadius: layout.width * 0.03,
      }}
    />
  );

  return (
    <View
      style={[style.container, countainerStyle]}
      onLayout={(e) => setLayout(func.onLayoutContainer(e))}
    >
      {(layout.height !== 0) ? (
        <DeckCarousel
          data={deckIDs}
          renderItem={renderItem}
          itemWidth={cardStyle.width}
          sliderWidth={layout.width * 1.0}
          onSnapToItem={(index) => setActiveIndex(index)}
          ref={(ref) => { carousel = ref; }}
        />
      )
        : null}
      <Pagination
        dotsLength={deckIDs.length}
        inactiveDotStyle={{ backgroundColor: Color.gray2 }}
        activeDotIndex={activeIndex}
        containerStyle={{ paddingTop: 25, paddingBottom: 10 }}
        // countainerStyle={{ paddingVertical: 10 }}
        dotStyle={{ backgroundColor: Color.gray4 }}
      />
    </View>
  );
};

Carousel.propTypes = {
  deckIDs: PropTypes.array,
  countainerStyle: PropTypes.object,
  onPressCard: PropTypes.func,
};

Carousel.defaultProps = {
  deckIDs: [],
  countainerStyle: {},
  onPressCard: () => {},
};

export default Carousel;

/* class DeckCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[style.container]}
      >
        <Carousel
          data={['a', 'b', 'c']}
          renderItem={({ item }) => <Text>{item}</Text>}
          itemWidth={180}
          sliderWidth={300}
        />
      </View>
    );
  }
} */

/* class DeckCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      layout: { height: 300, width: 400 },
    };
    this.carouselRef = {};
  }

  render() {
    const { active, layout: { width } } = this.state;
    const { decks } = this.props;
    return (
      <View
        style={[style.container]}
        onLayout={(e) => {
          this.setState({ layout: func.onLayoutContainer(e) });
        }}
      >
        <Carousel
          data={['a', 'b', 'c']}
          renderItem={({ item }) => <Text>{item}</Text>}
          itemWidth={width * 0.6}
          sliderWidth={width * 1.0}
          onSnapToItem={(index) => this.setState({ active: index })}
          ref={(carouselRef) => {
            this.carouselRef = carouselRef;
          }}
        />
        <Pagination
          dotsLength={decks.length}
          activeDotIndex={active}
          containerStyle={{ paddingVertical: 15 }}
          dotStyle={{ backgroundColor: Color.white3 }}
        />
      </View>
    );
  }
}

export default DeckCarousel;
 */
