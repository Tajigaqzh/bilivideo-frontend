import {computed, ref, watch,Ref} from "vue";
import {refDebounced, useMouseInElement} from "@vueuse/core";

export function useVolume(videoRef: Ref<HTMLVideoElement>) {

    const target = ref<HTMLDivElement | null>(null);

    //15~85,第二个target是给哪个元素添加mouseMove事件，默认监听window
    const {_x, _y, elementX, _isOutside} = useMouseInElement(target, {
        target: target
    });

    //todo 还有一点bug
    watch(elementX, (offset) => {
        if (offset > 80) {
            volumeLineWidth.value = 65;
        } else if (offset <= 10) {
            videoRef.value.volume = 0;
            volumeLineWidth.value = 0;
        } else {
            videoRef.value.volume = (offset - 10) / 70
            volumeLineWidth.value = (offset - 10) / 70 * 65
        }
    })

    let lastVolume = ref(0);

    //require
    // 0~65
    const volumeLineWidth = ref(0);

    //delay width
    //带延迟的ref
    const debouncedVolume = refDebounced(volumeLineWidth, 100)

    //style
    const volumeStyle = computed(() => {
        return `left:${debouncedVolume.value}px`
    })


    //静音后记录上一次音量
    const handleMuted = () => {
        if (debouncedVolume) {
            console.log("last", volumeLineWidth)
            lastVolume.value = debouncedVolume.value;
            console.log(lastVolume.value)
            volumeLineWidth.value = 0;
        } else {
            volumeLineWidth.value = lastVolume.value;
        }
    }

    return {
        target,
        debouncedVolume,
        volumeStyle,
        handleMuted
    }
}