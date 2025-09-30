import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import Animated, {
  AnimatedProps,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutLeft,
  interpolateColor,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { ms, vs } from "react-native-size-matters";
type onBoardTypes = {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
};

const _spacing = ms(8);
const _buttonHeight = vs(34);
const _layoutAnimation = LinearTransition.springify()
  .damping(80)
  .stiffness(200);
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;
const _activeDot = "#fff";
const _inactiveDot = "#aaa";

function Dot({
  index,
  animation,
}: {
  index: number;
  animation: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animation.value,
      [index - 1, index, index + 1],
      [_inactiveDot, _activeDot, _activeDot]
    );
    return {
      backgroundColor,
    };
  });

  return (
    <View
      style={{
        width: _dotContainer,
        height: _dotContainer,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            width: _dotSize,
            height: _dotSize,
            borderRadius: _dotSize,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
function AnimationIndicator({ animation }: { animation: SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: _dotContainer + _dotContainer * animation.value,
    };
  });
  return (
    <Animated.View
      className=" bg-green-500 absolute left-0 top-0"
      style={[
        animatedStyle,
        {
          height: _dotContainer,
          width: _dotContainer,
          borderRadius: _dotContainer,
        },
      ]}
    ></Animated.View>
  );
}

function Pagination({
  total,
  selectedIndex,
}: {
  total: number;
  selectedIndex: number;
}) {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    });
  });
  return (
    <View className="self-center">
      <View className="flex-row">
        <AnimationIndicator animation={animation} />
        {[...Array(total).keys()].map((i) => (
          <Dot key={`index-${i}`} animation={animation} index={i} />
        ))}
      </View>
    </View>
  );
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
function Button({ children, style, ...props }: AnimatedProps<PressableProps>) {
  return (
    <AnimatedPressable
      {...props}
      style={[
        style,
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: _spacing * 2,
        },
      ]}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_layoutAnimation}
    >
      {children}
    </AnimatedPressable>
  );
}
export default function OnBoard({
  total,
  selectedIndex,
  onIndexChange,
}: onBoardTypes) {
  return (
    <View className="gap-4 px-5">
      <Pagination selectedIndex={selectedIndex} total={total} />
      <View className="flex-row " style={{ gap: _spacing }}>
        {selectedIndex > 0 && (
          <Button
            style={{ backgroundColor: "#ddd" }}
            onPress={() => {
              onIndexChange(selectedIndex - 1);
            }}
          >
            <Text>Back</Text>
          </Button>
        )}
        <Button
          style={{
            backgroundColor: "blue",
            flex: 1,
          }}
          onPress={() => {
            if (selectedIndex === total - 1) {
              return;
            }
            onIndexChange(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              className="text-white"
              entering={FadeInDown.springify().damping(80).stiffness(50)}
              exiting={FadeInUp.springify().damping(80).stiffness(50)}
            >
              Continue
            </Animated.Text>
          ) : (
            <Animated.Text
              className="text-white"
              layout={_layoutAnimation}
              entering={FadeInDown.springify().damping(80).stiffness(50)}
              exiting={FadeInUp.springify().damping(80).stiffness(50)}
            >
              Next
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
}
