<template>
  <div class="grid-switch-container">
    <el-switch v-model="mData[rowIndex][prop]" active-value="0" inactive-value="1" @change="change(rowIndex)"></el-switch>
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
  change: {
    type: Function,
    default: null
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
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.grid-switch-container {
  padding: 6px 8px;
}
</style>
