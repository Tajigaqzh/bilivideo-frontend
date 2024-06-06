<template>

  <div class="my-focus flex justify-between">
    <div class="left mb-2.5  min-w-[436px] justify-between items-center">
      <div class=" flex justify-between">
        <div class="font-bold text-[16px] flex">
          我的关注
          <div class="bg-[#f69] ml-2 text-white text-[12px] rounded-[9px] flex items-center relative px-1.5">
            <span class="text-sm">2人正在直播中</span>
          </div>
        </div>
        <a href="#" class="text-gray-400 text-sm">查看更多></a>
      </div>

      <div class="rounded w-full py-[37px] mt-4 bg-white flex justify-evenly items-center">

        <div class="flex items-center px-1">
          <img class="w-[50px] rounded-full border-[1px] border-solid border-[#f69]" src="/src/assets/avatar.png">
          <div class="ml-2.5">
            <div class="text-sm w-[68px] text-nowrap text-ellipsis overflow-hidden">独立开发者aaaaaa</div>
            <div class="text-gray-500 text-sm">30人看过</div>
          </div>
        </div>
        <div class="flex items-center px-1">
          <img class="w-[50px] rounded-full border-[1px] border-solid border-[#f69]" src="/src/assets/avatar.png">
          <div class="ml-2.5">
            <div class="text-sm w-[68px] text-nowrap text-ellipsis overflow-hidden">独立开发者aaaaaa</div>
            <div class="text-gray-500 text-sm">30人看过</div>
          </div>
        </div>
      </div>
    </div>


    <div class="right w-[670px] h-[163px] flex-1 ml-6">

      <div class="high-title font-bold">分区推荐</div>
      <div class="flex mt-4 justify-between">
        <div
            class="hover:scale-110 recommend-item select-none cursor-pointer w-[89px] h-[125px] py-[18px] bg-white rounded justify-center items-center flex ">
          网游
        </div>
        <div
            class="hover:scale-110 recommend-item select-none cursor-pointer w-[89px] h-[125px] py-[18px] bg-white rounded justify-center items-center flex ">
          手游
        </div>
        <div
            class="hover:scale-110 recommend-item select-none cursor-pointer w-[89px] h-[125px] py-[18px] bg-white rounded justify-center items-center flex ">
          单机游戏
        </div>
        <div
            class="hover:scale-110 recommend-item select-none cursor-pointer w-[89px] h-[125px] py-[18px] bg-white rounded justify-center items-center flex ">
          娱乐
        </div>
        <div
            class="hover:scale-110 recommend-item select-none cursor-pointer w-[89px] h-[125px] py-[18px] bg-white rounded justify-center items-center flex ">
          电台
        </div>
        <div
            class="hover:scale-110 recommend-item select-none cursor-pointer w-[89px] h-[125px] py-[18px] bg-white rounded justify-center items-center flex ">
          虚拟主播
        </div>
        <div
            class="hover:scale-110 recommend-item select-none cursor-pointer w-[89px] h-[125px] py-[18px] bg-white rounded justify-center items-center flex ">
          互动
        </div>
      </div>

    </div>
  </div>

  <div class="recommend-live mx-auto mt-8 pb-10bg-[rgb(241,242,243)]">
    <h2 class=" text-2xl mb-4">推荐直播</h2>

    <div v-for="item in 3" class="row w-full flex justify-between gap-x-5 pb-8">

      <div v-for="a in 4" class="item min-w-[200px] p-4 cursor-pointer bg-white rounded-md hover:scale-105">
        <img src="/src/assets/swiper1.png" class="w-[360px] h-[158px]"/>

        <div class="content mt-2 flex overflow-hidden">
          <div class="w-[55px] h-[55px] flex justify-center items-center">
            <img src="/src/assets/avatar.png" class="w-10 h-10 rounded-full"/>
          </div>
          <div class="title-area overflow-hidden text-nowrap max-w-[200px]">
            <p>荒野大嫖客 荒野大嫖客 荒野大嫖客</p>
            <div class="author flex justify-between text-[rgb(148,153,160)] text-sm mt-2">
              <span>有我阿童木</span>

              <button class="guanzhu w-[60px] h-7 rounded bg-[rgb(0,174,236)] text-white hidden">关注</button>
              <div class="detail flex items-center ">
                <HpSvgIcon name="no-interest" :size="14" color="rgb(148,153,160)" class="mr-1"/>
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  </div>


</template>

<script lang="ts" setup>


</script>

<style scoped lang="less">
.my-focus {
  //width: 1360px;
  margin: 40px auto 0;
  display: flex;
  transition: width .3s;

  .right {
    //margin-top: 32px;
    position: relative;
    white-space: nowrap;
  }

}

.recommend-live {
  .row {
    .item {

      //background-color: #fb7299;
    }

    .item:hover {
      .content {
        .title-area {
          .author {
            .guanzhu {
              display: block;
            }

            .detail {
              display: none;
            }
          }
        }

      }
    }


  }
}

@media screen  and (max-width: 1599px) {
  .my-focus, .recommend-live {
    width: 1140px;

    .left {
      margin-left: 10px;
    }


    //transform: ;
    //trans

    .right {
      margin-right: 10px;
    }
  }


}

@media screen  and (min-width: 1599.9px) {
  .my-focus {
    width: 1380px;

    .left {
      margin-right: 40px;

    }
  }

  .recommend-live {
    width: 1380px;
  }
}
</style>