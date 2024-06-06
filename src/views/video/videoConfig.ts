import Danmu from 'xgplayer/es/plugins/danmu';
import Mp4Plugin from 'xgplayer-mp4';
import 'xgplayer/es/plugins/danmu/index.css';
import 'xgplayer/dist/index.min.css';
import {Util} from 'xgplayer';
import './danmu.scss';
import {danMuList} from './danMu';
import {reactive} from "vue";
import {FlvPlugin} from "xgplayer-flv";



// https://wuruixuan2464.github.io/2021/03/17/210317/
export const config = reactive({
    id: 'video-player',
    // autoplay: true,
    lang: 'zh',
    width: 668,
    height: 376,
    // volume: 0,
    autoPlay: true,
    // isLive: true,
    url: '',
    poster:"",
    playsinline: true,

    plugins: [Danmu, Mp4Plugin, FlvPlugin],
    // pip: true,
    danmu: {
        comments: danMuList,
        area: {
            start: 0,
            end: 0.9,
        },
        closeDefaultBtn: false,
        defaultOff: false,
        panel: true,
    },

    mp4plugin: {
        maxBufferLength: 30,
        minBufferLength: 10,
        reqOptions: {
            // mode: 'cors',
            // method: 'GET',
            headers: {
                // 需要带的自定义请求头
                // 'x-test-header': 'rrrr'
            },
        },
    },
    playbackRate: [1, 2, 3],
    commonStyle: {
        // 进度条底色
        progressColor: '#e1deda',
        // 播放完成部分进度条底色
        playedColor: '#00aeec',
        // 缓存部分进度条底色
        cachedColor: '#747477',
        // 进度条滑块样式
        sliderBtnStyle: {
            background: '#00aeec',
        },
    },

    // inactive: 1000,
    icons: {
        play: () => {
            const dom = Util.createDom(
                'div',
                '<img src="/src/assets/icons/video/play.svg">',
                {},
            );
            return dom;
        },
        pause: () => {
            const dom = Util.createDom(
                'div',
                '<img src="/src/assets/icons/video/pause.svg">',
                {},
            );
            return dom;
        },
        // \
        // startPlay: `<div class='customclass'><img src="/src/assets/icons/video/startPlay.svg"></div>`,
    },
});
