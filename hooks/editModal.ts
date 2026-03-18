import  { create } from "zustand";

interface editModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}



export const useEditModal = create<editModalStore> ((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}));
