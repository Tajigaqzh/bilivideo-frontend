<template>
  <div class="bg-[rgb(241,242,243)] h-full">
    <HpHeader/>

    <!--  首页推荐热门播放-->
    <div class="player-area relative select-none min-h-[400px]">
      <a href="#" class="flex h-full">
        <!--bgImg-->
        <div class="live-bg"
             :style="bg">
        </div>
        <div class="player-center w-[1130px] h-[630px] bg-[rgba(0,0,0,.7)] overflow-hidden text-left relative rounded"
             @contextmenu="openMenu" @click="closeMenu">

          <div v-if="recommendRooms.length>0" class="z-20 text-xl absolute enter-button hidden active"
               @click="goToInfo">进入直播间
          </div>
          <!--        视频-->
          <!--          <video id="liveVideo" controls ref="liveVideoRef" class="w-full h-full rounded live" muted autoplay></video>-->

          <div id="liveVideo" class="w-full h-full"></div>
          <!--        弹幕.js-->
          <div id="danmu" class="danmu w-full h-full absolute top-0 left-0 z-[8] pointer-events-none text-white">
          </div>
          <!--        菜单-->
          <ul ref="menu"
              class="video-info-panel absolute opacity-0 p-[3px] w-60 z-[30] top-0 h-[180px] rounded">
            <li>画面异常？切换解码策略试试</li>
            <li>播放器日志信息</li>
            <li>视频统计信息</li>
            <li @click="closeMenu">关闭</li>
            <li>CopyRight hp 2024</li>
          </ul>
        </div>

        <div class="player-aside w-[230px] h-[630px] bg-blue-500">
          <!--        //激活需要两个条件，opacity1  active激活三角-->
          <div class="recommend-live w-[200px] h-[110px] mt-3 bg-[rgba(0,0,0,.4)] rounded relative"
               v-for="item in recommendRooms" @click="activeLiveRoom(item)">
            <p class="absolute left-2 bottom-1">{{ item.roomTitle }}</p>
            <div class="live-border opacity-0 hover:opacity-100"
                 :class="{'active':item.isActive,'opacity-100':item.isActive}"></div>
            <img :src="withPrefix(item.roomCover)" class="w-[200px] h-[110px]"/>
          </div>

        </div>
      </a>
    </div>
    <!--关注和分区-->
    <MyFocus/>
  </div>


</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, shallowRef, watch} from "vue";
import {useCookies} from "@vueuse/integrations/useCookies";
import DanmuJs from 'danmu.js'
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import FlvJsPlugin from "xgplayer-flv.js";

import {Action, ElMessage, ElMessageBox} from "element-plus";
import HpHeader from "@/views/live/HpHeader.vue";
import {useMenu} from "@/views/live/useMenu.ts";
import MyFocus from "@/views/live/MyFocus.vue";
import {useUserStore} from "@/store/userStore.ts";

import {useRouter} from "vue-router";
import {getFirstRecommendApi} from "@/api/live.ts";
import {withPrefix} from "@/utils/imgUtil.ts";
import useWebSocket from "@/hook/useSocket.ts";

const router = useRouter();
//视频播放的menu
const {menu, openMenu, closeMenu} = useMenu();

const userStore = useUserStore();

interface LiveRoom {
  createTime: string;
  deleteStatus: number;
  notice: string;
  playUrl: string;
  roomCover: string;
  roomId: string;
  roomTitle: string;
  startId: number;
  typeTitle: string;
  isActive: boolean;
}
// http://localhost:5173/detail/game-ImPfB3iX
const recommendRooms = reactive<Array<LiveRoom>>([])

async function init() {
  const res = await getFirstRecommendApi();

  if (res.data.length === 0) {
    await ElMessageBox.alert('等会儿再来看看吧！', '没有直播', {
      confirmButtonText: '确定',
      callback: (action: Action) => {
        // router.push("/");
      }
    })
  }

  activeUrl.value = res.data[0].playUrl ?? ""
  const result = res.data.map((item, index) => {
    if (index == 0) {
      return {
        ...item,
        isActive: true
      }
    } else {
      return {
        ...item,
        isActive: false
      }
    }
  })
  recommendRooms.push(...result);
}

init();


function activeLiveRoom(item: LiveRoom) {
  recommendRooms.forEach(content => {
    if (content.roomId === item.roomId) {
      content.isActive = true;
      activeUrl.value = content.playUrl;
    } else {
      content.isActive = false;
    }
  })
}

const cookies = useCookies(['token']);

const activePlayer = ref<Player>();

const activeUrl = ref<string>('');

const token = cookies.get("token");
const fullUrl = computed(() => {
  return activeUrl.value + `.flv?roomId=${activeUrl.value.split("/").pop()}&token=${token}`
})

function initOnePlayer() {
  activePlayer.value = new Player({
    id: 'liveVideo',
    url: fullUrl.value,
    width: '100%',
    isLive: true,
    playsinline: true,
    autoplay: true,
    height: '100%',
    lang: "zh-cn",
    plugins: [FlvJsPlugin]
  })
}

let closeFn;

/**
 * 切换房间了
 */
watch(() => fullUrl.value, (value) => {
  if (value) {
    initOnePlayer();
    if (closeFn && closeFn instanceof Function) {
      closeFn()
    }
    const {send, close} = useWebSocket(activeUrl.value.split("/").pop(), userStore.id, socketResult);

    closeFn = close
  }

})

const danMuInstance = shallowRef<any>(null);


const socketResult = reactive({
  id: "",
  type: "",
  data: "",
  senderName: "",
  senderId: ""
});


