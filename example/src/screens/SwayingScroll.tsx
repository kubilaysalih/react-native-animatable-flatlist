import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { FlatList, useAnimatedValues } from 'react-native-animatable-flatlist';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { generateDummy } from '../dummy';

const items = generateDummy(30, true);

const Card = (props: any) => {
  const {
    direction: { y },
  } = useAnimatedValues();

  const sway = useDerivedValue(() => {
    return withSpring(interpolate(y.value, [-1, 0, 1], [-30, 0, 30]));
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateX: sway.value + 'deg' }],
    };
  }, []);

  return (
    <Animated.View
      style={[
        { backgroundColor: props.backgroundColor, height: props.height },
        styles.cardContainer,
        animatedStyles,
      ]}
    >
      <Image
        resizeMode="cover"
        source={{ uri: props.image }}
        style={styles.cardImage}
      />
    </Animated.View>
  );
};

export default () => {
  const renderItem = ({ item }) => {
    return <Card {...item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList<typeof items[0]>
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
    margin: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});
