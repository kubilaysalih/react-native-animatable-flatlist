<h1 align="center">react-native-animatable-flatlist</h1>

<p align="center">
  <p align="center">ready to go animatable flatlist based on reanimated 2</p>
  <img src="https://imgur.com/ErbDmpL.gif" />
</p>


## Features
- Hooks support
- Not opinionaded, Fully extendable
- Support for dynamic item sizes
- Fully typed with TypeScript

## Requirements
- react-native-reanimated ^2.2.0

## Installation

```sh
npm install react-native-animatable-flatlist
```


## Usage


```javascript
import React from "react";
import { useAnimatedValues, FlatList } from "react-native-animatable-flatlist";
import Animated from "react-native-reanimated"

const Card = () => {
  const {
    index,
    item,
    layout,
    contentOffset,
    direction,
    isScrolling
  } = useAnimatedValues();

  const styles = useAnimatedStyle(() => {
    return {
      // mix shared values and return style object
    }
  });

  return (
    <Animated.View
      style={styles}
    />
  );
};


export default MyCustomList = () => {
  return (
    <FlatList
      data={data}
      renderItem={() => <Card />}
    />
  )
}
```

## Example

Expo Snack

- https://snack.expo.dev/@kubilaysali/react-native-animatable-flatlist

<img src="https://imgur.com/Ey0OmHW.gif"/>
<img src="https://imgur.com/jCbvi7y.gif"/>
<img src="https://imgur.com/7P0FkLW.gif"/>

## TODO
- [ ] Create hook for scroll handler to expose internal values
- [ ] More examples

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
