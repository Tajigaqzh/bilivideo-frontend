<template>
  <el-form class="justify-center text-lg">
    <el-form-item label="账号">
      <el-input v-model="formData.username" size="large" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input :type="hideOrView ? 'password':'text'" v-model="formData.password" size="large"
                placeholder="请输入密码">
        <template #suffix>
          <el-icon :size="18" class="mr-2" color="rgb(0,161,214)" @click="hideOrView=!hideOrView">
            <component :is="isComp"></component>
          </el-icon>
          <div class="color-[rgb(0,161,214)] tips">
            忘记密码?
          </div>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <el-row justify="space-between" :gutter="20">
    <el-col :span="12">
      <el-button class="w-full" size="large" plain>注册</el-button>
    </el-col>
    <el-col :span="12">
      <el-button class="w-full text-white login-btn" size="large" :color="!active ? '#7FD6F5':'#00AEEC'" @click="login"
                 :disabled="!active">
        登录
      </el-button>
    </el-col>
  </el-row>
  <div class="text-[13px] text-center mt-6 mb-2 text-[rgb(148,153,160)]">其他方式登录</div>
  <div class="flex  text-[rgb(147,148,149)] justify-evenly">
    <div class="flex items-center cursor-pointer">
      <img class="w-7 h-7 mr-2"
           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEUAAABXu0BYt0BQt0BXu0BWu0BXu0BXu0BXu0BWukBWukBXvEBXu0BXvEBXvEBYukBVukBXu0BWt0BXukBXuEBXu0D////1+/Pq9+fV7s/A5rer3aBsw1jg89uBzHBiwEy14auL0Xug2ZOW1YeBzG93yGSW1YjL6sO14azL6cN2yGP3XpzOAAAAFXRSTlMA3yAQ78+/r5+AUI9w74BgYEBAkHDBb56KAAACF0lEQVRIx52W6XKDIBRGwT3GZmsRUXFP0vb9H7AKGS8aiCXnR0TCmU/gOoh0uJck8jEZwUGYXND/cOPggyz4CE//0HZgKeDIsdSA3Qs1Bk2XejLF7ckGe1fnOT7ZBDsaDxNiZ4Jna4Jnb7rgbeKrK7QnFuzBOxIrYrsJAth9iIdl/9CwLE0pv/elqfoegWpfXdAUYINW9GRkRIBWakBemiOVGRbpE1lpijwaPDANCxvCc8qBbcVF47vq5EQ1YjCK3nyXiXE3QqrpSseeu+jptc96XgWmHSGDEGtCmDHygpK5nUuRdr2MvvfNdMvzXCN+KVNk6RO0qOpr37fXJzFCwdzmT9532THZovmqFHxlF3/WcdWQGUsBI2g3K/G3WG3o4oEVsVqOK4RHaTpfaKkXCVsWzPTL65pPN7X4kxnEX6qIXS4mJqfOH5tVKSJWzJsiXqlcklxe5AI0yuL4RDUpiKkGphRrRFRK+lLk88AQSg4KXVC9TvwSRQ4MU5m1xZ2xlmnEm1LkrqeKTVbU5rcaNtJDCAWqCOutq90CpjiKMTFQZuuah/9Oo+h6ZtPkYTSxI0YKReWLtxFBpJ5bzjOasWYsoBp6HQSRW5R5tz4C4HS0PltjO/H05sH6iQDXtz0d3/94ANPes/9Asjd9572PwE8X6Tm+DPViZMQ5mLUDxGnVCFtqwDH0VlYQS22bcxIGIhn7UXLWWn+10s6FZo+4YQAAAABJRU5ErkJggg=="/>
      <div>微信登录</div>
    </div>
    <div class="flex items-center cursor-pointer">
      <img class="w-7 h-7 mr-2"
           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAh1BMVEUAAADXQDjTQDzaQzfcRTfbRDfcRDbcQzbbRDbbRDfcQzbaQzbbRDbbRDbaRDfcQzbbRDfaQjjaQjXcQzfYRDfbRDTbRDf////gW1D99PPtoZvyubT76Ob20M3pioLdT0Tvrajkc2n20c3rlo7mfnb0xcD43NrrlY7kcmniZ1343driZ1z0xMEgvW1iAAAAFnRSTlMAIBDf34Dv78+/n1BAj7CvcGBgkHBwDUc+aAAAAmpJREFUSMeVlueCqjAQRgOI0qy7m0YVsN297/98OwEdCUQ05w8WDt/MkIjEhJv8RIFHAS/c/CTkM9w4XFKN5ebwgeaDNWURObYa4s+oMWrG1MOruDV9w9o1eU5A37JwDN6CUksTPWsTPXvTRe89wXBCa2rB+ukd6By3K6ca8WcNVoyxLB26i0ex/mxgzRTiMlx990A6C09PZ6XKwXbpIyP6Fn4C8zKONHVYFrJ4tJWfoUMJ5k2PPBi0igHZrX8j4HVLITPXB7udeK1gHem9ziJjouTwQYmnhCCuxh5UhSJO9qKmWwxrTcZeyh5UpcyFyOH0Bi5SaYNNyG7qYeK95CttWUWlJn6PW5RsSgVtlyqxoEhEQs1rNEPrldf5cI8Qb+hxYRKlaVsSY4NZKqU81aynpQY0kTNF3pS4fsDFvTESx4Gi0b4vMqWKdl4UcHWukmSeZXnRV9Gb5VgcDucIJ3B11JbckSmKyXAC7V7I52hxI2WmyYYk0m7+Dbd8JR7boTYlbshOE9WBsYb+MglBZ6r4p8TxXL+Hi7zov2dCnY1N8v7ViIS4z21V9q3U7Ap9YkzOulnrLAkZLtYTA4f+CpYLHEjFgCMdtwhiTBGedT+D/NwtIHU2V3li4tE9iO5qaILQwvF4LNUtTLsr8InnTX6Pebfq8qopmup/V29W0CkRIaNISDmxJwLqNeEYHwG8repzltVpA/Ua8UmP61ErPHy2xnbiniBflg9WxA0sCnXJAMezadDSRM/aRM/eDMCb4n7Z/glE9rOhq5i8xPFfaz7GmdXIs9aw4O1qZIUxam9IdtuwS/aCaJcYrT+uh9kYccQkXQAAAABJRU5ErkJggg=="/>
      <div>微博登录</div>
    </div>

    <div class="flex items-center cursor-pointer">
      <img class="w-7 h-7 mr-2"
           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEUAAABMouVIn+NEn99MouVMouVMo+ZMouVKouRKouJMn+NMouZLouRLo+VMoeNMouZLoeVLoeVNn+RMouX///+83Pal0PL0+v6x1vRireiay/FXqOfS6Pl5uevH4vePxe+Ev+1utOrp9Pzp8/yEv+7XzqLPAAAAE3RSTlMA3yAQ74C/n2BQQK9wz5CPz7BwJ8NfpgAAAbNJREFUSMe1lutygjAQhTeEOyi2AQIC3t//GcvYqk3OYsh0+v1yMN+czc4mQBwyL5ONUDMiLsqc1iGzOFQGYZGu0KLZQkQSrNSQ6I2aGRqkpktxlXJQSc4LNsqJCBhPOCQwwXOa6PmbErxlNpJeVMqD6uWliqOfprPiyN5tcOp0PaObntnmo9hIAV39pFNA9BOogKb+RQN/h9+RCfzR1gbtQqSArtQmemAjUy4QI7GxBTy92qKGJfEshlgp0DO15srmhuIRFuX0Cc/2KO5hUUkF1xt3dxKKuUS3uCPBjA0w4rySwqYyDLCM+EqxVrd45UTtFm81ywlEuzkHXhyhOfY1DArfntg+jRMY/PB80CeODaLhHigpt7fYNSgeuvpgD7k0j9V4Gfbc6RjN7oRE1rCeejVo27vMD4/WFokynB33qUpnUYb+t5zg7+OhNYrVxx5PIzGRJ9ijniwxIC7y3DV3urZ9/DrDfQxvR793a+YnpvRk6+Nt6YXceRQq//rxgKb/h87/fVrtAmKQW2c/JfGkb0PDjBYJomUtMuJQTcRKDUmL0LLiDDWevCzie7LYJGXOWl/BnLhvbq/sWgAAAABJRU5ErkJggg=="/>
      <div>QQ登录</div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {View, Hide} from "@element-plus/icons-vue";
