<template>
  <div class="comment">
    <div class="replay-header mb-2">
      <!-- 评论提示 -->
      <div class="reply-notice">
        <el-alert
            type="warning"
            description="构建绿色网络环境，请文明发言"
            show-icon
        />
      </div>

      <!-- 切换 -->
      <div class="mt-2">
        <ul class="flex items-center list-none">
          <li class="flex items-center">
            <span class="text-xl font-medium">评论</span>
            <span class="text-[13px] mr-9 ml-1.5 text-[#9499A0]">1388</span>
          </li>
          <li class="flex items-center text-xs" :class="isHot ? 'hot' : 'time'">
            <div class="cursor-pointer hot-sort" @click="isHot = !isHot">
              最热
            </div>
            <div
                class="h-[11px] mx-3 border-l-[1px] border-solid border-[#9499A0]"
            ></div>
            <div class="cursor-pointer time-sort" @click="isHot = !isHot">
              最新
            </div>
          </li>
        </ul>
      </div>
    </div>
    <hp-comment :videoId="videoId" @finish="emit('publish')"/>
    <!--    嵌套-->
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';

const emit = defineEmits(['publish'])
type CommentProp = {
  videoId: number;
}
defineProps<CommentProp>();


defineOptions({
  name: 'CommentVue',
});

const isHot = ref<boolean>(true);
</script>
<style scoped lang="scss">
.comment {
  background-color: var(--bg1);
  // animation-name: enterAnimation-commentContainer;
  // animation-duration: 1s;
  // animation-fill-mode: forwards;

  .hot {
    .hot-sort {
      color: var(--text1);
    }

    .time-sort {
      color: rgb(148, 153, 160);
    }

    .time-sort:hover {
      color: rgb(0, 174, 236);
    }
  }

  .time {
    .hot-sort {
      color: rgb(148, 153, 160);
    }

    .hot-sort:hover {
      color: rgb(0, 174, 236);
    }

    .time-sort {
      color: var(--text1);
    }
  }

  .replay-wrap {
    .reply-input {
      .area {
        // transition: all 0.1s;
      }

      .area:focus {
        height: 75px;
        border: 2px rgb(243, 244, 245) solid;
      }

      .bottom-area {
        display: flex;
      }

      .area:focus + .bottom-area .emoji-panel {
        background-color: red;
        bottom: 120px;
        // display: none;
      }

      .emoji-panel {
        bottom: 120px;
        background-color: blue;
      }
    }
  }
}
</style>
