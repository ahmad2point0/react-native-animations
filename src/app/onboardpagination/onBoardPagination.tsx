import OnBoard from "@/features/onboardPagination/components/onBoard";
import React, { useState } from "react";
import { View } from "react-native";

export default function BoardPagination() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <View className="flex-1 justify-center">
      <OnBoard
        total={4}
        selectedIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
      />
    </View>
  );
}
