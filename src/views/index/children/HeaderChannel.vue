<template>
  <div class="header-channel" v-show="!isFixed">
    <div class="channel-icons hsm:mr-1 hmg:mr-5">
      <a href="#" class="channel-icons__item hsm:mr-2 hmd:mr-2 hmx:mr-4 hlg:mr-4">
        <div class="bg-[#ff9212] w-[40px] h-[40px] rounded-full flex justify-center items-center">
          <HpSvgIcon name="dynamic" :size="22" color="#ffffff"/>
        </div>
        <span class="icon-title">动态</span>
      </a>
      <a href="#" class="channel-icons__item">
        <div class="bg-[#F07775FF] w-[40px] h-[40px] rounded-full flex justify-center items-center">
          <HpSvgIcon name="hot" :size="22" color="#ffffff"/>
        </div>
        <span class="icon-title">热门</span>
      </a>
    </div>
    <div class="right-channel-container">
      <div
          class="channel-items__left hsm:pr-5 hsm:grid-cols-[repeat(9,1fr)] hmx:pr-[30px] hmx:grid-cols-[repeat(11,1fr)] hlg:pr-[30px] hlg:grid-cols-[repeat(12,1fr)]">
        <a href="#" class="channel-link">番剧</a>
        <a href="#" class="channel-link">国创</a>
        <a href="#" class="channel-link">综艺</a>
        <a href="#" class="channel-link">动画</a>
        <a href="#" class="channel-link">鬼畜</a>
        <a href="#" class="channel-link">舞蹈</a>
        <a href="#" class="channel-link">娱乐</a>
        <a href="#" class="channel-link">科技</a>
        <a href="#" class="channel-link">美食</a>
        <a href="#" class="channel-link hsm:hidden">汽车</a>
        <a href="#" class="channel-link hsm:hidden">运动</a>
        <a href="#" class="channel-link">电影</a>
        <a href="#" class="channel-link whitespace-nowrap">电视剧</a>
        <a href="#" class="channel-link whitespace-nowrap">纪录片</a>
        <a href="#" class="channel-link">游戏</a>
        <a href="#" class="channel-link">音乐</a>
        <a href="#" class="channel-link">影视</a>
        <a href="#" class="channel-link">知识</a>
        <a href="#" class="channel-link">资讯</a>
        <a href="#" class="channel-link hsm:hidden hmd:hidden hmx:hidden whitespace-nowrap px-1">动物圈</a>
        <a href="#" class="channel-link hsm:hidden hmd:hidden hmx:hidden  whitespace-nowrap px-1">VLOG</a>

        <a href="#" class="channel-link hsm:hidden">生活</a>
        <a href="#" class="channel-link hsm:hidden">时尚</a>
        <a href="#" class="channel-link min-w-[49px] more">更多
          <HpSvgIcon name="arrow" :size="10" class="icon ml-0.5" :color="'#61666DFF'"/>
        </a>
      </div>
      <div class="channel-items__right hsm:w-[168px] hmd:w-[230px] hmx:w-[240px] hlg:w-[258px] hxl:w-[258px]">

        <a href="#" class="channel-link__right">
          <HpSvgIcon class="hmm:hidden" name="zhuanlan" :size="20" color="rgb(97,102,109)"/>
          <span>专栏</span>
        </a>
        <a href="#" class="channel-link__right">
          <HpSvgIcon class="hmm:hidden" name="live" :size="20" color="rgb(97,102,109)"/>
          <span>直播</span>
        </a>
        <a href="#" class="channel-link__right">
          <HpSvgIcon class="hmm:hidden" name="work" :size="20" color="rgb(97,102,109)"/>
          <span>活动</span>
        </a>
        <a href="#" class="channel-link__right">
          <HpSvgIcon class="hmm:hidden" name="class" :size="20" color="rgb(97,102,109)"/>
          <span>课堂</span>
        </a>
        <a href="#" class="channel-link__right">
          <HpSvgIcon class="hmm:hidden" name="communicate" :size="20" color="rgb(97,102,109)"/>
          <span>社区中心</span>
        </a>
        <a href="#" class="channel-link__right">
          <HpSvgIcon class="hmm:hidden" name="music" :size="20" color="rgb(97,102,109)"/>
          <span>新歌热榜</span>
        </a>
      </div>
    </div>
  </div>
  <div class="occupy h-[120px]" v-show="isFixed"></div>

  <div class="fixed-channel flex" v-show="isFixed">
    <div class="left flex min-w-32 justify-evenly">
      <div class="flex items-center">
        <HpSvgIcon name="dynamic" :size="22" color="var(--text2)"/>
        动态
      </div>
      <div class="flex items-center">
        <HpSvgIcon name="hot" :size="22" :color="'var(--text2)'"/>
        热门
      </div>
    </div>
    <div class="w-[1px] border py-1 h-4 my-auto"></div>

    <div class="right grid grid-cols-[repeat(14,1fr)]">
      <a href="#" class="channel-link">
        <div>番剧</div>
      </a>
      <a href="#" class="channel-link">
        <div>国创</div>
      </a>
      <a href="#" class="channel-link">
        <div>综艺</div>
      </a>
      <a href="#" class="channel-link">
        <div>动画</div>
      </a>
      <a href="#" class="channel-link">
        <div>鬼畜</div>
      </a>
      <a href="#" class="channel-link">
        <div>舞蹈</div>
      </a>
      <a href="#" class="channel-link">
        <div>娱乐</div>
      </a>
      <a href="#" class="channel-link">
        <div>科技</div>
      </a>
      <a href="#" class="channel-link">
        <div>美食</div>
      </a>
      <a href="#" class="channel-link">
        <div>番剧</div>
      </a>
      <a href="#" class="channel-link">
        <div>电影</div>
      </a>
      <a href="#" class="channel-link">
        <div>国创</div>
      </a>
      <a href="#" class="channel-link">
        <div>电视剧</div>
      </a>
      <a href="#" class="channel-link">
        <div>综艺</div>
      </a>
      <a href="#" class="channel-link">
        <div>纪录片</div>
      </a>
      <a href="#" class="channel-link">
        <div>动画</div>
      </a>
      <a href="#" class="channel-link">
        <div>游戏</div>
      </a>
      <a href="#" class="channel-link">
        <div>鬼畜</div>
      </a>
      <a href="#" class="channel-link">
        <div>音乐</div>
      </a>
      <a href="#" class="channel-link">
        <div>舞蹈</div>
      </a>
      <a href="#" class="channel-link">
        <div>影视</div>
      </a>
      <a href="#" class="channel-link">
        <div>娱乐</div>
      </a>
      <a href="#" class="channel-link">
        <div>知识</div>
      </a>
      <a href="#" class="channel-link">
        <div>科技</div>
      </a>
      <a href="#" class="channel-link">
        <div>资讯</div>
      </a>
      <a href="#" class="channel-link">
        <div>美食</div>
      </a>
      <a href="#" class="channel-link">
        <div>生活</div>
      </a>
      <a href="#" class="channel-link">
        <div>汽车</div>
      </a>
      <a href="#" class="channel-link">
        <div>时尚</div>
      </a>
      <a href="#" class="channel-link">
        <div>运动</div>
      </a>
      <a href="#" class="channel-link">
        <div>动物圈</div>
      </a>
      <a href="#" class="channel-link">
        <div>专栏</div>
      </a>
      <a href="#" class="channel-link">
        <div>直播</div>
      </a>
      <a href="#" class="channel-link">
        <div>活动</div>
      </a>
      <a href="#" class="channel-link">
        <div>课堂</div>
      </a>
      <a href="#" class="channel-link">
        <div>社区中心</div>
      </a>
      <a href="#" class="channel-link">
        <div>新歌热榜</div>
      </a>
      <a href="#" class="channel-link">
        <div>VLOG</div>
      </a>
      <a href="#" class="channel-link">
        <div>搞笑</div>
      </a>
      <a href="#" class="channel-link">
        <div>单机游戏</div>
      </a>
      <a href="#" class="channel-link">
        <div>虚拟UP主</div>
      </a>
      <a href="#" class="channel-link">
        <div>公益</div>
      </a>
      <a href="#" class="channel-link">
        <div>公开课</div>
      </a>

    </div>

    <div class="icon">
      <HpSvgIcon name="arrow" :size="10" class="more" :color="'#61666DFF'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
