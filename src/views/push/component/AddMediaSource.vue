<template>
  <!--all-->
  <div v-if="showIndex===SourceType.all" class="flex flex-wrap text-sm text-[#18191c] font-medium gap-x-1 gap-y-2.5">
    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.camera)">
      <el-icon :size="40" color="#9499A0" class="active">
        <CameraFilled/>
      </el-icon>
      <p class="mt-1.5 active">摄像头</p>
    </div>
    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.microPhone)">
      <el-icon :size="40" color="#9499A0" class="active">
        <Microphone/>
      </el-icon>
      <p class="mt-1.5 active">麦克风</p>
    </div>

    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.windows)">
      <HpSvgIcon :size="40" name="window" :color="'#9499A0'" class="active"/>
      <p class="mt-1.5 active">窗口</p>
    </div>


    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.image)">
      <el-icon :size="40" color="#9499A0" class="active">
        <Picture/>
      </el-icon>
      <p class="mt-1.5 active">图片</p>
    </div>

    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.text)">
      <HpSvgIcon :size="40" name="text" :color="'#9499A0'" :hoverColor="'#ff6699'" class="active"/>
      <p class="mt-1.5 active">文字</p>
    </div>

    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.video)">
      <HpSvgIcon :size="40" name="ds" :color="'#9499A0'" :hoverColor="'#ff6699'" class="active"/>
      <p class="mt-1.5 active">视频</p>
    </div>
    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.time)">
      <HpSvgIcon :size="40" name="time" :color="'#9499A0'" :hoverColor="'#ff6699'" class="active"/>
      <p class="mt-1.5 active">时间</p>
    </div>
    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.stopWatch)">
      <HpSvgIcon :size="40" name="second" :color="'#9499A0'" :hoverColor="'#ff6699'" class="active"/>
      <p class="mt-1.5 active">秒表</p>
    </div>

    <div class="w-20 flex flex-col justify-center items-center hover-active cursor-pointer"
         @click="emit('open',SourceType.notice)">
      <HpSvgIcon :size="40" name="message" :color="'#9499A0'" :hoverColor="'#ff6699'" class="active"/>
      <p class="mt-1.5 active">公告</p>
    </div>

  </div>

  <!--  窗口-->
  <div v-else-if="showIndex===SourceType.windows">
    <span class="font-semibold">名称</span>
    <el-input type="text" v-model="sourceName" size="large" class="mt-2"></el-input>

  </div>
  <!--  摄像头-->
  <div v-else-if="showIndex===SourceType.camera">
    <div>
      <span class="font-semibold">设备选择</span>
      <el-select v-model="selectedCamera" size="large" class="mt-2" placeholder="请选择摄像头">
        <el-option v-for="item in cameras" :label="item.label" :value="item.deviceId"></el-option>
      </el-select>
    </div>
    <div class="mt-3">
      <span class="font-semibold">摄像头名称</span>
      <el-input type="text" v-model="sourceName" size="large" class="mt-2"></el-input>
    </div>
  </div>
  <!--  麦克风-->
  <div v-else-if="showIndex===SourceType.microPhone">
    <div>
      <span class="font-semibold">设备选择</span>
      <el-select v-model="selectedMicroPhone" size="large" class="mt-2" placeholder="请选择麦克风">
        <el-option v-for="item in microPhones" :label="item.label" :value="item.deviceId"></el-option>

      </el-select>
    </div>
    <div class="mt-3">
      <span class="font-semibold">麦克风名称</span>
      <el-input type="text" v-model="sourceName" size="large" class="mt-2"></el-input>
    </div>
  </div>
  <!--  图片-->
  <div v-else-if="showIndex===SourceType.image">
    <div>
      <span class="font-semibold">图片命名</span><br>
      <el-input type="text" v-model="sourceName" size="large" class="mt-2" style="width: 280px"></el-input>

    </div>
    <div class="mt-3">
      <span class="font-semibold">添加本地图片</span>
      <div class="flex items-center">
        <el-input type="text" v-model="imageOrVideoTitle" readonly size="default" class="mt-2"
                  style="width: 280px;"></el-input>
        <el-button size="default" class="mt-1.5 ml-6" @click="selectFile">浏览</el-button>
        <input type="file" ref="selectFileRef" style="display:none;" @change="handleChange($event,false)"
        />
      </div>
      <div class="mt-3">
        <div class="font-semibold">图片设置</div>
        <!--        255,125,168-->
        <div class="flex items-center mt-3">
          <span class="text-xs mr-3">透明度</span>
          <el-slider v-model="transparency" size="small" style="width: 290px;" class="mr-4"/>
          {{ transparency }}
        </div>
      </div>

    </div>
  </div>

  <!--文字  -->
  <div v-else-if="showIndex===SourceType.text">
    <div>
      <span class="font-semibold">名称</span><br>
      <el-input type="text" v-model="sourceName" size="large" class="mt-2" style="width: 280px"></el-input>
    </div>

    <div class="mt-3 font-semibold">
      <span>文字内容</span>
      <el-input type="textarea" v-model="content" class="mt-4 text-wrap" size="default" :max="200"></el-input>
    </div>
    <div class="font-semibold mt-3">文字设置</div>
    <div class="flex items-center mt-3">

      <span class="text-xs mr-3">透明度</span>
      <el-slider v-model="transparency" size="small" style="width: 290px;" class="mr-4"/>
      {{ transparency }}
    </div>

    <div class="mt-3">
      <span class=" mr-3 text-xs">文字颜色</span>
      <el-color-picker v-model="color" show-alpha :predefine="predefineColors"/>
    </div>
  </div>
  <!--视频文件  -->
  <div v-else-if="showIndex===SourceType.video">
    <div>
      <span class="font-semibold">视频命名</span><br>
      <el-input type="text" v-model="sourceName" size="large" class="mt-2" style="width: 280px"></el-input>
    </div>
    <div class="mt-3">
      <span class="font-semibold">添加本地视频</span>
      <div class="flex items-center">
        <el-input type="text" v-model="imageOrVideoTitle" readonly size="default" class="mt-2"
                  style="width: 280px;"></el-input>
        <el-button size="default" class="mt-1.5 ml-6" @click="selectFile">浏览</el-button>
        <input type="file" ref="selectFileRef" style="display:none;" @change="handleChange($event,true)"
        />
      </div>
    </div>
  </div>

  <!--时间  -->
  <div v-else-if="showIndex===SourceType.time">
    <div>
      <span class="font-semibold">时间命名</span><br>
      <el-input type="text" v-model="sourceName" size="large" class="mt-2" style="width: 280px"></el-input>
    </div>
    <div class="mt-3">
      <span class="font-semibold mr-3">颜色</span>
      <el-color-picker v-model="color" show-alpha :predefine="predefineColors"/>
    </div>
  </div>
  <!--秒表  -->
  <div v-else-if="showIndex===SourceType.stopWatch">
    <div>
      <span class="font-semibold">秒表命名</span><br>
      <el-input type="text" v-model="sourceName" size="large" class="mt-2" style="width: 280px"></el-input>
    </div>
    <div class="mt-3">
      <span class="font-semibold mr-3">颜色</span>
      <el-color-picker v-model="color" show-alpha :predefine="predefineColors"/>
    </div>
  </div>

  <div v-else-if="showIndex===SourceType.notice">
    <div class="mt-3 font-semibold">
      <span>公告内容</span>
      <el-input type="textarea" v-model="notice" class="mt-4 text-wrap" size="default" :max="300"></el-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {SourceType} from "../../../../types/mediaType.ts"
