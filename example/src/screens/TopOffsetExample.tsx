import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList, useAnimatedValues } from 'react-native-animatable-flatlist';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { generateDummy } from '../dummy';

const items = generateDummy(40, true);

console.warn(items);

const Card = (props: any) => {
  const { item, contentOffset, index } = useAnimatedValues();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      borderColor: contentOffset.y.value - item.y.value < 0 ? 'black' : 'red',
      transform: [
        {
          translateX: interpolate(
            contentOffset.y.value - item.y.value,
            [0, 200],
            [0, index % 2 ? 1000 : -1000],
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
          backgroundColor: props.backgroundColor,
          height: props.height,
        },
        styles.cardContainer,
        animatedStyles,
      ]}
    />
  );
};

export default () => {
  const renderItem = ({ item }) => {
    return <Card {...item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={items}
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
  flatList: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    borderLeftWidth: 10,
    borderRightWidth: 10,
  },
});
