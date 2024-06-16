import React from "react";
import { View, Pressable, Text, FlatList, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const buttons = [
  {
    title: "Debug mode",
    icon: "bug",
    onPress: () => console.log("Debug mode pressed"),
  },
  {
    title: "Reset all pots settings",
    icon: "refresh",
    onPress: () => console.log("Reset all pots settings pressed"),
  },
  {
    title: "App reset",
    icon: "refresh-circle",
    onPress: () => console.log("App reset pressed"),
  },
  {
    title: "Auther link",
    icon: "link",
    onPress: () => console.log("Auther link pressed"),
  },
  {
    title: "Report issue",
    icon: "alert",
    onPress: () => console.log("Report issue pressed"),
  },
  {
    title: "App code",
    icon: "code",
    onPress: () => console.log("App code pressed"),
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={buttons}
        renderItem={({ item }) => (
          <Pressable style={styles.productItem} onPress={item.onPress}>
            <Ionicons name={item.icon ?? undefined} size={24} color="black" />
            <Text style={styles.productName}>{item.title}</Text>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  productItem: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    marginLeft: 10,
  },
});
