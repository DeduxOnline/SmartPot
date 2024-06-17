import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getDeviceConetion } from "@/func/BTfunct";
import useStore from "@/hooks/useZustand";
import { BluetoothDevice } from "react-native-bluetooth-classic";

const AddPot = () => {
  const [connectedDevices, setConnectedDevices] = useState<
    BluetoothDevice[] | undefined
  >(undefined);
  const pots = useStore((state) => state.pots);
  const { add } = useStore();
  return (
    <View style={styles.container}>
      <Button
        title="Scan Bluetooth"
        onPress={async () => {
          const items = await getDeviceConetion();
          if (items) {
            const filteredItems = items.filter(
              (item) => !pots.some((pot) => pot.address === item.address)
            );
            setConnectedDevices(filteredItems);
          }
        }}
      />
      <FlatList
        data={connectedDevices}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => add(item.address)}
          >
            <Ionicons name="bluetooth" size={24} color="blue" />
            <Text style={styles.productName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        // keyExtractor={(item: BluetoothDevice) => item.address}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  productItem: {
    backgroundColor: "#fff",
    margin: 5,
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

export default AddPot;
