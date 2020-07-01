import React, {Component} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

const images = [
  'https://i.ibb.co/87vMVwS/astro1.jpg',
  'https://i.ibb.co/yQmMdnB/astro2.jpg',
  'https://i.ibb.co/kBH7gbL/astro3.jpg',
];

export default class Carousel extends Component {
  numItems = images.length;
  itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  animVal = new Animated.Value(0);

  render() {
    let imageArray = [];
    let barArray = [];
    images.forEach((image, i) => {
      // console.log("sddd"+image, i)
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          //    source={require('../../image/carousel-book.jpg')}
          style={styles.imageSize}
        />
      );
      imageArray.push(thisImage);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [{translateX: scrollBarVal}],
              },
            ]}
          />
        </View>
      );
      barArray.push(thisBar);
    });

    return (
      <View style={styles.container} flex={1}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: this.animVal}}},
          ])}>
          {imageArray}
        </ScrollView>
        <View style={styles.barContainer}>{barArray}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 260,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 3,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 3,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  imageSize: {width: deviceWidth, height: 300},
});
