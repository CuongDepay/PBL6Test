<template>
  <div class="grid-tag-container">
    <dict-tag :options="dictData.value" :value="props.data[props.rowIndex][props.prop]" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  dictData: {
    type: Object,
    default: null
  },
  data: {
    type: Object,
    default: null
  },
  rowIndex: {
    type: Number,
    default: null
  },
  prop: {
    type: String,
    default: null
  }
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-tag-container {
  padding: 6px 8px;
}
</style>
