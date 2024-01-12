<template>
  <div :class="'grid-button-container' + (props.data[props.rowIndex].selected ? props.data[props.rowIndex].selected : '') + rowColorStyle">
    <template v-for="(item) in buttonProps" :key="item.index">
      <IrButton
        v-if="item.permissionKey && (item.onlyKeys === null || item.onlyKeys === undefined || !item.onlyKeys.includes(data[rowIndex][item.key]))"
        :leftIcon="item.icon"
        :colorStyle="item.color"
        :toolTip="item.title"
        type="grid"
        buttonSize="small"
        v-hasPermi="[item.permissionKey]"
        @onClick="item.click(rowIndex)"
      />
      <IrButton
        v-else-if="item.onlyKeys === null || item.onlyKeys === undefined || !item.onlyKeys.includes(data[rowIndex][item.key])"
        :leftIcon="item.icon"
        :colorStyle="item.color"
        :toolTip="item.title"
        type="grid"
        buttonSize="small"
        @onClick="item.click(rowIndex)"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import IrButton from '@/components/IrButton/index.vue';
/**
 * IrButton
 */
interface IrGridButton {
  index: number;
  icon: string;
  click: any;
  color: string;
  permissionKey: string;
  onlyKeys: Array<number | string>;
  key: string,
  title: string;
}
const props = defineProps({
  rowIndex: {
    type: Number,
    default: null
  },
  buttonProps: {
    type: Array<IrGridButton | any>,
    default: null,
  },
  data: {
    type: Object,
    default() {
      return {};
    }
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
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100%;
  width: 100%;
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
.grid-button-container > div {
  margin-bottom: 2px;
}
</style>
