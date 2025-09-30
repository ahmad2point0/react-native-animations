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
        <Text className="text-black"> Apple Invites</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/onboardpagination/onBoardPagination")}
      >
        <Text className="text-black">Pagination Animation</Text>
      </Pressable>
    </View>
  );
}
