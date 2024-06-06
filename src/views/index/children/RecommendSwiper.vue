<template>
  <el-carousel :height="carouselHeight" class="rounded-md row-start-1 row-end-3 col-start-1 col-end-3">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="small justify-center bg-red-900 h-full" text="2xl">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script setup lang="ts">

import {useWindowSize, watchDebounced} from "@vueuse/core";
import {ref} from "vue";

import {useParentElement} from '@vueuse/core'

const parentEl = useParentElement()

const carouselHeight = ref("405px");
const {width, _height} = useWindowSize();
watchDebounced(() => width.value, () => {
  if (parentEl.value!.clientHeight > 480) {
    carouselHeight.value = `${parentEl.value!.clientHeight - 20}px`;
    return
  }
  carouselHeight.value = `${parentEl.value!.clientHeight - 65}px`;
}, {
  debounce: 100
})

</script>
<style lang="less" scoped>
.recommend-swiper {
  transition: min-height 0.3s;
  //overflow-x: hidden;
  flex-shrink: 1;
  flex-wrap: nowrap;
  flex-basis: 0;
  //display: flex;

  .container {
    width: calc(552px * 6);
    background-color: #61666d;
    display: flex;
    height: 100%;

    div {
      flex: 0 0 auto;
      width: 552px;
      height: 100%;
    }
  }


}

@media (max-width: 1399.9px) {
  .recommend-swiper {
    min-height: 405px;
  }
}


@media (min-width: 1400px) and (max-width: 1559.9px) {
  .recommend-swiper {
    min-height: 405px;
  }
}


@media (min-width: 1560px) and (max-width: 2059.9px) {
  .recommend-swiper {
    min-height: 405px;
  }
}

@media (min-width: 1799px) {
  .recommend-swiper {
    min-height: 505px;
  }

}

</style>
