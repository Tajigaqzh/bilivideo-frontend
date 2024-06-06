<template>
  <!--  回复的每个div绑定一个id-->
  <div class="reply-list">
    <div class="relative reply-item" v-for="item in commentList" :key="item.id">
      <div class="login-limit-mask">
        <div class="mask-top"></div>
        <div class="mask-bottom"></div>
      </div>
      <div class="root-reply-container">
        <!--加id-avatar-->
        <div class="root-reply-avatar">
          <div class="avatar">
            <div class="relative w-12 h-12 bili-avatar">
              <img
                  :src="withPrefix(item.avatarImg)"
                  class="rounded-full w-10 h-10"
                  width="40"
                  height="40"
              />
              <HpSvgIcon
                  name="bi"
                  :style="{
                  width: '24px',
                  height: '24px',
                  bottom: '15px',
                  left: '18px',
                  position: 'relative',
                }"
              ></HpSvgIcon>
            </div>
          </div>
        </div>

        <div class="content-wrap">
          <div class="user-info">
            <!--            绑定两个id，分别是root-reply-id   user-id,6级以上颜色-->
            <div
                class="user-name"
                user-id="23672376"
                root-reply-id="23672"
                :style="{ color: '#FB7299' }"
            >
              {{ item.publishName }}
              <!--              二泉映月-->
            </div>
            <HpSvgIcon
                name="level6"
                :style="{ width: '30px', height: '30px' }"
            ></HpSvgIcon>
          </div>
          <div class="root-reply text-[15px] leading-6 py-0.5">
            <div class="reply-content-container">
              <span
                  class="reply-content text-[#18191c] whitespace-pre-wrap align-baseline overflow-hidden leading-6 break-words"
              >
                {{ item.content }}
                <!--                我想说看电影之所以好看，之所以经典。。。是因为大家是为了给一个好的作品，而不是为了资方捞一笔钱。。。。导演不清楚什么是好演员什么是流量明星？当然太清楚，但是谁给钱往往就决定了调子。。。。只能说商品经济的市场下，想做一个好的艺术品的和一个卖的上价的能结合的还是有难度的。。。。-->
              </span>
            </div>
            <div
                class="reply-info flex items-center relative mt-0.5 text-xs h-6"
            >
              <span class="reply-time text-xs text-[#9499A0] mt-0.5 mr-5">
               {{ item.publishTime }}
              </span>
              <span class="text-xs text-[#9499A0] mr-2">{{ item.ipRegion }}</span>
              <span class="flex items-center h-6 reply-like w-14">
                <HpSvgIcon @click="zanComment(item.id!)"
                           name="zan"
                           color="#9499A0"
                           :size="14"
                           class="mr-1.5"
                ></HpSvgIcon>
                <span class="text-[#9499ad] text-xs">{{ item.agreeNumber }}</span>
              </span>

              <span class="flex items-center h-6">
                <HpSvgIcon @click="disAgreeComment(item.id!)"
                           color="#9499A0"
                           name="zan"
                           :size="14"
                           class="mr-1"
                           style="transform: rotate(180deg)"
                ></HpSvgIcon>
              </span>
              <span class="text-[#9499ad] text-xs">{{ item.disagreeNumber }}</span>
              <span
                  class="text-xs text-[#9499A0] ml-3 cursor-pointer hover:text-[rgb(0,174,236)]" @click="reply(item.id!)"
              >
                回复
              </span>
            </div>
            <!-- 热评 -->
            <div
                class="h-6 reply-tag-list mt-1.5 flex text-xs leading-3 items-center"
            >
              <div
                  class="mr-2 reply-tag-item text-[rgb(255,102,153)] bg-[rgb(255,236,241)] py-[5px] px-1.5 rounded-sm"
              >
                热评
              </div>
              <div
                  class="mr-2 reply-tag-item text-[rgb(255,102,153)] bg-[rgb(255,236,241)] py-[5px] px-1.5 rounded-sm"
              >
                点赞最多
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sub-reply-container" v-if="item.children!.length>0">
        <div class="sub-reply-list">
          <div class="sub-reply-item" v-for="subItem in item.children">
            <div class="sub-user-info h-[30px]">
              <div
                  class="cursor-pointer sub-reply-avatar"
              >
                <img :src="withPrefix(subItem.avatarImg)" width="24" height="24" class="h-8 w-8 rounded-full"/>
              </div>
              <div data-user-id="1656811670" class="sub-user-name">
                {{ subItem.publishName }}
              </div>
              <HpSvgIcon
                  name="level5"
                  :size="26"
              ></HpSvgIcon>
              <HpSvgIcon name="up" :size="14"></HpSvgIcon>
            </div>
            <span
                class="sub-reply-content align-top leading-6 text-sm">
              {{ subItem.content }}
              <!--              是的的啊，甲方的啊，甲方的啊，甲方的啊，甲方的啊，甲方的啊，甲方的啊，甲方啊，甲方乙方-->
            </span>

            <div class="pl-8 sub-reply-info">
              <span class="reply-time text-xs text-[#9499A0] mt-0.5 mr-5">
                {{ subItem.publishTime }}
              </span>
              <span class="flex items-center h-6 reply-like w-14">
                <HpSvgIcon @click="zanComment(subItem.id!)"
                           name="zan"
                           color="#9499A0"
                           :style="{
                    width: '14px',
                    height: '14px',
                    marginRight: '5px',
                  }"
                ></HpSvgIcon>
                <span class="text-[#9499ad] text-xs">{{ subItem.agreeNumber }}</span>
              </span>

              <span class="flex items-center h-6">
                <HpSvgIcon @click="disAgreeComment"
                           color="#9499A0"
                           name="zan"
                           :style="{ width: '14px', height: '14px'}"
                           style="transform: rotate(180deg)"
                ></HpSvgIcon>
                           <span class="text-[#9499ad] text-xs ml-1.5">{{ subItem.agreeNumber }}</span>
              </span>
              <span
                  class="text-xs text-[#9499A0] ml-3 cursor-pointer hover:text-[rgb(0,174,236)]"
              >
                回复
              </span>

            </div>
          </div>

          <div class="view-more">
            <span>共42条回复，</span>
            <span class="h-full cursor-pointer hover:text-[#00AEEC]">
              点击查看
            </span>
          </div>
        </div>
      </div>

      <hp-comment class="mt-3" :videoId="item.videoId" :parentId="item.id" v-show="activeId==item.id" :isReply="isReply"
                  @finish="finish"/>
      <el-divider/>
    </div>
  </div>

