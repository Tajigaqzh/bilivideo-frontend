<template>
  <svg
      aria-hidden="false"
      :class="svgClass"
      :style="iconStyle"
  >
    <use :href="symbolId"/>
  </svg>
</template>

<script setup lang="ts">
import {computed} from 'vue';

defineOptions({
  name: 'HpSvgIcon',
})

const props = withDefaults(defineProps<{
  prefix?: string
  name: string
  className?: string
  size?: number
  color?: string
  hoverColor?: string
}>(), {
  prefix: 'icon',
  className: '',
  size: 20,
  color: '18191C'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})

const iconStyle = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    // color:`${props.color}`
  }
});

const simpleColor = computed(()=>{
  return props.color;
})
const hoverColor = computed(() => {
  return props.hoverColor || props.color
})
</script>
<style scoped>
.svg-icon {
  vertical-align: -0.1em;
  /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  overflow: hidden;
  cursor: pointer;
  outline: none;
  fill: currentColor;
  //color: #fb7299;
  color: v-bind(simpleColor);
}

.svg-icon:hover {
  cursor: pointer;
  fill: currentColor;
  color: v-bind(hoverColor);
}

</style>