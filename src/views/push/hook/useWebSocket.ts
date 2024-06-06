import {useRoute} from "vue-router";
import {useAppStore} from "@/store/appStore.ts";
import {useUserStore} from "@/store/userStore.ts";
import {useRtcParams} from "@/views/push/hook/useRtcParams";
import {useNetworkStore} from "@/store/netWorkStore";

//todo
export const useWebSocketMy = () => {
    const route = useRoute();
    const appStore = useAppStore();
    const userStore = useUserStore();
    const networkStore = useNetworkStore();


    const {
        maxBitrate,
        maxFramerate,
        resolutionRatio,
        videoContentHint,
        audioContentHint,
    } = useRtcParams();



}