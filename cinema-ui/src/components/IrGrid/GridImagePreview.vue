<template>
  <ImagePreview
    v-if="previewListResource && checkFileSuffix(data[rowIndex][fileSuffixCol])"
    :width="31"
    :height="31"
    :src="data[rowIndex][prop]"
    :preview-src-list="[data[rowIndex][prop]]"
  />
  <span v-text="data[rowIndex][prop]" v-if="!checkFileSuffix(data[rowIndex][fileSuffixCol]) || !previewListResource" />
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
  prop: {
    type: String,
    default: ''
  },
  previewListResource: {
    type: Boolean,
    default: true
  },
  fileSuffixCol: {
    type: String,
    default: ''
  }
})
function checkFileSuffix(fileSuffix: string[]) {
  let arr = ["png", "jpg", "jpeg"];
  return arr.some(type => {
      return fileSuffix.indexOf(type) > -1;
  });
}
</script>
