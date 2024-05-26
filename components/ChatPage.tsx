// screens/ChatScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ChatScreen = () => {
  const [message, setMessage] = useState<any>("");
  const [messages, setMessages] = useState<any>([]);

  const fetchResponseFromAI = async ({ message }: { message: string }) => {
    try {
      const response = await fetch("URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
    } catch (error) {
      console.error("Помилка під час взаємодії з ШІ:", error);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: message, answer: null },
      ]);
      setMessage("");
      fetchResponseFromAI;
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.message}>
      <Ionicons
        name="chatbubble-ellipses"
        size={24}
        color="black"
        style={styles.icon}
      />
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  messagesList: {
    flex: 1,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
