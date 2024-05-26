import { create } from "zustand";

const appStore = (set: any, get: any) => ({
    plants: []
});

const useBookStore = create(appStore);

export default useBookStore;