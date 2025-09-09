import { Text } from "@/global/components";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => router.push("/appleInviteAnimation/appleInvite")}
      >
        <Text> Apple Invites</Text>
      </Pressable>
    </View>
  );
}
