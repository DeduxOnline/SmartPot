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

const AddPot = () => {
  const [connectedDevices, setConnectedDevices] = useState<any[] | undefined>(
    undefined
  );

  return (
    <View style={styles.container}>
      <Button
        title="Scan Bluetooth"
        onPress={async () =>
          getDeviceConetion().then((items) => setConnectedDevices(items))
        }
      />
      <FlatList
        data={connectedDevices}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem} onPress={() => null}>
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
