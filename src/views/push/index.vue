<template>
  <div @click="proClick">
    <HpHeader :showBtn="false"/>
    <div class="push-wrap">
      <div class="left">
        <div ref="containerRef" class="container flex">
          <div class="icons-group w-[30px] mr-2">
            <div @click="handleRecordVideo">
              <el-tooltip
                  :content="recording ? '结束录制' : '开始录制'"
                  effect="light"
                  placement="left"
              >
                <HpSvgIcon
                    :color="'rgb(0,161,214)'"
                    :name="recording ? 'unlu' : 'videoCamera'"
                    :size="30"
                />
              </el-tooltip>
            </div>
            <div class="mt-4" @click="handleScreenShot">
              <el-tooltip content="截图" effect="light" placement="left">
                <HpSvgIcon :color="'rgb(0,161,214)'" :size="30" name="lu1"/>
              </el-tooltip>
            </div>
          </div>
          <!--        aspect-w-16 aspect-h-9-->
          <div class="relative overflow-hidden select-none canvas-container">
            <!--录制屏幕的REC提示-->
            <div
                v-if="recording"
                class="recording absolute top-2 left-2 text-red-800 z-[9999]"
            >
              <span class="text-xl">●</span>
              <span class="text-lg">REC</span>
              {{ recordVideoTime }}
            </div>
            <!-- 录制视频的canvas-->
            <canvas
                id="pushCanvasRef"
                ref="pushCanvasRef"
                class="absolute w-full h-full select-none touch-none"
            ></canvas>

            <!--添加素材的提示-->
            <div
                v-if="liveStore.allTrack.filter((item) => !item.hidden).length <= 0"
                class="add-source absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[336px] h-[216px]"
            >
              <div class="col-line1 h-[100px] flex justify-center">
                <div
                    @click="openAddSourceDialog(SourceType.all)"
                    class="h-[100px] w-[100px] bg-[rgb(13,13,13)] cursor-pointer flex flex-col justify-center items-center rounded-md"
                >
                  <el-icon :size="35" color="#33373B">
                    <Plus/>
                  </el-icon>
                  <span class="text-xs pt-2 text-[#33373B]">添加素材</span>
                </div>
              </div>

              <div class="col-line2 h-[100px] mt-4 flex justify-between">
                <div
                    @click="openAddSourceDialog(SourceType.windows)"
                    class="h-[100px] w-[100px] bg-[rgb(13,13,13)] cursor-pointer flex flex-col justify-center items-center rounded-md"
                >
                  <HpSvgIcon :size="35" name="window" :color="'#33373B'"/>
                  <span class="text-xs pt-2 text-[#33373B]">窗口</span>
                </div>

                <div
                    @click="openAddSourceDialog(SourceType.camera)"
                    class="h-[100px] w-[100px] bg-[rgb(13,13,13)] flex cursor-pointer flex-col justify-center items-center rounded-md"
                >
                  <el-icon size="35" color="#33373B">
                    <CameraFilled/>
                  </el-icon>
                  <span class="text-xs pt-2 text-[#33373B]">摄像头</span>
                </div>

                <div
                    @click="openAddSourceDialog(SourceType.all)"
                    class="h-[100px] w-[100px] bg-[rgb(13,13,13)] cursor-pointer flex flex-col justify-center items-center rounded-md"
                >
                  <el-icon size="35" color="#33373B">
                    <MoreFilled/>
                  </el-icon>
                  <span class="text-xs pt-2 text-[#33373B]">更多</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-card class="ml-[38px] flex justify-between" style="width: 1120px">
          <div class="w-20 h-20 rounded-full avatar">
            <img class="rounded-full cursor-pointer w-20 h-20" :src="userStore.avatarUrl"/>
          </div>

          <div class="flex-1">
            <div class="flex justify-between px-2.5">
              <div class="flex text-sm text-black">
								<span class="text-[rgb(251,131,165)] flex items-center font-semibold"
                >房间名：</span
                >
                <el-input
                    v-model="roomName"
                    class="w-[80px]"
                    size="default"
                    style="width: 160px"
                >
                </el-input>
                <div class="flex items-center mx-4">
                  <span class="text-[rgb(251,131,165)] font-semibold">直播类型：</span>
                  <el-select v-model="typeName" size="default" style="width: 80px">
                    <el-option label="游戏" value="game"></el-option>
                    <el-option label="日常" value="day"></el-option>
                    <el-option label="聊天" value="chat"></el-option>
                    <el-option label="娱乐" value="entertainment"></el-option>
                    <el-option label="颜值" value="appearance"></el-option>
                  </el-select>
                </div>
                <!--                <div class="leading-8 text-[rgb(251,131,165)] font-semibold">-->
                <!--                  封面-->
                <!--                </div>-->
                <el-button type="primary" class="my-auto mx-3" @click="open">上传封面</el-button>
                <!--                <input type="file" class="w-[72px] mt-0.5" @change="handleCover"/>-->
                <span class="w-24 ml-3 text-xs leading-8">延迟：{{ rtt }}</span>
                <span class="w-24 text-xs leading-8">丢包：{{ loss }}</span>
              </div>
              <div class="flex text-sm">
								<span class="cursor-pointer mr-2.5 flex items-start"
                >分享直播间
									<el-icon size="16" class="ml-2 mr-5" @click="handleShare">
										<Share/>
									</el-icon>
								</span>
                <span>正在观看：{{ watching }}</span>
              </div>
            </div>

            <div
                class="bottom h-8 px-2.5 ml-2 mr-2 mt-2 flex text-sm justify-between"
            >
              <div class="flex items-center setting-item">
                码率：
                <el-select v-model="videoBitRate" size="small" style="width: 70px">
                  <el-option
                      v-for="item in maxBitrate"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value"
                      :key="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="flex items-center setting-item">
                帧率：
                <el-select v-model="videoFrameRate" size="small" style="width: 70px">
                  <el-option
                      v-for="item in maxFramerate"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value"
                      :key="item.value"
                  ></el-option>
                </el-select>
              </div>

              <div class="flex items-center setting-item">
                分辨率：
                <el-select v-model="videoResolution" size="small" style="width: 80px">
                  <el-option
                      v-for="item in resolutionRatio"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value"
                      :key="item.value"
                  ></el-option>
                </el-select>
              </div>

              <div class="flex items-center setting-item">
                视频内容：
                <el-select v-model="videoContent" size="small" style="width: 90px">
                  <el-option
                      v-for="item in videoContentHint"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value"
                      :key="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="flex items-center setting-item">
                音频内容：
                <el-select v-model="audioContent" size="small" style="width: 90px">
                  <el-option
                      v-for="item in audioContentHint"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value"
                      :key="item.value"
                  ></el-option>
                </el-select>
              </div>
              <el-button v-if="!isLiving" class="ml-14" size="default" type="primary" @click="startRTC"
              >开始直播
              </el-button
              >
              <el-button v-if="isLiving" class="ml-14" size="default" type="danger" @click="stopRTC"
              >结束直播
              </el-button
              >
            </div>
          </div>
        </el-card>
      </div>
      <div class="bg-indigo-600 right">
        <el-card
            shadow="never"
            style="min-width: 300px"
            class="px-1 py-3 bg-[rgb(250,252,246)]"
        >
          <div class="mb-1 text-sm border-b-2 pl-2 pb-1">素材列表</div>
          <div class="flex flex-col overflow-hidden h-[250px] justify-between">
            <ul
                class="all-selected h-[220px] text-[#61666d] text-xs cursor-pointer select-none overflow-y-scroll"
                ref="ulListRef"
            >
              <li
                  class="source-li py-1 rounded-[3px] flex justify-between items-center"
                  v-for="item in liveStore.allTrack" @click="handleActiveObject(item)"
                  :class="{'li-active':item.focus,'unsorted':item.type===SourceType.microPhone,'hidden':item.hidden===true} "
              >
                <div class="flex">
                  <el-icon :size="16" class="drag-btn">
                    <DCaret/>
                  </el-icon>
                  <el-icon
                      :size="16"
                      class="mr-2 ml-2 hover:!text-[#FB7299]"
                      @click.stop="handleEye(item)"
                  >
                    <Hide v-if="item.type === SourceType.microPhone || !item.openEye"/>
                    <View v-else/>

                  </el-icon>
                  {{ item.sourceName }}
                </div>
                <div class="flex">
                  <el-popover
                      placement="top"
                      :width="100"
                      trigger="hover"
                      v-if="item.type === SourceType.microPhone"
                  >
                    <template #default>
                      <div class="flex items-center">
                        <span class="mr-2 text-xs">音量:</span>
                        <el-slider v-model="item.volume" @change="handleChangeVolume(item)" size="small"
                                   style="width: 80px"/>
                      </div>
                    </template>
                    <template #reference>
                      <el-icon :size="16" class="mr-2 hover:!text-[#FB7299]">
                        <Microphone/>
                      </el-icon>
                    </template>
                  </el-popover>
                  <!--                  静音视频的-->
                  <div v-if="item.audio===1" class="w-4 mr-2" @click.stop="handleChangeMuted(item)">
                    <HpSvgIcon name="unaudio" v-if="item.muted" :color="'rgb(66,69,73)'" :hover-color="'#FB7299'"
                               :size="16"/>
                    <HpSvgIcon name="audio" v-else :color="'rgb(66,69,73)'" :hover-color="'#FB7299'"
                               :size="16"/>
                  </div>

                  <el-icon :size="16" class="mr-2 hover:!text-[#FB7299]" @click.stop="handleEdit(item)">
                    <Edit/>
                  </el-icon>
                  <el-icon
                      :size="16"
                      class="mr-2 hover:!text-[#FB7299]"
                      @click.stop="handleDelete(item)"
                  >
                    <Delete/>
                  </el-icon>
                </div>
              </li>
            </ul>
            <div class="flex justify-between h-6 px-2 ">
              <div
                  @click="openAddSourceDialog(SourceType.all)"
                  class="text-xs w-16 rounded text-white text-center leading-[24px] h-[24px] bg-[#FB7299] cursor-pointer"
              >
                添加素材
              </div>
              <el-popconfirm
                  cancel-button-text="取消"
                  confirm-button-text="确定"
                  title="您确定要删除所有素材吗？"
                  @confirm="handleClear"
              >
                <template #reference>
                  <div class="flex items-center text-xs text-[#61666d] cursor-pointer">
                    <el-icon
                        :size="12"
                        class="mr-2 hover:!text-[#FB7299]"
                    >
                      <Delete/>
                    </el-icon>
                    清空全部
                  </div>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </el-card>


        <el-card shadow="never"
                 style="min-width: 300px"
                 class="px-1 py-3 bg-[rgb(250,252,246)] mt-5">
          <div class="mb-1 text-sm pl-2 pb-1 border-b-2">弹幕互动</div>

          <ul class="content h-[328px] overflow-y-scroll" ref="messageRef">

            <li class="py-1.5 px-2 mb-1 flex" v-for="item in chatMessage.mess">
              <!--              <img width="50" height="50" class="w-[50px] h-[40px] mr-1.5 rounded-full" src="/src/assets/avatar.png"/>-->
              <div>
                <div class="text-xs " :class="{'text-cyan-500' : item.type==='room'}">{{ item.senderName }}</div>
                <div class="pl-4 text-xs text-gray-400  mt-1">{{ item.data }}</div>
              </div>
            </li>
          </ul>
          <div class="mt-2.5">
            <div class="flex">
              <el-input v-model="danMu" size="default"></el-input>
              <el-button type="primary" size="default" class="ml-2.5" @click="sendMessage">发送</el-button>
            </div>

          </div>
        </el-card>
      </div>
      <!--    开启的-->
      <el-dialog
          v-model="addSourceDialogVisible"
          :title="dialogTitle"
          width="450"
          align-center
          append-to-body
          :close-on-click-modal="false"
      >
        <AddMediaSource :active="showIndex" @open="openAddSourceDialog" ref="addMediaSourceRef"/>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="addSourceDialogVisible = false" size="default"
            >取消
            </el-button
            >
            <el-button
                type="primary"
                @click="handleAddOrUpdate"
                size="default"
            >
              {{ btnName }}
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <!--    <div>111111</div>-->
    <!--    <video width="600px" height="400px" ref="playVideo" controls></video>-->
    <!--    <el-button type="primary" class="mb-10" @click="play">播放</el-button>-->
  </div>
