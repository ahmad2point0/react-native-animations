import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Item } from "../faker/mockData";

type VerticalListProps = {
  data: Item[];
};

type AnimatedCardProps = {
  item: Item;
  index: number;
  scrollY: SharedValue<number>;
};

const { height } = Dimensions.get("screen");

const _spacer = 8;
const _itemSize = height * 0.72;
const _itemFullSize = _itemSize + _spacer * 2;

function AnimatedCard({ item, index, scrollY }: AnimatedCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.5, 1, 0.5]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.95, 1, 0.95]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          height: _itemSize,
          padding: _spacer * 2,
          borderRadius: 8,
          gap: _spacer,
        },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
        blurRadius={50}
      />
      <Image
        source={{ uri: item.image }}
        style={{
          flex: 1,
          height: _itemSize * 0.4,
        }}
      />
      <View>
        <Text
          className="font-bold text-white"
          style={{ fontSize: 24 }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text className="text-white" numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      <View className="flex-row items-center gap-4">
        <Image
          source={{ uri: item.author.avatar }}
          style={{ aspectRatio: 1, width: 24, borderRadius: 12 }}
        />
        <Text className="text-white">{item.author.name}</Text>
      </View>
    </Animated.View>
  );
}

export default function VerticalList({ data }: VerticalListProps) {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / _itemFullSize;
  });
  return (
    <Animated.FlatList
      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacer * 3,
        paddingVertical: (height - _itemFullSize) / 2,
        gap: _spacer * 2,
      }}
      renderItem={({ item, index }) => (
        <AnimatedCard index={index} scrollY={scrollY} item={item} />
      )}
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
}
