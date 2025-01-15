import { PersistOptions } from "zustand/middleware";

export interface ISessionStore {
    access_token: string;
    login: string;
    is_premium: boolean;
    setToken: (token: string) => void;
    setLogin: (login: string) => void;
    setIsPremium: (premium: boolean) => void;
}

export type TPersistSessionStore = PersistOptions<ISessionStore>;