type ChannelProps = {
  isFixed: boolean
}

withDefaults(defineProps<ChannelProps>(), {
  isFixed: false
})
</script>

<style scoped lang="less">
@media (min-width: 2200px) {
  .fixed-channel .right {
    grid-column: span 17;
    grid-template-columns: repeat(17, 1fr);
  }

}

@media (min-width: 1701px) and (max-width: 2199.9px) {
  .fixed-channel .right {
    grid-column: span 15;
    grid-template-columns: repeat(15, 1fr);
  }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
  .fixed-channel .right {
    grid-column: span 14;
    grid-template-columns: repeat(14, 1fr);
  }

  //auto没有动画效果
  .fixed-channel:hover {
    height: 174px !important;
  }
}

@media (max-width: 1366.9px) {
  .fixed-channel {
    --left_width: 192px;

    .right {
      grid-column: span 12;
      grid-template-columns: repeat(12, 1fr);
    }
  }

  .fixed-channel:hover {
    height: 174px !important;
  }
}

.fixed-channel:hover {
  height: 132px;
  transition: height .3s linear;

  .icon {
    .more {
      transform: rotate(180deg);
    }
  }


}

.fixed-channel {
  padding: 0 var(--layout-padding);
  position: fixed;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  min-width: 1115px;
  background-color: #FFFFFF;
  z-index: 999;
  //color: var(--text2);
  top: 60px;
  height: 48px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  transition: height .1s ease-in-out;


  --left_width: 210px;
  --left_width_item: 70px;
  --item_height: 28px;
  --line_light: #f1f2f3;

  .icon {
    width: 30px;
    height: 30px;
    //background-color: red;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    transition: background-color .3s;

    &:hover {
      background-color: rgb(227, 229, 231);
    }

    .more {
      transition: transform .3s;
    }
  }


  .right {
    height: 100%;
    flex: 1;
    grid-gap: 14px 10px;
    margin-left: 10px;

    div {
      height: var(--item_height);
      line-height: var(--item_height);
      border: 1px solid var(--line_light);
      border-radius: 6px;
      cursor: pointer;
      color: var(--text2);
      letter-spacing: 2px;
      text-align: center;
      font-size: 13px;
      transition: background-color .3s, color .3s;
      //;
      white-space: nowrap;
    }

    div:hover {
      background-color: rgb(227, 229, 231);
      color: var(--text1);
    }
  }
}

