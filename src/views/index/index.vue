<template>
  <div class="relative bili-feed4">
    <div class="text-sm bl-header">
      <HpHeaderBar :is-fixed="headerIsFixed"/>
      <div class="bl_header_banner h-40 bg-blue-500">
        <div class="animate-banner"
             ref="animateBanner" @mousemove="bannerMove" @mouseleave="mouseLeave">
          <div class="layer">
            <img src="/src/assets/banner/1.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>

          <div class="layer">
            <img src="/src/assets/banner/2.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>

          <div class="layer">
            <img src="/src/assets/banner/3.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>

          <div class="layer">
            <img src="/src/assets/banner/4.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/5.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/6.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/7.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/8.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>


          <div class="layer">
            <img src="/src/assets/banner/9.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>


          <div class="layer">
            <img src="/src/assets/banner/10.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>

          <div class="layer">
            <img src="/src/assets/banner/11.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>

          <div class="layer">
            <img src="/src/assets/banner/12.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>

          <div class="layer">
            <img src="/src/assets/banner/13.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/14.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/15.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/16.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/17.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
          <div class="layer">
            <img src="/src/assets/banner/18.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>


          <div class="layer">
            <img src="/src/assets/banner/20.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>


          <div class="layer">
            <img src="/src/assets/banner/21.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>

          <div class="layer z-20">
            <video src="/src/assets/banner/22.webm" playsinline autoplay muted loop
                   class="w-[185px] h-[103px] object-cover transform translate-x-[-240px] translate-y-[40px]"/>
          </div>


          <div class="layer">
            <img src="/src/assets/banner/23.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>


          <div class="layer">
            <img src="/src/assets/banner/24.webp" alt="" class="w-[2064px] h-[193px]"/>
          </div>
        </div>

      </div>
      <HeaderChannel :is-fixed="channelIsFixed"/>
    </div>
    <main class="main-layout">
      <div class="recommend relative pb-[60px]">
        <div
            class="recommend-content">
          <div class="rounded-md row-start-1 row-end-3 col-start-1 col-end-3">
            <RecommendSwiper/>
          </div>
          <div class="feed-card" @click="go(item)" v-for="item in videoStore.cache" :key="item.id">
            <!--骨架-->
            <div class="video-skeleton hidden">
              <div class="video-cover"></div>
              <div class="video-info"></div>
            </div>

            <div class="video-wrap relative cursor-pointer">
              <div class="rounded-md video-cover">
                <img :src="withPrefix(item.cover)" class="w-full min-h-full rounded-md"/>
                <!--右上角播放按钮-->
                <div
                    class="play-icon hidden w-7 h-7 rounded-md justify-center items-center cursor-pointer absolute top-3 right-3 bg-[rgb(50,47,45)]">
                  <HpSvgIcon name="play" :size="20" color="white"/>
                </div>
              </div>
              <!--内部播放器-->
              <div class="inner-video-player absolute top-0 left-0"></div>
              <!--不推荐的蒙版-->
              <div class="no-interest hidden">
                <div class="no-interest-inner">
                  <div class="no-interest-left">
                    <HpSvgIcon name="no-interest" :size="36" color="white"/>
                    <span class="no-interest-title">不感兴趣</span>
                    <span class="no-interest-desc">将减少此类内容的推荐</span>
                  </div>
                  <div
                      class="cursor-pointer no-interest-right flex justify-center text-white items-center py-1.5 px-3 text-xs rounded-md  bg-[rgba(155,155,155,.2)]">
                    <HpSvgIcon name="reset" :size="14" color="white" class="mr-1"/>
                    撤销
                  </div>
                </div>
              </div>
              <!--简介-->
              <div class="video-card-info">
                <div class="flex card-title">
                  <h3 class="video-card-info-title w-[92%]">
                    <a>{{ item.title }}</a>
                  </h3>

                  <div class="video-card-info-no-interest more-active">
                    <HpSvgIcon name="more" :size="18" color="var(--text3)"/>
                  </div>

                </div>
                <div class="video-card-info-bottom">
                  <a href="#" class="info-owner flex items-center">
                    <HpSvgIcon name="up" :size="17" class="mr-0.5" color="var(--text3)"/>
                    <span class="flex-1 overflow-hidden break-words line-clamp-1">{{ getAuthorName(item) }}</span>
                    <span class="ml-1 date">· 5-1</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
            class="recommend-btn absolute left-full top-1 z-[2] transform border-[1px] border-[rgb(97,102,109)] rounded-md">
          <button class="flex flex-col ml-0 w-10 p-[9px] h-auto justify-center items-center">
            <HpSvgIcon name="refresh" :size="16" class="mb-1.5"/>
            <span class="text-xs">换一换</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import HeaderChannel from "@/views/index/children/HeaderChannel.vue";