</template>
<script lang="ts" setup>
import HpHeader from "@/views/live/HpHeader.vue";
import {computed, markRaw, nextTick, onMounted, onUnmounted, Raw, reactive, ref, shallowRef, toRaw, watch,} from "vue";
import {fabric} from 'fabric';
import {AVRecorder} from '@webav/av-recorder';


import {
  CameraFilled,
  DCaret,
  Delete,
  Edit,
  Hide,
  Microphone,
  MoreFilled,
  Plus,
  Share,
  View,
} from "@element-plus/icons-vue";
import AddMediaSource from "@/views/push/component/AddMediaSource.vue";
import {useRtcParams} from "@/views/push/hook/useRtcParams.ts";
import {SourceType} from "@/types/mediaType.ts";
import {LiveRoomTypeEnum} from "@/types/liveRoom.ts"
import {Action, ElMessage, ElMessageBox} from "element-plus";
import {useRoute} from 'vue-router';
import {useUserStore} from "@/store/userStore.ts";
import {nanoid} from 'nanoid'

import {SimpleWebRTCClass} from "@/network/simpleRTC.ts"
import {LiveState, LiveTrackItem, useLiveStore} from "@/store/liveStore.ts";

import {
  addSourceDialogVisible,
  dialogTitle,
  initUserMedia, notice,
  openAddSourceDialog,
  pushCanvasRef,
  showIndex,
  sourceName,
  uploadFile,
} from "@/views/push/hook/index.ts";

import {
  audioContent,
  roomName,
  typeName,
  videoBitRate,
  videoContent,
  videoFrameRate,
  videoResolution
} from "./hook/index.ts";
import {
  AudioHint,
  copyToClipBoard,
  createVideo,
  formatCountdownTime, generateBase64,
  getRandomEnglishString,
  handleDisplayMedia,
  handleUserMedia,
  readFile,
  saveFile, setAudioTrackContentHints, setVideoTrackContentHints, VideoHint
} from "@/utils/videoUtil.ts";
import {useCacheStore} from "@/store/cacheStore.ts";

import {useSortable} from '@vueuse/integrations/useSortable'
import {getWatching, startLiveApi, StartLiveParam, stopLiveApi} from "@/api/live.ts";
import {WebSocketClass} from "@/network/webSocket.ts";
import useWebSocket from "@/hook/useSocket.ts";
import {useFileDialog} from "@vueuse/core";
import {types} from "sass";
import String = types.String;
import {simpleUploadApi} from "@/api/upload.ts";
import {removePrefix, withPrefix} from "@/utils/imgUtil.ts";


const userStore = useUserStore();

const cacheStore = useCacheStore();
const route = useRoute();

const liveStore = useLiveStore();

let avRecorder: AVRecorder | null = null;
const liveType = 3;

const isLiving = ref(false);

const msrDelay = ref(1000);


const webRTC = ref<SimpleWebRTCClass | null>(null);


const btnName = computed(() => {
  return activeId.value == "" ? "添加" : "修改";
})
/**
 * 动态设置直播的参数rtc，
 * todo 后台可以根据权限限制
 */
const {
  maxBitrate,
  maxFramerate,
  audioContentHint,
  videoContentHint,
  resolutionRatio,
} = useRtcParams();

const danMu = ref('')
const containerRef = ref<HTMLDivElement | null>(null);

const addMediaSourceRef = ref();

const ulListRef = ref<HTMLUListElement | null>(null);

const newIndex = ref(-1);
const oldIndex = ref(-1);

useSortable(ulListRef, liveStore.allTrack, {
  handle: ".drag-btn",
  animation: 300,
  onUpdate: (event) => {
  },
  onEnd: (event) => {
    newIndex.value = event.newIndex
    oldIndex.value = event.oldIndex;
  }
})

watch(() => newIndex.value, (value) => {
  if (newIndex.value != -1) {
    const tempArray = toRaw(liveStore.allTrack);
    const numbers = tempArray.splice(oldIndex.value, 1);
    tempArray.splice(value, 0, numbers[0]);

    tempArray.forEach((item, index) => {
      if (item.canvasDom) {
        fabricCanvas.value.moveTo(item.canvasDom, index);
      }
    })
  }
  newIndex.value = -1;
  oldIndex.value = -1;
})

const recording = ref(false);


const suggestedName = ref('');


function handleShare() {
  copyToClipBoard(import.meta.env.VITE_DOMAIN + "/detail/" + typeName.value + "-" + roomId.value)
  ElMessage.success("已将链接复制到剪切板")
}

/**
 * 录屏
 */
async function handleRecordVideo() {
  //@ts-ignore
  if (!window.VideoDecoder || !window.AudioEncoder) {
    ElMessage.warning(`当前环境不支持录制视频`);
    return;
  }
  initAudio();
  try {
    if (!recording.value) {
      suggestedName.value = `直播录制-${+new Date()}.mp4`;
      //@ts-ignore
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: suggestedName.value,
      });
      const writer = await fileHandle.createWritable();
      avRecorder = new AVRecorder(canvasVideoStream.value!.clone(), {});
      await avRecorder.start();
      const startTime = +new Date();

      recordVideoTimer.value = setInterval(() => {
        const res = formatCountdownTime({
          endTime: +new Date(),
          startTime,
          showMillisecond: true,
          addZero: true,
        });
        if (res.d) {
          recordVideoTime.value = `${res.d}天${res.h}:${res.m}:${res.s}`;
        } else {
          recordVideoTime.value = `${res.h}:${res.m}:${res.s}`;
        }
      }, 1000);
      avRecorder.outputStream?.pipeTo(writer).catch(console.error);
    } else {
      clearInterval(recordVideoTimer.value);
      recordVideoTime.value = '00:00:00';
      await avRecorder?.stop();
      ElMessage.success(`录制文件: ${suggestedName.value} 已保存到本地`);
      avRecorder = null;
    }
    recording.value = !recording.value;
  } catch (error) {
    console.log(error);
    recording.value = false;
  }
}


const activeId = ref("");

//确认的
const handleAddOrUpdate = () => {
  if (activeId.value == "") {
    handleAdd();
  } else {
    handleUpdate(activeId.value);

  }
}


function handleUpdate(id: string) {
  let edit = false;
  const res = liveStore.allTrack.map(item => {
    if (item.id === id) {
      if (addMediaSourceRef.value.sourceName !== item.sourceName) {
        item.sourceName = addMediaSourceRef.value.sourceName;
        edit = true;
      }

      switch (item.type) {
        case SourceType.time | SourceType.stopWatch:
          if (item.canvasDom) {
            item.canvasDom.set('fill',
                addMediaSourceRef.value.color
            )
            if (item.stopwatchInfo) {
              item.stopwatchInfo.color = addMediaSourceRef.value.color
            } else if (item.timeInfo) {
              item.timeInfo.color = addMediaSourceRef.value.color
            }
          }
          edit = true;
          break;
        case SourceType.text:
          if (item.canvasDom) {
            item.canvasDom.set('fill',
                addMediaSourceRef.value.color
            )

            item.canvasDom.set('opacity', addMediaSourceRef.value.transparency / 100);
            item.canvasDom.set('text', addMediaSourceRef.value.content);

            item.textInfo = {
              //文字内容
              text: addMediaSourceRef.value.content,
              //文字颜色
              color: addMediaSourceRef.value.color,
              //文字透明度
              transparency: addMediaSourceRef.value.transparency
            }
          }
          edit = true;
          break;
        case SourceType.image:
          if (item.canvasDom) {
            item.canvasDom.set('opacity', addMediaSourceRef.value.transparency / 100);
            item!.imgInfo!.transparency = addMediaSourceRef.value.transparency;
          }
          edit = true;
          break;
      }
    }
    return item;
  })
  if (edit) {
    liveStore.setAllTrack(res);
    cacheStore.setResourceList(res);
  }
  activeId.value = "";
  if (addSourceDialogVisible.value) {
    addSourceDialogVisible.value = false;
  }
}


