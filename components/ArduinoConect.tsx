import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import RNBluetoothClassic, {
  BluetoothEventType,
  BluetoothDevice,
} from "react-native-bluetooth-classic";

const BluetoothExample = () => {
  const [connectedDevices, setConnectedDevices] = useState<BluetoothDevice[]>(
    []
  );

  useEffect(() => {
    console.log(RNBluetoothClassic);
    RNBluetoothClassic.getConnectedDevices().then((item) =>
      setConnectedDevices(item)
    );
  }, []);

  const sendMessageToDevice = (device: BluetoothDevice) => {
    const message = "1";
    RNBluetoothClassic.writeToDevice(device.address, message)
      .then(() => {
        console.log("Message sent successfully");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const renderItem = ({ item }: { item: BluetoothDevice }) => (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}
    >
      <Text>{item.name}</Text>
      <Button title="Send Message" onPress={() => sendMessageToDevice(item)} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={connectedDevices}
        renderItem={renderItem}
        keyExtractor={(item: BluetoothDevice) => item.address}
      />
    </View>
  );
};

export default BluetoothExample;
