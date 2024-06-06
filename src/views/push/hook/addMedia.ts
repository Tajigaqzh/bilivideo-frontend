import { ref, watch} from "vue";
import {SourceType} from "@/types/mediaType";
import {ElMessage} from "element-plus";

import {
    showIndex,
    sourceName,
    content,
    notice,
    transparency,
    imageOrVideoTitle,
    color, selectedCamera, selectedMicroPhone, MediaSourceProp, dialogTitle, addSourceDialogVisible, uploadFile
} from "./index.ts";
import {useLiveStore} from "@/store/liveStore.ts";


/**
 * 更新和添加的预设
 * @param active
 * @param id
 */
export const openAddSourceDialog = (active: number, id?: string) => {
    // const mediaSourceStore = useMediaSourceStore();

    const liveSource = useLiveStore();
    //tips 有id就是更新
    if (id) {
        let found = liveSource.allTrack.find((element) => element.id === id);

        if (found) {
            sourceName.value = found.sourceName;
            switch (active) {
                case SourceType.windows:
                    dialogTitle.value = "修改窗口"
                    break;
                case SourceType.stopWatch:
                    // sourceName.value = found.sourceName;
                    color.value = found!.stopwatchInfo!.color;
                    dialogTitle.value = "修该秒表";
                    break;
                case SourceType.text:
                    // sourceName.value = found.sourceName;
                    content.value = found!.textInfo!.text;
                    dialogTitle.value = "修改文字";
                    color.value = found!.textInfo!.color;
                    transparency.value = found!.textInfo!.transparency;
                    break;

                //tips 上面的不完善
                case SourceType.camera:
                    selectedCamera.value = found.deviceId!;
                    dialogTitle.value = "修改摄像头"
                    break;
                case SourceType.microPhone:
                    selectedMicroPhone.value = found.deviceId!;
                    dialogTitle.value = "修改麦克风";
                    break;
                case SourceType.video:
                    dialogTitle.value = "修改视频";
                    content.value = found.mediaInfo;
                    uploadFile.value = null;
                    //todo 还没设置video存储的内容
                    break;
                case SourceType.image:
                    transparency.value = found!.imgInfo!.transparency
                    // content.value = found!.imgInfo!.content;
                    uploadFile.value = null;
                    //todo，修改时记录
                    dialogTitle.value = "修改图片";
                    break;

                case SourceType.time:
                    color.value = found!.timeInfo!.color
                    dialogTitle.value = "修改时间";
                    break;
            }
        }
    } else {
        if (active === SourceType.image) {
            dialogTitle.value = "图片";
        } else if (active === SourceType.notice) {
            dialogTitle.value = "添加直播公告";
        } else {
            imageOrVideoTitle.value = "";
            uploadFile.value = null;
            dialogTitle.value = "添加直播素材";
        }
    }

    //打开的面板索引
    showIndex.value = active;

    //打开dialog
    if (!addSourceDialogVisible.value) {
        addSourceDialogVisible.value = true;
    }
};



/**
 * 添加资源的窗口的预设
 * @param props
 */
export function useSourcePreset(props: Readonly<MediaSourceProp>) {
    /**
     * 因为使用的是不销毁的el-dialog，所以，如果简单地包裹一层的话，动态更新无法体现，所以使用watch监听修改
     */
    showIndex.value = props.active;

    watch(() => props.active, (value) => {
        if (value === SourceType.windows) {
            sourceName.value = "窗口-1";
        } else if (value === SourceType.camera) {
            sourceName.value = "摄像头-1";
        } else if (value === SourceType.microPhone) {
            sourceName.value = "麦克风-1";
        } else if (value == SourceType.image) {
            sourceName.value = "图片-1";
            content.value = "";
            //选中图片后的图片的标题
            imageOrVideoTitle.value = "";
        } else if (value === SourceType.text) {
            sourceName.value = "文字-1";
            content.value = "";
            transparency.value = 100;
        } else if (value === SourceType.video) {
            imageOrVideoTitle.value = "";
            sourceName.value = "视频-1";
        } else if (value === SourceType.time) {
            sourceName.value = "时间-1";
            transparency.value = 100;
            content.value = "";
            color.value = "rgb(255,0,0,1)"
        } else if (value == SourceType.stopWatch) {
            sourceName.value = "秒表-1";
            transparency.value = 100;
            content.value = "";
            color.value = "rgb(255,0,0,1)"
        } else if (value == SourceType.notice) {
            sourceName.value = "公告添加";
            notice.value = "";
        }
        showIndex.value = value;
    });

}


export function useSelectVideoOrImage() {
    /**
     * 图片和视频共用
     */
    const selectFileRef = ref<HTMLInputElement | null>(null);


    const selectFile = () => {
        selectFileRef.value && selectFileRef.value.click();
    }

    const handleChange = (e: any, isVideo: boolean) => {
        const file = e.target.files[0];

        if (isVideo) {
            if (file.type !== "video/mp4") {
                ElMessage.warning("仅支持上传mp4文件")
                return;
            }
            console.log(file)
        } else {
            if (file.type !== "image/jpeg" && file.size <= 1024 * 1024) {
                ElMessage.warning("仅支持上传jpg/jpeg，图片小于1MB")
                return;
            }
        }

        // file.value = file;
        uploadFile.value = file;
        imageOrVideoTitle.value = file.name


        console.log(uploadFile)
    }

    return {
        selectFileRef,
        selectFile,
        handleChange
    }

}