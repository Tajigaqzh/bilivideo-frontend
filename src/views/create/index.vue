<template>
  <div class="header h-[60px] min-w-[960px] fixed top-0 left-0 w-full flex justify-between px-16 z-20">
    <div class="flex text-lg font-bold items-center">上传中心
      <div class="ml-4 flex items-center font-normal text-sm">
        <HpSvgIcon name="bili" :size="20" :color="'rgb(117,117,117)'" class="mr-2"/>
        <RouterLink to="/" class="cursor-pointer">
          回到首页
        </RouterLink>
      </div>
    </div>
    <div class="flex items-center">
      <img src="/src/assets/avatar.png" class="w-8 h-8 rounded-full mr-6"/>
      <HpSvgIcon name="download" :size="20" :color="'rgb(117,117,117)'" class="mr-6"/>
      <HpSvgIcon name="message" :size="20" :color="'rgb(117,117,117)'" class=""/>
    </div>
  </div>


  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>

          <el-menu router default-active="/create/index">
            <el-menu-item index="/create/index">
              <el-icon>
                <setting/>
              </el-icon>
              <span>首页</span>
            </el-menu-item>

            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <ChatRound/>
                </el-icon>
                <span>内容管理</span>
              </template>
              <el-menu-item index="/create/draft">稿件管理</el-menu-item>
              <el-menu-item index="/create/appeal">申诉管理</el-menu-item>
              <el-menu-item index="/create/subtitle">字幕管理</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/create/data">
              <el-icon>
                <Reading/>
              </el-icon>
              <span>数据中心</span>
            </el-menu-item>

            <el-menu-item index="/create/fans">
              <el-icon>
                <Platform/>
              </el-icon>
              <span>粉丝管理</span>
            </el-menu-item>


            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <BellFilled/>
                </el-icon>
                <span>互动管理</span>
              </template>
              <el-menu-item index="/create/comment">评论管理</el-menu-item>
              <el-menu-item index="/create/danmu">弹幕管理</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="5">
              <template #title>
                <el-icon>
                  <Location/>
                </el-icon>
                <span>收益管理</span>
              </template>
              <el-menu-item index="/create/income">收益中心</el-menu-item>
              <el-menu-item index="/create/inspire">创作激励</el-menu-item>
              <el-menu-item index="/create/charge">充电计划</el-menu-item>
              <el-menu-item index="/create/sale">悬赏带货</el-menu-item>
              <el-menu-item index="/create/task">任务广场</el-menu-item>
              <el-menu-item index="/create/huahuo">花火平台</el-menu-item>
              <el-menu-item index="/create/template">模板激励</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="6">
              <template #title>
                <el-icon>
                  <Location/>
                </el-icon>
                <span>创作成长</span>
              </template>
              <el-menu-item index="/create/achieve">任务成就</el-menu-item>
              <el-menu-item index="/create/academe">创作学院</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="7">
              <template #title>
                <el-icon>
                  <Location/>
                </el-icon>
                <span>创作权益</span>
              </template>
              <el-menu-item index="/create/copyright">版权保护</el-menu-item>
              <el-menu-item index="/create/auth">bilibili认证</el-menu-item>
              <el-menu-item index="/create/music">音乐人服务</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/create/setting">
              <el-icon>
                <Platform/>
              </el-icon>
              <span>创作设置</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="center bg-[rgb(250,250,250)] rounded-md">
        <RouterView/>
      </el-main>
    </el-container>
  </div>

</template>

<script setup lang="ts">
import {Setting, Location, ChatRound, Reading, Platform, BellFilled} from "@element-plus/icons-vue";



</script>

<style scoped lang="less">
.header {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2), -2px -2px 2px rgba(0, 0, 0, 0.2);
  background-color: #f3a8bd;
}

.el-scrollbar {
  height: calc(100vh - 60px);
  overflow: hidden;
}

.common-layout {
  height: calc(100vh - 60px);
  margin-top: 60px;
  min-height: 230px;

  .el-sub-menu {
    .el-menu-item {
      padding-left: 60px;
    }
  }

  .center {
    height: calc(100vh - 60px);
  }

  .card {
    box-shadow: 1px 1px 1px rgba(250, 250, 250, 0.6), -1px -1px 1px rgba(250, 250, 250, 0.6);

    .tab-indicator {
      left: 40px;
      width: 64px;
      transition: left 0.15s ease-in-out, width 0.1s ease-in-out;
    }
  }
}

</style>