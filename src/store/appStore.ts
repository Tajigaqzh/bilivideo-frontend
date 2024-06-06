import {defineStore} from 'pinia';
import {ILiveRoom, LiveLineEnum, LiveRenderEnum, MediaTypeEnum} from "../../types";
import {mobileRouterName} from "../../types/user";

export interface SizeState {
    pageX: number;
    pageY: number;
}

/**
 * state type
 */
export type AppRootState = {
    //远程桌面
    remoteDesk: {
        sender: string;
        startRemoteDesk: boolean;
        isRemoting?: boolean;
        isClose?: boolean;
    }
    // 是否正在播放
    playing: boolean;
    //视频比例
    videoRatio: number;
    //音量
    normalVolume: number;

    navList: {
        routeName: string;
        name: string
    }[];

    //轨道信息
    allTrack: {
        /** 1开启；2关闭 */
        audio: number;
        /** 1开启；2关闭 */
        video: number;
        /** 轨道id */
        id: string;
        /** 设备id */
        deviceId?: string;
        /**添加的素材名字*/
        mediaName: string;
        /**添加的素材类型*/
        type: MediaTypeEnum;
        /*** 隐藏或显示*/
        isShow: boolean;
        /**
         * 轨道
         */
        track?: MediaStreamTrack;
        stream?: MediaStream;
        streamId?: string;
        trackId?: string;
        //对应的canvas DOM
        canvasDom: any;
        /**和isShow交叉，todo 根据情况看是否移除*/
        hidden?: boolean;
        muted?: boolean;
        volume?: number;
        videoEl?: HTMLVideoElement;
        /**图片素材上传后信息**/
        imgInfo?: any;
        // imgInfo?: UploadFileInfo[];
        // mediaInfo?: UploadFileInfo[];
        /**视频素材上传后信息**/
        mediaInfo?: any;
        /**文字素材信息*/
        textInfo?: {
            //文字内容
            text: string;
            //颜色
            color: string;
            //透明度
            transparency: number
        };
        timeInfo?: {
            color: string
        };
        stopwatchInfo?: {
            color: string
        };
        rect?: {
            top: number;
            left: number
        };
        /**缩放信息*/
        scaleInfo: Record<number, {
            scaleX: number;
            scaleY: number
        }>;
    }[];
    videoControls: {
        pipMode?: boolean;
        pageFullMode?: boolean;
        fullMode?: boolean;
        renderMode?: LiveRenderEnum;
        line?: boolean;
        speed?: boolean;
        networkSpeed?: boolean;
        fps?: boolean;
        kbs?: boolean;
        resolution?: boolean;
    };
    videoControlsValue: {
        pipMode?: boolean;
        pageFullMode?: boolean;
        kbs?: string;
        fps?: number;
    };

    liveLine: LiveLineEnum;
    liveRoomInfo?: ILiveRoom;
    showLoginModal: boolean;
    disableSpeaking: Map<number, {
        exp: number;
        label: string
    }>;
    //显示红包
    showSigninRedDot: boolean;

}


export const useAppStore = defineStore('app', {
    state: (): AppRootState => {
        return {
            remoteDesk: {
                startRemoteDesk: false,
                sender: '',
                isRemoting: false,
                isClose: undefined,
            },
            playing: false,
            videoRatio: 16 / 9,
            videoControls: {
                renderMode: LiveRenderEnum.video,
            },
            videoControlsValue: {
                pipMode: false,
            },
            normalVolume: 80,
            navList: [
                {routeName: mobileRouterName.h5, name: '频道'},
                {routeName: mobileRouterName.h5Rank, name: '排行'},
                {routeName: mobileRouterName.h5Profile, name: '我的'},
            ],
            allTrack: [],
            liveLine: LiveLineEnum.hls,
            liveRoomInfo: undefined,
            showLoginModal: false,
            disableSpeaking: new Map(),
            showSigninRedDot: false,
        };
    },


    actions: {
        /**
         * 设置直播间详情信息
         * @param res
         */
        setLiveRoomInfo(res: AppRootState['liveRoomInfo']) {
            this.liveRoomInfo = res;
        },
        /**
         * 设置直播间拉流方式
         * @param res
         */
        setLiveLine(res: AppRootState['liveLine']) {
            this.liveLine = res;
        },

        /**
         * 设置直播间轨道信息
         * @param res
         */
        setAllTrack(res: AppRootState['allTrack']) {
            this.allTrack = res;
        },
        /**
         * 获取轨道
         */
        getTrackInfo() {
            const res = {audio: 0, video: 0};
            this.allTrack.forEach((item) => {
                if (item.audio === 1) {
                    res.audio += 1;
                }
                if (item.video === 1) {
                    res.video += 1;
                }
            });
            return res;
        },
    },

});