const proClick = (e: any) => {
  const isTarget = e?.target?.classList.contains("source-li");
  if (!isTarget) {
    liveStore.allTrack.forEach((item) => {
      item.focus = false;
    });
    // cacheStore.setResourceList(liveStore.allTrack);
  }
};

const canvasVideoStream = ref<MediaStream>();

const nullAudioStream = ref<MediaStream>();


const worker = ref<Worker>();
const workerTimerId = ref();
const workerMsrTimerId = ref();
const recordVideoTime = ref('00:00:00');
const recordVideoTimer = ref();

//todo 初始化弹幕
onMounted(() => {
  worker.value = new Worker('/worker.js');
  //弹幕
  // setTimeout(() => {
  //   scrollTo(0, 0);
  // }, 100);
  //检查是否支持录屏
  handleMediaRecorderAllType();
  //检查设备
  initUserMedia();
  //初始化画布
  initCanvas();
  //绘制并加入缓存
  handleCache();

  const item = localStorage.getItem("live");
  if (item != null) {
    ElMessageBox.confirm(
        '检测到已有直播间，但您刷新了页面，是否继续直播？',
        '警告！',
        {
          confirmButtonText: '继续直播',
          cancelButtonText: '结束直播',
          type: 'warning',
        }
    )
        .then(() => {
          const parsed = JSON.parse(item);
          roomId.value = parsed.roomId;
          typeName.value = parsed.typeName;
          roomName.value = parsed.roomName
          startRTC()
        })
        .catch(() => {
          stopRTC();
        })
  }

})

function handleMediaRecorderAllType() {
  const types = [
    'video/webm',
    'audio/webm',
    'video/mpeg',
    'video/webm;codecs=vp8',
    'video/webm;codecs=vp9',
    'video/webm;codecs=daala',
    'video/webm;codecs=h264',
    'audio/webm;codecs=opus',
    'audio/webm;codecs=aac',
    'audio/webm;codecs=h264,opus',
    'video/webm;codecs=avc1.64001f,opus',
    'video/webm;codecs=avc1.4d002a,opus',
  ];
  Object.keys(types).forEach((item: any) => {
    // console.log(types[item], MediaRecorder.isTypeSupported(types[item]));
  });
}

const initAudioFlag = ref(false);

function initAudio() {
  if (initAudioFlag.value) return;
  initAudioFlag.value = true;
  handleNullAudio();
  handleMixedAudio();
}

/**
 * 有两个canvas画布，最下面的是推流的pushCanvas画布，
 * 另一个是供fabric操作的画布，修改或者新增元素在这个画布上进行
 */
const fabricCanvas = shallowRef<fabric.Canvas>();

//时间的canvasDom
const timeCanvasDom = shallowRef<Raw<fabric.Text>[]>([]);

//秒表的canvasDom
const stopwatchCanvasDom = shallowRef<Raw<fabric.Text>[]>([]);

//处理音轨
const webAudioVideo = ref<HTMLVideoElement>();
const wrapSize = reactive({
  width: 0,
  height: 0,
});

/**
 * 初始化canvas，设置fabric，并开始渲染，调整样式
 */
function initCanvas() {
  const resolutionHeight =
      videoResolution.value / window.devicePixelRatio;

  const resolutionWidth =
      (videoResolution.value / window.devicePixelRatio) *
      liveStore.videoRatio;

  const wrapWidth = containerRef.value!.getBoundingClientRect().width;

  const ratio = wrapWidth / resolutionWidth;

  const wrapHeight = resolutionHeight * ratio;


  const instance = markRaw(new fabric.Canvas(pushCanvasRef.value!));


  instance.setWidth(resolutionWidth);
  instance.setHeight(resolutionHeight);

  instance.setBackgroundColor('black', () => {
    // console.log("成功设置背景")
  })
  wrapSize.width = wrapWidth;
  wrapSize.height = wrapHeight;
  fabricCanvas.value = instance;
  renderFrame();
  changeCanvasStyle();
}

/**
 * 根据设置的帧率渲染
 */
function renderFrame() {
  /**
   * 理论情况：
   * videoFrameRate等于20，即每秒20帧，即1000 / 20 = 50毫秒轮询一次
   * videoFrameRate等于30，即每秒30帧，即1000 / 30 = 33.333毫秒轮询一次
   * videoFrameRate等于30，即每秒60帧，即1000 / 60 = 16.666毫秒轮询一次
   * 实际情况：
   * videoFrameRate等于20，即50毫秒轮询一次，实际fps是18
   * videoFrameRate等于20，希望fps是20，即需要(18/20) * 50 = 45毫秒轮询一次
   */
  let delay = 1000 / videoFrameRate.value;
  delay = (18 / 20) * delay;

  worker.value?.postMessage({
    type: 'request-clear-loop',
    timer: workerTimerId.value,
  });
  worker.value?.postMessage({
    type: 'request-start-loop',
    delay,
  });
  worker.value?.addEventListener('message', (e) => {
    if (e.data.type === 'response-start-loop') {
      workerTimerId.value = e.data.timer;
    } else if (e.data.type === 'response-looping') {
      renderAll();
    }
  });
}

/**
 * 清除worker
 */
function clearFrame() {
  worker.value?.postMessage({
    type: 'request-clear-loop',
    data: {
      timer: workerTimerId.value,
    },
  });
}

const startTime = ref(+new Date());
const recorder = ref<MediaRecorder>();
const bodyAppendChildElArr = ref<HTMLElement[]>([]);

/**
 * 渲染
 */
function renderAll() {
  //循环获取每一个时间素材
  timeCanvasDom.value.forEach((item) => {
    item.text = new Date().toLocaleString();
  });

  stopwatchCanvasDom.value.forEach((item) => {
    const res = formatCountdownTime({
      endTime: +new Date(),
      startTime: startTime.value,
      showMillisecond: true,
      addZero: true,
    });
    item.text = `${res.d}天${res.h}时${res.m}分${res.s}秒${res.ms}毫秒`;
  });
  if (fabricCanvas.value && fabricCanvas.value.renderAll) {
    fabricCanvas.value.renderAll();
  }
  // fabricCanvas.value?.renderAll();
}

/**
 * 创建空的音频轨道，用于混流
 */
