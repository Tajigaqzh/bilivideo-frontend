import {defineStore} from "pinia";
import {WebSocketClass} from "@/network/webSocket.ts";
import {WebRTCClass} from "@/network/webRTC.ts";


type NetworkRootState = {
    wsMap: Map<string, WebSocketClass>;
    rtcMap: Map<string, WebRTCClass>;
};
export const useNetworkStore = defineStore('network', {
    state: ():NetworkRootState => {
        return {
            wsMap: new Map(),
            rtcMap: new Map()
        }
    }
})