import React from "react";
import { FlatListProps, ListRenderItem } from "react-native";
import Animated, {
  FadeInDown,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { MAX_MESSAGES } from "../constants/chat";

type TiktokMessagesType<T> = FlatListProps<T> & {
  renderItem: ListRenderItem<T>;
};

function AnimatedItems({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const newIndex = useDerivedValue(() => {
    return withSpring(index, { damping: 80, stiffness: 100 });
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / MAX_MESSAGES]),
    };
  });
  return (
    <Animated.View
      entering={FadeInDown.springify().damping(80).stiffness(200)}
      style={animatedStyles}
    >
      {children}
    </Animated.View>
  );
}

export default function TiktokMessages<T>({
  renderItem,
  ...rest
}: TiktokMessagesType<T>) {
  const { CellRendererComponent, ...animatedFlatListProps } = rest;
  return (
    <Animated.FlatList
      {...animatedFlatListProps}
      inverted
      itemLayoutAnimation={LinearTransition.springify()
        .damping(80)
        .stiffness(200)}
      renderItem={(props) => {
        return (
          <AnimatedItems index={props.index}>{renderItem(props)}</AnimatedItems>
        );
      }}
    />
  );
}
