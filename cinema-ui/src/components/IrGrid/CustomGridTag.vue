<template>
  <span v-if="data[rowIndex][rowStyle] === ''">
    {{ data[rowIndex][rowValue] + " " }}
  </span>
  <el-tag v-else :class="data[rowIndex][rowStyle]">
    {{ data[rowIndex][rowValue] + " " }}
  </el-tag>
</template>
<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  rowIndex: {
    type: Number,
    default: null
  },
  rowStyle: {
    type: String,
    default: ''
  },
  rowValue: {
    type: String,
    default: ''
  }
})
</script>