import {computed, getCurrentInstance, reactive, ref, toRaw} from "vue";
//@ts-ignore
const {proxy} = getCurrentInstance();
import {useUserStore} from "@/store/userStore.ts";
import {ElMessage} from "element-plus";

const userStore = useUserStore();

defineOptions({
  name: "PasswordLogin"
})

const isComp = computed(() => {
  return hideOrView.value ? Hide : View
})


const hideOrView = ref(true)

const formData = reactive({
  username: "123456",
  password: "123456",
  type: 1
})

const login = () => {
  userStore.login(toRaw(formData)).catch(error => {
    error && ElMessage({
      message: error,
      type: "error",
      plain: true
    })
  }).then(_res => {
    proxy.$bus.emit('afterLogin')
  })
}
const active = computed(() => {
  return formData.password != "" && formData.username != "";
})
</script>
<style lang="less" scoped>
.el-form {
  .el-form-item {
    :deep(.el-form-item__label) {
      font-size: 16px;
      line-height: 38px;
      //background-color: rgb(127,214,245);
    }

    :deep(.el-input__wrapper.is-focus) {
      box-shadow: 0 0 0 1px #dcdfe6;
    }
  }
}

.tips {
  color: rgb(0, 161, 214);
  //background-color: rgb(0,174,236);
}

.login-btn {
  color: white;
}
</style>