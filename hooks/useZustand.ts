import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Визначаємо інтерфейс для стану
interface AppState {
    pots: Plant[];
    add: (address: string) => void;
    edit: (pot: Plant) => void;
}

// Створюємо стор
const useStore = create<AppState>((set) => {
    // Ініціалізація стану з AsyncStorage
    AsyncStorage.getItem('pots')
        .then((value) => {
            return value !== null ? { pots: [] } : { pots: JSON.parse(value ?? "") }
        })
        .catch((error) => {
            console.error("Error fetching pots from AsyncStorage:", error);
            return { pots: [] }; // Return a default state in case of error
        });

    return {
        pots: [],
        add: (address: string) => set((state) => {
            const Plant: Plant = {
                pictureNum: 1,
                address: address,
                name: "Plant",
                watering: {
                    status: false,
                    min: "30",
                    max: "40",
                },
                light: {
                    status: false,
                    lux: "20",
                    timeRunH: "2",
                }
            }
            const newPots = [...state.pots, Plant];
            AsyncStorage.setItem('pots', JSON.stringify(newPots));
            return { pots: newPots };
        }),
        edit: (pot: Plant) => set((state) => {
            const filterPots = state.pots.filter(item => item.address !== pot.address)
            const newPots = [...filterPots, pot];
            AsyncStorage.setItem('pots', JSON.stringify(newPots));
            return { pots: newPots };
        }),
    };
});

export default useStore;