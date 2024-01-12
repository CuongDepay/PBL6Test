<template>
  <div>
    <el-tooltip :content="toolTip" placement="top" v-if="toolTip !== null">
      <el-button
        :loading="loadingFlag"
        :class="colorStyle + ' ' + type + (title ? '' : ' only-icon') + (customClass ? ' ' + customClass : '')"
        :size="buttonSize"
        :title="title"
        :style="{height: (buttonSize ? 40 : height) + 'px', width: (widthPercent ? widthPercent : (width ? width + 'px' : ''))}"
        :disabled="disabledFlag"
        @click.prevent="handleClick"
      >
        <svg-icon :icon-class="leftIcon" :class="title ? 'left-icon' : ''" v-if="!loadingFlag && leftIcon" />
        <span v-if="!loadingFlag">{{ title }}</span>
        <svg-icon :icon-class="rightIcon" :class="title ? 'right-icon' : ''" v-if="!loadingFlag && rightIcon" />
        <span v-else>{{ loadingTitle }}</span>
      </el-button>
    </el-tooltip>
    <el-button
      v-else
      :loading="loadingFlag"
      :class="colorStyle + ' ' + type + (title ? '' : ' only-icon') + (customClass ? ' ' + customClass : '')"
      :size="buttonSize"
      :title="title"
      :style="{height: (buttonSize ? 40 : height) + 'px', width: (widthPercent ? widthPercent : (width ? width + 'px' : ''))}"
      :disabled="disabledFlag"
      @click.prevent="handleClick"
    >
      <svg-icon
        :icon-class="leftIcon"
        :class="title ? 'left-icon' + (iconColorUnchange ? ' color-unchange' : '') : ''"
        v-if="!loadingFlag && leftIcon"
      />
      <span v-if="!loadingFlag">{{ title }}</span>
      <svg-icon
        :icon-class="rightIcon"
        :class="title ? 'right-icon' + (iconColorUnchange ? ' color-unchange' : '') : ''"
        v-if="!loadingFlag && rightIcon"
      />
      <span v-else>{{ loadingTitle }}</span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
