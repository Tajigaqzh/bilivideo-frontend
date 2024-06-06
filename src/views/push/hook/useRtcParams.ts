import {ref} from "vue";

export const useRtcParams = () => {

    /**
     * 比特率
     */
    const maxBitrate = ref([
        {
            label: '1',
            value: 1,
            disabled: false,
        },
        {
            label: '100',
            value: 100,
            disabled: false,
        },
        {
            label: '500',
            value: 500,
            disabled: false,
        },
        {
            label: '1000',
            value: 1000,
            disabled: false,
        },
        {
            label: '2000',
            value: 2000,
            disabled: false,
        },
        {
            label: '3000',
            value: 3000,
            disabled: false,
        },
    ])

    /**
     * 帧率，15就行
     */
    const maxFramerate = ref([
        {
            label: '1帧',
            value: 1,
            disabled: false,
        },
        {
            label: '10帧',
            value: 10,
            disabled: false,
        },
        {
            label: '15帧',
            value: 15,
            disabled: false,
        },
        {
            label: '20帧',
            value: 20,
            disabled: false,
        },
        {
            label: '30帧',
            value: 30,
            disabled: false,
        },
    ]);


    /**
     * 分辨率
     */
    const resolutionRatio = ref([
        {
            label: '360P',
            value: 360,
            disabled: false,
        },
        {
            label: '540P',
            value: 540,
            disabled: false,
        },
        {
            label: '720P',
            value: 720,
            disabled: false,
        },
        {
            label: '1080P',
            value: 1080,
            disabled: false,
        },
        {
            label: '2K',
            value: 1440,
            disabled: false,
        },
        {
            label: '2160P',
            value: 2160,
            disabled: true,
        },
    ]);

    /**
     * 视频内容模式
     */
    const videoContentHint = ref([
        {
            label: '默认',
            value: '',
            disabled: false,
        },
        {
            label: '运动',
            value: 'motion',
            disabled: false,
        },
        {
            label: '文本',
            value: 'text',
            disabled: false,
        },
        {
            label: '平衡',
            value: 'detail',
            disabled: false,
        },
    ]);
    /**
     * 音频内容模式
     */
    const audioContentHint = ref([
        {
            label: '默认',
            value: '',
            disabled: false,
        },
        {
            label: '音乐',
            value: 'music',
            disabled: false,
        },
        {
            label: '语言',
            value: 'speech',
            disabled: false,
        },
        {
            label: '语音识别',
            value: 'speech-recognition',
            disabled: false,
        },
    ]);

    //todo，使用watch根据userInfo获取权限，w设置用户最大能开启的帧率，比特率，分辨率

    return {
        maxBitrate, maxFramerate, audioContentHint, videoContentHint, resolutionRatio,
    }
}