<template>
  <div :class="'grid-icon-status-container' + (props.data[props.rowIndex].selected ? props.data[props.rowIndex].selected : '') + rowColorStyle">
    <template v-for="(item) in iconStatusProps" :key="item.prop">
      <template v-if="item.isCustom === true">
        <el-tooltip v-if="item.visible(data[rowIndex])" :content="item.tooltip" placement="top">
          <div :class="'icon-status-container ' + item.color" v-on:click="handleClick(item)">
            <svg-icon :icon-class="item.icon" />
          </div>
        </el-tooltip>
      </template>
      <template v-else v-for="(dict) in item.dictData" :key="dict.dictCode">
        <el-tooltip v-if="check(item, dict)" :content="dict.label">
          <div :class="'icon-status-container ' + dict.elTagType" v-on:click="handleClick(item)" placement="top">
            <svg-icon :icon-class="item.icon" />
          </div>
        </el-tooltip>
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  rowIndex: {
    type: Number,
    default: null
  },
  prop: {
    type: String,
    default: ''
  },
  iconStatusProps: {
    type: Array<any>,
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
const check = (item: any, dict: any) => {
  return dict.value === props.data[props.rowIndex][item.prop];
}
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
const handleClick = (statusProp: any) => {
  if (statusProp.onClick) {
    statusProp.onClick(props.data[props.rowIndex]);
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.grid-icon-status-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
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
  .icon-status-container {
    display: flex;
    padding: 4px;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 100px;
    cursor: pointer;
    svg {
      height: 16px;
      width: 16px;
    }
  }
  .icon-status-container.gray {
    background-color: $gray-100;
    svg {
      filter: brightness(0) saturate(0) invert(0) invert(20%) sepia(4%) saturate(3550%) hue-rotate(176deg) brightness(96%) contrast(81%);
    }
    &:hover {
      background-color: $gray-200;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(11%) sepia(38%) saturate(689%) hue-rotate(172deg) brightness(91%) contrast(86%);
      }
    }
    &:active {
      background-color: $gray-300;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(6%) sepia(43%) saturate(822%) hue-rotate(180deg) brightness(99%) contrast(94%);
      }
    }
  }
  .icon-status-container.blue {
    background-color: $blue-50;
    svg {
      filter: brightness(0) saturate(0) invert(0) invert(47%) sepia(16%) saturate(4273%) hue-rotate(185deg) brightness(101%) contrast(96%);
    }
    &:hover {
      background-color: $blue-100;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(33%) sepia(59%) saturate(3220%) hue-rotate(205deg) brightness(95%) contrast(98%);
      }
    }
    &:active {
      background-color: $blue-200;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(30%) sepia(91%) saturate(2045%) hue-rotate(210deg) brightness(82%) contrast(102%);
      }
    }
  }
  .icon-status-container.green {
    background-color: $green-50;
    svg {
      filter: brightness(0) saturate(0) invert(0) invert(51%) sepia(95%) saturate(1401%) hue-rotate(109deg) brightness(91%) contrast(83%);
    }
    &:hover {
      background-color: $green-100;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(43%) sepia(52%) saturate(6805%) hue-rotate(137deg) brightness(90%) contrast(93%);
      }
    }
    &:active {
      background-color: $green-200;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(15%) sepia(100%) saturate(5978%) hue-rotate(161deg) brightness(91%) contrast(94%);
      }
    }
  }
  .icon-status-container.red {
    background-color: $red-50;
    svg {
      filter: brightness(0) saturate(0) invert(0) invert(30%) sepia(97%) saturate(1418%) hue-rotate(339deg) brightness(98%) contrast(93%);
    }
    &:hover {
      background-color: $red-100;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(19%) sepia(86%) saturate(3834%) hue-rotate(355deg) brightness(91%) contrast(85%);
      }
    }
    &:active {
      background-color: $red-200;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(15%) sepia(88%) saturate(3647%) hue-rotate(355deg) brightness(87%) contrast(89%);
      }
    }
  }
  .icon-status-container.yellow {
    background-color: $yellow-50;
    svg {
      filter: brightness(0) saturate(0) invert(0) invert(56%) sepia(77%) saturate(1097%) hue-rotate(355deg) brightness(97%) contrast(99%);
    }
    &:hover {
      background-color: $yellow-100;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(45%) sepia(99%) saturate(2049%) hue-rotate(4deg) brightness(90%) contrast(98%);
      }
    }
    &:active {
      background-color: $yellow-200;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(32%) sepia(36%) saturate(2505%) hue-rotate(355deg) brightness(93%) contrast(100%);
      }
    }
  }
  .icon-status-container.violet {
    background-color: $violet-50;
    svg {
      filter: brightness(0) saturate(0) invert(0) invert(45%) sepia(68%) saturate(503%) hue-rotate(218deg) brightness(104%) contrast(86%);
    }
    &:hover {
      background-color: $violet-100;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(34%) sepia(96%) saturate(1025%) hue-rotate(233deg) brightness(90%) contrast(88%);
      }
    }
    &:active {
      background-color: $violet-200;
      svg {
        filter: brightness(0) saturate(0) invert(0) invert(27%) sepia(67%) saturate(7134%) hue-rotate(255deg) brightness(86%) contrast(76%);
      }
    }
  }
}
</style>
