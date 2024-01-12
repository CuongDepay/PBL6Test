<template>
  <v-app>
    <el-config-provider :locale="appStore.locale" :size="size">
      <v-main>
        <router-view />
      </v-main>
    </el-config-provider>
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue';
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'
import useAppStore from '@/store/modules/app';

const appStore = useAppStore();
const size = computed(() => appStore.size as any);

onMounted(() => {
  nextTick(() => {
    // Initialize theme styles
    handleThemeStyle(useSettingsStore().theme)
  })
})
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