</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import {withPrefix} from "@/utils/imgUtil.ts";
import {agreeCommentOrDisagreeApi, Comment} from "@/api/comment.ts";

const emit = defineEmits(['publish']);

interface CommentTree extends Comment {
  children?: CommentTree[]
}

const isReply = ref(false);
const activeId = ref(0);
const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})

const commentList = ref<CommentTree[]>([]);

watch(() => props.list, (value) => {
  const cache: any[] = [];
  value?.forEach((item) => {
    //@ts-ignore
    if (!item.parentId) {
      //@ts-ignore
      commentList.value.push({...item, children: []});
    } else {
      cache.push(item);
    }
  });

  cache.forEach((children) => {
    const index = commentList.value.findIndex(it => it.id === children.parentId);

    if (index != -1) {
      const current = commentList.value.at(index);
      if (current) {
        current.children!.push(children);
        //@ts-ignore
        commentList.value.splice(index, 1, current);
      }
    }
  })

});


const zanComment = (id: number) => {
  agreeCommentOrDisagreeApi({
    id,
    agree: true
  })
}


const disAgreeComment = (id: number) => {
  agreeCommentOrDisagreeApi({
    id,
    disagree: true
  })
}

const reply = (id: number) => {
  isReply.value = true;
  activeId.value = id;
}

/**
 * 回复完
 */
const finish = () => {
  isReply.value = false;
  activeId.value = 0;
  emit('publish');
}
</script>
<style scoped lang="scss">
.reply-list {
  padding-bottom: 96px;

  .reply-item {
    position: relative;

    .login-limit-mask {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      width: 100%;
      height: 100%;
      pointer-events: none;

      .mask-top {
        height: 80%;
      }

      .mask-bottom {
        height: 20%;
      }
    }

    .root-reply-container {
      padding-top: 10px;
      padding-left: 80px;

      .root-reply-avatar {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        width: 80px;
        cursor: pointer;
      }

      .content-wrap {
        flex: 1;

        .user-info {
          font-size: 13px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          height: 30px;

          .user-name {
            font-weight: 500;
            cursor: pointer;
            margin-right: 5px;
          }
        }
      }
    }

    .sub-reply-container {
      padding-left: 72px;

      .sub-reply-list {
        margin: 0;

        .sub-reply-item {
          font-weight: 400;
          margin-top: 10px;

          .sub-user-info {
            display: inline-flex;
            align-items: center;
            margin-right: 10px;
            height: 24px;

            line-height: 24px;
            vertical-align: baseline;
            white-space: nowrap;

            .sub-reply-avatar {
              margin-right: 10px;
            }

            .sub-user-name {
              color: var(--16428b1b);
              font-size: 12px;
              margin-right: 4px;
            }
          }

          .sub-reply-content {
            margin-left: 8px;
            color: var(--text1);
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-word;
            white-space: pre-wrap;
            line-height: 24px;
            font-size: 14px;
          }

          .sub-reply-info {
            display: flex;
            align-items: center;
            position: relative;
            margin-top: 2px;
            font-size: 12px;
            color: var(--text3);
          }
        }

        .view-more {
          color: var(--text3);
          font-size: 13px;
          padding-left: 8px;
          height: 20px;
        }
      }
    }

    .el-divider {
      // margin-top: 100px;
      width: 88%;
      margin-left: 72px;
    }
  }
}

</style>
