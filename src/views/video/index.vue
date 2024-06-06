<script lang="ts" setup>
import {onMounted, onBeforeUnmount, shallowRef, ref, reactive, onUnmounted, computed, watch, toRaw} from 'vue'

import {config} from './videoConfig';
import Player, {Events} from 'xgplayer'
import {MyPlayer} from './video'
import 'xgplayer/dist/index.min.css'
import {nanoid} from 'nanoid'

import {ArrowUp, ArrowDown} from '@element-plus/icons-vue'

import Comment from './comment/comment.vue'
import ReplayList from './replaylist/index.vue'
import {useRoute} from "vue-router";
import {useVideoStore} from "@/store/videoStore.ts";
import {getVideoDetailApi, zanVideoApi} from "@/api/video.ts";
import {withPrefix} from "@/utils/imgUtil.ts";
import useWebSocket from "@/hook/useSocket.ts";
import {useUserStore} from "@/store/userStore.ts";
import {addDanMuApi, getDanMuApi} from "@/api/danmu.ts";
import {DanMuItem} from "@/views/video/danMu.ts";
import {ElMessage} from "element-plus";
import {updateHistoryApi} from "@/api/history.ts";
import {useDateFormat, useNow} from '@vueuse/core'
import {formatTimeStr} from "@/utils/timeUtil.ts";
import {times} from "lodash-es";
import {touBiApi} from "@/api/user.ts";

const route = useRoute()


const videoStore = useVideoStore();

let video = videoStore.cache.find(item => item.id == route.params.id);

if (video != null) {
  localStorage.setItem("current", JSON.stringify(video));
}

if (video == null && localStorage.getItem("current") !== undefined) {
  video = JSON.parse(localStorage.getItem("current"));
}

const videoDetail = reactive({
  coin: 0,
  collect: 0,
  comment: [],
  cover: "",
  createTime: "",
  deleteStatus: 1,
  description: "",
  id: 0,
  keyWord: "",
  length: 0,
  likeNumber: 0,
  playTimes: 0,
  publisher: [],
  title: "",
  transmit: 0,
  typeName: "",
  url: "",
  watching: 0,
})

const authorName = computed(() => {
  // return ""
  if (video.publisher && video.publisher.at(0) != undefined) {
    return video.publisher.at(0).nickname;
  }
  return "";

})

//获取视频详情
async function getDetail() {
  const res = await getVideoDetailApi(route.params.id);
  videoDetail.coin = res.data.coin;
  videoDetail.collect = res.data.collect;
  videoDetail.comment = res.data.comment;
  videoDetail.cover = res.data.cover;
  videoDetail.createTime = res.data.createTime;
  videoDetail.deleteStatus = res.data.deleteStatus;
  videoDetail.description = res.data.description;
  videoDetail.id = res.data.id;
  videoDetail.keyWord = res.data.keyWord;
  videoDetail.length = res.data.length;
  videoDetail.likeNumber = res.data.likeNumber;
  videoDetail.playTimes = res.data.playTimes;
  videoDetail.publisher = res.data.publisher;
  videoDetail.title = res.data.title;
  videoDetail.transmit = res.data.transmit;
  videoDetail.typeName = res.data.typeName;
  videoDetail.url = res.data.url;
  videoDetail.watching = res.data.watching;
}


interface DanMuResult {
  id: number;
  createTime: string;
  detail: DanMuItem,
  time: number;
  userId: number;
  videoId: number;
}

const danMuList = reactive<DanMuResult[]>([]);


const recordHistory = ref(false)

// 获取视频弹幕
async function initVideoDanMu() {
  const res = await getDanMuApi(video.id);
  const danMus: DanMuItem[] = [];
  if (res.data) {


    const formated = res.data.map(item => {
      return {
        ...item,
        detail: JSON.parse(item.detail)
      }
    });

    formated.forEach(item => {
      danMuList.push(item);
      danMus.push(item.detail);
    })
    // res.data.forEach(item => {
    //   const a = JSON.parse(item.detail);
    //   danMuList.push(a);
    //   danMus.push(a)
    // })
    const player = myPlayer.value as MyPlayer;
    player.danmu.updateComments(danMus, false);
  }
}

