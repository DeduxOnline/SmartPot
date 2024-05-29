import React from "react";
import { View, Button, Alert } from "react-native";

export default function HomeScreen() {
  const showAlert = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Message",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Alert" onPress={showAlert} />
    </View>
  );
}
