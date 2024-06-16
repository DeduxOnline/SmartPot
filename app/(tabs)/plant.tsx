import React, { useState } from "react";
import { images } from "@/constants/Picturs";
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

const EditPage = ({
  formData,
  mac,
}: {
  formData: Plant | undefined;
  mac: string;
}) => {
  const [plant, setPlant] = useState<Plant>(
    formData ?? {
      pictureNum: 1,
      name: "Plant",
      address: mac,
      watering: { status: false, min: "40", max: "70" },
      light: { status: false, lux: "100", timeRunH: "2" },
    }
  );

  const handleSave = () => {
    console.log("Plant Data:", plant);
    router.replace("/");
  };

  const handleCancel = () => {
    router.replace("/");
  };

  const handlePrevPicture = () => {
    setPlant((prevPlant) => ({
      ...prevPlant,
      pictureNum:
        prevPlant.pictureNum === 1
          ? Object.keys(images).length
          : prevPlant.pictureNum - 1,
    }));
  };

  const handleNextPicture = () => {
    setPlant((prevPlant) => ({
      ...prevPlant,
      pictureNum:
        prevPlant.pictureNum === Object.keys(images).length
          ? 1
          : prevPlant.pictureNum + 1,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Button title="<" onPress={handlePrevPicture} />
        <Image
          source={images[plant.pictureNum]}
          style={{ width: 75, height: 75 }}
        />
        <Button title=">" onPress={handleNextPicture} />
      </View>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={plant.name}
        onChangeText={(text) =>
          setPlant((prevPlant) => ({ ...prevPlant, name: text }))
        }
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Automatic watering:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enable: </Text>
        <Switch
          value={plant.watering.status}
          onValueChange={(value) =>
            setPlant((prevPlant) => ({
              ...prevPlant,
              watering: { ...prevPlant.watering, status: value },
            }))
          }
        />
      </View>
      <Text style={styles.label}>Advance option:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Minimum moist </Text>
        <TextInput
          style={styles.numberInput}
          value={plant.watering.min}
          onChangeText={(text) =>
            setPlant((prevPlant) => ({
              ...prevPlant,
              watering: { ...prevPlant.watering, min: text },
            }))
          }
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <Text style={styles.label}> %</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Maximum moist </Text>
        <TextInput
          style={styles.numberInput}
          value={plant.watering.max}
          onChangeText={(text) =>
            setPlant((prevPlant) => ({
              ...prevPlant,
              watering: { ...prevPlant.watering, max: text },
            }))
          }
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <Text style={styles.label}> %</Text>
      </View>
      <Text style={styles.label}>Additional light:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enable: </Text>
        <Switch
          value={plant.light.status}
          onValueChange={(value) =>
            setPlant((prevPlant) => ({
              ...prevPlant,
              light: { ...prevPlant.light, status: value },
            }))
          }
        />
      </View>
      <Text style={styles.label}>Advance option:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lights on </Text>
        <TextInput
          style={styles.numberInput}
          value={plant.light.lux}
          onChangeText={(text) =>
            setPlant((prevPlant) => ({
              ...prevPlant,
              light: { ...prevPlant.light, lux: text },
            }))
          }
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <Text style={styles.label}> lux</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time work </Text>
        <TextInput
          style={styles.numberInput}
          value={plant.light.timeRunH}
          onChangeText={(text) =>
            setPlant((prevPlant) => ({
              ...prevPlant,
              light: { ...prevPlant.light, timeRunH: text },
            }))
          }
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <Text style={styles.label}> h</Text>
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

export default EditPage;
