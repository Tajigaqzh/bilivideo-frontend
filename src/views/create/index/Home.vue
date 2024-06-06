<template>
  <div class="w-[1000px] mx-auto bg-[rgb(255,255,255)] card">
    <active-tabs @change="handleActiveChange" class="mb-6"/>
    <KeepAlive>
      <component :is="currentComponent" class="ml-4 mr-4 pb-6"></component>
    </KeepAlive>
  </div>
</template>
<script setup lang="ts">
import {markRaw, reactive, shallowRef} from "vue";

import ActiveTabs from "./ActiveTabs.vue";


import VideoUpload from "./VideoUpload.vue";
import ArticleUpload from "./ArticleUpload.vue";

const currentComponent = shallowRef(VideoUpload);


const handleActiveChange = (index: number) => {
  currentComponent.value = tabs[index].component;
  console.log(index)
}


const tabs = reactive([
  {name: "视频投稿", component: markRaw(VideoUpload)},
  {name: "专栏投稿", component: markRaw(ArticleUpload)},
  {name: "互动视频投稿", component: markRaw(VideoUpload)},
  {name: "音频投稿", component: markRaw(VideoUpload)},
  {name: "贴纸投稿", component: markRaw(VideoUpload)},
  {name: "视频素材投稿", component: markRaw(VideoUpload)},
])

</script>

<style scoped lang="less">

.card {
  box-shadow: 1px 1px 1px rgba(250, 250, 250, 0.6), -1px -1px 1px rgba(250, 250, 250, 0.6);

  .tab-indicator {
    left: 40px;
    width: 64px;
    transition: left 0.15s ease-in-out, width 0.1s ease-in-out;
  }
}
</style>