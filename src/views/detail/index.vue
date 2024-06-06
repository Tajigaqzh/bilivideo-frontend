<template>
  <div class="bg-[rgb(241,242,243)] h-full">
    <HpHeader/>
    <div class="live-detail min-w-[1220px] max-w-[1504px] mx-auto w-4/5 flex pt-3 pb-20">
      <div class="player-center relative">
        <div class="header-info h-[98px]">
          <div class="header-info-center p-[17px] flex">
            <img :src="roomDetail.avatar" class="w-16 h-16 rounded-full mr-3" alt="头像"/>
            <div class="info flex-1">
              <div class="flex justify-between">
                <div class="left">{{ roomDetail.username }}
                  <button class="text-sm bg-[rgb(255,102,153)]  w-16 rounded-xl text-white ml-1">
                    +关注
                  </button>

                </div>
                <div class="right text-sm text-[rgb(148,153,160)] flex cursor-pointer">
                  <div class="flex items-center">观看人数
                    <span class="ml-1">{{ watching }}</span>
                  </div>
                  <!--                  <div class="flex items-center mr-6 text-sm">-->
                  <!--                    <el-icon class="mr-2">-->
                  <!--                      <View color="rgb(148,153,160)"/>-->
                  <!--                    </el-icon>-->
                  <!--                    4.5万人看过-->
                  <!--                  </div>-->
                  <!--                  <div class="flex items-center text-sm">-->
                  <!--                    <HpSvgIcon name="zan1" :size="16" color="rgb(148,153,160)" class="mr-2"/>-->
                  <!--                    1.2万人点赞-->
                  <!--                  </div>-->
                  <div class="flex items-center ml-6 text-sm" @click="handleShare">
                    <HpSvgIcon name="share" :size="16" color="rgb(148,153,160)" class="mr-2"/>
                    分享
                  </div>

                </div>
              </div>
              <div class="keyword text-xs text-[rgb(148,153,160)] mt-3">
                <!--                搞笑 热门-->
                <!--                <div>公告</div>-->
              </div>
            </div>
          </div>

        </div>

        <div class="w-full h-[610px] relative bg-black" ref="parentRef">
          <!--          <video id="video-webrtc" controls ref="liveVideoRef" class="w-full h-full video-js"></video>-->
          <!--          <video ref="liveVideoRef" controls class="w-full h-[610px]"></video>-->
          <!--          <video id="player" class="w-full h-full"></video>-->
          <!--          -->

          <div id="mse" ref="liveVideoRef"></div>
          <div class="w-full h-full absolute top-0 text-white py-3" ref="danMuRef"></div>
        </div>


        <div class="gift w-full h-[80px] rounded-b-xl bg-cyan-100">gift</div>
      </div>

      <div class="live-aside ml-3 w-[302px] rounded-t-[12px] bg-white pt-2 relative">
        <div class="text-sm font-bold w-full text-center border-b-2">评论区</div>
        <!--        <el-message>请yoush</el-message>-->
        <!--        bg-[rgb(246,247,248)]-->

        <el-collapse accordion class="absolute w-full">
          <el-collapse-item name="1">
            <template #title>
              <div class="ml-4">直播间公告</div>
            </template>
            <div>
            </div>

          </el-collapse-item>

        </el-collapse>
        <div class=" text-sm h-[670px] mt-2 p-2.5 overflow-hidden  bg-[rgb(246,247,248)]">
          <ul class="comments text-sm h-[630px] overflow-y-scroll pb-2 bg-[rgb(246,247,248)] mt-8" ref="messageRef">
            <li class="py-1.5 px-2 mb-1 flex" v-for="item in chatMessage.mess">
              <!--              <img width="50" height="50" class="w-[50px] h-[40px] mr-1.5 rounded-full" src="/src/assets/avatar.png"/>-->
              <div>
                <div class="text-xs " :class="{'text-cyan-500' : item.type==='room'}">{{ item.senderName }}</div>
                <div class="pl-4 text-xs text-gray-400  mt-1">{{ item.data }}</div>
              </div>
            </li>

          </ul>

        </div>
        <div class=" mx-2 h-16 mt-2 flex overflow-hidden items-center">
          <el-input type="textarea" class=" outline-none textarea w-[80%] h-16 border-none min-h-16"
                    v-model="message" :maxlength="30" rows="3"></el-input>
          <el-button class="float-right mt-3  ml-2" type="primary" size="default" @click="sendMessage">发送</el-button>
        </div>


      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import HpHeader from "@/views/live/HpHeader.vue";
