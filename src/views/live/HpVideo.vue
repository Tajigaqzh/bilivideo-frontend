<template>
<!--  @click.once="parentClick"-->
  <div  class="w-full h-[580px] relative mt-2" ref="parent">
    <video @pause="videoPause" @play="videoPlay" ref="videoRef" class="w-full h-full z-[10]" id="play-container"
           :muted="muted" autoplay controls></video>

    <div class="controls-group w-full absolute left-0 bottom-0 opacity-0 hover:opacity-100">
      <div class="controls-top w-full h-5"></div>
      <div class="w-full controls h-6 flex items-end pb-1.5 justify-between">
        <div class="left flex items-center ml-3">
          <div class="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-[rgb(50,51,52)]">
            <HpSvgIcon :name="isPlaying ? 'pause1':'play1'" :size="16" color="white" class="" @click="pauseVideoFn"/>
          </div>
        </div>
        <div class="right flex items-center mr-3">

          <div ref="target"
               class="voice h-[30px] w-[40px] overflow-hidden rounded-full flex justify-end pr-2.5 items-center hover:bg-[rgb(50,51,52)] mr-1"
          >
            <div class="bg-white w-[75px] h-1 mr-1 relative hidden line cursor-pointer">
              <div class="z-10 w-2.5 h-2.5 cursor-pointer bg-white absolute top-[-2.5px] rounded-full"
                   :style="volumeStyle"></div>
            </div>
            <HpSvgIcon :name="debouncedVolume ? 'voice':'unvoice'" :size="20" color="white" @click="handleMuted"/>
          </div>

          <HpSvgIcon :name="openDanMu ? 'dan' : 'dan1'" :size="30" color="white" class="mx-3"
                     @click="danMuFn"/>
          <div class="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-[rgb(50,51,52)]">
            <HpSvgIcon :name="isFullscreen ? 'full':'unfull'" :size="20" color="white" @click="toggle"/>
          </div>

        </div>
      </div>

    </div>

    <div ref="danMuRef" class="danmu w-full h-[85%] absolute top-0 left-0 z-[8] pt-2 cursor-pointer"></div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useFullscreen} from "@vueuse/core";
import {useVolume} from "@/views/live/hooks.ts";
import {useDanMu} from "@/hook/useDanMu.ts";
import {useVideo} from "@/hook/useVideo.ts";


interface VideoProp {
  url: string
}

const props = defineProps<VideoProp>();



//又出一个bug，
// const emits = defineEmits(['sendDanMu'])

const parent = ref<HTMLDivElement | null>(null);
console.log("props--",props.url)
onMounted(() => {
  playVideo();

})

const {isFullscreen, enter, exit, toggle} = useFullscreen(parent);


const videoRef = ref<HTMLVideoElement | null>(null);

function initEvent() {
  player.value.on("ERROR", () => {

  })
}

onUnmounted(() => {
  destroy();
})

const {
  volumeStyle,
  target,
  debouncedVolume,
  handleMuted,
} = useVolume(videoRef)


const {
  danMu,
  openDanMu,
  danMuRef,
  startDanMu,
  danMuFn,
} = useDanMu(videoRef)


const {
  isPlaying,
  muted,
  destroy,
  videoPlay,
  videoPause,
  playVideo,
  parentClick,
  pauseVideoFn
} = useVideo(danMu, videoRef, startDanMu);

</script>

<style scoped lang="less">
.controls {
  height: 40px;
  background-color: rgba(0, 0, 0,);

  .right {
    .voice {
      //background: red;
      transition: width .4s;
    }

    .voice:hover {
      width: 120px;

      .line {
        display: block;
      }
    }
  }
}

.controls-group {
  transition: opacity .4s;
}

.controls-top {
  height: 8px;
  background: linear-gradient(to top, rgba(0, 0, 0,), #414040);
}
</style>