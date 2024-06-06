<template>
  <el-upload
      ref="uploadRef"
      drag
      :auto-upload="true"
      :multiple="false"
      v-model:file-list="fileList"
      @on-progress="handleProgress"
      @on-change="handleChange"
      @before-upload="beforeUpload"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
  >
    <el-icon class="el-icon--upload">
      <upload-filled/>
    </el-icon>
    <div class="el-upload__text">
      拖拽到此处或 <em>点击上传</em>
    </div>
  </el-upload>
</template>
<script setup lang="ts">
import {UploadFile, UploadFiles, UploadProgressEvent, UploadUserFile} from "element-plus";
import {ref} from "vue";
import { UploadFilled } from '@element-plus/icons-vue'

const uploadRef = ref(null)
const fileList = ref<UploadUserFile>([])



const handleProgress = (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => {

  console.log(evt, uploadFile, uploadFiles)
}

const beforeUpload = (file: File) => {
  console.log(file)
  return true
}

const handleChange = (file: UploadUserFile) => {
  console.log("change")
  console.log(file)
}
</script>

<style scoped lang="less"></style>