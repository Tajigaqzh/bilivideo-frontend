import {defineStore} from "pinia";

import {getInfo, loginByPassword, LoginParam} from "@/api/user.ts";

import {store} from "@/store/index.ts";

export interface UserRole {
    id: number;
    roleName: string;
    roleTag: string;
}

export interface UserState {
    username: string;
    nickname: string;
    // sex: number;
    id: number;
    sex: number | null;
    avatar: string;
    coin: number;
    level: number;
    roles: Array<UserRole>
}

export const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            username: "",
            nickname: "",
            id: 0,
            avatar: "",
            sex: null,
            coin: 0,
            level: 0,
            roles: []
        };
    },

    actions: {
        async login(param: LoginParam) {
            const {code} = await loginByPassword(param);
            if (code === 200) {
                const res = await getInfo();
                if (res.code === 200) {
                    this.$state = res.data;
                    return Promise.resolve(1)
                }
            }
        },
    },
    getters: {
        avatarUrl: (state) => {
            return import.meta.env.VITE_PICPREFIX + state.avatar
        }
    },
    persist: true
});

export function useUserStoreHook() {
    return useUserStore(store);
}