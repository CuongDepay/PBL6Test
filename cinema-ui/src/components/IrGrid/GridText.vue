<template>
  <div :class="'grid-text-container' + (props.data[props.rowIndex].selected ? props.data[props.rowIndex].selected : '') + rowColorStyle">
    <template v-if="isDate">
      {{ parseTime(mData[rowIndex][prop], pattern) }}
    </template>
    <template v-else-if="isMoney">
      {{ formatMoney }}
    </template>
    <template v-else>
      {{ mData[rowIndex][prop] }}
    </template>
  </div>
</template>
<script setup lang="ts">
import { parseTime } from '@/utils/starcinema';
const props = defineProps({
  rowIndex: {
    type: Number,
    default: null
  },
  prop: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default() {
      return {};
    }
  },
  isDate: {
    type: Boolean,
    default: false
  },
  isMoney: {
    type: Boolean,
    default: false
  },
  pattern: {
    type: String,
    default: ''
  },
  colorProp: {
    type: String,
    default: ''
  },
  colorDict: {
    type: Object,
    default: null
  }
});
const emit = defineEmits(['update:data']);
const mData = computed({
  get: () => props.data,
  set: (val: any) => {
    emit('update:data', val)
  }
});
const rowColorStyle = computed(() => {
  if (!props.colorProp || !props.colorDict) {
    return '';
  }
  for (let i = 0; i < props.colorDict.length; i++) {
    if (props.data[props.rowIndex][props.colorProp] === props.colorDict[i].value) {
      return ' ' + props.colorDict[i].elTagType;
    }
  }
  return '';
});
const formatMoney = computed(() => {
  const value = mData.value[props.rowIndex][props.prop];
  if (value) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return '';
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-text-container {
  width: 100%;
  height: 100%;
  padding: 8px;
  &.selected {
    background-color: $blue-200;
  }
  &.blue {
    background-color: $blue-50;
  }
  &.blue.selected {
    background-color: $blue-200;
  }
  &.gray {
    background-color: $gray-50;
  }
  &.gray.selected {
    background-color: $gray-200;
  }
  &.green {
    background-color: $green-50;
  }
  &.green.selected {
    background-color: $green-200;
  }
  &.red {
    background-color: $red-50;
  }
  &.red.selected {
    background-color: $red-200;
  }
  &.yellow {
    background-color: $yellow-50;
  }
  &.yellow.selected {
    background-color: $yellow-200;
  }
  &.violet {
    background-color: $violet-50;
  }
  &.violet.selected {
    background-color: $violet-200;
  }
}
</style>