import {Action, ElMessage, ElMessageBox} from "element-plus";
import {useCookies} from "@vueuse/integrations/useCookies";
import {computed, reactive, ref, onMounted, watch, nextTick, shallowRef, onUnmounted} from "vue";
import {useRouter, useRoute} from "vue-router";


import {getDetailApi, getWatching} from "@/api/live.ts";
import {withPrefix} from "@/utils/imgUtil.ts";
import {nanoid} from "nanoid";
import useWebSocket from "@/hook/useSocket.ts";
import {useUserStore} from "@/store/userStore.ts";
import {copyToClipBoard} from "@/utils/videoUtil.ts";

import 'xgplayer';
import 'xgplayer/dist/index.min.css'
import Player from "xgplayer";
import FlvJsPlugin from "xgplayer-flv.js";
import DanmuJs from 'danmu.js'
import {useElementSize} from "@vueuse/core";

const roomDetail = reactive({
  avatar: "",
  url: "",
  roomId: "",
  username: "",
  notice: ""
})
const chatMessage = reactive({
  mess: [],
});


const userStore = useUserStore();
const route = useRoute();

const router = useRouter()

const parentRef = ref<HTMLDivElement>();

const {width, height} = useElementSize(parentRef)


const socketResult = reactive({
  id: "",
  type: "",
  data: "",
  senderName: "",
  senderId: ""
});

export interface SocketMessage {
  // 系统，用户，通知，房主
  type: 'system' | 'user' | 'notice' | 'room';
  id: string;
  data: any;
  to?: string;
  senderName?: string;
  senderId: string;
}


onMounted(() => {
  initFlv();
  getWatchingNumber();
  initDanMu();
});

const cookies = useCookies(['token']);


const fullUrl = computed(() => {
  const token = cookies.get("token");
  return "https://live.nwyzx.com/live/" + route.params.id + `.flv?roomId=${route.params.id}&token=${token}`
})
const danMuRef = ref<HTMLDivElement>();
const danMuInstance = shallowRef<any>(null);

const liveVideoRef = ref<HTMLVideoElement>();


watch(() => width.value, (value) => {
  nextTick(() => {
    liveVideoRef.value.style.width = value + "px";
    liveVideoRef.value.style.height = height.value + "px";
  })
})

const player = ref<Player | null>(null)

function initFlv() {
  const w = width.value;
  const h = height.value;
  console.log(w, h)
  player.value = new Player({
    id: 'mse',
    isLive: true,
    playsinline: true,
    url: fullUrl.value,
    autoplay: true,
    height: h,
    width: w,
    plugins: [FlvJsPlugin]
  });
}

const {send, close} = useWebSocket(route.params.id as string, userStore.id, socketResult);


const isLiving = ref(true);
const watching = ref(0);
const message = ref("");


function initDanMu() {
  danMuInstance.value = new DanmuJs({
    container: danMuRef.value!,
    containerStyle: {
      //弹幕容器样式
      zIndex: 100
    },
    area: {
      //弹幕显示区域
      start: 0, //区域顶部到播放器顶部所占播放器高度的比例
      end: 1, //区域底部到播放器顶部所占播放器高度的比例
      lines: undefined // 弹幕虚拟轨道显示行数。当指定行数时，显示范围 start/end 不生效；当弹幕字体大小超过所需要的总虚拟轨道数时，弹幕也不会出现在轨道上，因此请设置好弹幕fontSize及影响弹幕高度的其他样式，让弹幕和轨道高度匹配
    },
    comments: [],
    channelSize: 20, // 轨道大小
    mouseControl: false, // 打开鼠标控制, 打开后可监听到 bullet_hover 事件。danmu.on('bullet_hover', function (data) {})
    mouseControlPause: false, // 鼠标触摸暂停。mouseControl: true 生效
    //bOffset: 1000, // 可调节弹幕横向间隔（毫秒）
    defaultOff: true, // 开启此项后弹幕不会初始化，默认初始化弹幕
    chaseEffect: true // 开启滚动弹幕追逐效果, 默认为true

  })
  danMuInstance.value?.start();
}

