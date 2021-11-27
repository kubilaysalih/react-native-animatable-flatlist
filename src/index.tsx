import React, {
  createContext,
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
} from 'react';
import {
  LayoutChangeEvent,
  FlatList as RNFlatList,
  FlatListProps,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

type ItemWrapperProps = {
  contentOffsetY: Animated.SharedValue<number>;
  contentOffsetX: Animated.SharedValue<number>;
  contentWidth: Animated.SharedValue<number>;
  contentHeight: Animated.SharedValue<number>;
  directionY: Animated.SharedValue<number>;
  directionX: Animated.SharedValue<number>;
  isScrolling: Animated.SharedValue<boolean>;
  onCellLayout: (event: LayoutChangeEvent) => void;
  index: number;
};

type AnimatedValuesContextType = {
  index: number;
  item: {
    x: Animated.SharedValue<number>;
    y: Animated.SharedValue<number>;
    width: Animated.SharedValue<number>;
    height: Animated.SharedValue<number>;
  };
  layout: {
    width: Animated.SharedValue<number>;
    height: Animated.SharedValue<number>;
  };
  contentOffset: {
    x: Animated.SharedValue<number>;
    y: Animated.SharedValue<number>;
  };
  direction: {
    x: Animated.SharedValue<number>;
    y: Animated.SharedValue<number>;
  };
  isScrolling: Animated.SharedValue<boolean>;
};

const AnimatedValuesContext = createContext<AnimatedValuesContextType>(null!);

export const useAnimatedValues = () => useContext(AnimatedValuesContext);

const ItemWrapper = ({
  children,
  contentOffsetX,
  contentOffsetY,
  contentHeight,
  contentWidth,
  directionX,
  directionY,
  index,
  isScrolling,
  onCellLayout,
  ...rest
}: PropsWithChildren<ItemWrapperProps>) => {
  const itemWidth = useSharedValue(0);
  const itemHeight = useSharedValue(0);
  const itemY = useSharedValue(0);
  const itemX = useSharedValue(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height, x, y } = e.nativeEvent.layout;
    itemHeight.value = height;
    itemWidth.value = width;
    itemX.value = x;
    itemY.value = y;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      {...rest}
      onLayout={(e) => {
        onCellLayout(e);
        onLayout(e);
      }}
    >
      <AnimatedValuesContext.Provider
        value={{
          index: index,
          item: {
            height: itemHeight,
            width: itemWidth,
            x: itemX,
            y: itemY,
          },
          layout: {
            width: contentWidth,
            height: contentHeight,
          },
          contentOffset: {
            x: contentOffsetX,
            y: contentOffsetY,
          },
          direction: {
            x: directionX,
            y: directionY,
          },
          isScrolling: isScrolling,
        }}
      >
        {children}
      </AnimatedValuesContext.Provider>
    </Animated.View>
  );
};

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<any>>(RNFlatList);

const FlatListBase = <T,>(
  {
    scrollEventThrottle = 16,
    ...rest
  }: Omit<FlatListProps<T>, 'CellRendererComponent' | 'onScroll'>,
  ref: any
) => {
  const contentOffsetY = useSharedValue(0);
  const contentOffsetX = useSharedValue(0);
  const contentWidth = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const directionX = useSharedValue(0);
  const directionY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const handleScroll = useAnimatedScrollHandler<{ x: number; y: number }>({
    onScroll: (e, ctx) => {
      contentOffsetY.value = e.contentOffset.y;
      contentOffsetX.value = e.contentOffset.x;

      const dx = e.contentOffset.x - (ctx.x || 0);
      directionX.value = Math.sign(dx);
      ctx.x = e.contentOffset.x;

      const dy = e.contentOffset.y - (ctx.y || 0);
      directionY.value = Math.sign(dy);
      ctx.y = e.contentOffset.y;
    },
    onMomentumBegin: () => {
      isScrolling.value = true;
    },
    onMomentumEnd: () => {
      isScrolling.value = false;
      directionY.value = 0;
      directionX.value = 0;
    },
  });

  const renderCell = ({ index, children, onLayout }: any) => {
    return (
      <ItemWrapper
        contentOffsetY={contentOffsetY}
        contentOffsetX={contentOffsetX}
        contentWidth={contentWidth}
        contentHeight={contentHeight}
        directionY={directionY}
        directionX={directionX}
        index={index}
        isScrolling={isScrolling}
        onCellLayout={onLayout}
      >
        {children}
      </ItemWrapper>
    );
  };

  const onContentSizeChange = useCallback((width: number, height: number) => {
    contentHeight.value = height;
    contentWidth.value = width;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedFlatList
      {...rest}
      ref={ref}
      CellRendererComponent={renderCell}
      onScroll={handleScroll}
      onContentSizeChange={onContentSizeChange}
      scrollEventThrottle={scrollEventThrottle}
    />
  );
};

export type FlatList<ItemT = any> = RNFlatList<ItemT>;

export const FlatList = forwardRef(FlatListBase) as <T>(
  props: Omit<FlatListProps<T>, 'CellRendererComponent' | 'onScroll'> & {
    ref?: MutableRefObject<FlatList<T>>;
  }
) => ReactElement<FlatList<T>>;
