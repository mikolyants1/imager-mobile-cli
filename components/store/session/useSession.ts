import { create } from "zustand";
import { ISessionStore, TPersistSessionStore } from "./types";
import {  createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSession = create(persist((set) => ({
    access_token: '',
    is_premium: false,
    login: '',
    setIsPremium: (is_premium: boolean) => {
        set({ is_premium })
    },
    setLogin: (login: string) => {
        set({ login })
    },
    setToken: (access_token: string) => {
        set({ access_token })
    }
}), { name: '', storage: createJSONStorage(() => AsyncStorage)}))