<template>
  <div>
    <div class="h-[280px]">
      <el-upload
          ref="uploadRef"
          drag
          :auto-upload="true"
          :multiple="false"
          :limit="1"
          :file-list="videoList"
          @before-upload="beforeVideoUpload"
          :http-request="customerVideoRequest"
          :on-change="videoChange"
      >
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">
          拖拽到此处或 <em>点击上传</em>
        </div>
        <div class="mt-3">
          <span class="mr-2 text-black text-sm">将第一帧作为封面</span>
          <el-radio-group v-model="form.useVideoCover">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </div>


      </el-upload>

      <div>上传进度</div>
      <el-progress :percentage="progress" :indeterminate="progress!=100"/>
    </div>

    <el-card shadow="never">

      <el-row justify="start" align="middle" class="mb-4">
        <div class="font-bold">基本设置</div>
        <span
            class="text-xs py-1.5 px-4 border rounded-md ml-12 cursor-pointer hover:bg-[rgb(244,244,245)]">一键填写</span>
      </el-row>

      <el-form :model="form" style="max-width: 800px;margin-left: 20px;">
        <el-form-item label="封面" class="avatar-item">
          <!-- 封面-->
          <el-upload :file-list="coverList" class="avatar-uploader" :on-change="coverChange"
                     :before-upload="beforeCoverUpload"
                     :http-request="customerCoverRequest"
                     :limit="1"
                     :disabled="form.useVideoCover"
          >
            <el-icon class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
            <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
          </el-upload>
        </el-form-item>

        <el-form-item label="标题" class="form-label">
          <el-input v-model="form.title" :max="40" size="large" clearable/>
        </el-form-item>

        <el-form-item label="类型" class="text-sm form-label">
          <el-radio-group v-model="form.type">
            <el-radio value="原创">原创</el-radio>
            <el-radio value="转载">转载</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="其他作者" class="text-sm form-label">

          <el-select
              v-model="form.other"
              size="large"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="添加其他作者"
              :remote-method="remoteMethod"
              style="width: 240px"
          >
            <el-option
                v-for="item in options"
                :label="item.username"
                :key="item.id"
                :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="分区" class="form-label">
          <el-select v-model="form.partition" placeholder="请选择分区" size="large" style="width: 200px">
            <el-option v-for="item in types" :label="item.typeName" :value="item.typeName"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="标签" class="form-label">
          <div class="flex-1 relative">
            <el-input v-model="form.currentTags" size="large" @keydown.enter="emitEnter" clearable
                      class="inner-input indent-28"></el-input>
            <div class="h-full absolute top-0 left-0 flex items-center rounded-l-md" ref="selectContainer">
              <el-tag type="primary" closable @close="handleCloseTag(item)" class="mx-2"
                      v-for="item in form.selectTags" :key="item">{{ item }}
              </el-tag>
            </div>
          </div>

        </el-form-item>

        <el-form-item label="描述" class="form-label">
          <el-input v-model="form.description" :max="250" size="large" type="textarea"/>
        </el-form-item>

        <el-row class="my-8" justify="end">
          <el-button size="default" @click="clear">清空</el-button>
          <el-button size="default" type="primary" @click="save">发布</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>

</template>
<script setup lang="ts">

import {useTypeStore} from "@/store/typeStore.ts";


import {reactive, ref, watch} from "vue";
import {Plus, UploadFilled} from '@element-plus/icons-vue'
import {useTags} from "@/views/create/index/useTags.ts";
///////////////////////////////////////////////////////////////////////////////
import {useAvatarUpload} from "@/views/create/index/useAvatarUpload.ts";
import {ElMessage, UploadFile, UploadFiles, UploadProps, UploadRequestOptions} from "element-plus";
import {commonUpload, getVideFirstFrame} from "@/views/create/index/utils.ts";
import {calculateFileMd5, calculateTotal, checkMd5, postFile} from "@/utils/partUpload.ts";
import {removePrefix} from "@/utils/imgUtil.ts";
import {Author, getUserByUsernameApi, User, Video, videoSaveApi} from "@/api/upload.ts";
import {useUserStore} from "@/store/userStore.ts";

const userStore = useUserStore()
const types = useTypeStore().types;


const uploadRef = ref(null);

const beforeVideoUpload: UploadProps['beforeUpload'] = (file: File) => {
  console.log(file);
}


interface Form {
  coverUrl: string;
  title: string;
  type: string;
  partition: string;
  currentTags: string;
  description: string;
  useVideoCover: boolean;
  other: number[];
  selectTags: string[]
}

