import {defineStore} from "pinia";
import {getVideoPageApi, VideoItem} from "@/api/video.ts";

type VideoState = {
    page: number;
    size: number;
    cache: Array<VideoItem>
}
export const useVideoStore = defineStore('video', {
    state: (): VideoState => {
        return {
            page: 0,
            size: 21,
            cache: []
        }
    },

    actions: {
        addVideo(newVideo: Array<VideoItem>) {
            this.cache.push(...newVideo);
        },

        async getVideo() {
            console.log("我被调用了")
            const {data} = await getVideoPageApi({page: this.page, size: this.size});

            if (data.data) {
                this.page++;
                this.addVideo(data.data);
            }
        }
    }

})

