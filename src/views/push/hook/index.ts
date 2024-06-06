import {ref, shallowRef} from "vue";
import {SourceType} from "@/types/mediaType.ts";
import {useRtcParams} from "@/views/push/hook/useRtcParams.ts";
//共用的属性

const pushCanvasRef = ref<HTMLCanvasElement | null>(null);

export {

    pushCanvasRef
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////------------------是否具有获取媒体的权限---------------------------------/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const canUseVideo = ref(false);
const canUseAudio = ref(false);

export {
    canUseAudio,
    canUseVideo,
};
export {
    initUserMedia
} from "./canUseMedia.ts";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////------------------开播的配置项---------------------------------/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const typeName = ref<string>("game");
/**
 * 房间名
 */
const roomName = ref<string>("");
/**
 * 码率
 */
const videoBitRate = ref<number>(2000);

/**
 * 帧率
 */
const videoFrameRate = ref<number>(20);

/**
 * 分辨率
 */
const videoResolution = ref<number>(1080);
const {audioContentHint, videoContentHint} = useRtcParams()

/**
 * 视频的内容
*/
const videoContent = ref('');
/**
 * 音频的内容
 */

const audioContent = ref('');

export {
    typeName,
    roomName,
    videoBitRate,
    videoFrameRate,
    videoResolution,
    videoContent,
    audioContent,
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////------------------添加的素材的预设配置项---------------------------------/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 添加素材时默认打开的窗口
 */
const showIndex = ref<number>(SourceType.all);

/**
 * 添加素材的命名
 */
const sourceName = ref<string>('窗口-1')

/**
 * 选中的素材值，camera和microPhone是deviceId，文字和公告的是内容，窗口的是空，图片的和视频的暂时还没想好，时间的是添加时的Date，秒表的是00:00:00
 */
const content = ref<string>('');


const notice = ref<string>('');


const uploadFile = shallowRef<File | null>(null);

/**
 * 文字，图片，的透明度
 */
const transparency = ref<number>(100);

/**
 * 文字，秒表，时间的颜色
 */
const color = ref('#FF0000')

/**
 * 选中的相机deviceId
 */
const selectedCamera = ref('');

/**
 * 选中的麦克风的deviceId
 */
const selectedMicroPhone = ref('default');


const imageOrVideoTitle = ref('')

const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
export {
    showIndex,
    sourceName,
    content,
    notice,
    transparency,
    color,
    uploadFile,
    selectedCamera,
    selectedMicroPhone,
    imageOrVideoTitle,
    predefineColors,
}



/**
 * 推流使用的hooks
 */
export {
    useRecordVideo,
} from "./push.ts";

/**
 * 截图
 */
export {
    useScreenShort
} from "./useScreenShot.ts"


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const addSourceDialogVisible = ref(false);
const dialogTitle = ref("添加直播素材");
export {
    addSourceDialogVisible,
    dialogTitle
}

export interface MediaSourceProp {
    active: number;
}

/**
 * 打开添加素材面板时候的预设修改
 */
export {
    useSourcePreset,
    openAddSourceDialog,
    useSelectVideoOrImage
} from "./addMedia.ts"