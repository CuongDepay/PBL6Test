<template>
  <el-checkbox v-model="checkValue" @change="handleChangeData" />
</template>
<script setup lang="ts">

const props = defineProps({
  checkAll: {
    type: Object,
    default: null
  }
});
const checkValue = ref(false);
const emit = defineEmits(['update:checkAll']);
const mCheckAll = computed({
  get: () => props.checkAll,
  set: (val) => {
    emit('update:checkAll', val)
  }
});
const handleChangeData = () => {
  mCheckAll.value.value = checkValue.value;
}

watch(() => props.checkAll.value, (v) => {
  checkValue.value = v;
}, { immediate: true });
</script>
<script lang="ts">
// declare additional options
// export default {
//   inheritAttrs: false,
// };
</script>
