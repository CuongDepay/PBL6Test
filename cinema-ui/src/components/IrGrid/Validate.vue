<template>
  <el-tooltip
    v-if="mData[rowIndex][prop] && !validateProp.validateCondition(mData[rowIndex][prop])"
    :content="validateProp.validateText"
    placement="top"
  >
    <div class="grid-validate-container" :class="validateProp.color ? validateProp.color : 'red'">{{ mData[rowIndex][prop] }}</div>
  </el-tooltip>
  <div v-else class="grid-validate-container">
    {{ mData[rowIndex][prop] }}
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
  data: {
    type: Object,
    default() {
      return {};
    }
  },
  validateProp: {
    type: Object,
    default() {
      return {};
    }
  }
});
const emit = defineEmits(['update:data']);
const mData = computed({
  get: () => props.data,
  set: (val) => {
    emit('update:data', val)
  }
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-validate-container {
  width: 100%;
  height: 100%;
  padding: 8px;
  &.yellow {
    color: $yellow-500;
  }
  &.blue {
    color: $blue-500;
  }
  &.red {
    color: $red-500;
  }
  &.violet {
    color: $violet-500;
  }
  &.green {
    color: $green-500;
  }
  &.gray {
    color: $gray-500;
  }
}
</style>