getDetail();

const myPlayer = shallowRef<Player | null>(null);

onMounted(() => {
  initialPlay();
  monitorEvents();
  initVideoDanMu()
});

const userStore = useUserStore();
const videoCssFullScreen = ref<boolean>(false);
/**
 * 事件监听
 */
const monitorEvents = () => {
  myPlayer.value.on(Events.AUTOPLAY_PREVENTED, () => {
    console.log('autoplay was prevented!!');
  });
  myPlayer.value.on(Events.AUTOPLAY_STARTED, () => {
    console.log('autoplay success!!');
  });

  /**
   * 播放结束添加历史记录
   */
  myPlayer.value.on(Events.ENDED, async () => {
    const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
    if (userStore.id !== 0) {
      const author = video.publisher.shift();
      const param = {
        recordTime: formatted.value,
        uid: userStore.id,
        //单位s
        watched: -1,
        videoId: video.id,
        coverUrl: video.cover,
        //发布者头像
        authorAvatar: "",
        authorName: "",
        //发布者主页
        authorLink: "",
      }
      if (author) {
        param.authorName = author.nickname;
        param.authorAvatar = author.avatar;
      }
      updateHistoryApi(param);
    }

    recordHistory.value = true;
  })

  //解决全屏时，右侧样式问题
  myPlayer.value.on(Events.CSS_FULLSCREEN_CHANGE, (isCssFullScreen) => {
    if (isCssFullScreen) {
      // CSS全屏TODO
      videoCssFullScreen.value = true
    } else {
      // 退出CSS全屏TODO
      videoCssFullScreen.value = false
    }
  })
}
/**
 * 离开页面之前，记录播放历史，针对没有播放完成的情况，意外退出页面
 * */
onUnmounted(() => {

  console.log("--------------------------")
  console.log("----------")
  if (!recordHistory.value) {

    console.log("---")
    if (userStore.id !== 0) {
      const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
      const currentTime = (myPlayer.value?.currentTime * 1000).toFixed(0)
      const author = video.publisher.shift();
      const param = {
        recordTime: formatted.value,
        uid: userStore.id,
        //单位s
        watched: currentTime,
        videoId: video.id,
        coverUrl: video.cover,
        //发布者头像
        authorAvatar: "",
        authorName: "",
        //发布者主页
        authorLink: "",
      }
      if (author) {
        param.authorName = author.nickname;
        param.authorAvatar = author.avatar;
      }
      console.log("-----------------")
      updateHistoryApi(param);
    }
  }


  myPlayer.value?.destroy();
})


/**
 * 初始化视频播放
 */
const initialPlay = () => {
  config.poster = withPrefix(video.cover)
  config.url = withPrefix(video.url);
  // config.poster = video.cover;
  myPlayer.value = new Player(config);
};

/**
 * 弹幕输入框
 */
const inputDanMu = ref<string>('')

/**
 * 发送弹幕
 */
const sendDanMu = async () => {
  if (userStore.id === 0) {
    ElMessage.warning("登录后才能发送弹幕");
    return
  }
  if (inputDanMu.value === '') {
    return
  }
  //当前播放位置
  const currentTime = (myPlayer.value?.currentTime * 1000).toFixed(0)
  const player = myPlayer.value as MyPlayer;
  const danMu = {
    duration: 15000,
    id: nanoid(),
    start: currentTime,
    txt: inputDanMu.value,
    mode: 'scroll',
    style: {
      color: 'red',
      fontSize: '60px',
    },
  }
  //展示到自己的屏幕
  player.danmu.sendComment(danMu);


  //保存到后台
  await addDanMuApi({
    videoId: video.id,
    userId: userStore.id,
    detail: JSON.stringify(danMu),
    createTime: useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value,
    time: parseInt(currentTime)
  })
  //发送到房间
  let send = {
    type: 'user',
    id: danMu.id,
    data: danMu,
    senderName: userStore.username,
    senderId: userStore.id,
  }
  sendFn && sendFn(JSON.stringify(send));
  inputDanMu.value = ''
}

const infoToggle = ref<boolean>(false)


