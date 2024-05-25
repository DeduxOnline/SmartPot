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
  const [status, setStatus] = useState<string>("");

  const getDeviceConetion = async () => {
    try {
      const [YESBT, ONBT] = await Promise.all([
        RNBluetoothClassic.isBluetoothAvailable(),
        RNBluetoothClassic.isBluetoothEnabled(),
      ]);
      console.log(YESBT, ONBT);
      if (!YESBT || !ONBT) {
        setStatus(YESBT ? "Bluetooth is off" : "You don't have bluetooth");
        return;
      } else {
        const deviceList: BluetoothDevice[] =
          await RNBluetoothClassic.getConnectedDevices();
        setConnectedDevices(deviceList);
        setStatus(
          deviceList.length > 0 ? "Devices finded" : "Devices not finded"
        );
        return;
      }
    } catch (error) {
      console.error(error);
      setStatus(JSON.stringify(error));
      return;
    }
  };

  const renderItem = ({ item }: { item: BluetoothDevice }) => (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}
    >
      <Text>{item.name}</Text>
      <Button title="Add Pot" onPress={() => null} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text>{status}</Text>
      <Button
        title="Scan Bluetooth"
        onPress={async () => await getDeviceConetion()}
      />
      <FlatList
        data={connectedDevices}
        renderItem={renderItem}
        keyExtractor={(item: BluetoothDevice) => item.address}
      />
    </View>
  );
};

export default BluetoothExample;