const form = reactive<Form>({
  coverUrl: '',
  title: '',
  type: '原创',
  partition: '',
  currentTags: "",
  description: '',
  useVideoCover: false,
  other: [],
  selectTags: []
})


const selectedUsers = ref<Author[]>([]);

watch(() => {
  return form.other
}, () => {
  const selected = options.value.filter(option => {
    return form.other.includes(option.id);
  })

  selectedUsers.value = selected.map(item => {
    return {
      id: item.id,
      name: item.username
    }
  })
})
const options = ref<User[]>([])
const remoteMethod = (query: string) => {
  if (query) {
    getUserByUsernameApi(query).then(res => {
      options.value = res.data;
    })
  } else {
    options.value = []
  }
}


///////////////////////////////////////下面的标签////////////////////////////////////////////////////////////////

const {emitEnter, selectContainer, formatWidth, handleCloseTag} = useTags(form);

const {imageUrl, coverList, customerCoverRequest, beforeCoverUpload, coverChange} = useAvatarUpload(form);

/////////////////////////////////////////////////////////////////////////////

const videoList = ref([]);

/**
 * 文件改变时的回调函数，可以在此处理截取第一帧
 * @param uploadFile
 * @param uploadFiles
 */
const videoChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  //是否截取第一帧的画面作为封面上传
  if (uploadFile.raw && form.useVideoCover) {
    getVideFirstFrame(uploadFile.raw, 200, 1).then((blob) => {
      const tobe = blob as unknown as Blob;
      const fileBlob = tobe.slice(0, tobe.size, tobe.type);
      const file = new File([fileBlob], "cover." + "jpeg", {type: tobe.type});
      commonUpload(file, imageUrl, form);
    })
  }
  uploadFiles.pop();
}

const videoUrl = ref<string>('')
const progress = ref<number>(0)
const customerVideoRequest = (options: UploadRequestOptions) => {
  calculateFileMd5(options.file).then(md5 => {
    checkMd5(md5).then(res => {
      videoUrl.value = res as unknown as string;
      progress.value = 100;
    }).catch(_error => {
      postFile(options.file, 0, md5, options.file.name, videoUrl, progress)

      // setTimeout(() => {
      //   for (let index = 1; index <= totalNumber; index++) {
      //     setTimeout(() => {
      //       postFile(options.file, index, md5, options.file.name, videoUrl, progress)
      //     }, 200)
      //   }
      // }, 3000)

    })
  })
}
const save = () => {
  const current = {
    id: userStore.id,
    name: userStore.username
  }

  if (!selectedUsers.value.includes(current)) {
    selectedUsers.value.push(current)
  }
  const video: Video = {
    title: form.title,
    authors: selectedUsers.value,
    keyWord: form.selectTags.join(','),
    typeName: form.partition,
    description: form.description,
    cover: removePrefix(imageUrl.value),
    length: 0,
    url: videoUrl.value


  }
  videoSaveApi(video).then(res => {


    if (res.code === 200) {
      ElMessage.success({
        type: 'success',
        message: "上传成功"
      })
      clear()
    } else {
      ElMessage.error({
        type: 'error',
        message: "上传失败"
      })
    }

  }).catch(err => {
    console.log(err);
  })

}

const clear = () => {
  selectedUsers.value = []
  videoUrl.value = ""
  imageUrl.value = ""
  progress.value = 0;
  form.description = "";
  form.other = [];
  form.coverUrl = '';
  form.title = '';
  form.type = '原创';
  form.partition = '';
  form.currentTags = "";
  form.useVideoCover = false;
  form.selectTags = [];
}

</script>

<style scoped lang="less">
.avatar-uploader {
  position: relative;

  .avatar {
    position: absolute;
    left: 0;
    top: 0;

    width: 226px;
    height: 140px;
    display: block;
  }
}


.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 226px;
  height: 140px;
  text-align: center;
  border: 1px dashed var(--el-border-color);
}

.avatar-item {
  //background-color: #fb7299;

  :deep(.el-form-item__label) {
    //color: red;
    height: 140px;
    //width: 100px;
    //background-color: darkred;
    //text-align: center;
    line-height: 140px;
    //display: flex;
    margin-right: 20px;
    width: 60px;

    //justify-content: center;
  }
}

.form-label {
  :deep(.el-form-item__label) {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 20px;
    width: 60px;
  }
}

.inner-input {
  :deep(.el-input__inner) {
    padding-left: v-bind(formatWidth);
  }
}
</style>