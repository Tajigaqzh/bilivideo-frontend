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

        <div class="w-full h-[610px] relative bg-black">
          <video id="video-webrtc" controls ref="liveVideoRef" class="w-full h-full"></video>
          <!--                    <video ref="liveVideoRef" controls class="w-full h-[610px]"></video>-->
          <!--          <video id="xg" class="w-full h-full"></video>-->
          <div class="w-full h-full absolute top-0 text-white py-2" ref="danMuRef"></div>
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
import {ElMessage, ElMessageBox} from "element-plus";
import mpegts from "mpegts.js";
import {useCookies} from "@vueuse/integrations/useCookies";
import {computed, reactive, ref, onMounted, watch, nextTick, shallowRef, onUnmounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import {getDetailApi, getWatching} from "@/api/live.ts";
import {withPrefix} from "@/utils/imgUtil.ts";
import {nanoid} from "nanoid";
import useWebSocket from "@/hook/useSocket.ts";
import {useUserStore} from "@/store/userStore.ts";
import {copyToClipBoard} from "@/utils/videoUtil.ts";


const fullUrl = computed(() => {
  const token = cookies.get("token");
  return "http://live.nwyzx.com/live/" + route.params.id + `.flv?roomId=${route.params.id}&token=${token}`
})


import DanmuJs from 'danmu.js'

import FlvJs from 'flv.js'
// import Player from "xgplayer";

const danMuRef = ref<HTMLDivElement>();
const danMuInstance = shallowRef<DanmuJs | null>(null);

import 'videojs-contrib-hls';


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

const userStore = useUserStore();
const route = useRoute();

const router = useRouter()
const cookies = useCookies(['token']);

const message = ref("")

const liveVideoRef = ref<HTMLVideoElement>();

const socketResult = reactive({
  id: "",
  type: "",
  data: "",
  senderName: "",
  senderId: ""
});
const isLiving = ref(true);
const watching = ref(0);


const {send, close} = useWebSocket(route.params.id as string, userStore.id, socketResult);
onMounted(() => {
  // initFlv();
  initWebRtc()
  // initFlvJs()
  // initFlvPlayer1();
  getWatchingNumber();
  initDanMu();
})


async function getWatchingNumber() {
  const res = await getWatching(route.params.id as string);
  watching.value = res.data;
}


const player = shallowRef<any>(null);

// function initFlvJs() {
//   const flvPlayer = FlvJs.createPlayer({
//     type: 'flv',
//     url: fullUrl.value
//   });
//   flvPlayer.attachMediaElement(liveVideoRef.value!);
//   flvPlayer.load();
//   flvPlayer.play();
// }

// function initWebRtc() {
//   const token = cookies.get("token");
//   const rtcPlayer = videojs(liveVideoRef.value!, {
//     source: [
//       {
//         src: 'hppts://150.158.122.237/rtc/v1/whep/?app=live&stream=' + route.params.id + `?roomId=${route.params.id}&token=${token}`,
//         type: 'video/mp4'
//       }
//     ],
//     html5: {
//       hls: {
//         withCredentials: false
//       }
//     }
//   })
// }

function initFlv() {
  const token = cookies.get("token");

  if (!token) {
    ElMessage.error("登录后才能进入直播间")
    return;
  }
  if (mpegts.getFeatureList().mseLivePlayback) {
    console.log(fullUrl.value)
    player.value = mpegts.createPlayer({
      // type: watchingType.value,
      type: "flv",
      // could also be mpegts, m2ts, flv ，m3u8
      isLive: true,
      hasAudio: true,
      hasVideo: true,
      url: fullUrl.value,
      cors: true,
    }, {
      enableWorker: true,
      // //启用分离的线程进行转换（如果不想看到控制台频繁报错把它设置为false，官方的回答是这个属性还不稳定，所以要测试实时视频流的话设置为true控制台经常报错）
      enableStashBuffer: false, //关闭IO隐藏缓冲区（如果需要最小延迟，则设置为false，此项设置针对直播视频流）
      stashInitialSize: 128, //减少首帧等待时长（针对实时视频流）
      // lazyLoad: false, //关闭懒加载模式（针对实时视频流）
      lazyLoadMaxDuration: 0.2, //懒加载的最大时长。单位：秒。建议针对直播：调整为200毫秒
      deferLoadAfterSourceOpen: false,
      // //自动追帧
      liveBufferLatencyChasing: true,
      //在MediaSource sourceopen事件触发后加载。在Chrome上，在后台打开的标签页可能不会触发sourceopen事件，除非切换到该标签页。
      liveBufferLatencyMaxLatency: 10,
      //HTMLMediaElement 中可接受的最大缓冲区延迟（以秒为单位）之前使用flv.js发现延时严重，还有延时累加的问题，而mpegts.js对此做了优化，不需要我们自己设置快进追帧了
      liveBufferLatencyMinRemain: 0.3 //HTMLMediaElement 中可接受的最小缓冲区延迟（以秒为单位）

    });
    player.value.attachMediaElement(liveVideoRef.value!);
    flvEvent()
    play(player.value);
  } else {
    ElMessage.error("此浏览器不支持观看直播，请升级或切换浏览器")
  }
}

const play = (flv: any) => {
  flv.load();
  flv.play();
};

// mpegts
const flvEvent = () => {
  // 视频错误信息回调
  player.value.on(mpegts.Events.ERROR, (errorType: any, errorDetail: any, errorInfo: any) => {
    console.log(
        '类型:' + JSON.stringify(errorType),
        '报错内容' + errorDetail,
        '报错信息' + errorInfo
    );
    //如果出错，手动销毁并重新创建
    player.value.pause();
    player.value.unload();

    setTimeout(() => {
      initFlv();
    }, 3000)

  });
  //【重要事件监听】http 请求建立好后，该事件会一直监听 mpegts 实例
  player.value.on(mpegts.Events.STATISTICS_INFO, () => {

    if (player.value.buffered.length != 0) {
      const end = player.value.buffered.end(0); //获取当前buffered值（缓冲区末尾）
      const differTime = end - player.value.currentTime; //获取bufferend与当前播放位置的差值
      console.log('差值为：' + differTime);
      //我的网络正常的延迟为7s左右，如果超过一定时间，手动跳帧
      if (differTime > 10) {
        player.value.currentTime = player.value.buffered.end(0);
        // player.value.seek(player.value.currentTime)
      }
    }

  });
};


/**
 * 销毁
 */
const destroy = () => {
  player.value.unload();
  player.value.detachMediaElement();
  player.value.destroy();
  player.value = null;
};

onUnmounted(() => {
  destroy();
  close();
  danMuInstance.value = null;
  isLiving.value = false;
});


const roomDetail = reactive({
  avatar: "",
  url: "",
  roomId: "",
  username: "",
  notice: ""
})


async function getDetail() {
  const res = await getDetailApi(route.params.id as string);

  if (res.code !== 200) {
    // await ElMessageBox.alert('点击返回首页', '直播已结束', {
    //   confirmButtonText: '确定',
    //   callback: (action: Action) => {
    //     router.push("/");
    //   }
    // })
  } else if (res.data.endTime) {
    // await ElMessageBox.alert('点击返回首页', '直播已结束', {
    //   confirmButtonText: '确定',
    //   callback: (action: Action) => {
    //     router.push("/");
    //   }
    // })
  } else {
    roomDetail.avatar = withPrefix(res.data.avatar);
    roomDetail.username = res.data.username;
    roomDetail.url = res.data.playUrl;

    console.log(roomDetail.url)
  }
  console.log(res)
}

getDetail();
type Chat = {
  mess: SocketMessage[]
}
export interface SocketMessage {
  // 系统，用户，通知，房主
  type: 'system' | 'user' | 'notice' | 'room';
  id: string;
  data: any;
  to?: string;
  senderName?: string;
  senderId: string;
}


const chatMessage = reactive<Chat>({
  mess: [],
});



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

    if (socketResult.type === "user") {

      danMuInstance.value.sendComment({
        duration: 15000,
        id: socketResult.id,
        // start: 3000, //不提供该项则立即发送
        txt: socketResult.data,
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

//获取
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