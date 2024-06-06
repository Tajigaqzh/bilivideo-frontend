import {ref, watch} from "vue";
import {useWindowScroll} from "@/utils/useWindowScroll.ts";

export interface useHpHeaderBarAndChannelOptions {
    watchHeaderHeight?: number;
    watchChannelHeight?: number;
}

export function useHpHeaderBarAndChannel(
    options: useHpHeaderBarAndChannelOptions = {
        watchHeaderHeight: 100,
        watchChannelHeight: 180
    }
) {
    const headerIsFixed = ref(false);
    const channelIsFixed = ref(false);

    const {_x, y, _clear} = useWindowScroll(false);

    watch(y, (newVal) => {
        headerIsFixed.value = newVal > options.watchHeaderHeight!;
        channelIsFixed.value = newVal > options.watchChannelHeight!;
    });

    return {
        headerIsFixed,
        channelIsFixed
    };
}