import {LiveState} from "@/store/liveStore.ts";
import {defineStore} from "pinia";


export type PiniaCacheRootState = {
    muted: boolean;
    volume: number;
    'resource-list': LiveState['allTrack'];
};

export const useCacheStore = defineStore("hp_cache", {
    state: (): PiniaCacheRootState => {
        return {
            muted: true,
            volume: 80,
            'resource-list': [],
        }
    },

    actions: {
        getResourceList(){
            return this['resource-list']
        },
        setResourceList(res: PiniaCacheRootState['resource-list']) {
            this['resource-list'] = res;
        },
        setMuted(res: PiniaCacheRootState['muted']) {
            this.muted = res;
        },
        setVolume(res: PiniaCacheRootState['volume']) {
            this.volume = res;
        },
    },
    persist: true,
})