onMounted(() => {
  if (recommendRooms.length > 0) {
    initOnePlayer()
    const {send, close} = useWebSocket(activeUrl.value.split("/").pop(), userStore.id, socketResult);
    closeFn = close;
    startDanMu()
  }

})

const bg = ref({
  backgroundImage: "url('http://pic.nwyzx.com/picture/1096af2a-6677-4d76-9203-084691c64337.jpeg')"
})

function startDanMu() {
  danMuInstance.value = null;
  danMuInstance.value = new DanmuJs({
    container: document.getElementById('danmu'), //弹幕容器，该容器发生尺寸变化时会自动调整弹幕行为
    containerStyle: {
      //弹幕容器样式
      zIndex: 8
    },
    player: document.querySelector('#liveVideo'), //配合音视频元素（video或audio）同步使用时需提供该项
    comments: [],
    area: {
      //弹幕显示区域
      start: 0, //区域顶部到播放器顶部所占播放器高度的比例
      end: 1, //区域底部到播放器顶部所占播放器高度的比例
      lines: undefined // 弹幕虚拟轨道显示行数。当指定行数时，显示范围 start/end 不生效；当弹幕字体大小超过所需要的总虚拟轨道数时，弹幕也不会出现在轨道上，因此请设置好弹幕fontSize及影响弹幕高度的其他样式，让弹幕和轨道高度匹配
    },
    channelSize: 40, // 轨道大小
    mouseControl: true, // 打开鼠标控制, 打开后可监听到 bullet_hover 事件。danmu.on('bullet_hover', function (data) {})
    mouseControlPause: false, // 鼠标触摸暂停。mouseControl: true 生效
    //bOffset: 1000, // 可调节弹幕横向间隔（毫秒）
    // defaultOff: true, // 开启此项后弹幕不会初始化，默认初始化弹幕
    chaseEffect: true // 开启滚动弹幕追逐效果, 默认为true
  })

  danMuInstance.value?.start();
}


watch(() => socketResult.id, async (value, old) => {
  if (value !== old && value != "") {
    if (socketResult.type === "system") {
      console.log("房主关闭了直播");
      //todo，接收消息
      await ElMessageBox.alert('点击返回首页', '直播已结束', {
        confirmButtonText: '确定',
        callback: (action: Action) => {
          router.push("/");
        }
      })

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
  }
})

export interface SocketMessage {
  // 系统，用户，通知，房主
  type: 'system' | 'user' | 'notice' | 'room';
  id: string;
  data: any;
  to?: string;
  senderName?: string;
  senderId: string;
}


const goToInfo = () => {
  const toUrl = router.resolve({
    name: "detail",
    params: {
      id: activeUrl.value.split("/").pop()
    }
  });
  window.open(toUrl.href, '_black')
}
</script>

<style scoped lang="less">


.player-area {
  margin-top: -50px;
  user-select: none;
  padding: 68px 0 40px 0;
  //font-size: 0;
  white-space: nowrap;
  //background-color: red;
  position: relative;

  .live-bg {
    background-size: 100% auto;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    cursor: pointer;
    background-position: center;
    transition: all cubic-bezier(.22, .58, .12, .98) .4s;
    height: 100%;
    width: 100%;
  }


  .player-center {
    //margin-top: 68px;
    margin-left: 100px;
    user-select: none;

    .live {
      width: 100% !important;
      height: 100% !important;
    }

    .video-info-panel {
      color: white;
      font-size: 14px;
      padding: 10px;
      background-color: rgba(15, 15, 15, 0.7);

      li {
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        padding-left: 5px;
      }

      li:hover {
        background-color: rgb(51, 51, 51);
      }
    }
  }


  .player-center:hover {

    .active {
      display: block;
    }

    .enter-button {
      top: calc(55% - 25px);
      left: calc(50% - 70px);
      width: 140px;
      height: 50px;
      //background-color: red;
      border-radius: 6px;
      border: 1.5px solid rgb(35, 173, 225);
      color: rgb(35, 173, 225);
      text-align: center;
      line-height: 45px;
      background-color: rgba(15, 15, 15, .3);
      //display: none;

      &:hover {
        background-color: rgb(55, 175, 225);
        color: white;
        //display: block;
      }
    }
  }

  .player-aside {

    margin-left: 10px;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 4px;
    //background-color: red;
    z-index: 100;
    padding-left: 15px;
    //padding: 0 12px 12x 12px;
    overflow: hidden;
    padding-bottom: 15px;
    padding-top: 5px;

    .recommend-live {
      //background-color: red;
      .live-border {
        //background-color: red;
        width: calc(100% + 3px);
        height: calc(100% + 3px);
        //height: 100%;
        position: absolute;
        left: -1.5px;
        top: -1.5px;
        z-index: 0;
        border: 2px solid rgb(35, 173, 249);
        border-radius: 4px;

        &.active:after {
          content: "";
          border-top: 7.5px solid transparent;
          border-right: 10px solid rgb(35, 173, 249);
          border-bottom: 7.5px solid transparent;
          position: absolute;
          top: calc(50% - 7.5px);
          left: -12px;
        }
      }

    }

  }
}


@media screen and (max-width: 1399px) {
  .player-area {
    .player-center {
      width: 832px;
      height: 468px;
    }

    .player-aside {
      height: 418px;
    }
  }
}

@media screen and (max-width: 1599px) {
  .player-area {
    .player-center {
      width: 928px;
      height: 522px;
    }

    .player-aside {
      height: 522px;
      width: 185px;
      //width: ;
      .recommend-live {
        width: 150px;
        margin-bottom: 15px;
        height: 85px;
      }
    }
  }
}


</style>