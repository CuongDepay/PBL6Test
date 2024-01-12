<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <span v-if="item.elTagType == ''" :key="item.value" :index="index" :class="item.elTagClass">
          {{ item.label + " " }}
        </span>
        <el-tag v-else :disable-transitions="true" :key="item.value + ''" :index="index" :class="[item.elTagClass, item.elTagType]">
          {{ item.label + " " }}
        </el-tag>
      </template>
    </template>
    <template v-if="unmatch && showValue">
      {{ unmatchArray }}
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';


const props = defineProps({
  // data
  options: {
    // eslint-disable-next-line no-undef
    type: Array as PropType<DictDataOption[]>,
    default: null,
  },
  // current value
  value: [Number, String, Array] as PropType<number | string | Array<number | string>>,
  // When no matching data is found, display value
  showValue: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
});

const values = computed(() => {
  if (props.value !== null && typeof props.value !== "undefined") {
    return Array.isArray(props.value) ? props.value : [String(props.value)];
  } else {
    return [];
  }
});

const unmatch = computed(() => {
  if (props.value !== null && typeof props.value !== "undefined") {
    // The incoming value is not an array
    if (!Array.isArray(props.value)) {
      if (props.options.some((v) => v.value == props.value)) {
        return false;
      }
      return true;
    }
    return true;
  }
  // No value is not displayed
  return false;
});

const unmatchArray = computed(() => {
// Log unmatched items
  const itemUnmatchArray: Array<string | number> = [];
  if (props.value !== null && typeof props.value !== "undefined") {
    // The incoming value is not an array
    if (!Array.isArray(props.value)) {
      itemUnmatchArray.push(props.value);
    } else {
      // The incoming value is Array
      props.value.forEach((item) => {
        if (!props.options.some((v) => v.value == item)) {
          itemUnmatchArray.push(item);
        }
      });
    }
  }
  // No value is not displayed
  return handleArray(itemUnmatchArray);
});

const handleArray = (array: Array<string | number>) => {
  if (array.length === 0) return "";
  return array.reduce((pre, cur) => {
    return pre + " " + cur;
  });
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
