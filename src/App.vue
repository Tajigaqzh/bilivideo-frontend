<template>
  <router-view></router-view>
</template>

<script setup lang="ts">

import {videoTypeApi} from "@/api/upload.ts";
import {useTypeStore} from "@/store/typeStore.ts";

const typeStore = useTypeStore();


const init = () => {
  if (typeStore.types.length === 0) {
    videoTypeApi().then(res => {
      typeStore.types = res.data
    })
    console.log("types")
  }

}
init();


</script>
<style>
body * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body *:before,
body *:after {
  box-sizing: border-box;
}

:root {
  --bg-white: #ffffff;

  --line-regular: #e3e5e7;
  --line-light: #f1f2f3;
  --primary-color: #fb7299;
}

:root {
  /*搜索框*/
  --input-simple-bg: rgb(232, 235, 237);
  --input-hover-bg: #ffffff;

  --suggestion-item-hover-bg: rgb(227, 229, 231);

  --graph_bg_regular: #f1f2f3;
  --graph_bg_thin: #f6f7f8;
}

:root {
  --text-black1: #18191c;
  --text1: #18191c;
  --text2: #61666d;
  --text3: #9499A0;
}

:root {
  --layout-padding: 140px;
}

@media (max-width: 1139.9px) {
  :root {
    --layout-padding: 60px;
  }
}

@media (min-width: 1140px) and (max-width: 1299.9px) {
  :root {
    --layout-padding: 60px;
  }
}

@media (min-width: 1560px) and (max-width: 2059.9px) {
  :root {
    --layout-padding: 140px;
  }
}


</style>
