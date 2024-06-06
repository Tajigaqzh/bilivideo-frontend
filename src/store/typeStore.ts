import {defineStore} from "pinia";

import {store} from "@/store/index.ts";


export interface VideoType {
    id: number;
    typeName: string;
    isActive: boolean;
}

export interface TypeState {
    types: VideoType[]
}

export const useTypeStore = defineStore('type', {
    state: (): TypeState => {
        return {
            types: []
        }
    },

    actions: {},
    getters: {},
    persist: true
});

export function useTypeStoreHook() {
    return useTypeStore(store);
}