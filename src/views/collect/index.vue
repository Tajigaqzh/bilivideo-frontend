<template>
  混流
  <div class="push-wrap flex w-full justify-center">
    <ul id="list" class="list-ul">
      <li v-for="item in list" :key="item.key">
        <el-icon :size="16" @mouseenter="rowDrop" class="drag-btn">
          <DCaret/>
        </el-icon>
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs';
import {nextTick, onMounted, ref, watch} from "vue";
import {DCaret} from "@element-plus/icons-vue";

const rowDrop = (event: any) => {
  event.preventDefault();

  nextTick(() => {
    const wrapper: HTMLElement = document.querySelector(
        ".list-ul"
    )!;

    Sortable.create(wrapper, {
      animation: 300,
      handle: ".drag-btn",
      onEnd: ({newIndex, oldIndex}) => {
        const currentRow = list.value.splice(oldIndex, 1)[0];
        //@ts-ignore
        list.value.splice(newIndex, 0, currentRow);
      }
    })
  })
}

const list = ref([
  {
    key: 1,
    content: "1",
  }, {
    key: 2,
    content: "2",
  },
  {
    key: 3,
    content: "3",
  }, {
    key: 4,
    content: "4",
  },
  {
    key: 5,
    content: "5",
  }, {
    key: 6,
    content: "6",
  },
  {
    key: 7,
    content: "7",
  }, {
    key: 8,
    content: "8",
  },
  {
    key: 9,
    content: "9",
  }, {
    key: 10,
    content: "10",
  }
])


watch(() => [...list.value], (value, oldValue) => {
  console.log(value, oldValue)
})

onMounted(() => {
  // const ul = document.querySelector("#list");
  //
  // const sortable = Sortable.create(ul);
})

//音频混流
// 可以用  摄像头，窗口，麦克风，文字，图片，视频，时间，秒表，文件直播

//无论开不开麦克风，初始化推流的时候一定要推一个音频轨

// 可以用屏幕共享直播
//视频混流


// const div = ref<HTMLDivElement | null>(null);
const callback = () => {

  console.log("自定义callback")
}
const isAdded = ref(false);

function add(_fn?: Function) {

  // console.log(fn)
  // const htmlDivElement = document.createElement('div', {
  //   id: "aaa"
  // });
  //
  //
  // htmlDivElement.addEventListener('click', fn ? fn : () => {
  //   console.log("默认监听")
  // })
  //
  // nextTick(() => {
  //   document.body.appendChild(htmlDivElement);
  //   htmlDivElement.click();
  //
  //   isAdded.value = true;
  //
  //   document.body.remove(htmlDivElement);
  //
  // })

}

add(callback)


watch(isAdded, () => {
  console.log("改变了")
})
</script>
<style scoped lang="less">

li {
  width: 300px;
  height: 30px;
  text-align: center;
  border: black 1px solid;
  //padding: 4px;
  margin: 5px auto;
  //background-color: red;
}
</style>