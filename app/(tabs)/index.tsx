import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

// Import images statically
const images: any = {
  1: require("@/assets/images/pot1.png"),
  2: require("@/assets/images/pot2.png"),
  3: require("@/assets/images/pot3.png"),
  4: require("@/assets/images/pot4.png"),
  5: require("@/assets/images/pot5.png"),
  6: require("@/assets/images/pot6.png"),
};

const products: any = [
  {
    id: "1",
    name: "Plant 1",
    pic: 1,
    mac: null,
    watering: true,
    light: false,
    lastConnection: "29/05/2024",
  },
  {
    id: "2",
    name: "Plant 2",
    pic: 2,
    mac: null,
    watering: true,
    light: false,
    lastConnection: "25/05/2024",
  },
  {
    id: "3",
    name: "Plant 3",
    pic: 3,
    mac: null,
    watering: true,
    light: false,
    lastConnection: "24/05/2024",
  },
  {
    id: "4",
    name: "Plant 4",
    pic: 4,
    mac: null,
    watering: true,
    light: false,
    lastConnection: "23/05/2024",
  },
  {
    id: "5",
    name: "Plant 5",
    pic: 5,
    mac: null,
    watering: true,
    light: false,
    lastConnection: "25/05/2024",
  },
  {
    id: "6",
    name: "Plant 6",
    pic: 6,
    mac: null,
    conected: false,
    lastConnection: "27/05/2024",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>You don't have pots yet</Text>
          <Button title="Add Plant" onPress={() => router.push("/add")} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productItem}
              onPress={() => router.push("/plant")}
            >
              <Image source={images[item.pic]} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <View style={{ marginLeft: "auto" }}>
                <Text>Last time conected at {item.lastConnection}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
    textAlign: "center",
  },
  productItem: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 40,
    height: 40,
  },
  productName: {
    fontSize: 18,
    marginLeft: 10,
  },
  addButtonContainer: {
    marginBottom: 20,
  },
});