function handleNullAudio() {
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
 * 修改canvas的样式
 */
function changeCanvasStyle() {
  // @ts-ignore
  fabricCanvas.value.wrapperEl.style.width = `${wrapSize.width}px`;
  // @ts-ignore
  fabricCanvas.value.wrapperEl.style.height = `${wrapSize.height}px`;
  // @ts-ignore
  fabricCanvas.value.lowerCanvasEl.style.width = `${wrapSize.width}px`;
  // @ts-ignore
  fabricCanvas.value.lowerCanvasEl.style.height = `${wrapSize.height}px`;
  // @ts-ignore
  fabricCanvas.value.upperCanvasEl.style.width = `${wrapSize.width}px`;
  // @ts-ignore
  fabricCanvas.value.upperCanvasEl.style.height = `${wrapSize.height}px`;
}


function changeCanvasAttr({
                            newHeight, oldHeight
                          }: { newHeight: number; oldHeight: number }) {

  if (fabricCanvas.value) {
    const resolutionHeight = videoResolution.value / window.devicePixelRatio;
    const resolutionWidth = (videoResolution.value / window.devicePixelRatio) *
        liveStore.videoRatio;

    fabricCanvas.value.setWidth(resolutionWidth);
    fabricCanvas.value.setHeight(resolutionHeight);

    liveStore.allTrack.forEach((track) => {
      const dom = track.canvasDom;
      if (dom) {
        // 分辨率变小了，将图片变小
        if (newHeight < oldHeight) {
          const domRatio = oldHeight / newHeight;
          dom.left = dom.left / domRatio;
          dom.top = dom.top / domRatio;
        } else {
          const domRatio = oldHeight / newHeight;
          dom.left = dom.left / domRatio;
          dom.top = dom.top / domRatio;
        }
      }
    });

    liveStore.allTrack.forEach((track) => {
      const dom = track.canvasDom;
      if (dom) {
        if (newHeight < oldHeight) {
          //分辨率变小，将图片变小
          const ratio = newHeight / oldHeight;
          const domRatio = (dom.scaleX || 1) * ratio;
          dom.scale(domRatio);
        } else {
          //分辨率变大，将图片变大
          const ratio = newHeight / oldHeight;
          const domRatio = (dom.scaleX || 1) * ratio;
          dom.scale(domRatio);
        }
      }
    });

    changeCanvasStyle();
  }
}

/**
 * 处理素材的缩放
 * 一倍屏即1px里面有2个像素；三倍屏1px里面有3个像素，以此类推
 * 一个图片，宽高都是100px  一倍屏展示：100px等于100个像素，一比一展示   二倍屏展示：100px等于100个像素，二比一展示，即在二倍屏的100px看起来会比一倍屏的100px小一倍
 * 如果需要在一倍和二倍屏幕的时候看的大小都一样：
 * 1，在二倍屏的时候，需要将100px放大一倍，即200px；
 * 2，在一倍屏的时候，需要将100px缩小一倍，即50px；
 */
function handleScaling({canvasDom, id}: { canvasDom: any; id: string }) {
  canvasDom.on('scaling', () => {
    liveStore.allTrack.forEach((item) => {
      if (id === item.id) {
        item.scaleInfo[window.devicePixelRatio] = {
          scaleX: canvasDom.scaleX || 1,
          scaleY: canvasDom.scaleY || 1,
        };

        Object.keys(item.scaleInfo).forEach((info: any) => {
          if (window.devicePixelRatio !== Number(info)) {
            if (window.devicePixelRatio > Number(info)) {
              item.scaleInfo[info] = {
                scaleX:
                    item.scaleInfo[window.devicePixelRatio].scaleX *
                    window.devicePixelRatio,
                scaleY:
                    item.scaleInfo[window.devicePixelRatio].scaleY *
                    window.devicePixelRatio,
              };
            } else {
              if (window.devicePixelRatio === 1) {
                item.scaleInfo[info] = {
                  scaleX: item.scaleInfo[1].scaleX / Number(info),
                  scaleY: item.scaleInfo[1].scaleY / Number(info),
                };
              } else {
                item.scaleInfo[info] = {
                  scaleX: item.scaleInfo[1].scaleX * Number(info),
                  scaleY: item.scaleInfo[1].scaleY * Number(info),
                };
              }
            }
          }
        })
      }
    })

    cacheStore.setResourceList(liveStore.allTrack);
  })
}

/**
 * 处理素材的移动
 * @param canvasDom
 * @param id
 */
function handleMoving({canvasDom, id}: { canvasDom: fabric.Image | fabric.Text; id: string }) {
  canvasDom.on('moving', () => {
    liveStore.allTrack.forEach((item) => {
      if (id === item.id) {
        item.rect = {
          top: (canvasDom.top || 0) * window.devicePixelRatio,
          left: (canvasDom.left || 0) * window.devicePixelRatio,
        }
      }
    })
    cacheStore.setResourceList(liveStore.allTrack);
  })
}

/**
 * 处理缓存素材，页面挂载后，读取cache的素材，并重新获取
 */
async function handleCache() {
  const res: LiveState['allTrack'] = [];
  const err: string[] = [];
  const queue: any[] = [];
  cacheStore['resource-list'].forEach((item) => {
    // @ts-ignore
    const obj: LiveTrackItem = {};
    obj.openEye = item.openEye;
    obj.audio = item.audio;
    obj.video = item.video;
    obj.id = item.id;
    obj.deviceId = item.deviceId;
    obj.type = item.type;
    obj.sourceName = item.sourceName;
    obj.muted = item.muted;
    obj.volume = item.volume;
    obj.hidden = item.hidden;
    obj.focus = item.focus;
    obj.rect = item.rect;
    obj.scaleInfo = item.scaleInfo;
    obj.stopwatchInfo = item.stopwatchInfo;

    //处理视频文件
    async function handleMediaVideo() {
      const {code, file} = await readFile(item.id);
      if (code === 1 && file) {
        const {videoEl, stream, canvasDom} = await autoCreateVideo({
          file,
          id: obj.id,
          muted: item.muted,
          rect: item.rect,
          scaleInfo: item.scaleInfo,
        });
        if (obj.volume !== undefined) {
          videoEl.volume = obj.volume / 100;
        }
        obj.videoEl = videoEl;
        obj.canvasDom = canvasDom;
        obj.stream = stream;
        obj.streamId = stream.id;
        obj.track = stream.getVideoTracks()[0];
        obj.trackId = stream.getVideoTracks()[0].id;
      } else {
        console.error('读取文件失败');
      }
    }

    /**
     * 处理图面
     */
    async function handleImg() {
      const {code, file} = await readFile(item.id);


      if (code === 1 && file) {
        const imgEl = await new Promise<HTMLImageElement>((resolve) => {
          const reader = new FileReader();
          reader.addEventListener(
              'load',
              function () {
                const img = document.createElement('img');
                img.src = reader.result as string;
                img.onload = () => {
                  resolve(img);
                };
              },
              false
          );
          if (file) {
            reader.readAsDataURL(file);
          }
        });
        if (fabricCanvas.value) {
          const canvasDom = markRaw(
              new fabric.Image(imgEl, {
                top: (item.rect?.top || 0) / window.devicePixelRatio,
                left: (item.rect?.left || 0) / window.devicePixelRatio,
                width: imgEl.width,
                height: imgEl.height,
              })
          );
          handleMoving({canvasDom, id: obj.id});
          handleScaling({canvasDom, id: obj.id});

          canvasDom.scale(
              item.scaleInfo?.[window.devicePixelRatio]?.scaleX || 1
          );
          canvasDom.opacity = item.openEye ? 1 : 0;

          fabricCanvas.value.add(canvasDom);
          obj.canvasDom = canvasDom;
        }
      } else {

        // 使用 todo 设置降级方案读取文件
        ElMessage.error("读取图片失败")
      }
    }

    /**
     * 处理屏幕
     */
    async function handleScreen() {
      try {
        const event = await handleDisplayMedia({
          video: true,
          audio: true,
        });
        if (!event) return;
        const videoEl = createVideo({appendChild: false});
        bodyAppendChildElArr.value.push(videoEl);
        //tips 随机id
        videoEl.setAttribute('videoId', obj.id);
        videoEl.srcObject = event;
        await new Promise((resolve) => {
          videoEl.onloadedmetadata = () => {
            const stream = videoEl
                // @ts-ignore
                .captureStream();
            const width = stream.getVideoTracks()[0].getSettings().width!;
            const height = stream.getVideoTracks()[0].getSettings().height!;
            videoEl.width = width;
            videoEl.height = height;
            const canvasDom = markRaw(
                new fabric.Image(videoEl, {
                  top: (item.rect?.top || 0) / window.devicePixelRatio,
                  left: (item.rect?.left || 0) / window.devicePixelRatio,
                  width,
                  height,
                })
            );
            handleMoving({canvasDom, id: item.id});
            handleScaling({canvasDom, id: item.id});
            canvasDom.scale(
                item.scaleInfo?.[window.devicePixelRatio]?.scaleX || 1
            );
            canvasDom.opacity = item.openEye ? 1 : 0;
            fabricCanvas.value!.add(canvasDom);
            obj.videoEl = videoEl;
            obj.canvasDom = canvasDom;
            resolve({videoEl, canvasDom});
          }
        })
      } catch (error) {
        handleDelete(obj);
        err.push(obj.id);
      }
    }

    /**
     * 处理麦克风
     */
    async function handleMicrophone() {
      //tips deviceId
      const microPhone = await handleUserMedia({
        video: false,
        audio: {deviceId: obj.deviceId},
      });
      if (!microPhone) return;
      const videoEl = createVideo({appendChild: false, muted: true});

      bodyAppendChildElArr.value.push(videoEl);
      videoEl.setAttribute('videoId', obj.id);

      videoEl.srcObject = microPhone;
      if (obj.volume !== undefined) {
        videoEl.volume = obj.muted ? 0 : obj.volume / 100;
      }
      obj.videoEl = videoEl;
      obj.stream = microPhone;
      obj.streamId = microPhone.id;
      obj.track = microPhone.getAudioTracks()[0];
      obj.trackId = microPhone.getAudioTracks()[0].id;
    }

    /**
     * 处理相机
     */
    async function handleCamera() {
      //tips deviceId
      const camera = await handleUserMedia({
        video: {deviceId: obj.deviceId},
        audio: false,
      });
      if (!camera) return;
      const videoEl = createVideo({appendChild: false});
      bodyAppendChildElArr.value.push(videoEl);
      videoEl.setAttribute('videoId', obj.id);
      videoEl.srcObject = camera;

      await new Promise((resolve) => {
        videoEl.onloadedmetadata = () => {
          const stream = videoEl
              // @ts-ignore
              .captureStream();
          const width = stream.getVideoTracks()[0].getSettings().width!;
          const height = stream.getVideoTracks()[0].getSettings().height!;
          videoEl.width = width;
          videoEl.height = height;

          const canvasDom = markRaw(
              new fabric.Image(videoEl, {
                top: (item.rect?.top || 0) / window.devicePixelRatio,
                left: (item.rect?.left || 0) / window.devicePixelRatio,
                width,
                height,
              })
          );
          handleMoving({canvasDom, id: item.id});
          handleScaling({canvasDom, id: item.id});
          canvasDom.scale(
              item.scaleInfo?.[window.devicePixelRatio]?.scaleX || 1
          );
          canvasDom.opacity = item.openEye ? 1 : 0;
          fabricCanvas.value!.add(canvasDom);
          obj.videoEl = videoEl;
          obj.canvasDom = canvasDom;
          resolve({videoEl, canvasDom});
        };
      });
    }

    if (item.type === SourceType.video && item.video === 1) {
      queue.push(handleMediaVideo());
    } else if (item.type === SourceType.windows) {
      queue.push(handleScreen());
    } else if (item.type === SourceType.camera) {
      queue.push(handleCamera())
    } else if (item.type === SourceType.microPhone) {
      queue.push(handleMicrophone())
    } else if (item.type === SourceType.image) {
      queue.push(handleImg())
    } else if (item.type === SourceType.text) {
      obj.textInfo = item.textInfo;
      obj.scaleInfo = item.scaleInfo;
      if (fabricCanvas.value) {
        const canvasDom = markRaw(
            new fabric.Text(item.textInfo?.text || '', {
              top: (item.rect?.top || 0) / window.devicePixelRatio,
              left: (item.rect?.left || 0) / window.devicePixelRatio,
              fill: item.textInfo?.color,
              opacity: item.textInfo?.transparency ? item.textInfo?.transparency / 100 : 1
            })
        );
        handleMoving({canvasDom, id: obj.id});
        handleScaling({canvasDom, id: obj.id});

        // fabric.Text类型不能除以分辨率
        canvasDom.scale(item.scaleInfo?.[window.devicePixelRatio]?.scaleX || 1);
        canvasDom.opacity = item.openEye ? 1 : 0;
        fabricCanvas.value.add(canvasDom);
        obj.canvasDom = canvasDom;
      }
    } else if (item.type === SourceType.time) {
      obj.timeInfo = item.timeInfo;
      obj.scaleInfo = item.scaleInfo;
      if (fabricCanvas.value) {
        const canvasDom = markRaw(
            new fabric.Text(new Date().toLocaleString(), {
              top: (item.rect?.top || 0) / window.devicePixelRatio,
              left: (item.rect?.left || 0) / window.devicePixelRatio,
              fill: item.timeInfo?.color,
            })
        );
        timeCanvasDom.value.push(canvasDom);
        handleMoving({canvasDom, id: obj.id});
        handleScaling({canvasDom, id: obj.id});
        // fabric.Text类型不能除以分辨率
        canvasDom.scale(item.scaleInfo?.[window.devicePixelRatio]?.scaleX || 1);
        canvasDom.opacity = item.openEye ? 1 : 0;
        fabricCanvas.value.add(canvasDom);
        obj.canvasDom = canvasDom;
      }
    } else if (item.type === SourceType.stopWatch) {
      obj.stopwatchInfo = item.stopwatchInfo;
      obj.scaleInfo = item.scaleInfo;
      if (fabricCanvas.value) {
        const canvasDom = markRaw(
            new fabric.Text('00天00时00分00秒000毫秒', {
              top: (item.rect?.top || 0) / window.devicePixelRatio,
              left: (item.rect?.left || 0) / window.devicePixelRatio,
              fill: item.stopwatchInfo?.color,
            })
        );
        stopwatchCanvasDom.value.push(canvasDom);
        handleMoving({canvasDom, id: obj.id});
        handleScaling({canvasDom, id: obj.id});
        // fabric.Text类型不能除以分辨率
        canvasDom.scale(item.scaleInfo?.[window.devicePixelRatio]?.scaleX || 1);
        canvasDom.opacity = item.openEye ? 1 : 0;
        fabricCanvas.value.add(canvasDom);
        obj.canvasDom = canvasDom;
      }
    }

    res.push(obj);
  })


  await Promise.all(queue);

  canvasVideoStream.value = pushCanvasRef.value!.captureStream();
  liveStore.setAllTrack(res.filter((v) => !err.includes(v.id)));
}


/**
 * 码率发生变化
 */
watch(() => videoBitRate.value, (newBitRate) => {
  console.log('码率变了', newBitRate);
  //todo 根据不同推流方式分别处理
  if (liveType === LiveRoomTypeEnum.msr) {
    const stream = pushCanvasRef.value!.captureStream();
    //@ts-ignore
    const audioTrack = webAudioVideo.value!.captureStream().getAudioTracks()[0];
    stream.addTrack(audioTrack);
    handleMsr(stream);
  } else if (liveType === LiveRoomTypeEnum.wertc_live) {
    // const stream = pushCanvasRef.value!.captureStream();
    // //@ts-ignore
    // const audioTrack = webAudioVideo.value!.captureStream().getAudioTracks()[0];
    // stream.addTrack(audioTrack);
    webRTC.value.setMaxBitrate(newBitRate);
  }

  //todo msr处理
});


const roomLiving = ref(false);


watch(() => roomLiving.value, () => {

})

/**
 * 帧率
 */
watch(() => videoFrameRate.value, (value) => {
  console.log(value, "帧率改变，修改画布")
  renderFrame();
})

/**
 * 分辨率改变，修改画布
 */
watch(() => videoResolution.value, (value, oldValue) => {
  changeCanvasAttr({newHeight: value, oldHeight: oldValue})
})
/**
 * 视频模式
 */
watch(() => videoContent.value, (value) => {
  if (canvasVideoStream.value) {
    setVideoTrackContentHints(canvasVideoStream.value, value as unknown as VideoHint)
  }
})
/**
 * 音频模式改变
 */
watch(() => audioContent.value, (value: string) => {
  if (canvasVideoStream.value) {
    setAudioTrackContentHints(canvasVideoStream.value, value as unknown as AudioHint)
  }

})


/**
 * 混流音频
 */
function handleMixedAudio() {
  console.log("混流了")
  const allAudioTrack = liveStore.allTrack.filter((item) => item.audio === 1);
  const nullAudio = nullAudioStream.value?.getAudioTracks()[0];
  if (nullAudio) {
    allAudioTrack.push({
      openEye: true,
      id: getRandomEnglishString(6),
      audio: 2,
      video: 1,
      sourceName: '占位空音频',
      type: SourceType.audio,
      focus: false,
      track: nullAudio,
      trackId: nullAudio.id,
      stream: nullAudioStream.value,
      streamId: nullAudioStream.value?.id,
      hidden: false,
      muted: false,
      scaleInfo: {},
    });
  }

  const audioCtx = new AudioContext();
  //先把canvas视频中的音轨删除
  if (canvasVideoStream.value?.getAudioTracks()[0]) {
    canvasVideoStream.value.removeTrack(
        canvasVideoStream.value.getAudioTracks()[0]
    );
  }
  const res: { source: MediaStreamAudioSourceNode; gainNode: GainNode }[] = [];

  allAudioTrack.forEach((item) => {
    if (!audioCtx || !item.stream) return;
    const source = audioCtx.createMediaStreamSource(item.stream);
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = (item.volume || 0) / 100;
    source.connect(gainNode);
    res.push({source, gainNode});
    // console.log('混流', item.stream?.id, item.stream);
  });
  const destination = audioCtx.createMediaStreamDestination();
  res.forEach((item) => {
    item.source.connect(item.gainNode);
    item.gainNode.connect(destination);
  });

  if (webAudioVideo.value) {
    webAudioVideo.value.remove();
  }

  webAudioVideo.value = createVideo({
    appendChild: false,
    muted: true,
  });
  bodyAppendChildElArr.value.push(webAudioVideo.value);
  webAudioVideo.value.className = 'web-audio-video';
  webAudioVideo.value!.srcObject = destination.stream;
  const resAudio = destination.stream.getAudioTracks()[0];
  canvasVideoStream.value?.addTrack(resAudio);
  //todo 更新rtc的音轨

  if (webRTC.value) {
    const sender = webRTC.value.peerConnection?.getSenders().find((sender) => sender.track.id === resAudio.id);
    if (!sender) {
      webRTC.peerConnection?.getSenders()
          ?.find((sender) => sender.track?.kind === 'audio')
          ?.replaceTrack(resAudio);
    }
    //todo，添加音轨
  }
}

/**
 * 根据文件或者流创建video
 * @param data
 */
function autoCreateVideo(data: {
  file?: File;
  stream?: MediaStream;
  id: string;
  rect?: { left: number; top: number };
  scaleInfo?: Record<number, { scaleX: number; scaleY: number }>;
  muted?: boolean;
}) {
  const {file, id, rect, scaleInfo, muted} = data;
  let stream = data.stream;
  let videoEl: HTMLVideoElement;
  if (file) {
    const url = URL.createObjectURL(file);
    videoEl = createVideo({
      appendChild: false,
      muted,
    });
    videoEl.src = url;
    // @ts-ignore
    stream = videoEl.captureStream();
  } else {
    videoEl = createVideo({appendChild: false, muted});
    if (stream) {
      videoEl.srcObject = stream;
    }
  }
  bodyAppendChildElArr.value.push(videoEl);
  videoEl.setAttribute('videoId', id);
  return new Promise<{
    canvasDom: Raw<fabric.Image>;
    videoEl: HTMLVideoElement;
    scale: number;
    stream: MediaStream;
  }>((resolve) => {
    videoEl.onloadedmetadata = () => {
      let canvasDom: Raw<fabric.Image>;
      let ratio;

      function main() {
        const width =
            stream?.getVideoTracks()[0].getSettings().width! ||
            videoEl.videoWidth;
        const height =
            stream?.getVideoTracks()[0].getSettings().height! ||
            videoEl.videoHeight;
        ratio = handleScale({width, height});
        videoEl.width = width;
        videoEl.height = height;
        const old = liveStore.allTrack.find((item) => item.id === id);
        if (canvasDom) {
          fabricCanvas.value?.remove(canvasDom);
          canvasDom = markRaw(
              new fabric.Image(videoEl, {
                top: (old?.rect?.top || rect?.top || 0) / window.devicePixelRatio,
                left:
                    (old?.rect?.left || rect?.left || 0) / window.devicePixelRatio,
                width,
                height,
              })
          );
        } else {
          canvasDom = markRaw(
              new fabric.Image(videoEl, {
                top: (old?.rect?.top || rect?.top || 0) / window.devicePixelRatio,
                left:
                    (old?.rect?.left || rect?.left || 0) / window.devicePixelRatio,
                width,
                height,
              })
          );
        }

        liveStore.allTrack.forEach((item) => {
          if (item.id === id) {
            if (item.canvasDom) {
              item.canvasDom = canvasDom;
            }
          }
        })
        handleMoving({canvasDom, id});
        handleScaling({canvasDom, id});
        canvasDom.scale(scaleInfo?.[window.devicePixelRatio]?.scaleX || 1);
        fabricCanvas.value!.add(canvasDom);
        resolve({canvasDom, scale: ratio, videoEl, stream: stream!});
      }

      main();
      videoEl?.addEventListener('resize', () => {
        main();
      });
    }
  });
}

/**
 * 获取缩放比例
 * @param width
 * @param height
 */
function handleScale({width, height}: { width: number; height: number }) {
  const resolutionHeight = videoResolution.value;
  const resolutionWidth = videoResolution.value * liveStore.videoRatio;
  let ratio = 1;
  if (width > resolutionWidth) {
    ratio = resolutionWidth / width;
  }
  if (height > resolutionHeight) {
    const r1 = resolutionHeight / height;
    if (ratio > r1) {
      ratio = r1;
    }
  }
  return ratio;
}

/**
 * 设置缩放比例
 * @param track 轨道
 * @param canvasDom cavasDom
 * @param scale 比例
 */
function setScaleInfo({track, canvasDom, scale}: {
  track: LiveTrackItem,
  canvasDom: any;
  scale?: number
}) {
  if (!scale) scale = 1;
  [1, 2, 3, 4].forEach((devicePixelRatio) => {
    track.scaleInfo[devicePixelRatio] = {
      scaleX: (1 / devicePixelRatio) * scale,
      scaleY: (1 / devicePixelRatio) * scale,
    };
  });
  if (window.devicePixelRatio !== 1) {
    const ratio = (1 / window.devicePixelRatio) * scale;
    canvasDom.scale(ratio);
    track.scaleInfo[window.devicePixelRatio] = {
      scaleX: ratio,
      scaleY: ratio,
    };
  }
}

/**
 * 向画布添加内容
 */
async function handleAdd() {

  const same = liveStore.allTrack.filter(item => item.type === showIndex.value);
  if (same.length > 0) {
    const allNames = same.map(item => {
      if (item.sourceName.includes("-")) {
        const end = parseInt(item.sourceName.split("-")[1]);
        return isNaN(end) ? 0 : end;
      }
    }).filter(a => a !== undefined) as unknown as number[]
    if (allNames && sourceName.value.includes("-")) {
      sourceName.value = sourceName.value.split("-")[0] + "-" + (Math.max(...allNames) + 1)
    }

  }
  addSourceDialogVisible.value = false;

  if (showIndex.value === SourceType.windows) {
    const event = await handleDisplayMedia({
      video: {
        deviceId: addMediaSourceRef.value.selectedCamera,

      },
      audio: true,
    });
    if (!event) return;


    const videoTrack: LiveTrackItem = {
      audio: 2,
      video: 1,
      id: getRandomEnglishString(6),
      deviceId: addMediaSourceRef.value.selectedCamera,
      openEye: true,
      sourceName: sourceName.value,
      type: SourceType.windows,
      focus: false,
      track: event.getVideoTracks()[0],
      trackId: event.getVideoTracks()[0].id,
      stream: event,
      streamId: event.id,
      muted: false,
      hidden: false,
      scaleInfo: {},
      rect: {left: 0, top: 0},
    };
    const {canvasDom, videoEl, scale} = await autoCreateVideo({
      stream: event,
      id: videoTrack.id,
      rect: videoTrack.rect,
      scaleInfo: videoTrack.scaleInfo,
    });

    setScaleInfo({canvasDom, track: videoTrack, scale});
    videoTrack.videoEl = videoEl;
    videoTrack.canvasDom = canvasDom;

    //处理音频
    const audio = event.getAudioTracks();
    if (audio.length) {
      videoTrack.audio = 1;
      videoTrack.volume = liveStore.normalVolume;


      const audioTrack: LiveTrackItem = {
        openEye: true,
        id: videoTrack.id,
        audio: 1,
        video: 2,
        sourceName: sourceName.value,
        type: SourceType.windows,
        track: event.getAudioTracks()[0],
        trackId: event.getAudioTracks()[0].id,
        stream: event,
        streamId: event.id,
        focus: false,
        hidden: true,
        muted: false,
        volume: videoTrack.volume,
        scaleInfo: {},
      }

      liveStore.addTrack(videoTrack);
      liveStore.addTrack(audioTrack)
      cacheStore.setResourceList(liveStore.allTrack);
      handleMixedAudio();
    } else {
      liveStore.addTrack(videoTrack);
      cacheStore.setResourceList(liveStore.allTrack)
    }
    console.log('获取窗口成功');

  } else if (showIndex.value === SourceType.camera) {
    const event = await handleUserMedia({
      video: {
        deviceId: addMediaSourceRef.value.selectedCamera,
      },
      audio: false,
    });

    if (!event) return;
    const videoTrack: LiveTrackItem = {
      audio: 2,
      video: 1,
      id: getRandomEnglishString(6),
      deviceId: addMediaSourceRef.value.selectedCamera,
      sourceName: sourceName.value,
      type: SourceType.camera,
      openEye: true,
      focus: false,
      hidden: false,
      track: event.getVideoTracks()[0],
      trackId: event.getVideoTracks()[0].id,
      stream: event,
      streamId: event.id,
      muted: false,
      scaleInfo: {},
      rect: {
        left: 0,
        top: 0
      }
    }
    const {canvasDom, videoEl, scale} = await autoCreateVideo({
      stream: event,
      id: videoTrack.id,
      rect: videoTrack.rect,
      scaleInfo: videoTrack.scaleInfo,
    });
    setScaleInfo({canvasDom, track: videoTrack, scale});
    videoTrack.videoEl = videoEl;
    videoTrack.canvasDom = canvasDom;

    liveStore.addTrack(videoTrack);
    cacheStore.setResourceList(liveStore.allTrack);
    console.log('获取摄像头成功');

  } else if (showIndex.value === SourceType.microPhone) {

    const event = await handleUserMedia({
      video: false,
      audio: {
        deviceId: addMediaSourceRef.value.selectedMicroPhone
      },
    });

    if (!event) return;

    const microphoneVideoTrack: LiveTrackItem = {
      id: getRandomEnglishString(6),
      openEye: true,
      deviceId: addMediaSourceRef.value.selectedMicroPhone,
      audio: 1,
      video: 2,
      sourceName: sourceName.value,
      type: SourceType.microPhone,
      track: event.getAudioTracks()[0],
      trackId: event.getAudioTracks()[0].id,
      stream: event,
      streamId: event.id,
      hidden: false,
      muted: false,
      focus: false,
      volume: liveStore.normalVolume,
      scaleInfo: {},
    };

    const videoEl = createVideo({appendChild: false, muted: true});

    bodyAppendChildElArr.value.push(videoEl);
    videoEl.setAttribute('videoId', microphoneVideoTrack.id);
    videoEl.srcObject = event;
    microphoneVideoTrack.videoEl = videoEl;
    liveStore.addTrack(microphoneVideoTrack);
    cacheStore.setResourceList(liveStore.allTrack);
    handleMixedAudio();
    // cacheStore.setResourceList(res);
  } else if (showIndex.value === SourceType.text) {
    const textTrack: LiveTrackItem = {
      id: getRandomEnglishString(6),
      openEye: true,
      audio: 2,
      video: 1,
      sourceName: sourceName.value,
      type: SourceType.text,
      track: undefined,
      trackId: undefined,
      stream: undefined,
      streamId: undefined,
      focus: false,
      hidden: false,
      muted: false,
      scaleInfo: {},
      textInfo: {
        color: addMediaSourceRef.value.color,
        text: addMediaSourceRef.value.content,
        transparency: addMediaSourceRef.value.transparency
      }
    };
    if (fabricCanvas.value) {
      const canvasDom = markRaw(
          new fabric.Text(addMediaSourceRef.value.content || '', {
            top: 0,
            left: 0,
            fill: addMediaSourceRef.value.color,
            opacity: addMediaSourceRef.value.transparency / 100
          })
      );
      handleMoving({canvasDom, id: textTrack.id});
      handleScaling({canvasDom, id: textTrack.id});
      if (window.devicePixelRatio !== 1) {
        const ratio = 1 / window.devicePixelRatio;
        canvasDom.scale(ratio);
        textTrack.scaleInfo[window.devicePixelRatio] = {
          scaleX: ratio,
          scaleY: ratio,
        };

      } else {
        textTrack.scaleInfo[window.devicePixelRatio] = {scaleX: 1, scaleY: 1};
      }

      textTrack.canvasDom = canvasDom;
      fabricCanvas.value.add(canvasDom);
    }
    // const res = [...liveStore.allTrack, textTrack];
    // @ts-ignore
    liveStore.addTrack(textTrack);
    cacheStore.setResourceList(liveStore.allTrack);

    console.log('获取文字成功');
  } else if (showIndex.value === SourceType.time) {

    const timeTrack: LiveTrackItem = {
      id: getRandomEnglishString(6),
      openEye: true,
      audio: 2,
      video: 1,
      sourceName: sourceName.value,
      type: SourceType.time,
      track: undefined,
      trackId: undefined,
      stream: undefined,
      streamId: undefined,
      hidden: false,
      focus: false,
      timeInfo: {
        color: addMediaSourceRef.value.color,
      },
      muted: false,
      scaleInfo: {},
    };
    if (fabricCanvas.value) {
      const canvasDom = markRaw(
          new fabric.Text(new Date().toLocaleString(), {
            top: 0,
            left: 0,
            fill: addMediaSourceRef.value.color,
          })
      );


      const textTrack: LiveTrackItem = {
        id: getRandomEnglishString(6),
        openEye: true,
        audio: 2,
        video: 1,
        sourceName: sourceName.value,
        type: SourceType.text,
        track: undefined,
        trackId: undefined,
        stream: undefined,
        streamId: undefined,
        focus: false,
        hidden: false,
        muted: false,
        scaleInfo: {},
        textInfo: {
          color: addMediaSourceRef.value.color,
          text: addMediaSourceRef.value.content,
          transparency: addMediaSourceRef.value.transparency
        }
      };

      setScaleInfo({canvasDom, track: textTrack});

      timeCanvasDom.value.push(canvasDom);
      handleMoving({canvasDom, id: timeTrack.id});
      handleScaling({canvasDom, id: timeTrack.id});
      timeTrack.canvasDom = canvasDom;
      fabricCanvas.value.add(canvasDom);
    }
    liveStore.addTrack(timeTrack);
    cacheStore.setResourceList(liveStore.allTrack);
    // cacheStore.setResourceList(res);
  } else if (showIndex.value === SourceType.stopWatch) {

    const stopwatchTrack: LiveTrackItem = {
      id: getRandomEnglishString(6),
      openEye: true,
      audio: 2,
      video: 1,
      sourceName: sourceName.value,
      type: SourceType.stopWatch,
      track: undefined,
      trackId: undefined,
      focus: false,
      stream: undefined,
      streamId: undefined,
      hidden: false,
      muted: false,
      scaleInfo: {},
      stopwatchInfo: {
        color: addMediaSourceRef.value.color
      }
    };
    if (fabricCanvas.value) {
      const canvasDom = markRaw(
          new fabric.Text('00天00时00分00秒000毫秒', {
            top: 0,
            left: 0,
            fill: addMediaSourceRef.value.color,
            // editable: true,
          })
      );
      setScaleInfo({canvasDom, track: stopwatchTrack});
      stopwatchCanvasDom.value.push(canvasDom);
      handleMoving({canvasDom, id: stopwatchTrack.id});
      handleScaling({canvasDom, id: stopwatchTrack.id});
      stopwatchTrack.canvasDom = canvasDom;
      fabricCanvas.value.add(canvasDom);
    }
    // const res = [...liveStore.allTrack, stopwatchTrack];

    liveStore.addTrack(stopwatchTrack);
    cacheStore.setResourceList(liveStore.allTrack);
    console.log("获取秒表成功")
  } else if (showIndex.value === SourceType.image) {

    const imgTrack: LiveTrackItem = {
      id: getRandomEnglishString(6),
      openEye: true,
      audio: 2,
      video: 1,
      sourceName: sourceName.value,
      type: SourceType.image,
      track: undefined,
      trackId: undefined,
      stream: undefined,
      streamId: undefined,
      hidden: false,
      focus: false,
      muted: false,
      scaleInfo: {},
      imgInfo: {
        name: addMediaSourceRef.value.imageOrVideoTitle,
        transparency: addMediaSourceRef.value.transparency
      }
    };
    if (fabricCanvas.value) {
      if (!uploadFile.value) return;
      const {code} = await saveFile({file: uploadFile.value, fileName: imgTrack.id})
      if (code !== 1) return;

      const imgEl = await new Promise<HTMLImageElement>((resolve) => {
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            function () {
              const img = document.createElement('img');
              img.src = reader.result as string;
              img.onload = () => {
                resolve(img);
              };
            },
            false
        );
        if (uploadFile.value) {
          reader.readAsDataURL(uploadFile.value);
        }
      });
      const canvasDom = markRaw(
          new fabric.Image(imgEl, {
            top: 0,
            left: 0,
            width: imgEl.width,
            height: imgEl.height,
            opacity: addMediaSourceRef.value.transparency
          })
      );

      const scale = handleScale({width: imgEl.width, height: imgEl.height});
      setScaleInfo({canvasDom, track: imgTrack, scale});
      handleMoving({canvasDom, id: imgTrack.id});
      handleScaling({canvasDom, id: imgTrack.id});
      imgTrack.canvasDom = canvasDom;
      fabricCanvas.value.add(canvasDom);

    }
    liveStore.addTrack(imgTrack);
    cacheStore.setResourceList(liveStore.allTrack);
    // console.log('获取图片成功');
  } else if (showIndex.value === SourceType.video) {
    const mediaVideoTrack: LiveTrackItem = {
      id: getRandomEnglishString(6),
      openEye: true,
      audio: 2,
      video: 1,
      focus: false,
      sourceName: sourceName.value,
      type: SourceType.video,
      track: undefined,
      trackId: undefined,
      stream: undefined,
      streamId: undefined,
      hidden: false,
      muted: false,
      scaleInfo: {},
      rect: {left: 0, top: 0},
    };
    if (fabricCanvas.value) {
      if (!uploadFile.value) return;
      const {code} = await saveFile({file: uploadFile.value, fileName: mediaVideoTrack.id});
      if (code !== 1) return;
      const {videoEl, canvasDom, scale, stream} = await autoCreateVideo({
        file: uploadFile.value,
        id: mediaVideoTrack.id,
        muted: mediaVideoTrack.muted,
        rect: mediaVideoTrack.rect,
        scaleInfo: mediaVideoTrack.scaleInfo,
      });
      setScaleInfo({canvasDom, track: mediaVideoTrack, scale});

      mediaVideoTrack.videoEl = videoEl;
      mediaVideoTrack.canvasDom = canvasDom;
      mediaVideoTrack.stream = stream;
      mediaVideoTrack.streamId = stream.id;
      mediaVideoTrack.track = stream.getVideoTracks()[0];
      mediaVideoTrack.trackId = stream.getVideoTracks()[0].id;
      if (stream.getAudioTracks()[0]) {
        console.log('视频有音频');
        mediaVideoTrack.audio = 1;
        mediaVideoTrack.volume = liveStore.normalVolume;
        const audioTrack: LiveTrackItem = {
          id: mediaVideoTrack.id,
          openEye: true,
          audio: 1,
          video: 2,
          sourceName: sourceName.value,
          type: SourceType.video,
          track: stream.getAudioTracks()[0],
          trackId: stream.getAudioTracks()[0].id,
          stream: stream,
          streamId: stream.id,
          hidden: true,
          muted: false,
          focus: false,
          volume: mediaVideoTrack.volume,
          scaleInfo: {},
        };
        liveStore.addTrack(audioTrack);
        cacheStore.setResourceList(liveStore.allTrack);
        handleMixedAudio();
      }
    }
    liveStore.addTrack(mediaVideoTrack);
    cacheStore.setResourceList(liveStore.allTrack);
    console.log('获取视频成功');
  }
}

