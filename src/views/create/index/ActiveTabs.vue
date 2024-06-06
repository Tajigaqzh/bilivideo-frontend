<script setup lang="ts">
import {ref} from "vue";

defineOptions({
  name: 'ActiveTabs'
})

const emit = defineEmits(['change'])
const activeIndex = ref(0);
const changeActive = (index: number) => {
  emit('change', index);
  activeIndex.value = index;

  switch (index) {
    case 0:
      computedStyle.value = {
        left: "40px",
        width: "64px"
      }

      break
    case 1:
      computedStyle.value = {
        left: "136px",
        width: "64px"
      }
      break

    case 2:
      computedStyle.value = {
        left: "232px",
        width: "96px"
      }
      break
    case 3:
      computedStyle.value = {
        left: "360px",
        width: "64px"
      }
      break
    case 4:
      computedStyle.value = {
        left: "456px",
        width: "64px"
      }
      break
    case 5:
      computedStyle.value = {
        left: "552px",
        width: "96px"
      }
      break
  }
}

const computedStyle = ref({
  left: "40px",
  width: "64px"
})

const isActive = (index: number) => {
  return {
    active: activeIndex.value === index
  }
}
</script>

<template>
  <div class="h-16 flex border-b-[1.5px] relative pl-10 cursor-pointer">
    <div class="mr-8 h-16 leading-[64px]" @click="changeActive(0)" :class="isActive(0)">视频投稿</div>
    <div class="mr-8 h-16 leading-[64px]" @click="changeActive(1)" :class="isActive(1)">专栏投稿</div>
    <div class="mr-8 h-16 leading-[64px]" @click="changeActive(2)" :class="isActive(2)">互动视频投稿</div>
    <div class="mr-8 h-16 leading-[64px]" @click="changeActive(3)" :class="isActive(3)">音频投稿</div>
    <div class="mr-8 h-16 leading-[64px]" @click="changeActive(4)" :class="isActive(4)">贴纸投稿</div>
    <div class="mr-8 h-16 leading-[64px]" @click="changeActive(5)" :class="isActive(5)">视频素材投稿</div>
    <div class="w-16 border-b-[3px] border-[rgb(0,174,244)] tab-indicator left-0 top-[64px] absolute"
         :style="computedStyle"></div>
  </div>
</template>

<style scoped lang="less">

.tab-indicator {
  left: 40px;
  width: 64px;
  transition: left 0.15s ease-in-out, width 0.1s ease-in-out;
}

.active {
  color: rgb(0, 174, 244)
}
</style>