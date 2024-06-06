import {onUnmounted, ref} from "vue";

import {useThrottleFn} from "@vueuse/core";

/**
 * banner动画
 */
export function useAnimateBanner() {
    const animateBanner = ref<HTMLDivElement>();
    const lastX = ref(0);

    const bannerMove = useThrottleFn((e: MouseEvent) => {
        //第一次进入的时候不执行
        if (lastX.value === 0) {
            // isFirst.value = false;
            lastX.value = e.screenX;
            return;
        }

        // lastX.value = e.screenX;
        if (lastX.value !== 0) {
            const currentX = e.screenX;
            if (currentX > lastX.value) {
                animateBanner.value?.setAttribute("class", "active-right animate-banner");
            } else {
                animateBanner.value?.setAttribute("class", "active-left animate-banner");
            }
            lastX.value = currentX;
        }
    }, 500);

    const mouseLeave = (_e: MouseEvent) => {
        lastX.value = 0;
        animateBanner.value?.setAttribute("class", "animate-banner");
    }

    onUnmounted(() => {
        animateBanner.value?.removeEventListener("mousemove", bannerMove);
        animateBanner.value?.removeEventListener("mouseleave", mouseLeave);
    })

    return {
        animateBanner,
        bannerMove,
        mouseLeave
    }
}