type IrButtonColor = 'red' | 'blue' | 'yellow' | 'gray' | 'violet' | 'green' | 'transparent';
type IrButtonType = 'primary' | 'secondary' | 'grid' | 'dialog';
type IrButtonSize = 'default' | 'large' | 'small';
const props = defineProps({
  type: {
    type: String as PropType<IrButtonType>,
    default: 'primary'
  },
  colorStyle: {
    type: String as PropType<IrButtonColor | string>,
    default: 'blue'
  },
  height: {
    type: Number,
    default: 32,
  },
  width: {
    type: Number,
    default: null,
  },
  widthPercent: {
    type: String,
    default: ''
  },
  buttonSize: {
    type: String as PropType<IrButtonSize>,
    default: null
  },
  leftIcon: {
    type: String,
    default: null,
  },
  rightIcon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  loadingFlag: {
    type: Boolean,
    default: false
  },
  loadingTitle: {
    type: String,
    default: null
  },
  disabledFlag: {
    type: Boolean,
    default: false
  },
  toolTip: {
    type: String,
    default: null
  },
  customClass: {
    type: String,
    default: ''
  },
  iconColorUnchange: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['onClick']);
function handleClick() {
  emit('onClick');
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";

.el-button {
  height: 32px;
  padding: 8px 12px;
  border-radius: 6px;
  &.only-icon {
    padding: 8px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    font-family: Roboto;
    margin-top: 1px;
  }
  svg {
    height: 16px;
    width: 16px;
  }
  .left-icon {
    margin-right: 8px;
    &.color-unchange {
      filter: unset;
    }
  }
  .right-icon {
    margin-left: 8px;
    &.color-unchange {
      filter: unset;
    }
  }
}

.el-button.el-button--large {
  height: 40px;
  padding: 12px;
  border-radius: 6px;
  span {
    font-size: 16px;
    font-weight: 600;
    margin-top: 0;
  }
  .left-icon {
    margin-right: 12px;
    &.color-unchange {
      filter: unset;
    }
  }
  .right-icon {
    margin-left: 12px;
    &.color-unchange {
      filter: unset;
    }
  }
}
.el-button.el-button--small {
  height: 24px !important;
  padding: 4px 8px;
  border-radius: 6px;
  span {
    font-weight: 400;
    margin-top: 0;
  }
  &.only-icon {
    padding: 5px;
  }
  svg {
    height: 14px;
    width: 14px;
  }
  .left-icon {
    margin-right: 6px;
    &.color-unchange {
      filter: unset;
    }
  }
  .right-icon {
    margin-left: 6px;
    &.color-unchange {
      filter: unset;
    }
  }
}
.el-button.el-button--large.secondary {
  height: 42px !important;
}
.primary {
  border: none;
  color: $gray-0;
  svg {
    filter: brightness(0) saturate(100%) invert(100%) sepia(96%) saturate(15%) hue-rotate(237deg) brightness(104%) contrast(100%);
  }
}
.primary.blue {
  background-color: $blue-500;

  &:hover {
    background-color: $blue-600;
  }

  &:active {
    background-color: $blue-700;
  }

  &:disabled {
    background-color: $blue-200;
    &::before {
      background-color: $blue-200;
    }
  }
}
.primary.red {
  background-color: $red-500;

  &:hover {
    background-color: $red-600;
  }

  &:active {
    background-color: $red-700;
  }

  &:disabled {
    background-color: $red-200;
    &::before {
      background-color: $red-200;
    }
  }
}
.primary.green {
  background-color: $green-500;

  &:hover {
    background-color: $green-600;
  }

  &:active {
    background-color: $green-700;
  }

  &:disabled {
    background-color: $green-200;
    &::before {
      background-color: $green-200;
    }
  }
}
.primary.yellow {
  background-color: $yellow-500;

  &:hover {
    background-color: $yellow-600;
  }

  &:active {
    background-color: $yellow-700;
  }

  &:disabled {
    background-color: $yellow-200;
    &::before {
      background-color: $yellow-200;
    }
  }
}
.primary.violet {
  background-color: $violet-500;

  &:hover {
    background-color: $violet-600;
  }

  &:active {
    background-color: $violet-700;
  }

  &:disabled {
    background-color: $violet-200;
    &::before {
      background-color: $violet-200;
    }
  }
}

.primary.gray {
  background-color: $gray-0;
  color: $gray-800;
  svg {
    filter: brightness(0) saturate(100%) invert(11%) sepia(50%) saturate(428%) hue-rotate(173deg) brightness(98%) contrast(91%);
  }

  &:hover {
    background-color: $gray-100;
  }

  &:active {
    background-color: $gray-200;
  }

  &:disabled {
    background-color: $gray-0;
    color: $gray-400;
    &::before {
      background-color: $gray-0;
    }
  }
}

.secondary {
  border: 1px solid;
  color: $gray-0;
  padding: 7px 11px !important;
  &.only-icon {
    padding: 7px !important;
  }
}
.secondary.blue {
  border-color: $blue-200;
  background-color: $gray-0;
  color: $blue-500;
  svg {
    filter: brightness(0) saturate(100%) invert(50%) sepia(23%) saturate(2716%) hue-rotate(186deg) brightness(95%) contrast(106%);
  }

  &:hover {
    background-color: $blue-50;
  }

  &:active {
    background-color: $blue-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $blue-200;
    border: 1px solid $blue-200;
    svg {
      filter: brightness(0) saturate(100%) invert(80%) sepia(34%) saturate(744%) hue-rotate(181deg) brightness(102%) contrast(107%);
    }
    &::before {
      background-color: $gray-0;
      color: $blue-200;
      border: 1px solid $blue-200;
      svg {
        filter: brightness(0) saturate(100%) invert(80%) sepia(34%) saturate(744%) hue-rotate(181deg) brightness(102%) contrast(107%);
      }
    }
  }
}
.secondary.red {
  border-color: $red-200;
  background-color: $gray-0;
  color: $red-500;
  svg {
    filter: brightness(0) saturate(100%) invert(52%) sepia(87%) saturate(6370%) hue-rotate(345deg) brightness(107%) contrast(88%);
  }

  &:hover {
    background-color: $red-50;
  }

  &:active {
    background-color: $red-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $red-200;
    border: 1px solid $red-200;
    svg {
      filter: brightness(0) saturate(100%) invert(80%) sepia(8%) saturate(925%) hue-rotate(314deg) brightness(106%) contrast(99%);
    }
    &::before {
      background-color: $gray-0;
      color: $red-200;
      border: 1px solid $red-200;
      svg {
        filter: brightness(0) saturate(100%) invert(80%) sepia(8%) saturate(925%) hue-rotate(314deg) brightness(106%) contrast(99%);
      }
    }
  }
}
.secondary.yellow {
  border-color: $yellow-200;
  background-color: $gray-0;
  color: $yellow-500;
  svg {
    filter: brightness(0) saturate(100%) invert(54%) sepia(76%) saturate(863%) hue-rotate(358deg) brightness(99%) contrast(96%);
  }

  &:hover {
    background-color: $yellow-50;
  }

  &:active {
    background-color: $yellow-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $yellow-200;
    border: 1px solid $yellow-200;
    svg {
      filter: brightness(0) saturate(100%) invert(90%) sepia(20%) saturate(1024%) hue-rotate(333deg) brightness(104%) contrast(99%);
    }
    &::before {
      background-color: $gray-0;
      color: $yellow-200;
      border: 1px solid $yellow-200;
      svg {
        filter: brightness(0) saturate(100%) invert(90%) sepia(20%) saturate(1024%) hue-rotate(333deg) brightness(104%) contrast(99%);
      }
    }
  }
}
.secondary.green {
  border-color: $green-200;
  background-color: $gray-0;
  color: $green-500;
  svg {
    filter: brightness(0) saturate(100%) invert(64%) sepia(73%) saturate(3783%) hue-rotate(110deg) brightness(92%) contrast(83%);
  }

  &:hover {
    background-color: $green-50;
  }

  &:active {
    background-color: $green-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $green-200;
    border: 1px solid $green-200;
    svg {
      filter: brightness(0) saturate(100%) invert(94%) sepia(5%) saturate(1895%) hue-rotate(78deg) brightness(90%) contrast(110%);
    }
    &::before {
      background-color: $gray-0;
      color: $green-200;
      border: 1px solid $green-200;
      svg {
        filter: brightness(0) saturate(100%) invert(94%) sepia(5%) saturate(1895%) hue-rotate(78deg) brightness(90%) contrast(110%);
      }
    }
  }
}
.secondary.violet {
  border-color: $violet-200;
  background-color: $gray-0;
  color: $violet-500;
  svg {
    filter: brightness(0) saturate(100%) invert(54%) sepia(10%) saturate(3251%) hue-rotate(217deg) brightness(99%) contrast(88%);
  }

  &:hover {
    background-color: $violet-50;
  }

  &:active {
    background-color: $violet-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $violet-200;
    border: 1px solid $violet-200;
    svg {
      filter: brightness(0) saturate(100%) invert(83%) sepia(33%) saturate(911%) hue-rotate(194deg) brightness(109%) contrast(99%);
    }
    &::before {
      background-color: $gray-0;
      color: $violet-200;
      border: 1px solid $violet-200;
      svg {
        filter: brightness(0) saturate(100%) invert(83%) sepia(33%) saturate(911%) hue-rotate(194deg) brightness(109%) contrast(99%);
      }
    }
  }
}
.secondary.gray {
  border-color: $gray-200;
  background-color: $gray-0;
  color: $gray-700;
  svg {
    filter: brightness(0) saturate(100%) invert(24%) sepia(21%) saturate(495%) hue-rotate(175deg) brightness(93%) contrast(94%);
  }

  &:hover {
    border-color: $gray-300;
    background-color: $gray-100;
  }

  &:active {
    border-color: $gray-400;
    background-color: $gray-200;
  }

  &:disabled {
    background-color: $gray-0;
    color: $gray-400;
    border: 1px solid $gray-200;
    svg {
      filter: brightness(0) saturate(100%) invert(69%) sepia(17%) saturate(169%) hue-rotate(176deg) brightness(93%) contrast(83%);
    }
    &::before {
      background-color: $gray-0;
      color: $gray-400;
      border: 1px solid $gray-200;
      svg {
        filter: brightness(0) saturate(100%) invert(69%) sepia(17%) saturate(169%) hue-rotate(176deg) brightness(93%) contrast(83%);
      }
    }
  }
}
.secondary.transparent {
  border-color: $gray-300;
  background-color: unset;
  color: $gray-0;
  svg {
    filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(90deg) brightness(108%) contrast(101%);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.30);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.50);
  }

  &:disabled {
    background-color: $gray-0;
    color: $gray-400;
    border: 1px solid $gray-200;
    svg {
      filter: brightness(0) saturate(100%) invert(69%) sepia(17%) saturate(169%) hue-rotate(176deg) brightness(93%) contrast(83%);
    }
    &::before {
      background-color: $gray-0;
      color: $gray-400;
      border: 1px solid $gray-200;
      svg {
        filter: brightness(0) saturate(100%) invert(69%) sepia(17%) saturate(169%) hue-rotate(176deg) brightness(93%) contrast(83%);
      }
    }
  }
}
.common-button .first {
  padding: 7px 7px 7px 7px;
  border-radius: 6px 0px 0px 6px;
  border: 1px solid $gray-200;
  border-right: none;
}
.common-button .el-button.last {
  padding: 7px 11px;
  border-radius: 0px 6px 6px 0px;
  border: 1px solid $gray-200;
}
.grid {
  border: 1px solid;
  color: $gray-0;
  padding: 3px 7px !important;
  border-radius: 6px;
  &.only-icon {
    padding: 4px !important;
  }
}
.grid.blue {
  border-color: $blue-200;
  background-color: $gray-0;
  color: $blue-500;
  svg {
    filter: brightness(0) saturate(100%) invert(50%) sepia(23%) saturate(2716%) hue-rotate(186deg) brightness(95%) contrast(106%);
  }

  &:hover {
    background-color: $blue-50;
  }

  &:active {
    background-color: $blue-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $blue-200;
    border: 1px solid $blue-200;
    svg {
      filter: brightness(0) saturate(100%) invert(80%) sepia(34%) saturate(744%) hue-rotate(181deg) brightness(102%) contrast(107%);
    }
    &::before {
      background-color: $gray-0;
      color: $blue-200;
      border: 1px solid $blue-200;
      svg {
        filter: brightness(0) saturate(100%) invert(80%) sepia(34%) saturate(744%) hue-rotate(181deg) brightness(102%) contrast(107%);
      }
    }
  }
}
.grid.red {
  border-color: $red-200;
  background-color: $gray-0;
  color: $red-500;
  svg {
    filter: brightness(0) saturate(100%) invert(52%) sepia(87%) saturate(6370%) hue-rotate(345deg) brightness(107%) contrast(88%);
  }

  &:hover {
    background-color: $red-50;
  }

  &:active {
    background-color: $red-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $red-200;
    border: 1px solid $red-200;
    svg {
      filter: brightness(0) saturate(100%) invert(80%) sepia(8%) saturate(925%) hue-rotate(314deg) brightness(106%) contrast(99%);
    }
    &::before {
      background-color: $gray-0;
      color: $red-200;
      border: 1px solid $red-200;
      svg {
        filter: brightness(0) saturate(100%) invert(80%) sepia(8%) saturate(925%) hue-rotate(314deg) brightness(106%) contrast(99%);
      }
    }
  }
}
.grid.yellow {
  border-color: $yellow-200;
  background-color: $gray-0;
  color: $yellow-500;
  svg {
    filter: brightness(0) saturate(100%) invert(54%) sepia(76%) saturate(863%) hue-rotate(358deg) brightness(99%) contrast(96%);
  }

  &:hover {
    background-color: $yellow-50;
  }

  &:active {
    background-color: $yellow-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $yellow-200;
    border: 1px solid $yellow-200;
    svg {
      filter: brightness(0) saturate(100%) invert(90%) sepia(20%) saturate(1024%) hue-rotate(333deg) brightness(104%) contrast(99%);
    }
    &::before {
      background-color: $gray-0;
      color: $yellow-200;
      border: 1px solid $yellow-200;
      svg {
        filter: brightness(0) saturate(100%) invert(90%) sepia(20%) saturate(1024%) hue-rotate(333deg) brightness(104%) contrast(99%);
      }
    }
  }
}
.grid.green {
  border-color: $green-200;
  background-color: $gray-0;
  color: $green-500;
  svg {
    filter: brightness(0) saturate(100%) invert(64%) sepia(73%) saturate(3783%) hue-rotate(110deg) brightness(92%) contrast(83%);
  }

  &:hover {
    background-color: $green-50;
  }

  &:active {
    background-color: $green-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $green-200;
    border: 1px solid $green-200;
    svg {
      filter: brightness(0) saturate(100%) invert(94%) sepia(5%) saturate(1895%) hue-rotate(78deg) brightness(90%) contrast(110%);
    }
    &::before {
      background-color: $gray-0;
      color: $green-200;
      border: 1px solid $green-200;
      svg {
        filter: brightness(0) saturate(100%) invert(94%) sepia(5%) saturate(1895%) hue-rotate(78deg) brightness(90%) contrast(110%);
      }
    }
  }
}
.grid.violet {
  border-color: $violet-200;
  background-color: $gray-0;
  color: $violet-500;
  svg {
    filter: brightness(0) saturate(100%) invert(54%) sepia(10%) saturate(3251%) hue-rotate(217deg) brightness(99%) contrast(88%);
  }

  &:hover {
    background-color: $violet-50;
  }

  &:active {
    background-color: $violet-100;
  }

  &:disabled {
    background-color: $gray-0;
    color: $violet-200;
    border: 1px solid $violet-200;
    svg {
      filter: brightness(0) saturate(100%) invert(83%) sepia(33%) saturate(911%) hue-rotate(194deg) brightness(109%) contrast(99%);
    }
    &::before {
      background-color: $gray-0;
      color: $violet-200;
      border: 1px solid $violet-200;
      svg {
        filter: brightness(0) saturate(100%) invert(83%) sepia(33%) saturate(911%) hue-rotate(194deg) brightness(109%) contrast(99%);
      }
    }
  }
}
.grid.gray {
  border-color: $gray-200;
  background-color: $gray-0;
  color: $gray-700;
  svg {
    filter: brightness(0) saturate(100%) invert(24%) sepia(21%) saturate(495%) hue-rotate(175deg) brightness(93%) contrast(94%);
  }

  &:hover {
    border-color: $gray-300;
    background-color: $gray-100;
  }

  &:active {
    border-color: $gray-400;
    background-color: $gray-200;
  }

  &:disabled {
    background-color: $gray-0;
    color: $gray-400;
    border: 1px solid $gray-200;
    svg {
      filter: brightness(0) saturate(100%) invert(69%) sepia(17%) saturate(169%) hue-rotate(176deg) brightness(93%) contrast(83%);
    }
    &::before {
      background-color: $gray-0;
      color: $gray-400;
      border: 1px solid $gray-200;
      svg {
        filter: brightness(0) saturate(100%) invert(69%) sepia(17%) saturate(169%) hue-rotate(176deg) brightness(93%) contrast(83%);
      }
    }
  }
}
.el-button.dialog {
  height: 36px !important;
  padding: 6px;
  border: none;
  color: $gray-0;
  svg {
    filter: brightness(0) saturate(100%) invert(100%) sepia(96%) saturate(15%) hue-rotate(237deg) brightness(104%) contrast(100%);
  }
  svg {
    height: 24px;
    width: 24px;
  }
}
.dialog.gray {
  background-color: $gray-0;
  color: $gray-800;
  svg {
    filter: brightness(0) saturate(100%) invert(11%) sepia(50%) saturate(428%) hue-rotate(173deg) brightness(98%) contrast(91%);
  }

  &:hover {
    background-color: $gray-100;
  }

  &:active {
    background-color: $gray-200;
  }

  &:disabled {
    background-color: $gray-0;
    color: $gray-400;
    &::before {
      background-color: $gray-0;
    }
  }
}
</style>
