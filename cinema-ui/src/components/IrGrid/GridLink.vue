<template>
  <div class="grid-link" @click="click(rowIndex)">{{ data[rowIndex][prop] }}</div>
</template>
<script setup lang="ts">
  const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  rowIndex: {
    type: Number,
    default: null
  },
  prop: {
    type: String,
    default: 'unknow'
  },
  click: {
    type: Function,
    default: null
  }
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.grid-link {
  padding: 8px;
  cursor: pointer;
  color: $blue-500;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:hover {
    color: $blue-600;
    text-decoration: underline;
  }
  &:active {
    color: $blue-700;
    text-decoration: underline;
  }
}
</style>
