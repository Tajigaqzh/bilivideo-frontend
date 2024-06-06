<template>
  <div class="header-bar" :class="isFixed ? 'fixed-header':''">
    <ul class="left-entry hmd:mr-[10px] hsm:mr-0">
      <RouterLink to="/">
        <hp-popover buttonName="首页" :color="color" title="首页"></hp-popover>
      </RouterLink>

      <hp-popover button-name="番剧" :color="color" class="animate"/>
      <RouterLink to="/live">
        <hp-popover button-name="直播" :color="color" class="animate"/>
      </RouterLink>

      <hp-popover button-name="游戏中心" :color="color" class="animate"/>
      <hp-popover button-name="会员购" :color="color" class="animate"/>
      <hp-popover button-name="漫画" :color="color" class="animate"/>
      <hp-popover button-name="赛事" :color="color" class="animate"/>
      <hp-popover v-if="false" button-name="开放周" :color="color" class="animate"/>
      <li v-if="false">MSI</li>
      <li v-if="false">看火箭</li>
      <hp-popover buttonName="下载客户端" :color="color" class="animate">
        <template #left>
          <HpSvgIcon name="download" :size="18" class=" mr-1"/>
        </template>
      </hp-popover>
    </ul>
    <div class="search">
      <!--      onSearch-->
      <div class="center-search-bar" :class="isSearching ? 'is-focus':''">

        <form id="nav-search-form">
          <div class="nav-search-content">
            <input class="nav-search-input" type="text" autocomplete="off" maxlength="100" v-model="searchKey"
                   @focusout="focusInput" @focusin="focusInput"
            >
            <div class="nav-search-clean" v-show="searchKey.length>0">
              <HpSvgIcon name="clean" color="black" :hover-color="'#61666DFF'" :size="16" class="mr-2"
                         @click="cleanInput"/>
            </div>
          </div>
          <div class="nav-search-btn">
            <HpSvgIcon name="search" :color="'rgb(24,25,28)'" :hover-color="'#61666DFF'"
                       :size="17"/>
          </div>
        </form>
        <div v-show="isSearching" class="search-panel">
          <div class="suggestions my-[-6px]" v-if="searchKey!=''">
            <div class="suggestion-item">开心麻花</div>
            <div class="suggestion-item">沈腾玛丽郭艾伦</div>
            <div class="suggestion-item">小沈阳</div>
            <div class="suggestion-item">
              不出摊，暴雨天在工地上班，回来皮肤晒
            </div>
          </div>

          <div v-else class="hot">
            <div class="title-area">
              <span class="history">搜索历史</span>
              <span class="clear">清空</span>
            </div>

            <div class="search-history mt-4">
              <div v-for="item in searchHistory" class="history cursor-pointer">
                {{ item }}
                <!--                <div class="icon"></div>-->
                <div class="icon">
                  <HpSvgIcon name="close" :size="8" color="text-white"/>
                </div>
              </div>
            </div>
            <div class="text-sm font-bold">热搜排行</div>

            <div class="hot-recommend">
              <div v-for="item in 10" class="recommend-item">{{ item }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="right-entry hsm:ml-[10px] hmx:ml-[10px] hmd:ml-[10px]">
      <li class="header-avatar hover:scale-150 duration-300" v-if="cookies.get('token')">

        <el-dropdown trigger="click">

          <div class="w-[38px] absolute top-[5px] left-[10px] h-[38px] rounded-full block">
            <img :src="userStore.avatarUrl" class="rounded-full w-full h-full align-middle">
          </div>
          <template #dropdown>
            <el-dropdown-item @click="handleLoginOut">退出登录</el-dropdown-item>
            <el-dropdown-item>我的主页</el-dropdown-item>
          </template>
        </el-dropdown>


      </li>
      <li class="header-avatar" v-else>
        <div class="w-[38px] absolute top-[5px] left-[10px] h-[38px] rounded-full block">
          <div @click="dialogVisible = !dialogVisible"
               class="bg-[rgb(0,173,235)] h-10 w-10 rounded-full font-bold text-white leading-10 text-center">登录
          </div>
          <!--          <img src="/src/assets/avatar.png" class="rounded-full w-full h-full align-middle">-->
        </div>
      </li>

      <el-dialog v-model="dialogVisible" width="820" :close-on-click-modal="false" align-center
                 :before-close="handleClose"
                 :lock-scroll="false">
        <div class="login flex pl-[76px] pr-[49px] pt-[30px] pb-[12px] relative">
          <div class="scan w-[173px] h-[349px]">
            <div>
              <img :src="qrCodeImg" class="p-0.5 rounded-2xl mt-10 border w-[200px]"/>
            </div>
          </div>
          <div class="divide w-[1px] h-[200px] bg-[#e3e5e7] mt-[43px] mr-[44px] mb-0 ml-[45px] rounded-[8px] "></div>
          <div class="form w-[400px] h-[349px] flex  flex-col">
            <div class="login-tab-wp flex mb-6 h-5 flex justify-center">
              <div class="login-tab-item text-[18px] h-5" :class="activeLoginType===0 ? 'active-tab':''"
                   @click="changeLoginType(0)">密码登录
              </div>
              <div class="bg-[#e3e5e7] w-[1px] mx-[21px]"></div>
              <div class="login-tab-item text-[18px] h-5" @click="changeLoginType(1)"
                   :class="activeLoginType===1 ? 'active-tab':''">短信登录
              </div>


            </div>
            <component :is="activeTab"></component>
          </div>
          <div
              class="tips absolute w-[351px] color-[rgb(147,148,149)] bottom-0 left-1/2 translate-x-[-50%] translate-y-[-50%] text-[13px]">
            <p>未注册过的手机号我们将会为您自动注册账号</p>
            <p>登录或完成注册即代表同意用户协议和隐私政策</p>
          </div>
        </div>
      </el-dialog>

      <li class="vip-wrap v-popover-wrap relative w-[50px] animate">
        <a href="#">
          <HpSvgIcon name="vip" :size="20" :color="iconColor"/>
          <span class="hmm:hidden font-bold" :class="color">大会员</span>
        </a>

      </li>
      <li class="v-popover-wrap relative w-[50px] animate">
        <a href="#">
          <HpSvgIcon name="message" :size="20" :color="iconColor"/>
          <span class="hmm:hidden font-bold" :class="color">消息</span>
        </a>
      </li>

      <li class="v-popover-wrap w-[50px] animate">
        <RouterLink to="/dynamic" class="min-w-[50px]">
          <HpSvgIcon name="dynamic" :size="20" :color="iconColor"/>
          <span class="hmm:hidden font-bold" :class="color">动态</span>
        </RouterLink>
      </li>


      <li class="v-popover-wrap w-[50px] animate">
        <a href="#">
          <HpSvgIcon name="soucang" :size="20" :color="iconColor"/>
          <span class="hmm:hidden font-bold" :class="color">收藏</span>
        </a>
      </li>

      <li class="v-popover-wrap w-[50px] animate">
        <!--        <a href="#" class="min-w-[50px]">-->
        <RouterLink to="/history" class="min-w-[50px]">
          <HpSvgIcon name="history" :size="20" :color="iconColor"/>
          <span class="hmm:hidden font-bold" :class="color">历史</span>
        </RouterLink>
      </li>

      <li class="v-popover-wrap mr-1 w-[52px] animate">
        <a href="#" class="min-w-[50px]">
          <HpSvgIcon name="create" :size="20" :color="iconColor"/>
          <span class="hmm:hidden font-bold" :class="color">创作中心</span>
        </a>
      </li>

      <li class="v-popover-wrap header-upload-wrap w-[90px] hmm:w-[34px]">
        <RouterLink to="/create">
          <div class="header-upload-entry">
            <HpSvgIcon name="upload" :size="20"/>
            <span class="hmm:hidden text-white">投稿</span>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
  <div v-show="hasOccupy" class="h-16 w-1"></div>
</template>
<script setup lang="ts">
import HpPopover from "@/components/HpPopover/index.vue";

import {computed, ref} from "vue";
import QRCode from "qrcode";

import {useRouter} from "vue-router";

import {useSearchHook} from "@/hook/commonHook.ts";
import {useUserStore} from "@/store/userStore.ts";

import {useCookies} from '@vueuse/integrations/useCookies'
import {loginOutApi} from "@/api/user.ts";

const userStore = useUserStore();
const router = useRouter();

const props = defineProps({
  isFixed: {
    type: Boolean,
    default: false
  },
  change: {
    type: Boolean,
    required: false,
    default: true,
  },
  hasOccupy: {
    required: false,
    type: Boolean,
    default: false
  }
})
defineOptions({
  name: "HpHeaderBar"
})


const color = computed(() => {
  return props.isFixed ? 'text-black' : 'text-white';
})
const iconColor = computed(() => {

  return props.isFixed ? 'black' : 'white';

  // return "black";
})


const handleLoginOut = () => {
  loginOutApi();
  userStore.$reset();
  localStorage.clear();
  router.push("/");

}

const {
  searchKey,
  onSearch,
  focusInput,
  searchHistory,
  isSearching,
  activeTab,
  activeLoginType,
  changeLoginType,
  dialogVisible,
  handleClose,
  cleanInput,
} = useSearchHook();

// function demo(){
//   console.log("aaa")
// }

const cookies = useCookies(['token'])


const qrCodeImg = ref('')

function initQrCode() {
  const option = {
    errorCorrectionLevel: "H", // 可选，容错级别，值有 L（低）、M（中）、Q（高）、H（最高），默认为H
    type: "image/jpeg", 	// 可选，生成的二维码类型
    quality: 0.3, 			// 可选，二维码质量
    margin: 2, 				// 可选，二维码留白边距1
    color: {
      dark: "#000000", 	// 可选，前景色，格式必须是十六进制的，如果不是则会报错，比如：blue或rgb(255,245,255)等
      light: "#fff", // 可选，背景色，格式同上
    },
  };
  QRCode.toDataURL("http://www.nwyzx.com", option, (error: any, resultUrl: any) => {
    if (error) {
      throw error;
    }
    qrCodeImg.value = resultUrl;
  });
}

initQrCode();
</script>

<style lang="less" scoped>
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate:hover {
  animation: bounce 300ms 1 ease-in-out;
}


.el-dialog {
  .login {
    .scan {
    }

    .form {
      .login-tab-wp {
        .login-tab-item {
          font-weight: 500;
          font-size: 18px;
          line-height: 20px;
          color: #505050;
          cursor: pointer;
        }

        .active-tab {
          color: #4fa5d9;
          cursor: not-allowed;
        }
      }
    }
  }
}

.header-bar {
  position: absolute;
  max-width: 2560px;
  width: 100%;
  display: flex;
  top: 0;
  z-index: 1002;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  align-items: center;

  .left-entry {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .animate:hover {
      animation: bounce 300ms 1 ease-in-out;
    }
  }

  .search {
    flex: 1;
    max-width: 500px;
    min-width: 220px;
    position: relative;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: rgb(232, 234, 237);
    display: flex;
    transition: background-color .3s linear;

    &:hover {
      background: rgb(255, 255, 255);
    }

    .center-search-bar {
      position: relative;
      width: 100%;

      #nav-search-form {
        display: flex;
        height: 100%;


        .nav-search-content {
          padding: 0 5px;
          border-top-left-radius: 8px;
          display: flex;
          height: 40px;
          line-height: 40px;
          flex: 1;
          position: relative;

          .nav-search-clean {
            position: absolute;
            right: 5px;
            top: 12px;
            height: 100%;
          }

          .nav-search-input {
            flex: 1;
            margin: auto;
            outline: none;
            overflow: hidden;
            height: 30px;
            border-radius: 6px;
            background-color: transparent;
            padding-right: 30px;


            &:focus {
              background: rgb(227, 229, 231);
            }
          }
        }

        .nav-search-btn {
          width: 30px;
          margin: auto 10px auto 0;
          border-radius: 4px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: rgb(227, 229, 231);
          }
        }

      }

      .search-panel {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        position: absolute;
        height: 400px;
        width: 100%;
        max-height: 612px;
        overflow-y: auto;
        background-color: var(--bg-white);
        border: 1px solid var(--line-regular);
        border-top: none;
        padding: 13px 0 16px;
        -webkit-font-smoothing: antialiased;
        //background: #fb7299;

        .hot {

          padding-left: 16px;
          padding-right: 16px;

          .title-area {
            display: flex;
            justify-content: space-between;

            .history {
              font-size: 16px;
            }

            .clear {
              font-size: 12px;
              cursor: pointer;
              color: rgb(174, 178, 183);
            }

            .clear:hover {
              color: rgb(0, 173, 235);
            }

          }

          .search-history {
            display: flex;
            flex-wrap: wrap;
            font-size: 11px;


            .history {
              border-radius: 6px;
              background-color: rgb(246, 247, 248);
              height: 30px;
              margin-bottom: 10px;
              margin-right: 10px;
              padding: 7px 10px 8px 10px;
              position: relative;

              .icon {
                width: 12px;
                height: 12px;
                color: white !important;

                //background-color: red;
                position: absolute;
                border-radius: 20px;
                top: -4px;
                right: -4px;
                display: none;
              }
            }

            .history:hover {
              color: rgb(0, 173, 235);

              .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgb(204, 204, 204);
              }
            }
          }

          .hot-recommend {
            background-color: #fb7299;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            //gap: 20px;
            column-gap: 10px;

            .recommend-item {
              width: 45%;
              height: 38px;
              display: flex;
              align-items: center;

            }

            .recommend-item:nth-child(2n+1) {
              background-color: gray;
              width: 45%;
              //padding-right: 10px;
            }
          }
        }

        .suggestions {
          .suggestion-item {
            padding-left: 16px;
            padding-right: 16px;
            margin-bottom: 4px;
            height: 32px;
            cursor: pointer;
            line-height: 32px;
            overflow: hidden;
            font-size: 13px;
          }

          .suggestion-item:hover {
            background-color: rgb(227, 229, 231);
          }
        }
      }
    }
  }

  .right-entry {
    display: flex;
    align-items: center;
    //margin-left: 50px;
    height: 50px;

    .header-avatar {
      position: relative;
      box-sizing: content-box;
      padding-right: 10px;
      width: 50px;
      height: 50px;
      cursor: pointer;
    }

    .v-popover-wrap {
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        width: 100%;
        //text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

      }
    }

    .header-upload-entry {
      background-color: var(--primary-color);
      width: 100%;
      display: flex;
      height: 34px;
      justify-content: center;
      align-items: center;
      color: white;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      line-height: 20px;

      transition: background-color .3s;

      &:hover {
        background-color: rgb(252, 139, 171);;
      }

      span {
        margin-left: 4px;
      }
    }
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1002;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}


@media (max-width: 1080px) {
  .header-bar {
    .left {
      min-width: 423px;
    }

    .search {
      max-width: 256px;
    }
  }
}

//423  520   566  610.8 mr30
//1080 1348  1358    1680
@media (min-width: 1348px) and (max-width: 1368.99px) {
  .header-bar {
    .left {
      width: 520px;
      margin-right: 30px;
    }
  }
}

@media (max-width: 1369px) {
  .header-bar {
    .right {
      .v-popover-wrap > span {
        display: none;
      }

      .header-upload-wrap {
        .header-upload-entry {
          width: 34px !important;

          span {
            display: none;
          }
        }

      }
    }
  }
}

@media (min-width: 1369px) {
  .header-bar {
    .left {
      width: 610px;
      margin-right: 30px;
    }
  }
}
</style>