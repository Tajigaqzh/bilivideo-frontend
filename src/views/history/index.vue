<template>
  <div class="text-sm bl-header">
    <HpHeaderBar :is-fixed="headerIsFixed"/>
    <div class="bl_header_banner"></div>
  </div>
  <div class="history-wrap">
    <div class="header w-full h-[30px] flex justify-between">
      <div class="left text-xl">历史记录</div>

      <div class="flex">
        <div class="search mr-5 min-w-52 flex items-center border border-[#61666DFF] p-1.5 rounded-xl">
          <HpSvgIcon name="search" :color="'var(--text2)'" class="mr-2" :hover-color="'#61666DFF'"
                     :size="20"/>
          <input type="text" placeholder="搜索历史记录" class="outline-none h-full flex-1"/>
        </div>
        <div
            class="h-full w-16 leading-[30px] cursor-pointer text-center rounded-md hover:text-white hover:bg-[#00B5E5FF] mr-4 text-[#00B5E5FF] border border-solid border-[#00B5E5FF]">
          清空历史
        </div>
      </div>
    </div>

    <ul class="mt-5" v-if="result.length>0">
      <li class="w-full h-40 flex items-center" v-for="item in result" @click="gotoDetail(item.videoId)">
        <div
            class="h-full w-12 border-r relative border-[rgb(229,233,239)]
            before:absolute before:right-[-12px] before:top-[75px]
            before:border-[6px] before:border-transparent before:border-l-[6px]
            before:border-l-[rgb(229,233,239)]
           "></div>
        <span class="ml-6 mr-16">{{ formatTime(item.recordTime) }}</span>
        <div class="w-52 h-32 mt-4 mb-4 bg-black rounded-md overflow-hidden">
          <img :src="withPrefix(item.coverUrl)" alt="" class="w-full h-full cursor-pointer"/>
        </div>

        <div class="flex-1 h-32 ml-8 border-b-[2px] border-[rgb(229,233,239)]">
          <div class="text-lg w-[420px] text-nowrap overflow-hidden h-[30px] text-ellipsis">
            {{ item.title }}
          </div>
          <div class="w-full h-16 flex justify-end items-center">
            <HpSvgIcon name="delete" :color="'rgb(229,233,239)'"
                       :size="24"/>
          </div>
          <div class="w-[550px] flex justify-between">
            <div class="flex items-center">
              <HpSvgIcon name="pc" :color="'rgb(114,122,136)'" class="mr-2"
                         :size="24"/>
              <span class="text-xs">
                <span v-if="item.watched==-1">
                  已看完
                </span>
                <div v-else>
                      看到 <span class="ml-1"
                                 v-show="item.watched>0">{{ formatTimeStr(item.watched / 1000, false) }}</span>
                </div>

              </span>
            </div>
            <div class="flex items-center">
              <img src="/src/assets/av.jpg" alt="" class="w-5 h-5 rounded-full mr-3"/>
              <span class="text-xs mr-2">{{ item.authorName }}</span>|
              <span class="ml-2">{{ item.videoType }}</span>
            </div>
          </div>
        </div>
      </li>

    </ul>


  </div>

</template>
<script setup lang="ts">
import {useHpHeaderBarAndChannel} from "@/components/HpHeaderBar/hook.ts";
import HpHeaderBar from "@/components/HpHeaderBar/HpHeaderBar.vue";

const {headerIsFixed, _channelIsFixed} = useHpHeaderBarAndChannel();
import {useUserStore} from "@/store/userStore.ts";
import {getHistoryApi, History} from "@/api/history.ts";
import {ref} from "vue";
import {useDateFormat} from "@vueuse/core";
import {withPrefix} from "@/utils/imgUtil.ts";
import {formatTimeStr} from "@/utils/timeUtil.ts";
import {useRouter} from "vue-router";

const userStore = useUserStore();

const router = useRouter();
const page = ref(0);
const size = ref(40);

const result = ref<History[]>([]);

async function init() {
  const res = await getHistoryApi({
    page: page.value,
    size: size.value,
    uid: userStore.id
  })

  result.value = res.data.data;

  console.log(result.value)
}

init();

function formatTime(date: string) {
  return useDateFormat(date, "HH:mm").value;
}

const gotoDetail = (videoId: number) => {
  router.push(`/video/${videoId}`)
}
</script>

<style scoped lang="less">
.bl-header {
  background: var(--bg-white);
  min-height: 64px;
  max-width: 2560px;
  height: 170px;
  position: relative;
  margin: 0 auto;
  width: 100%;
  color: var(--text-black1);
  //overflow: hidden;

  .bl_header_banner {
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    //关键
    min-width: 1115px;
    min-height: 170px;
    height: 9.375vw;
    max-height: 170px;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("src/assets/background.png");
  }
}

.history-wrap {
  min-height: 460px;
  margin: 0 auto;
  font-size: 12px;
  padding: 30px 0 0;
  position: relative;
  //background-color: #8d9fb9;
  .header {
    .history-btn {
      .btn {
        border-radius: 6px;
        //border: 1px solid #00B5E5FF;
      }
    }
  }
}

.demo::before {
  content: '';
  position: absolute;
  top: 100px;
  left: 0;
  //border-bottom: 6px solid transparent;
  //border-top: 6px solid transparent;
  //border-left: 6px solid red;
  border: 6px solid transparent;
  border-left: 6px solid red;

}

@media screen and (min-width: 1415px) {
  .history-wrap {
    width: 1160px;
    //background-color: rgb(0, 181, 229);
  }
}

@media screen and (max-width: 1414.9px) {
  .history-wrap {
    width: 980px;
  }
}
</style>