/**
 * 从画布中删除，并清除缓存
 * @param item track
 */
function handleDelete(item: LiveTrackItem) {
  if (item.canvasDom !== undefined) {
    fabricCanvas.value?.remove(item.canvasDom);
  }
  const delItem = liveStore.allTrack.filter((i) => i.id === item.id);

  delItem.forEach((v) => {
    v.videoEl?.pause();
    v.videoEl?.removeAttribute('src');
    v.videoEl?.remove();
    v.stream?.getTracks().forEach((track) => {
      track.stop();
      v.stream?.removeTrack(track);
    });
  });
  bodyAppendChildElArr.value.forEach((el) => {
    const videoId = el.getAttribute('videoId');
    if (item.id === videoId) {
      el.remove();
    }
  });
  const res = liveStore.allTrack.filter((i) => i.id !== item.id);
  liveStore.setAllTrack(res);
  cacheStore.setResourceList(res);
  //tips 重新混流音频
  handleMixedAudio();
}

/**
 * 更改显示与隐藏
 * @param track
 */
function handleEye(track: LiveTrackItem) {
  if (track.type === SourceType.microPhone) {
    return;
  }
  // console.log(id)
  let edit = false;
  const res = liveStore.allTrack.map((item) => {
    if (item.id === track.id) {
      item.openEye = !item.openEye;

      if (item.openEye) {
        if (item.canvasDom) {
          item.canvasDom.opacity = 1;
        }
      } else {
        if (item.canvasDom) {
          item.canvasDom.opacity = 0;
        }
      }
      edit = true;
    }
    return item;
  });
  if (edit) {
    liveStore.setAllTrack(res);
    cacheStore.setResourceList(res);
  }
}

