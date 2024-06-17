import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { router } from "expo-router";
import { images } from "@/constants/Picturs";
import useStore from "@/hooks/useZustand";

export default function HomeScreen() {
  const pots = useStore((state) => state.pots);
  return (
    <View style={styles.container}>
      {pots.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>You don't have pots yet</Text>
          <Button title="Add Plant" onPress={() => router.push("/add")} />
        </View>
      ) : (
        <FlatList
          data={pots}
          keyExtractor={(item) => item.address}
          renderItem={({ item }) => (
            <Pressable
              style={styles.productItem}
              onPress={() => router.push("/plant")}
            >
              <Image
                source={images[item.pictureNum]}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.name}</Text>
            </Pressable>
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
