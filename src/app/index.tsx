import VerticalList from "@/features/components/verticalList";
import data from "@/features/faker/mockData";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-black">
      <VerticalList data={data} />
    </View>
  );
}