import RecommendSwiper from "@/views/index/children/RecommendSwiper.vue";
import {useRouter} from "vue-router";
import {useHpHeaderBarAndChannel} from "@/components/HpHeaderBar/hook.ts";
import {useAnimateBanner} from "@/views/index/hook.ts";
import {VideoItem} from "@/api/video.ts";
import {withPrefix} from "@/utils/imgUtil.ts";

const {headerIsFixed, channelIsFixed} = useHpHeaderBarAndChannel();
import {useVideoStore} from "@/store/videoStore.ts";
import {useWindowScroll} from "@vueuse/core";
import {computed, ref, watch} from "vue";


const videoStore = useVideoStore();

const {
  animateBanner,
  bannerMove,
  mouseLeave
} = useAnimateBanner();

const router = useRouter();

const go = (item: VideoItem) => {
  router.push(`/video/${item.id}`)
}

async function initVideoData() {
  if (videoStore.cache.length == 0) {
    await videoStore.getVideo();
  }
}


const {_x, y} = useWindowScroll();


const watchHeight = computed(() => {
  if (y.value < 600) {
    return Math.floor(y.value / 500);
  }
  return Math.floor(y.value / 1000);
})

//加个cache记录一下已经查询的页码，防止重复查询
const added = ref([]);

watch(() => watchHeight.value, (value, oldValue) => {
  if (value > oldValue && !added.value.includes(value)) {
    added.value.push(value);
    videoStore.getVideo();
  }
})

function getAuthorName(item: VideoItem) {
  if (item.publisher) {
    if (item.publisher.at(0)) {
      //@ts-ignore
      return item.publisher.at(0).nickname;
    }
    return ""
  }

}

initVideoData();
</script>

<style scoped lang="less">
.bl-header {
  background: var(--bg-white);
  min-height: 64px;
  max-width: 2560px;
  height: 290px;
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
    //background-image: url("src/assets/background.png");

    .animate-banner {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;

      .layer {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .layer:nth-child(1) img {
        transform: translate(0px, 0px) rotate(0deg) scale(1);
        opacity: 1;
      }

      .layer:nth-child(2) img {
        transform: translate(0px, 0px) rotate(0deg) scale(1);
        opacity: 1;
      }

      .layer:nth-child(3) img {
        transform: translate(309px, 24px) rotate(0deg) scale(1);
        opacity: 1;
      }

      .layer:nth-child(4) img {
        height: 231.639px;
        width: 2477.42px;
        transform: translate(340px, 34px) rotate(0deg) scale(1);
        opacity: 1;
      }

      .layer:nth-child(22) video {


      }


      .layer.active-left img, video {
      }
    }

    //.animate-banner.active-left {
    //  .layer img {
    //    transform: translate(-309px, 0px) rotate(0deg) scale(1);
    //    opacity: 1;
    //
    //  }

    //.layer:nth-child(1) {
    //  img {
    //    transform: translate(-309px, 0px) rotate(0deg) scale(1);
    //    opacity: 1;
    //  }
    //}
    //}

  }
}

