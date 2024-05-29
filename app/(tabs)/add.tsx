import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import RNBluetoothClassic, {
  BluetoothEventType,
  BluetoothDevice,
} from "react-native-bluetooth-classic";

const AddPot = () => {
  const [connectedDevices, setConnectedDevices] = useState<BluetoothDevice[]>(
    []
  );

  const showAlert = (msg: string) => {
    Alert.alert(
      "Bluetooth Pot",
      msg,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  const getDeviceConetion = async () => {
    try {
      const [YESBT, ONBT] = await Promise.all([
        RNBluetoothClassic.isBluetoothAvailable(),
        RNBluetoothClassic.isBluetoothEnabled(),
      ]);
      console.log(YESBT, ONBT);
      if (!YESBT || !ONBT) {
        showAlert(YESBT ? "Bluetooth is off" : "You don't have bluetooth");
        return;
      } else {
        const deviceBonded: BluetoothDevice[] =
          await RNBluetoothClassic.getBondedDevices();
        // showAlert(JSON.stringify(deviceBonded, null, 2));
        setConnectedDevices(deviceBonded);
        return;
      }
    } catch (error: any) {
      console.error(error.message);
      showAlert(error.message);
      return;
    }
  };

  const addPot = async (item: BluetoothDevice) => {
    try {
      const conecnted = await item.connect();
      if (conecnted) {
        item.write("Hello");
        showAlert("Write to BT");
      } else {
        showAlert("Can't conect");
      }
    } catch (error: any) {
      console.error(error.message);
      showAlert(error.message);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Scan Bluetooth"
        onPress={async () => await getDeviceConetion()}
      />
      <FlatList
        data={connectedDevices}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => addPot(item)}
          >
            <Ionicons name="bluetooth" size={24} color="blue" />
            <Text style={styles.productName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item: BluetoothDevice) => item.address}
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
