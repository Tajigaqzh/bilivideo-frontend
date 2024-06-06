import {defineStore} from "pinia";
import {SourceType} from "@/types/mediaType.ts";



export type LiveTrackItem = LiveState['allTrack'][0]
export interface LiveState {
    /**
     * 远程桌面
     */
    remoteDesk: {
        //发送者
        sender: string;
        //是否开启
        startRemoteDesk: boolean;
        //是否是远程
        isRemoting?: boolean;
        //是否关闭
        isClose?: boolean;
    },
    //默认音量
    normalVolume: 80,
    playing: boolean;
    videoRatio: number;
    allTrack: {
        /** 1开启；2关闭，开启屏幕或者视频的话会处理声音 */
        audio: number;
        /** 1开启；2关闭 */
        video: number;
        id: string;
        /*** 设备id*/
        deviceId?: string;
        /**
         * 素材名字
         */
        sourceName: string;
        /**素材类型*/
        type: SourceType;
        /**右侧小眼睛是否显示*/
        openEye: boolean;
        /** 是否聚焦*/
        focus: boolean;
        /**层级*/
        zIndex?: number;

        /**素材轨道*/
        track?: MediaStreamTrack;
        /**素材流*/
        stream?: MediaStream;
        /**素材流id*/
        streamId?: string;
        /**素材轨道id*/
        trackId?: string;
        // canvasDom?: fabric.Image | fabric.Text;
        canvasDom?: any;
        /**视频的音轨需要隐藏，是否隐藏，*/
        hidden?: boolean;
        /**是否静音*/
        muted?: boolean;
        /**音量*/
        volume?: number;
        /**对应的video节点*/
        videoEl?: HTMLVideoElement;
        /**图片信息*/
        imgInfo?: {
            name: string;
            transparency: number;
        };
        /**视频文件信息*/
        mediaInfo?: any;
        /**文字信息*/
        textInfo?: {
            //文字内容
            text: string;
            //文字颜色
            color: string;
            //文字透明度
            transparency: number;
        };
        /**时间的信息*/
        timeInfo?: {
            //秒表颜色
            color: string;
        };
        /**倒计时的信息*/
        stopwatchInfo?: {
            color: string
        };
        /**定位*/
        rect?: {
            top: number;
            left: number
        };
        /**缩放比例*/
        scaleInfo: Record<number, {
            scaleX: number;
            scaleY: number
        }>;
    }[],
    initZIndex: number;
}

export const useLiveStore = defineStore('live', {
    state: (): LiveState => {
        return {
            remoteDesk: {
                sender: "",
                startRemoteDesk: false,
                //是否是远程
                isRemoting: false,
                //是否关闭
                isClose: undefined,
            },
            normalVolume: 80,
            playing: false,
            videoRatio: 16 / 9,

            allTrack: [],
            initZIndex: 1,

        }
    },
    actions: {
        /**
         * 添加多个
         * @param res
         */
        setAllTrack(res: LiveState['allTrack']) {
            this.allTrack = res;
        },

        addTrack(item: LiveState['allTrack'][0]) {
            /**
             * 如果是设备添加前先过滤一下
             */
            this.allTrack.push(item!);
        },
        clearTrack() {
            this.allTrack = []
        },


        deleteTrack(id: string) {
            const toBeDeleted = this.allTrack.filter((item) => item.id === id);
            this.allTrack = this.allTrack.filter(item => {
                return !toBeDeleted.includes(item);
            });
        },

        hiddenOrSHhw(id: string) {
            const index = this.allTrack.findIndex((item) => item.id === id);
            if (index != -1) {
                //@ts-ignore
                this.allSource.at(index).openEye = !this.allSource.at(index).openEye;
            }
        },


        focusTrack(id: string) {
            this.allTrack.forEach((item) => {
                item.focus = item.id === id;
            });
        },

    },
    // persist: true,

})