.main-layout {
  //max-width: calc(1980px + 2 * var(--layout-padding));
  margin: 0 auto;
  padding: 0 var(--layout-padding);
  height: 300px;
  //background-color: red;
  min-width: 1115px;
  //background-color: gray;
  //margin-top: 20px;
  .recommend {
    .recommend-content {
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      .recommend-swiper {
        height: 405px;

      }

      .feed-card {
        min-height: 225px;
        //height: 150px;
        font-size: 22px;
        line-height: 17px;
        position: relative;
        box-sizing: border-box;

        --cover-radio: 56.25%;
        --title-padding-right: 30px;
        --info-margin-top: 10px;
        --no-interest-module-gap: 24px;
        --title-line-height: 22px;
        --title-font-size: 15px;
        --subtitle-font-size: 13px;
        --subtitle-line-height: 17px;
        --avatar-size: 36px;
        --avatar-margin-right: 8px;
        --icon-size: 18px;
        --follow-icon-font-size: 12px;
        --follow-icon-line-height: 17px;
        --no-interest-entry-size: 18px;
        --no-interest-icon-size: 36px;
        --no-interest-title-font-size: 14px;
        --no-interest-subtitle-font-size: 12px;
        --no-interest-btn-icon-size: 16px;
        --no-interest-btn-text-font-size: 13px;
        --no-interest-btn-horizontal-padding: 12px;
        --no-interest-btn-vertical-padding: 6px;


        .video-skeleton {
          .video-cover {
            padding-top: var(--cover-radio);
            border-radius: 6px;
            background-color: var(--graph_bg_regular);
            box-sizing: border-box;
          }

          .video-info {
            margin-top: var(--info-margin-top);
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;

          }
        }

        .video-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1;
          background-color: var(--bg-white);

          .video-cover {
            //min-height: 134px;
          }

          .video-cover:hover {
            .play-icon {
              display: flex;
            }

          }

          .video-card-info {
            font-size: 14px;
            line-height: 1.6;
            margin-top: var(--info-margin-top);
            min-height: calc(var(--title-line-height) * 2 + var(--subtitle-font-size) + 4px);

            .card-title {
              display: flex;
              justify-content: space-between;

              .more-active {
                display: none;
              }
            }

            .card-title:hover {
              .more-active {
                display: block;
                margin-top: 5px;
              }
            }


            .video-card-info-no-interest {
              //display: none;
            }

            .video-card-info-title {
              padding-right: var(--title-padding-right / 2);
              font-size: 13px;
              font-weight: 500;
              color: var(--text1);
              height: calc(2 * var(--title-line-height));
              overflow: hidden;
              line-break: anywhere;
              text-overflow: ellipsis;
              -webkit-line-clamp: 1;
              word-break: break-word !important;
            }

            .video-card-info-bottom {
              margin-top: 4px;
              color: var(--text3);
              display: flex;
              font-size: var(--subtitle-font-size);
              align-items: center;
              justify-content: flex-start;

              .info-owner {
                cursor: pointer;
                transition: color .2s linear;
                display: inline-flex;
                justify-content: flex-start;

                .date {
                  line-height: var(--subtitle-line-height);
                }
              }
            }
          }

          .no-interest {
            padding-top: var(--cover-radio);
            position: absolute;
            z-index: 2;
            width: 100%;
            top: 0;
            left: 0;
            border-radius: 6px;
            background-color: rgba(0, 0, 0, .4);

            .no-interest-inner {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              .no-interest-left {
                display: flex;
                flex-direction: column;
                align-items: center;

                .no-interest-title {
                  line-height: 20px;
                  //color: var(--text-white);
                  font-size: 14px;
                  color: #FFFFFF;

                }

                .no-interest-desc {
                  font-size: 12px;
                  opacity: .6;
                  color: white;
                }
              }

              .no-interest-right {
                margin-left: var(--no-interest-module-gap);
              }
            }
          }
        }


      }

    }

    .recommend-btn {
      transform: translate(10px);

    }
  }
}

@media (min-width: 2060px) {
  .main-layout {
    .recommend {
      .recommend-content {
        grid-column: span 5;
        grid-template-columns: repeat(5, 1fr);
        display: grid;
        position: relative;
        width: 100%;
      }
    }
  }
}

@media (min-width: 1560px) and (max-width: 2059.9px) {

  .main-layout {
    .recommend {
      .recommend-content {
        grid-column: span 5;
        grid-template-columns: repeat(5, 1fr);
        display: grid;
        position: relative;
        width: 100%;
        //background-color: #fb7299;
        //grid-row-gap: 30px;
      }
    }
  }
}

@media (min-width: 1400px) and (max-width: 1559.9px) {
  .main-layout {
    .recommend {
      .recommend-content {
        display: grid;
        position: relative;
        width: 100%;
        grid-column: span 5;
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
}

@media (max-width: 1399.9px) {
  .main-layout {
    .recommend {
      .recommend-content {
        display: grid;
        position: relative;
        //width: 100%;
        grid-column: span 4;
        grid-template-columns: repeat(4, 1fr);
        //max-width: 380px;
        //max-height: 296.75px;
      }
    }
  }
}

@media (min-width: 1400px) {
  .main-layout {
    .recommend {
      .recommend-content {
        grid-row-gap: 30px;
        margin: 0 auto;
      }
    }
  }
}

@media (min-width: 1799px) {
  .main-layout {
    .recommend {
      .recommend-content {
        //max-width: ;
        max-width: 2000px;
        //grid-row-gap: 55px;
        grid-row-gap: 80px;
        margin: 0 auto;
      }
    }
  }
}

@media (min-width: 2200px) {
  .main-layout .recommend .recommend-content .bili-video-card {
    --title-font-size: 16px;
    --title-line-height: 24px;
    --subtitle-font-size: 14px;
    --subtitle-line-height: 19px;
    --info-margin-top: 12px;
    --avatar-size: 40px;
    --avatar-margin-right: 12px;
    --icon-size: 20px;
    --title-padding-right: 24px;
    --no-interest-entry-size: 20px;
    --no-interest-icon-size: 44px;
    --no-interest-title-font-size: 15px;
    --no-interest-subtitle-font-size: 13px;
    --no-interest-btn-icon-size: 18px;
    --no-interest-btn-text-font-size: 14px;
    --no-interest-btn-horizontal-padding: 18px;
    --no-interest-btn-vertical-padding: 8px;
    --no-interest-module-gap: 37px;
  }
}
</style>