/**
 * 更改静音
 * @param item
 */
function handleChangeMuted(item: LiveTrackItem) {
  if (item.videoEl) {
    const res = !item.muted;
    item.volume = res ? 0 : liveStore.normalVolume;
    item.muted = res;


    if (item.type) {
      if (item.type !== SourceType.microPhone) {
        item.videoEl.muted = res;
      }
      item.videoEl.volume = res ? 0 : liveStore.normalVolume / 100;

      console.log(item.type, item.volume, item.muted)
    }
    cacheStore.setResourceList(liveStore.allTrack);
    handleMixedAudio();
  }
}

/**
 * 更改音量
 * @param track 轨道
 */
function handleChangeVolume(track: LiveTrackItem) {
  console.log(track.volume)
  const res = liveStore.allTrack.map(item => {
    if (item.id === track.id) {
      if (track.volume !== undefined) {
        item.volume = track.volume!;
        item.muted = track.volume === 0;
        console.log(item.muted)

        if (item.videoEl && track.type) {
          item.videoEl.volume = track.volume / 100;
          if (track.type !== SourceType.microPhone) {
            item.videoEl.muted = track.volume === 0;
          }
        }
      }
    }
    return item;
  });

  liveStore.setAllTrack(res);
  cacheStore.setResourceList(res);
  handleMixedAudio();
}

