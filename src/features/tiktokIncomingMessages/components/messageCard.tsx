import { Text } from '@/global/components/ui/text';
import { cn } from '@/global/lib/utils';
import { Image, View } from 'react-native';
import { ChatItem } from '../constants/chat';

interface MessageCardProps {
  item: ChatItem;
  className?: string;
}

export function MessageCard({ item, className }: MessageCardProps) {
  return (
    <View className={cn("backdrop-blur-sm rounded-lg p-3 mb-2 mx-4", className)}>
      <View className="flex-row items-start space-x-3">
        {/* Avatar */}
        <Image
          source={{ uri: item.user.avatar }}
          className="w-8 h-8 rounded-full mr-2"
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
        
        {/* Message Content */}
        <View className="flex-1">
          {/* Username */}
          <Text className="text-black font-semibold text-sm mb-1">
            {item.user.name}
          </Text>
          
          {/* Message Text */}
          <Text className="text-black text-sm leading-5">
            {item.content}
          </Text>
          
          {/* Description (optional, can be hidden if not needed) */}
          {/* {item.description && (
            <Text className="text-black/60 text-xs mt-1">
              {item.description}
            </Text>
          )} */}
        </View>
      </View>
    </View>
  );
}