async function getWatchingNumber() {
  const res = await getWatching(route.params.id as string);
  watching.value = res.data;
}


const destroy = () => {
  player.value.destroy();
  player.value = null;
};
//
onUnmounted(() => {
  destroy();
  close();
  danMuInstance.value = null;
  isLiving.value = false;
});

async function getDetail() {
  const res = await getDetailApi(route.params.id as string);

  if (res.code !== 200) {
    await ElMessageBox.alert('点击返回首页', '直播已结束', {
      confirmButtonText: '确定',
      callback: (action: Action) => {
        router.push("/");
      }
    })
  } else if (res.data.endTime) {
    await ElMessageBox.alert('点击返回首页', '直播已结束', {
      confirmButtonText: '确定',
      callback: (action: Action) => {
        router.push("/");
      }
    })
  } else {
    roomDetail.avatar = withPrefix(res.data.avatar);
    roomDetail.username = res.data.username;
    roomDetail.url = res.data.playUrl;

    console.log(roomDetail.url)
  }
  console.log(res)
}

getDetail();

//
//
export interface SocketMessage {
  // 系统，用户，通知，房主
  type: 'system' | 'user' | 'notice' | 'room';
  id: string;
  data: any;
  to?: string;
  senderName?: string;
  senderId: string;
}

//
watch(() => isLiving.value, async (value) => {
  if (value == false) {
    await ElMessageBox.alert('点击返回首页', '直播已结束', {
      confirmButtonText: '确定',
      callback: () => {
        router.push("/");
      }
    })
  }
})

watch(() => socketResult.id, async (value, old) => {
  if (value !== old && value != "") {

    if (socketResult.type === "notice") {
      await getWatchingNumber();
    }
    if (socketResult.type === "system") {
      console.log("房主关闭了直播");
      isLiving.value = false;
      return;
    }
    //弹幕
    if (socketResult.type === "user") {
      danMuInstance.value.sendComment({
        duration: 15000,
        id: socketResult.id,
        // start: 3000, //不提供该项则立即发送
        txt: socketResult.data,
        style: {
          color: '#ffffff',
          fontSize: '24px',
        }
      })
    }
    const res = {
      id: socketResult.id,
      type: socketResult.type,
      data: socketResult.data,
      senderName: socketResult.senderName,
      senderId: socketResult.senderId
    }
    //@ts-ignore
    chatMessage.mess.push(res);
    socketResult.id = "";
    socketResult.type = ""
    socketResult.data = "";
    socketResult.senderName = "";
    socketResult.senderId = ""
    scrollMessage();

    console.log(chatMessage.mess)
  }
})
//
const messageRef = ref<HTMLUListElement | null>(null);

function scrollMessage() {
  nextTick(() => {
    messageRef.value!.scrollTop = messageRef.value!.scrollHeight + 20;
  })
}

function sendMessage() {
  if (isLiving.value) {
    const sendName = userStore.username;
    const id = userStore.id;
    if (message.value != "") {
      const mess: SocketMessage = {
        type: "user",
        data: message.value,
        senderName: sendName,
        senderId: id as unknown as string,
        id: nanoid(),
      }
      send(JSON.stringify(mess));
      message.value = "";
    }
  } else {
    ElMessage.error("开播后才能发送消息")
  }
}

function handleShare() {
  copyToClipBoard(import.meta.env.VITE_DOMAIN + "/detail/" + route.params.id)
  ElMessage.success("已将链接复制到剪切板")
}


</script>

<style scoped lang="less">
.live-detail {
  .player-center {
    width: calc(100% - 302px - 12px);
    box-sizing: border-box;
    z-index: 11;

    .header-info {
      background-color: white;
      border: 1px solid #e3e5e7;
      border-radius: 12px 12px 0 0;
    }
  }
}

@media screen  and (max-width: 1599.9px) {
  #play {
    height: 515px;
  }
}

.comments {
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #bcbfc4;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #d3dce6;
  }
}

.textarea.focus {
  background: red;
}

.textarea {
  :deep(.el-textarea__inner) {

    height: 64px;

  }

  :deep(.el-textarea__inner.focus) {
    height: 62px;
    background: red;
    outline: none;
    border: none;

  }
}

.el-textarea {
  :deep(.el-textarea__inner) {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
}

.text {

}
</style>