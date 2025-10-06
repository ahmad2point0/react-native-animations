import { MessageCard } from "@/features/tiktokIncomingMessages/components/messageCard";
import TiktokMessages from "@/features/tiktokIncomingMessages/components/tiktokMessages";
import {
  ChatItem,
  generateChatMessage,
} from "@/features/tiktokIncomingMessages/constants/chat";
import { Button } from "@/global/components/ui/button";
import { Text } from "@/global/components/ui/text";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [messages, setMessages] = useState<ChatItem[]>(
    [...Array(10).keys()].map(generateChatMessage)
  );
  const [currentSpeed, setCurrentSpeed] = useState<'off' | 'slow' | 'medium' | 'fast'>('off');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Speed configurations (in milliseconds)
  const speedConfig = {
    off: 0,
    slow: 2000, 
    medium: 1000, 
    fast: 800,    
  };

  // Function to add a new message
  const addNewMessage = () => {
    const newMessage = generateChatMessage();
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  // Function to start/stop message generation based on speed
  const setSpeed = (speed: 'off' | 'slow' | 'medium' | 'fast') => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setCurrentSpeed(speed);

    // Start new interval if speed is not 'off'
    if (speed !== 'off') {
      intervalRef.current = setInterval(addNewMessage, speedConfig[speed]);
    }
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <TiktokMessages
        data={messages}
        renderItem={({ item }) => {
          return <MessageCard item={item} />;
        }}
      />
      
      {/* Speed Control Buttons */}
      <View className="p-4 bg-gray-100 border-t border-gray-200">
        <Text className="text-center text-sm font-medium text-gray-600 mb-3">
          Message Generation Speed
        </Text>
        <View className="flex-row justify-between space-x-2">
          <Button
            variant={currentSpeed === 'off' ? 'default' : 'outline'}
            className="flex-1"
            onPress={() => setSpeed('off')}
          >
            <Text>Off</Text>
          </Button>
          
          <Button
            variant={currentSpeed === 'slow' ? 'default' : 'outline'}
            className="flex-1"
            onPress={() => setSpeed('slow')}
          >
            <Text>Slow</Text>
          </Button>
          
          <Button
            variant={currentSpeed === 'medium' ? 'default' : 'outline'}
            className="flex-1"
            onPress={() => setSpeed('medium')}
          >
            <Text>Medium</Text>
          </Button>
          
          <Button
            variant={currentSpeed === 'fast' ? 'default' : 'outline'}
            className="flex-1"
            onPress={() => setSpeed('fast')}
          >
            <Text>Fast</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
