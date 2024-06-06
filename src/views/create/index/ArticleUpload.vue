<template>
  <div>
    <div style="border: 1px dashed #ccc" class="">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          mode="default"
      />
      <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          mode="default"
          @onCreated="handleCreated"
          class="mb-6"
      />

    </div>

    <el-row justify="end" class="my-8">
      <el-button size="default">清空</el-button>
      <el-button size="default" type="primary" class="mr-16">发布</el-button>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue'
//@ts-ignore
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

const toolbarConfig = {}
const editorConfig = {placeholder: '请输入内容...'}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}


</script>

<style scoped lang="less"></style>