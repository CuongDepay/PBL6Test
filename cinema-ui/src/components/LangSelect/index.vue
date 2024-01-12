<template>
  <el-dropdown trigger="click" @command="handleLanguageChange">
    <div class="lang-select--style">
      <svg-icon :icon-class="$t('navbar.langIcon')" class="lang-icon" />
      <span>{{ $t('navbar.langKey') }}</span>
      <svg-icon icon-class="arrow-down" class="dropdown-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="appStore.language === 'vi_VN'" command="vi_VN">
          <div class="lang-drop-item">
            <svg-icon icon-class="vietnamese" />
            <span>{{ $t('navbar.vietnamese') }}</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item :disabled="appStore.language === 'en_US'" command="en_US">
          <div class="lang-drop-item">
            <svg-icon icon-class="english" />
            <span>{{ $t('navbar.english') }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();
const { locale } = useI18n();


const message: any = {
  vi_VN: 'Đổi ngôn ngữ thành công!',
  en_US: 'Switch Language Successful!',
}
const handleLanguageChange = (lang: string) => {
  locale.value = lang;
  appStore.changeLanguage(lang);
  ElMessage.success(message[lang] || 'Switch language successfully!');
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.lang-select--style {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: $gray-100;
  }

  &:active {
    background: $gray-200;
  }

  span {
    color: $gray-700;
    font-size: 14px;
  }

  .lang-icon {
    width: 20px;
    height: 20px;
  }

  .dropdown-icon {
    width: 16px;
    height: 16px;
  }
}
.lang-drop-item {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
  }
  span {
    color: $gray-700;
    font-size: 14px;
  }
}
</style>
