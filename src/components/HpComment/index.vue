<template>
  <div class="replay-wrap">
    <div class="flex reply-input">
      <div class="h-[50px] w-[80px] flex items-center justify-center">
        <img :src="avatar" class="h-[40px] w-[40px] rounded-full"/>
      </div>

      <div class="relative flex flex-col flex-1 reply-wrap">
        <textarea
            placeholder="只是一直在等你而已，才不是想被评论呢～" v-model="comment"
            class="area w-full px-1.5 h-[60px] py-3 rounded-md text-[#18191C] leading-2 outline-none resize-none text-xs bg-[rgb(241,242,243)] hover:bg-white"
        ></textarea>
        <div class="mt-2 bottom-area">
          <!-- 笑脸 -->
          <div
              class="w-8 h-[26px] mr-1.5 rounded flex justify-center items-center border border-[rgb(241,242,243)] border-solid cursor-pointer"
          >
            <hp-svg-icon
                name="xiaolian"
                :size="14"
            ></hp-svg-icon>
          </div>

          <!-- <div class="absolute w-48 h-36 emoji-panel">11</div> -->

          <!-- @符号 -->
          <div
              class="w-8 h-[26px] mr-1.5 rounded flex justify-center items-center border border-[rgb(241,242,243)] border-solid cursor-pointer"
          >
            <hp-svg-icon
                name="aite"
                :size="14"
            ></hp-svg-icon>
          </div>
        </div>
      </div>
      <div @click="publishComment"
           class="flex items-center h-[50px] justify-center send basis-[70px] bg-[rgb(127,214,245)] hover:bg-[rgb(0,174,236)] ml-3 rounded cursor-pointer"
      >
        <div class="flex items-center justify-center text-white">发布</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useUserStore} from "@/store/userStore.ts";
import {computed, ref} from "vue";
import avatarImg from "@/assets/avatar.png";
import {ElMessage} from "element-plus";
import {addVideoCommentApi, Comment} from "@/api/comment.ts";
import {useDateFormat, useNow} from "@vueuse/core";

const props = defineProps({
  videoId: {
    type: Number,
    required: true
  },

  isReply: {
    type: Boolean,
    required: false,
    default: false
  },
  parentId: {
    type: Number,
    required: false
  }
})
const userStore = useUserStore();
const comment = ref<string>('');

const emit = defineEmits(['finish']);

const avatar = computed(() => {
  if (userStore.id !== 0) {
    return userStore.avatarUrl;
  }
  return avatarImg;
});


const publishComment = () => {
  if (userStore.id === 0) {
    ElMessage.warning("登录后才能发布评论");
    return;
  }

  let param: Comment = {
    videoId: props.videoId,
    isTop: 0,
    content: comment.value,
    publishName: userStore.username,
    avatarLink: "",
    avatarImg: userStore.avatar,
    publishLevel: userStore.level,
    publishTime: useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value,
    agreeNumber: 0,
    disagreeNumber: 0
  }
  if (props.parentId) {
    param.parentId = props.parentId;
  }
  addVideoCommentApi(param).then(res => {
    comment.value = "";
  })
  emit('finish')
}
</script>
<style scoped lang="scss">
.replay-wrap {
  .reply-input {
    .area {
      // transition: all 0.1s;

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
</style>