/**
 * 激活元素
 * @param track
 */
function handleActiveObject(track: LiveTrackItem) {
  liveStore.allTrack.forEach((item) => {
    if (item.id === track.id) {
      //选中的元素有canvasDom
      if (item.canvasDom) {
        //选中的元素有dom，并且处于激活状态
        if (item.focus) {
          item.focus = false;
          fabricCanvas.value!.discardActiveObject();
          return;
        } else {
          //选中的元素有dom，之前处于未激活
          item.focus = true;
          fabricCanvas.value!.setActiveObject(item.canvasDom);
        }
      }
    } else {
      //其他元素取消激活
      item.focus = false;
    }
  });
}


/**
 * 修改时，打开对话框
 * @param item
 */
function handleEdit(item: LiveTrackItem) {
  activeId.value = item.id;
  openAddSourceDialog(item.type, item.id);
}


/**
 * 移除所有素材
 */
function handleClear() {
  liveStore.allTrack.forEach(item => {
    if (item.canvasDom !== undefined) {
      fabricCanvas.value?.remove(item.canvasDom);
    }

    item.videoEl?.pause();

    item.videoEl?.removeAttribute('src');
    item.videoEl?.remove();
    item.stream?.getTracks().forEach((track) => {
      track.stop();
      item.stream?.removeTrack(track);
    });

    bodyAppendChildElArr.value.forEach((el) => {
      const videoId = el.getAttribute('videoId');
      if (item.id === videoId) {
        el.remove();
      }
    });
  })

  liveStore.clearTrack();
  cacheStore.$reset();
}

/**
 * 卸载时清除副作用
 */
