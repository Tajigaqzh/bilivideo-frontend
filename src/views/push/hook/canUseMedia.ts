import {useUserMedia} from "@vueuse/core";

import {canUseAudio, canUseVideo} from "./index.ts";

export async function initUserMedia() {
    const video = useUserMedia({constraints: {video: true, audio: false}})
    const audio = useUserMedia({constraints: {video: false, audio: true}})
    if (!video) {
        //todo 提示获取媒体失败
    } else {
        canUseVideo.value = true;
    }
    if (!audio) {
        //todo 提示获取媒体失败

    } else {
        canUseAudio.value = true;
    }
}