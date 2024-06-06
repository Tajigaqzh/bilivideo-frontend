import {ref, readonly, DeepReadonly, Ref, onUnmounted} from 'vue';
import {useEvent} from './useEvent';
import {useThrottleFn} from '@vueuse/core';

export interface IWindowScrollState {
    x: DeepReadonly<Ref<number>>;
    y: DeepReadonly<Ref<number>>;
    clear: () => void;
}

/**
 * 监听window 滚动事件
 * @param delay
 * @param autoClean 是否自动清除
 */
export function useWindowScroll(delay: number | boolean = 100, autoClean = true): IWindowScrollState {
    const x = ref(window.scrollX);
    const y = ref(window.scrollY);
    let cb = () => {
        x.value = window.scrollX;
        y.value = window.scrollY;
    };
    if (typeof delay === "number") {
        cb = useThrottleFn(cb, delay);
    }
    const [, clear] = useEvent('scroll', cb, {
        passive: true,
        capture: false,
    });

    onUnmounted(() => {
        if (autoClean) clear()
    })
    return {
        x: readonly(x),
        y: readonly(y),
        clear,
    };
}