onUnmounted(() => {
  //清除定时器
  clearInterval(recordVideoTimer.value);
  //清除
  recorder.value?.stop();
  //清除多余的el
  bodyAppendChildElArr.value.forEach((el) => {
    el.remove();
  });

  //清除worker刷新页面
  clearFrame();
  worker.value?.terminate();

  //停止轨道
  liveStore.allTrack.forEach((v) => {
    v.videoEl?.pause();
    v.videoEl?.removeAttribute('src');
    v.videoEl?.remove();
    v.stream?.getTracks().forEach((track) => {
      track.stop();
      v.stream?.removeTrack(track);
    });
  })
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function handleEndLive() {
  worker.value.postMessage({
    type: 'request-clear-loop',
    timer: workerMsrTimerId.value,
  });
  //
  recorder.value?.removeEventListener('dataavailable', handleSendBlob);
  // endLive()
}

function handleMsr(stream: MediaStream) {
  // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter
  const mimeType = 'video/webm;codecs=avc1.4d002a,opus';
  // const mimeType = 'video/webm;codecs=avc1.64001f,opus'; // b站的参数
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    console.error('不支持', mimeType);
    return;
  } else {
    console.log('支持', mimeType);
  }

  /**
   * 小写的 "kb/s" 表示千比特每秒，而大写的 "KB/s" 表示千字节每秒
   * 例如，当我们说 100 kb/s 时，意思是每秒传输100千比特（比特）的数据。而当我们说 100 KB/s 时，意思是每秒传输100千字节（字节）的数据，相当于800千比特（比特）
   * 千字节（KB）、兆字节（MB）、千兆字节（GB）
   * 8 比特（bits）等于 1 字节（byte）
   * 1 Kbps（千比特每秒）等于 0.125 KB/s（千字节每秒）
   * 1 Mbps（兆比特每秒）等于 0.125 MB/s（兆字节每秒）
   * bit，比特
   * byte，字节
   * videoBitsPerSecond的单位是比特，假设videoBitsPerSecond值是1000*2000，即2000000
   * 2000000比特等于2000000 / 8 / 1000 = 250 KB/s
   */

  recorder.value = new MediaRecorder(stream, {
    mimeType,
    // bitsPerSecond: 1000 * currentMaxBitrate.value,
    videoBitsPerSecond: 1000 * videoBitRate.value, // 单位是比特
    audioBitsPerSecond: 1000 * 2000,
  });
  //todo 发送的地方
  recorder.value.ondataavailable = handleSendBlob;
  worker.value?.postMessage({
    type: 'request-clear-loop',
    timer: workerMsrTimerId.value,
  });
  worker.value?.postMessage({
    type: 'request-start-msr-loop',
    delay: msrDelay.value,
  });
  worker.value?.addEventListener('message', (e) => {
    if (e.data.type === 'response-start-msr-loop') {
      workerMsrTimerId.value = e.data.timer;
    } else if (e.data.type === 'response-msr-looping') {
      recorder.value?.stop();
      recorder.value?.start();
    }
  });

}

const blobId = ref(0);

//todo
function handleSendBlob(event: BlobEvent) {
  console.log(event.data);
  const uint8ArrayReadableStream = event.data.stream();

  blobId.value += 1;
}


const handleScreenShot = () => {
  const url = generateBase64(pushCanvasRef.value!);
  const a = document.createElement("a");
  const event = new MouseEvent('click');
  a.download = `${+new Date()}截屏`;
  a.href = url;
  a.dispatchEvent(event);
}

const loss = ref<string>("");

const rtt = ref<string>("");
const roomId = ref<string>("");

const socketResult = reactive({
  id: "",
  type: "",
  data: "",
  senderName: "",
  senderId: ""
});
let closeFn: Function | undefined;

let sendFn: Function | undefined;


const {files, open, reset, onChange} = useFileDialog({
  accept: "image/*"
})


const fileUri = ref<string>('')
onChange((files) => {
  if (files) {
    simpleUploadApi({
      file: files[0],
      prev: removePrefix(fileUri.value)
    }).then(res => {
      if (res.code === 200) {
        fileUri.value = withPrefix(res.data)
        ElMessage.success("封面上传成功")
      }
    })
  }

})

async function startRTC() {
  if (!roomName.value || !typeName.value || userStore.id == 0 || fileUri.value == "") {
    ElMessage.error("请填写房间名、封面图片和直播类型");
    return;
  }
  if (liveStore.allTrack.length == 0) {
    ElMessage.error("请添加素材");
    return;
  }

  if (!roomId.value) {
    roomId.value = getRandomEnglishString(8);
  }

  webRTC.value = new SimpleWebRTCClass({
    roomId: roomId.value,
    maxBitrate: videoBitRate.value,
    loss: loss,
    rtt: rtt
  });

  initAudio();
  const tracks = canvasVideoStream.value!.getTracks()

  webRTC.value?.addTracks(tracks);

  const offer = await webRTC.value?.createOffer();
  if (!offer) return;

  await webRTC.value?.setLocalDescription(offer);
  let param: StartLiveParam = {
    sdp: offer.sdp!,
    roomTitle: roomName.value,
    startId: userStore.id,
    typeTitle: typeName.value,
    notice: notice.value,
    roomCover: removePrefix(fileUri.value),
    roomId: roomId.value,
  }

  notice.value = "";
  const res = await startLiveApi(param);

  localStorage.setItem("live", JSON.stringify({
    roomId: res.data.roomId,
    roomName: roomName.value,
    typeName: typeName.value
  }));
  //保存一份playUrl

  await webRTC.value?.setRemoteDescription(res.data.sdp);
  isLiving.value = true;

  const {send, close} = useWebSocket(res.data.roomId, userStore.id, socketResult);

  closeFn = close;
  sendFn = send;
}


const chatMessage = reactive({
  mess: [],
});

export interface SocketMessage {
  // 系统，用户，通知，房主
  type: 'system' | 'user' | 'notice' | 'room';
  id: string | number;
  data: any;
  to?: string;
  senderName?: string;
  senderId: string;
}


const watching = ref(0);

async function getWatchingNumber() {
  const res = await getWatching(typeName.value + "-" + roomId.value);
  watching.value = res.data;
}

watch(() => socketResult.id, async (value, old) => {
  if (value !== old && value != "") {

    if (socketResult.type === "notice") {
      await getWatchingNumber();
    }

    const res = {
      id: socketResult.id,
      type: socketResult.type,
      data: socketResult.data,
      senderName: socketResult.senderName,
      senderId: socketResult.senderId
    }
    chatMessage.mess.push(res);
    socketResult.id = "";
    socketResult.type = ""
    socketResult.data = "";
    socketResult.senderName = "";
    socketResult.senderId = ""
    scrollMessage();
  }
})

const messageRef = ref<HTMLUListElement | null>(null);

function scrollMessage() {
  nextTick(() => {
    messageRef.value!.scrollTop = messageRef.value!.scrollHeight + 20;
  })
}

function sendMessage() {
  if (isLiving.value) {
    const sendName = userStore.username;
    const id = userStore.id.toString();

    if (danMu.value != "") {
      const mess: SocketMessage = {
        type: 'room',
        data: danMu.value,
        senderName: sendName,
        senderId: id.toString(),
        id: nanoid(),
      }
      if (sendFn && sendFn instanceof Function) {
        sendFn(JSON.stringify(mess));
      }

      danMu.value = "";
    }
  } else {
    ElMessage.error("开播后才能发送消息")
  }
}

async function stopRTC() {
  worker.value!.postMessage({
    type: 'request-clear-loop',
    timer: workerMsrTimerId.value,
  });

  reset()
  const mess: SocketMessage = {
    type: 'system',
    data: "直播结束",
    senderName: userStore.username,
    senderId: userStore.id.toString(),
    id: nanoid(),
  }

  console.log(mess)
  sendFn && sendFn(JSON.stringify(mess));

  await stopLiveApi(typeName.value + "-" + roomId.value);
  webRTC.value = null;
  localStorage.removeItem("live");
  isLiving.value = false;
  handleClear();

  chatMessage.mess = []

  loss.value = "";
  rtt.value = "";
  roomId.value = "";

  closeFn && closeFn();
}

</script>

<style lang="less" scoped>
.push-wrap {
  display: flex;
  justify-content: space-between;
  width: 1250px;
  margin: 15px auto 0;
  position: relative;

  .background-wrap {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    left: 50%;
    max-height: 890px;
    max-width: 1920px;
    position: absolute;
    top: 60px;
    transform: translateX(-50%);
    width: 100%;
  }

  .left {
    background-color: #fff;
    border-radius: 6px;
    box-sizing: border-box;
    color: #9499a0;
    display: inline-block;
    height: 100%;
    position: relative;
    //vertical-align: top;
    //min-width: 950px;
    //min-height: 558px;

    .el-card {
      transition: width 0s;

      :deep(.el-card__body) {
        width: 100%;
        display: flex;
      }
    }

    .container {
      //background-color: rgba(0, 0, 0, .5);
      //height: 100%;
      height: 630px;
      width: 1158px;
      position: relative;

      .screen-short {
        cursor: pointer;
        left: -10px;
        position: absolute;
        top: 30px;
        transform: translateX(-100%);
      }

      .record-icon {
        cursor: pointer;
        left: -10px;
        position: absolute;
        top: 0;
        transform: translateX(-100%);
      }

      .canvas-container {
        //1120px
        width: 1120px;
        height: 630px;
        background-color: rgba(27, 27, 27, 1);
        border-radius: 6px;
      }
    }
  }

  .right {
    background-color: #fff;
    border-radius: 6px;
    box-sizing: border-box;
    color: #9499a0;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 300px;

    .el-card {
      :deep(.el-card__body) {
        padding: 0;
      }
    }
  }
}

#pushCanvasRef {
  aspect-ratio: auto 16/9;
  left: 0;
  top: 0;
}

.confirm {
  background-color: #fb7299;
  //color: rgb(0, 0, 255);
}

.li-active {
  background-color: rgb(226, 228, 232);
}

.el-popper {
  padding: 2px !important;
  background-color: red;
}

.all-selected {
  &::-webkit-scrollbar {
    width: 0;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #bcbfc4;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #d3dce6;
  }
}

@media screen and (max-width: 1499px) {
  .push-wrap {
    .left {
    }
  }
}

@media screen and (max-width: 1300px) {
  .push-wrap {
    .left {
      .el-card {
        width: 1062px !important;
      }
    }
  }
}

@media screen and (min-width: 1500px) {
  .push-wrap {
    width: 1475px;

    .left {
      width: 1170px;
    }

    .right {
      width: 300px;
    }
  }
}

.el-slider {
  :deep(.el-slider__runway) {
    height: 2px;
  }

  :deep(.el-slider__bar) {
    background-color: #fb7299;
    height: 2px;
  }

  :deep(.el-slider__button) {
    //background-color: black;
    width: 8px;
    height: 8px;
    border: 1.5px solid #fb7299;
  }
}

.content {
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #bcbfc4;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #d3dce6;
  }
}
</style>
