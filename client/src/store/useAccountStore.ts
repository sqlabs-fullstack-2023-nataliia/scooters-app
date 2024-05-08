import { create } from 'zustand';
import axios from 'axios';
import Account from '../screens/AccountComp';
export const baseURL = "http://localhost:3001/api/accounts";

export interface Account {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verifyCode: number;
    avatar: string,
    isVerify: boolean
    createdAt: Date;
    location: {
        lat: number,
        long: number,
    };
}

interface AccountState {
    account: Account | null,
    //fetchAccount: () => Promise<void>;
    addAccount: (account: any) => Promise<Account>;
    // updateAccount: (id: string, scooter: Partial<Account>) => Promise<void>;
    // deleteAccount: (id: string) => Promise<void>;
}

export const useAccountStore = create<AccountState>((set, get) => ({
    account: null,
    addAccount: async (account) => {
        const response = await axios.post<Account>(`${baseURL}/register`, account);
        set({ account: response.data });
        return response.data;
    },
}))