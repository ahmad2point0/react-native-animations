import { Marquee } from "@animatereactnative/marquee";
import { Stagger } from "@animatereactnative/stagger";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { ms } from "react-native-size-matters";
const mockImages = [
  "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1662057630608-4ee16868429c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGN5YmVycHVuayUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1717106038354-1255c95aa082?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fG5lb24lMjBnaXJsfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1678937608193-070dde9b963a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fG5lb24lMjBnaXJsfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1551361975-61fdff227c70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5lb24lMjBnaXJsfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1512646605205-78422b7c7896?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmVvbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1548366565-6bbab241282d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmVvbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
];

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = _itemWidth * 1.67;
const _itemRadius = ms(16);
const _spacing = ms(16);
const _itemSize = _itemWidth + _spacing;
function Item({
  image,
  index,
  offset,
}: {
  image: string;
  index: number;
  offset: SharedValue<number>;
}) {
  const itemPosition = index * _itemSize - width - _itemSize / 2;
  const totalSize = mockImages.length * _itemSize;

  const animatedStyle = useAnimatedStyle(() => {
    const range =
      ((itemPosition - (offset.value + totalSize * 1000)) % totalSize) +
      width +
      _itemSize / 2;

    return {
      transform: [
        {
          rotate: `${interpolate(range, [-_itemSize, (width - _itemSize) / 2, width], [-3, 0, 3])}deg`,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: _itemWidth,
          height: _itemHeight,
          borderRadius: _itemRadius,
        },
        animatedStyle,
      ]}
    >
      <Image
        source={{ uri: image }}
        className="flex-1 "
        style={{ borderRadius: _itemRadius }}
      />
    </Animated.View>
  );
}

export default function AppleInvite() {
  const offset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useAnimatedReaction(
    () => {
      const floatValue =
        ((offset.value + width / 2) / _itemSize) % mockImages.length;

      return Math.abs(Math.floor(floatValue));
    },
    (value) => runOnJS(setActiveIndex)(value)
  );
  return (
    <View className="flex-1 justify-center items-center bg-black ">
      <View style={[StyleSheet.absoluteFillObject]} className="opacity-50">
        <Animated.Image
          key={`image-${activeIndex}`}
          source={{ uri: mockImages[activeIndex] }}
          className="flex-1 "
          blurRadius={60}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          className="flex-row"
          style={{ gap: _spacing }}
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(1))
            .withInitialValues({
              transform: [
                {
                  translateY: -_itemHeight / 2,
                },
              ],
            })}
        >
          {mockImages.map((image, index) => (
            <Item
              image={image}
              index={index}
              key={`image-${index}`}
              offset={offset}
            />
          ))}
        </Animated.View>
      </Marquee>
      <Stagger
        stagger={500}
        duration={500}
        initialEnteringDelay={1000}
        style={{ flex: ms(0.6), alignItems: "center", marginTop: ms(30) }}
      >
        <Text className="text-white text-2xl font-bold text-center mt-8">
          Welcome to the Experience
        </Text>
        <Text className="text-white/70 text-lg text-center mt-2 px-8">
          Discover amazing visuals and animations
        </Text>
        <Text className="text-white/50 text-base text-center mt-4 px-8">
          Swipe through the gallery to explore
        </Text>
      </Stagger>
    </View>
  );
}
