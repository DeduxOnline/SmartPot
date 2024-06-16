import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Визначаємо інтерфейс для стану
interface AppState {
    pots: Plant[];
    add: (pot: Plant) => void;
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
        add: (pot: Plant) => set((state) => {
            const newPots = [...state.pots, pot];
            AsyncStorage.setItem('pots', JSON.stringify(newPots));
            return { pots: newPots };
        }),
        edit: (pot: Plant) => set((state) => {
            const newPots = [...state.pots, pot];
            AsyncStorage.setItem('pots', JSON.stringify(newPots));
            return { pots: newPots };
        }),
    };
});

export default useStore;