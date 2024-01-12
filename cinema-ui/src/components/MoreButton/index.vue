<template>
  <IrButton colorStyle="gray" type="primary" leftIcon="more" ref="buttonRef" />
  <el-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" placement="bottom-start" popper-class="popper-more-button" virtual-triggering>
    <slot name="content"></slot>
  </el-popover>
</template>
<script setup lang="ts">
const buttonRef = ref();
</script>