.header-channel {
  //max-width: calc(1980 + 2 * var(--layout-padding));
  padding: 0 var(--layout-padding);
  position: relative;
  width: 100%;
  height: 120px;
  min-width: 1115px;

  display: flex;
  align-items: center;
  transition: padding-left 0.1s, padding-right 0.1s;

  .channel-icons {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .channel-icons__item {
      position: relative;
      display: flex;
      flex-direction: column;
      //margin-right: 16px;
      color: var(--text1);
      transition: margin-right 0.1s;

      .icon-title {
        font-size: 12px;
        text-align: center;
        line-height: 18px;
      }
    }
  }

  .right-channel-container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .channel-items__left {
      display: grid;
      width: 100%;
      grid-auto-flow: column;
      grid-gap: 10px;
      grid-template-rows: repeat(2, 1fr);
      border-right: 1px solid var(--line-regular);
      position: relative;
      padding-right: 10px;
      align-items: center;

      .channel-link {
        letter-spacing: 2px;
        height: 28px;
        line-height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border: 1px solid var(--line-light);
        color: var(--text2);
        border-radius: 6px;
        font-weight: 400;
        transition: background-color 0.3s, color 0.3s;
        background-color: var(--graph_bg_thin);

        &:hover {
          background-color: #dfe1e3ff;
          color: var(--text1);
        }
      }


      .more:hover {
        .icon {
          transform: rotate(180deg);
          transition: all 0.3s;
        }
      }
    }

    .channel-items__right {
      grid-row-gap: 10px;
      grid-auto-flow: column;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      align-items: center;
      flex-shrink: 0;
      letter-spacing: 2px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text2);
      margin-left: 10px;

      .channel-link__right {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          margin-left: 4px;
          //font-weight: 500;
        }
      }
    }
  }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
  .header-channel {
    .channel-icons {
      margin-right: 8px;
    }

    .right-channel-container {
      .channel-items__right {
        width: 240px;
      }
    }
  }
}

@media (min-width: 1701px) and (max-width: 2199px) {
  .header-channel {
    .channel-icons {
      margin-right: 20px;
    }
  }
}
</style>