<script setup lang="ts">
export interface HpPopoverProps {
  hasPopup?: boolean;
  title?: string;
  buttonName: string;
  color: string;
  link?: string;
  isBold?: boolean
}

defineOptions({
  name: 'HpPopover',
});
withDefaults(defineProps<HpPopoverProps>(), {
  color: 'text-white',
  hasPopup: false,
  isBold: true
});
</script>

<template>
  <el-popover
      v-if="hasPopup"
      placement="bottom"
      trigger="hover"
      :title="title"
      :offset="20"
      :show-arrow="false"
      :class="color"
  >
    <template #reference>
      <li
          class="flex items-center v-popover-wrap my-hover-bounce"
          :class="color"
      >
        <a class="mr-[10px]" :href="link" :class="isBold ? 'font-bold text-red-700':''">
          <slot name="left"></slot>
          <span>{{ buttonName }}</span>
          <slot name="right"></slot>
        </a>
      </li>
    </template>
  </el-popover>

  <li
      class="flex items-center v-popover-wrap my-hover-bounce"
      :class="[color]"
      v-else
  >
    <a class="mr-[10px] hmd:mr-[10px] hmx:mr-[15px] hlg:mr-[20px]" :class="isBold ? 'font-bold':''">
      <slot name="left"></slot>
      <span>{{ buttonName }}</span>
      <slot name="right"></slot>
    </a>
  </li>
</template>

<style scoped lang="less">
.v-popover-wrap {
  position: relative;
  font-size: 100%;

  a {
    display: flex;
    align-items: center;
    height: 64px;
    font-size: 13px;
    line-height: 64px;
    //font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
    padding-right: 2px;
  }
}
</style>
