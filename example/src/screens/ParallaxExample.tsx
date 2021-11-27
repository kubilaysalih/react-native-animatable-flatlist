import * as React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import { FlatList, useAnimatedValues } from 'react-native-animatable-flatlist';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { generateDummy } from '../dummy';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const items = generateDummy(10);

const Card = (props: any) => {
  const { index, contentOffset } = useAnimatedValues();

  const inputValues = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const animatedImageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            contentOffset.x.value,
            inputValues,
            [-300, 0, 300],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, []);

  return (
    <View
      style={[
        {
          backgroundColor: props.backgroundColor,
        },
        styles.cardContainer,
      ]}
    >
      <Animated.View style={animatedImageStyles}>
        <Image
          resizeMode="cover"
          source={{ uri: props.image }}
          style={styles.cardImage}
        />
      </Animated.View>
    </View>
  );
};

export default () => {
  const renderItem = ({ item }) => {
    return <Card {...item} />;
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={items}
      renderItem={renderItem}
      snapToInterval={SCREEN_WIDTH}
      keyExtractor={(item) => item.text.toString()}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});
