import * as React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { FlatList, useAnimatedValues } from 'react-native-animatable-flatlist';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { generateDummy } from '../dummy';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const items = generateDummy(10);

const Card = (props: any) => {
  const { contentOffset, index } = useAnimatedValues();

  const inputValues = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            contentOffset.x.value,
            inputValues,
            [0.7, 1, 0.7],
            Extrapolate.CLAMP
          ),
        },
        {
          translateX: interpolate(
            contentOffset.x.value,
            inputValues,
            [-140, 0, 140],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          height: props.height,
          width: SCREEN_WIDTH,
        },
        styles.carouselContainer,
        animatedStyles,
      ]}
    >
      <Animated.View
        style={[
          { backgroundColor: props.backgroundColor },
          styles.imageContainer,
        ]}
      >
        <Image
          resizeMode="cover"
          source={{ uri: props.image }}
          style={styles.cardImage}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default () => {
  const renderItem = ({ item }) => {
    return <Card {...item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        horizontal
        initialNumToRender={50}
        removeClippedSubviews={false}
        snapToInterval={SCREEN_WIDTH}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.text.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});
