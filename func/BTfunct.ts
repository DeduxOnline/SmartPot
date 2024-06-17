import RNBluetoothClassic, {
    BluetoothDevice,
} from "react-native-bluetooth-classic";
import {
    Alert
} from "react-native";


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

export const getDeviceConetion = async () => {
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
            return deviceBonded;
        }
    } catch (error: any) {
        console.error(error.message);
        showAlert(error.message);
        return;
    }
};

// export const addPot = async (item: BluetoothDevice) => {
//     try {
//         const conecnted = await item.connect();
//         if (conecnted) {
//             item.write("Hello");
//             showAlert("Write to BT");
//         } else {
//             showAlert("Can't conect");
//         }
//     } catch (error: any) {
//         console.error(error.message);
//         showAlert(error.message);
//         return;
//     }
// };