<template>
  <div @click="toggleClick" class="hamburger" :class="{'is-active':isActive}">
    <!-- <svg :class="{'is-active':isActive}" class="hamburger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <path
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      />
    </svg> -->
    <svg-icon icon-class="double-right-arrow" />
  </div>
</template>

<script setup lang="ts">
defineProps({
    isActive: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['toggleClick'])
const toggleClick = () => {
    emit('toggleClick');
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.hamburger {
  width: 24px;
  height: 24px;
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  background: $gray-0;
  /* Shadow/Sm */
  box-shadow: 2px 0px 10px -2px rgba(17, 25, 39, 0.04), 0px 2px 10px 2px rgba(17, 25, 39, 0.04);
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: $blue-50;
    svg {
      filter: brightness(0) saturate(100%) invert(42%) sepia(86%) saturate(1313%) hue-rotate(192deg) brightness(99%) contrast(97%);
    }
  }

  &:active {
    background: $blue-50;
    svg {
      filter: brightness(0) saturate(100%) invert(32%) sepia(100%) saturate(3225%) hue-rotate(207deg) brightness(98%) contrast(91%);
    }
  }
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