type Item = {
  label: string;
  id: number;
};
const items = ref<Array<Item>>([
  {label: 'Tagsfd 1', id: 1},
  {label: 'Tag df2', id: 2},
  {label: 'Tadfdg 3', id: 3},
  {label: 'Tdfag 4', id: 4},
  {label: 'Tdfdag 5', id: 5},
  {label: 'Tagsfd 1', id: 6},
  {label: 'Tag df2', id: 7},
  {label: 'Tadfdg 3', id: 8},
  {label: 'Tdfag 4', id: 9},
  {label: 'Tdfdag 5', id: 10},
  {label: 'Tagsfd 1', id: 11},
  {label: 'Tag df2', id: 12},
  {label: 'Tadfdg 3', id: 13},
  {label: 'Tdfag 4', id: 14},
  {label: 'Tdfdag 5', id: 15},
])

const toggleTag = ref<boolean>(false)

const showDetail = () => {
  console.log('show')
};
//弹幕
const isExpand = ref<boolean>(false)
//广告
const isAdvShow = ref<boolean>(true)

// 自动连播
const autoNextPlay = ref<boolean>(true);


onUnmounted(() => {
  //@ts-ignore
  closeFn && closeFn();
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
//@ts-ignore
let sendFn;
//@ts-ignore
let closeFn;
onMounted(() => {
  //登录
  if (userStore.id !== 0) {
    const {send, close} = useWebSocket(video!.id.toString(), userStore.id, socketResult);
    sendFn = send;
    closeFn = close;
  }
})

//

function formatDate(timeStr: any) {
  return useDateFormat(timeStr, 'MM-DD HH:mm').value
}

function formatTime(timeStr: any) {

  const a = parseInt(timeStr);
  if (!isNaN(a)) {
    return formatTimeStr(a, false);

  }
  return timeStr;
}

const socketResult = reactive({
  id: "",
  type: "",
  data: "",
  senderName: "",
  senderId: ""
});

/**
 * 监听实时弹幕
 */
watch(() => socketResult.id, async (value, old) => {
  if (value !== old && value != "") {
    if (userStore.id !== 0) {
      //接收其他人发送来的弹幕
      if (socketResult.type === "user" && socketResult.senderId != userStore.id) {
        const player = myPlayer.value as MyPlayer;
        //展示到自己的屏幕
        if (socketResult.data) {
          player.danmu.sendComment(JSON.parse(socketResult.data));
        }
      }
    }
  }
})

const hasZan = ref(false);

function zanVideo() {
  if (!hasZan.value) {
    zanVideoApi({
      videoId: route.params.id as unknown as number,
      zan: hasZan.value
    })
    hasZan.value = !hasZan.value;
  }
}

const hasTou = ref(false);

function toubi() {
  if (userStore.id === 0) {
    ElMessage.warning("登录后才能投币");
    return;
  }
  if (!hasTou.value) {
    touBiApi({
      videoId: parseInt(route.params.id),
      putId: userStore.id,
      coin: 1
    })
    hasTou.value = true
  }
}
</script>

<template>
  <HpHeaderBar isFixed/>
  <div class="video-container">
    <div class="left-container">
      <div class="video-title-area">
        <h1 class="video-title">
          {{ videoDetail.title }}
        </h1>
        <div class="video-detail">
          <div class="video-info-detail-list">
            <span class="view item">
              <HpSvgIcon
                  name="ds"
                  :size="20"
              ></HpSvgIcon>
              {{ videoDetail.playTimes }}
            </span>
            <span class="item">
              <HpSvgIcon
                  name="pl"
                  :size="20"
              ></HpSvgIcon>
              {{ videoDetail.comment.length }}
            </span>
            <span class="pubdate-ip item">{{ videoDetail.createTime }}</span>
            <span class="copyright item">
              <HpSvgIcon
                  name="forbidden"
                  :size="16"
                  color="#2e2e2e"
              ></HpSvgIcon>
              未经作者授权，禁止转载
            </span>
          </div>
        </div>
      </div>
      <div class='shadow play-wrap'>
        <div id='video-player'></div>
        <div class='sending-area'>
          <div class='send-bar'>
            <div class='info'>
              <span>{{ videoDetail.watching }}</span>
              人正在看，已装填
              <span>{{ videoDetail.comment.length }}</span>
              条弹幕
            </div>
            <div class='flex flex-1 send'>
              <HpSvgIcon
                  class="mr-2"
                  color='#61666d'
                  name='danmu'
                  hover-color='#00aeec'
                  :size='30'
              ></HpSvgIcon>
              <HpSvgIcon
                  class="mr-2"
                  color='#61666d'
                  name='dms'
                  hover-color='#00aeec'
                  :size='30'
              ></HpSvgIcon>
              <el-input
                  v-model='inputDanMu'
                  placeholder='发送弹幕'
                  class='font outline-none'
                  :input-style="{ color: 'red' }"
              >
                <template #prepend>
                  <HpSvgIcon
                      color='#61666d'
                      hover-color='#00aeec'
                      name='font'
                      :size='30'
                  ></HpSvgIcon>
                </template>
                <template #append>
                  <el-button type='primary' @click='sendDanMu'>发送</el-button>
                </template>
              </el-input>
            </div>
          </div>
        </div>
      </div>

      <div class='flex justify-between report h-[60px]'>
        <div class='flex items-center justify-between left'>
          <div class='flex items-center mr-10 cursor-pointer'>
            <HpSvgIcon @click="zanVideo"
                       name='zan'
                       color='rgb(97,102,109)'
                       hover-color='rgb(0,174,236)'
                       :size='30'
            ></HpSvgIcon>
            <span class='ml-1 text-xs'>{{ videoDetail.likeNumber }}</span>
          </div>

          <div class='flex items-center mr-10 cursor-pointer'>
            <HpSvgIcon @click="toubi"
                       name='toubi'
                       color='rgb(97,102,109)'
                       hover-color='rgb(0,174,236)'
                       :size='30'
            ></HpSvgIcon>
            <span class='ml-1 text-xs'>{{ videoDetail.coin }}</span>
          </div>

          <div class='flex items-center mr-10 cursor-pointer'>
            <HpSvgIcon
                name='soucang'
                color='rgb(97,102,109)'
                hover-color='rgb(0,174,236)'
                :size='30'
            ></HpSvgIcon>
            <span class='ml-1 text-xs'>{{ videoDetail.collect }}</span>
          </div>

          <div class='flex items-center mr-10 cursor-pointer'>
            <HpSvgIcon
                name='zf'
                color='rgb(97,102,109)'
                hover-color='rgb(0,174,236)'
                :size='30'
            ></HpSvgIcon>
            <span class='ml-1 text-xs'>{{ videoDetail.transmit }}</span>
          </div>
        </div>
        <div class='flex items-center right'>
          <HpSvgIcon
              name='zankai'
              color='rgb(97,102,109)'
              hover-color='rgb(0,174,236)'
              :style='{ width: 25, height: 25 }'
          ></HpSvgIcon>
        </div>
      </div>
      <div
          class='h-20 mt-4 overflow-hidden video-desc'
          :class='{ toggle: infoToggle }'
      >
        <span class='tracking-normal whitespace-pre-line'>
          {{ videoDetail.description }}
        </span>
      </div>
      <div class='pt-1 toggle-btn' @click='infoToggle = !infoToggle'>
        <span
            class='text-sm toggle-btn-text hover:text-cyan-500'
            v-if='infoToggle'
        >
          收起
        </span>
        <span v-else class='text-sm toggle-btn-text hover:text-cyan-500'>
          展开更多
        </span>
      </div>

      <!-- tags -->
      <div
          class='flex flex-row mt-2 tags'
          :class="toggleTag ? 'h-auto' : 'h-8'"
      >
        <div class='flex flex-wrap w-[95%]'>
          <el-tag v-for='item in items' :key='item.id' class='mb-2 mr-3'>
            {{ item.label }}
          </el-tag>
        </div>
        <el-button
            :icon='toggleTag ? ArrowUp : ArrowDown'
            circle
            size='small'
            class='translate-x-0 bg-red'
            @click='toggleTag = !toggleTag'
        />
      </div>
      <el-divider class='my-1'/>

      <Comment :videoId="video.id!" @publish="getDetail"/>
      <ReplayList :list="videoDetail.comment" @publish="getDetail"/>
    </div>

    <div class='right-container' v-if='!videoCssFullScreen'>
      <div class='right-container-inner pt-6'>
        <!--        up主区域-->
        <div class='up-info'>
          <div class='up-info-left'>
            <img src="@/assets/avatar.png" class='w-full h-full rounded-full'/>
          </div>
          <div class='flex-1 up-info-right'>
            <div class='up-user-name-area'>
              <span class='text-base'>{{ authorName }}</span>
              <span class='ml-3 text-xs'>
                <i class='text-black iconfont icon-xiaoxi'></i>
                发消息
              </span>
            </div>
            <div
                class='overflow-hidden w-[290px] up-sign text-sm text-[#9499A0] mb-2'
            >
              历史太长，而我距离你很近，历史太远，而我理你很近
            </div>

            <div class='flex w-full btn-area h-[30px] justify-between'>
              <div
                  class='w-[109px] h-full cursor-pointer bg-white border-[1px] rounded-md border-[rgb(251,120,158)] border-solid text-sm text-center leading-[30px] text-[rgb(251,120,158)] select-none'
              >
                充电
              </div>
              <div
                  class='text-sm w-[169px] select-none cursor-pointer text-center leading-[30px] bg-[rgb(0,184,246)] text-white font-medium rounded-md'
              >
                关注 80万
              </div>
            </div>
          </div>
        </div>

        <!--弹幕区域-->
        <div
            class='danmu-area'

        >
          <div
              class='w-full rounded-md danmu-header h-11 bg-[rgb(241,242,243)] flex items-center text-[15px]'
          >
            <div class='flex h-full items-center w-[28%] bui-dropdown'>
              <span class='select-none'>弹幕列表</span>
              <div
                  class='flex items-center w-5 h-full cursor-pointer'
                  @click='showDetail'
              >
                <HpSvgIcon
                    name='zankai'
                    color='rgb(97,102,109)'
                    hover-color='rgb(0,174,236)'
                    :style='{ width: 14, height: 14 }'
                ></HpSvgIcon>
              </div>
            </div>

            <div class='arrow'>
              <el-icon
                  @click='isExpand = !isExpand'
                  :class='{ isExpandClass: !isExpand }'
              >
                <ArrowDown/>
              </el-icon>
            </div>
          </div>
          <div class='danmu-area-panel h-[300px] overflow-y-hidden'>
            <div class='bpx-player-dm-function'>
              <div class='bpx-player-dm-btn-time'>时间</div>
              <div class='bpx-player-dm-btn-dm'>弹幕内容</div>
              <div class='bpx-player-dm-btn-date'>发送时间</div>
            </div>
            <ul class="h-[264px]" :class="!isExpand ? 'overflow-y-hidden' :'overflow-y-scroll'">
              <li class='h-6 flex cursor-pointer' v-for='item in danMuList' :key='item.id'>

                <div class='info-time w-[66px] pl-1.5 text-left'>{{ formatTime(item.detail.start) }}</div>
                <div
                    class='dm-info-dm w-[196px] flex-auto text-ellipsis whitespace-nowrap overflow-hidden text-black font-medium'>
                  {{ item.detail.txt }}
                </div>
                <div class='dm-info-date w-20 mr-2'>{{ formatDate(item.createTime) }}</div>
              </li>
            </ul>
          </div>
          <!--          查看历史弹幕-->
          <div @click="isExpand = !isExpand"
               class='danmu-history text-xs h-[30px] leading-[30px] text-center bg-[rgb(241,242,243)] rounded cursor-pointer mt-4 select-none'>
            查看历史弹幕
          </div>
        </div>

        <!--广告-->
        <div v-if='isAdvShow' class='mt-5 adv-area'>
          <el-carousel height='200px' :interval='5000' class='rounded'>
            <el-carousel-item v-for='item in 2' :key='item'>
              <img src='@/assets/av.jpg' class='h-[200px] w-[350px] adv-item'>
            </el-carousel-item>
            <div class='z-10 absolute text-xs px-2 py-1 bottom-1.5 left-1 rounded bg-[rgb(241,242,243)] scale-75'>广告
            </div>
            <div @click='isAdvShow = !isAdvShow'
                 class='w-4 h-4 cursor-pointer p-1 flex top-2 justify-center items-center absolute bg-white rounded right-3'>
              <HpSvgIcon name='close' color='red' style='width: 12px;height: 12px;'></HpSvgIcon>
            </div>
          </el-carousel>
        </div>
        <!-- 推荐播放-->
        <div class='recommended-video mt-5'>
          <div class='next-play'>
            <div class='header flex justify-between items-center'>
              <span class='text-[14px]'>接下来播放</span>

              <span class='text-xs text-[#9499A0] auto-play'>
                自动连播
                <el-switch class='ml-1.5' v-model='autoNextPlay'/>
              </span>
            </div>
            <div class='video-card mb-4 flex'>
              <div class='pic-box w-[189px] h-[107px] bg-[#C9CCD0] relative rounded-md flex-shrink-0 flex-initial'>
                <img src='@/assets/cover.png' class='w-full h-full rounded-md'/>
              </div>
              <div class='info'>
                <div class='info-title hover:text-[rgb(0,174,236)] text-red-300'>
                  20年前的真预言家！冯小刚用《大腕》告诉我们，最极致的讽刺叫现实！
                </div>
                <div class='up-name my-1 h-5 flex'>
                  <HpSvgIcon name='up_gray' style='width: 15px;height: 15px'></HpSvgIcon>
                  <span class='text-xs text-[rgb(148,153,160)] ml-1'>刘老师说电影</span>
                </div>
                <div class='play-info flex'>
                  <!--                  video_gray-->
                  <HpSvgIcon name='video-video_gray' style='width: 15px;height: 15px'></HpSvgIcon>
                  <span class='text-xs mx-1.5 text-[rgb(148,153,160)]'>170.6万</span>
                  <HpSvgIcon name='video-dm' style='width: 15px;height: 15px'></HpSvgIcon>
                  <span class='text-xs mx-1.5 text-[rgb(148,153,160)]'>8260</span>
                </div>
              </div>
            </div>
            <!-- 分割线-->
            <div class='h-[1px] w-full bg-[#E3E5E7] mt-2 mb-6'></div>
            <div class='video-card mb-4 flex' v-for='item in 6' :key='item'>
              <div class='pic-box w-[189px] h-[107px] bg-[#C9CCD0] relative rounded-md flex-shrink-0 flex-initial'>
                <img src='@/assets/cover.png' class='w-full h-full rounded-md'/>
              </div>
              <div class='info'>
                <div class='info-title hover:text-[rgb(0,174,236)] text-red-300'>
                  20年前的真预言家！冯小刚用《大腕》告诉我们，最极致的讽刺叫现实！
                </div>
                <div class='up-name my-1 h-5 flex'>
                  <HpSvgIcon name='up_gray' :size="15"></HpSvgIcon>
                  <span class='text-xs text-[rgb(148,153,160)] ml-1'>刘老师说电影</span>
                </div>
                <div class='play-info flex'>
                  <!--                  video_gray-->
                  <HpSvgIcon name='video-video_gray' style='width: 15px;height: 15px'></HpSvgIcon>
                  <span class='text-xs mx-1.5 text-[rgb(148,153,160)]'>170.6万</span>
                  <HpSvgIcon name='video-dm' style='width: 15px;height: 15px'></HpSvgIcon>
                  <span class='text-xs mx-1.5 text-[rgb(148,153,160)]'>8260</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.video-container {
  max-width: 2540px;
  min-width: 1080px;
  margin: 64px auto 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;
  //background-color: #fb7299;

  .left-container {
    width: 668px;
    //width: 800px;
    //background-color: rebeccapurple;
    //width: 700px;
    height: 376px;
    position: sticky;
    //background-color: #8d9fb9;

    .video-title-area {
      height: 104px;
      padding-top: 22px;

      .video-title {
        font-weight: 500;
        color: var(--text1);
        line-height: 28px;
        margin-bottom: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 20px;
      }

      .video-detail {
        font-size: 12px;
        color: var(--text3);
        position: relative;
        overflow: hidden;
        line-height: 18px;
        height: 24px;
        align-items: center;
        display: flex;

        .video-info-detail-list {
          display: flex;
          align-items: center;
          overflow: hidden;

          .item {
            flex-shrink: 0;
            margin-right: 12px;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
          }
        }
      }
    }

    .sending-area {
      // background-color: red;
      // height: 60px;
      .send-bar {
        font-size: 13px;
        height: 46px;
        padding: 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-color: red;
        .info {
          line-height: 18px;
          margin-right: 24px;
          width: auto;

        }

        .send {
          .font:deep(.el-input__wrapper),
          .font:deep(.el-input-group__prepend) {
            background-color: rgb(241, 242, 243);
          }

          .font:deep(.el-input-group__prepend) {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }

          .font :deep(.el-input-group__prepend) {
            // width: 40px;
            display: flex;
            width: 35px;
            padding: 0;
          }

          .font:deep(.el-input-group__append:last-child) {
            background-color: rgb(0, 174, 236);
            cursor: pointer;
            color: white;
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
          }

          // el-input-group__prepend
        }
      }
    }

    .report {
      // background-color: red;
      border-bottom: 2px solid rgb(227, 229, 231);
    }

    .video-desc {
      font-size: 15px;
      color: var(--text1);
      white-space: pre-line;
      line-height: 24px;
      // height: 90px;
      overflow-y: hidden;
    }

    .toggle {
      height: auto;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      transition: height 0.3s;
      overflow: hidden;
    }

    .el-divider {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .comment {
      background-color: var(--bg1);
      animation-name: enterAnimation-commentContainer;
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }

    //.play-main {
    //  .xgplayer-controls {
    //    display: none;
    //  }
    //}
  }

  .right-container {
    width: 350px;
    position: relative;
    margin-left: 30px;
    flex: none;
    // pointer-events: none;
    .right-container-inner {
      position: sticky;
      padding-bottom: 250px;

      .up-info {
        display: flex;
        width: 100%;
        height: 104px;
        align-items: center;

        .up-info-left {
          width: 48px;
          height: 48px;
        }

        .up-info-right {
          height: 100%;
          margin-left: 12px;

          .up-user-name-area {
          }

          .up-sign {
            height: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .danmu-area {
        transition: height 1s ease 0s;

        .danmu-header {
          position: relative;
          justify-content: space-between;
          padding-left: 20px;
          padding-right: 20px;

          .bui-dropdown {
            justify-content: space-between;
          }

          .arrow {
            .el-icon {
              transition: all 0.3s ease 0s;
              cursor: pointer;
            }

            .isExpandClass {
              transform: rotate(-180deg);
            }
          }
        }

        .danmu-area-panel {
          font-size: 12px;
          color: #9499a0;
          // height: 100%;
          .bpx-player-dm-function {
            display: flex;
            align-items: center;
            overflow: hidden;
            position: relative;
            z-index: 1;

            .bpx-player-dm-btn-time {
              width: 60px;
              text-align: left;
              display: inline-block;
              line-height: 32px;
              position: relative;
              padding: 0 6px;
              height: 32px;
              cursor: pointer;

            }

            .bpx-player-dm-btn-dm {
              flex: auto;
              cursor: pointer;
            }

            .bpx-player-dm-btn-date {
              width: 88px;
              text-align: left;
              cursor: pointer;

            }
          }
        }
      }

      .recommended-video {
        .next-play {
          .header {
            .auto-play {
              .el-switch:deep(.el-switch__core) {
                min-width: 30px;
              }
            }

          }

          .video-card {
            .info {
              margin-left: 10px;
              flex: 1;

              .info-title {
                font-size: 13px;
                font-weight: 500;
                line-height: 20px;
                color: var(--text1);
                transition: color 0.3s;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-word;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

              }
            }
          }
        }
      }
    }
  }
}

.danmu-area-panel {
  ul {
    &::-webkit-scrollbar {
      width: 2px;
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


}
</style>
