import {ref, Ref} from "vue";
import {createVideo} from "@/utils/videoUtil.ts";
import {ElMessage} from "element-plus";
//有些方法需要移到，component中，避免来回传参

/**
 * 录屏的hooks
 */
export function useRecordVideo() {
    const isRecording = ref<boolean>(false);

    const recordVideoTime = ref<string>("00:00:00");
    // const nullAudioStream = ref<MediaStream>();
    //
    //
    // const initAudioFlag = ref(false);
    //todo
    const handleRecordVideo = () => {

        //@ts-ignore
        if (!window.VideoDecoder || !window.AudioEncoder) {
            ElMessage.error("当前环境不支持录制视频");
            return;
        }

        // initAudio(initAudioFlag, nullAudioStream);

        isRecording.value = !isRecording.value;
    }

    return {
        isRecording,
        recordVideoTime,
        handleRecordVideo
    }
}

//todo useDeviceList vue/use  useWebWorker  useFileDialog  useDisplayMedia  ，useUserMedia，useBase64，useAttachElement，useFocus,useFocusWithin
/**
 * 初始化音频记录
 * @param initAudioFlag 是否正在记录音频的标记
 * @param nullAudioStream
 */
function initAudio(initAudioFlag: Ref<boolean>, nullAudioStream: Ref<MediaStream>) {
    if (initAudioFlag.value) return;
    initAudioFlag.value = true;
    //初始化音频记录器
    handleNullAudio(nullAudioStream);
    //音频混流
    handleMixedAudio();
}

/**
 * 记录音频前的准备
 */

function handleNullAudio(nullAudioStream: Ref<MediaStream>) {
    // 创建AudioContext对象
    const audioContext = new window.AudioContext();

    // 创建输入和输出节点
    const source = audioContext.createBufferSource();
    const destination = audioContext.createMediaStreamDestination();


    // 连接输入和输出节点
    source.connect(destination);

    // 播放空白音频
    source.start();

    // 获取音频流
    const stream = destination.stream;


    // 检查是否已经获取到音频流
    if (stream) {
        console.log('已创建空的直播音频流');
        const video = createVideo({
            appendChild: false,
        });
        video.srcObject = stream;
        nullAudioStream.value = stream;
    } else {
        console.error('无法创建空的直播音频流');
    }
}

/**
 * core method
 * todo 混流
 * 音频混流
 */
function handleMixedAudio() {

}