import {CameraFilled, Microphone, Picture} from "@element-plus/icons-vue";
import {MediaSourceProp, useSelectVideoOrImage} from "@/views/push/hook/index.ts";
import {useDevicesList} from "@vueuse/core";

import {
  useSourcePreset
} from "@/views/push/hook/index.ts"

const emit = defineEmits(['open'])

const props = defineProps<MediaSourceProp>();
import {
  showIndex,
  sourceName,
  content,
  transparency,
  color,
  selectedCamera,
  selectedMicroPhone,
  imageOrVideoTitle,
  predefineColors,
  notice

} from "@/views/push/hook/index.ts"

showIndex.value = props.active;

useSourcePreset(props);


const {
  selectFileRef,
  selectFile,
  handleChange
} = useSelectVideoOrImage();


const {
  videoInputs: cameras,
  audioInputs: microPhones,
} = useDevicesList()


defineExpose({
  sourceName,
  content,
  transparency,
  color,
  selectedCamera,
  imageOrVideoTitle,
  selectedMicroPhone
})

</script>
<style scoped lang="less">

.hover-active:hover {
  & > .active {
    color: #ff6699 !important;
  }
}

.el-slider {
  :deep(.el-slider__runway) {
    height: 4px;
  }

  :deep(.el-slider__bar) {
    background-color: #fb7299;
    height: 4px;
  }

  :deep(.el-slider__button) {
    //background-color: black;
    width: 12px;
    height: 12px;
    border: 1.5px solid #fb7299;
  }
}

.text-wrap {
  :deep(.el-textarea__inner) {
    font-weight: normal;
    height: 100px;
    font-size: 14px;
    width: 380px;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background-color: #bcbfc4;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      background-color: #d3dce6;
    }
  }
}
</style>