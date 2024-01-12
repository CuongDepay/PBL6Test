<template>
  <div class="grid-checkbox-container">
    <el-checkbox v-model="checkValue" @change="handleChangeData" />
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  rowIndex: {
    type: Number,
    default: null,
  },
  prop: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: null
  },
  checkAll: {
    type: Object,
    default: null
  }
});
const checkValue = ref(false);
const emit = defineEmits(['update:data', 'update:checkAll']);
const mData = computed({
  get: () => props.data,
  set: (val) => {
    emit('update:data', val)
  }
});
const mCheckAll = computed({
  get: () => props.checkAll,
  set: (val) => {
    emit('update:checkAll', val)
  }
});
const handleChangeData = () => {
  if (props.rowIndex !== null) {
    mData.value[props.rowIndex].checkbox = checkValue.value;
  }
}

watch(() => props.data[props.rowIndex].checkbox, (v) => {
  checkValue.value = v;
}, { immediate: true });
watch(() => props.data, (v) => {
  if (props.data[props.rowIndex].checkbox !== true) {
    checkValue.value = false;
    mData.value[props.rowIndex].checkbox = false;
  } else {
    let isAllCheck = true;
    for (let i = 0; i < props.data.length; i++) {
      if (!props.data[i].checkbox) {
        isAllCheck = false;
        break;
      }
    }
    mCheckAll.value.value = isAllCheck;
  }
}, { immediate: true });
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-checkbox-container {
  padding: 8px 8px;
}
</style>
