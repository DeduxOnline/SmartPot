import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BluetoothDevice } from "react-native-bluetooth-classic";

interface AppState {
    count: number;
    increment: () => void;
    decrement: () => void;
}

// Load initial state from AsyncStorage or use default values
const initialState: AppState = {
    count: 0,
    increment: () => { },
    decrement: () => { },
};

// Create the store
const useStore = create<AppState>((set, get) => ({
    ...initialState,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Load state from AsyncStorage on store creation
(async () => {
    try {
        const savedState = await AsyncStorage.getItem('appState');
        if (savedState !== null) {
            useStore.setState(JSON.parse(savedState));
        }
    } catch (error) {
        console.error('Error loading state from AsyncStorage:', error);
    }
})();

// Save state to AsyncStorage on state change
useStore.subscribe(
    async (state) => {
        try {
            await AsyncStorage.setItem('appState', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving state to AsyncStorage:', error);
        }
    }
);

export default useStore;
