import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { router } from "expo-router";

const images: any = {
  1: require("@/assets/images/pot1.png"),
  2: require("@/assets/images/pot2.png"),
  3: require("@/assets/images/pot3.png"),
  4: require("@/assets/images/pot4.png"),
  5: require("@/assets/images/pot5.png"),
  6: require("@/assets/images/pot6.png"),
};

const FormPage = () => {
  const [name, setName] = useState("");
  const [toggle1, setToggle1] = useState(false);
  const [number1, setNumber1] = useState("40");
  const [number2, setNumber2] = useState("70");
  const [pictureNum, setPictureNum] = useState(1);

  const handleSave = () => {
    console.log("Name:", name);
    console.log("Toggle 1:", toggle1);
    console.log("Number 1:", number1);
    console.log("Number 2:", number2);
    setName("");
    setToggle1(false);
    setNumber1("");
    setNumber2("");
    router.replace("/");
  };

  const handleCancel = () => {
    router.replace("/");
  };

  const handlePrevPicture = () => {
    setPictureNum((prevNum) =>
      prevNum === 1 ? Object.keys(images).length : prevNum - 1
    );
  };

  const handleNextPicture = () => {
    setPictureNum((prevNum) =>
      prevNum === Object.keys(images).length ? 1 : prevNum + 1
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Button title="<" onPress={handlePrevPicture} />
        <Image
          source={images[pictureNum]}
          style={{ width: 200, height: 200 }}
        />
        <Button title=">" onPress={handleNextPicture} />
      </View>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Automatic watering:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enable: </Text>
        <Switch value={toggle1} onValueChange={setToggle1} />
      </View>
      <Text style={styles.label}>Advance option:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Minimum moist</Text>
        <TextInput
          style={styles.numberInput}
          value={number1}
          onChangeText={setNumber1}
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <Text style={styles.label}> %</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Maximum moist</Text>
        <TextInput
          style={styles.numberInput}
          value={number2}
          onChangeText={setNumber2}
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <Text style={styles.label}> %</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default FormPage;
