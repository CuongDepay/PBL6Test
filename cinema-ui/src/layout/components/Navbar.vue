<template>
  <div class="navbar">
    <top-nav id="topmenu-container" class="topmenu-container" v-if="settingsStore.topNav" />
    <div class="left-menu flex align-center">
      <img :src="logo" class="navbar-logo" />
      <div class="navbar-contact">
        <svg-icon icon-class="phone" />
        <span>(84-28) 3872 4235</span>
      </div>
      <div class="navbar-contact">
        <svg-icon icon-class="mail" />
        <span>star-cinema@gmail.com</span>
      </div>
    </div>
    <div class="right-menu flex align-center">
      <!-- Response with mobile: v-if="appStore.device !== 'mobile'" -->
      <el-select
        v-model="companyName"
        clearable
        filterable
        reserve-keyword
        :placeholder="$t('navbar.selectTenant')"
        v-if="userId === 1 && tenantEnabled"
        @change="dynamicTenantEvent"
        @clear="dynamicClearEvent"
      >
        <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.companyName" :value="item.tenantId"> </el-option>
        <template #prefix><svg-icon icon-class="company" class="el-input__icon input-icon" /></template>
      </el-select>
      <div class="avatar-container" v-if="userStore.avatar">
        <el-dropdown @command="handleCommand" trigger="click">
          <div class="avatar-wrapper">
            <img :src="userStore.avatar" class="user-avatar" />
            <span>{{ userStore.nickname }}</span>
            <svg-icon icon-class="arrow-down" class="dropdown-icon" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/user/profile" v-if="!dynamic">
                <el-dropdown-item>{{ $t('navbar.personalCenter') }}</el-dropdown-item>
              </router-link>
              <!-- <el-dropdown-item command="setLayout">
                <span>{{ $t('navbar.layoutSetting') }}</span>
              </el-dropdown-item> -->
              <el-dropdown-item command="logout">
                <span>{{ $t('navbar.logout') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="lang-container">
        <lang-select />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import useAppStore from '@/store/modules/app'
import logo from '@/assets/logo/logo.png'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import { getTenantList } from "@/api/login";
import { dynamicClear, dynamicTenant } from "@/api/system/tenant";
import { ComponentInternalInstance } from "vue";
import { TenantVO } from "@/api/types";
import i18n from '@/lang';

// const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const userId = ref(userStore.userId);
const companyName = ref(undefined);
const tenantList = ref<TenantVO[]>([]);
// Whether to switch tenants
const dynamic = ref(false);
// tenant switch
const tenantEnabled = ref(true);

// dynamic switching
const dynamicTenantEvent = async (tenantId: string) => {
    if (companyName.value != null && companyName.value !== '') {
        await dynamicTenant(tenantId);
        dynamic.value = true;
        proxy?.$tab.closeAllPage();
        proxy?.$router.push('/');
    }
}

const dynamicClearEvent = async () => {
    await dynamicClear();
    dynamic.value = false;
    proxy?.$tab.closeAllPage();
    proxy?.$router.push('/')
}

/** tenant list */
const initTenantList = async () => {
    const { data } = await getTenantList();
    tenantEnabled.value = data.tenantEnabled === undefined ? true : data.tenantEnabled;
    if (tenantEnabled.value) {
        tenantList.value = data.voList;
    }
}

defineExpose({
    initTenantList,
})

// const toggleSideBar = () => {
//     appStore.toggleSideBar(false)
// }

const logout = async () => {
    await proxy?.$modal.confirmWarning(i18n.global.t('login.logoutCf'));
    await userStore.logout()
    if ('/' === import.meta.env.VITE_APP_CONTEXT_PATH) {
      location.href = import.meta.env.VITE_APP_CONTEXT_PATH + 'index';
    } else {
      location.href = import.meta.env.VITE_APP_CONTEXT_PATH + '/index';
    }
}

const emits = defineEmits(['setLayout'])
const setLayout = () => {
    emits('setLayout');
}
// Define the Command method object and call the method directly through the key
const commandMap: {[key: string]: any} = {
    setLayout,
    logout
};
const handleCommand = (command: string) => {
    // Determine whether the method exists
    if (commandMap[command]) {
        commandMap[command]();
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
:deep(.el-select .el-input__wrapper) {
  height:30px;
}

.flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.navbar {
  height: $base-header-height;
  // overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid $gray-200;
  padding: 10px 60px;
  overflow-x: auto;
  overflow-y: hidden;
  // background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  // .hamburger-container {
  //   line-height: 46px;
  //   height: 100%;
  //   float: left;
  //   cursor: pointer;
  //   transition: background 0.3s;
  //   -webkit-tap-highlight-color: transparent;

  //   &:hover {
  //     background: rgba(0, 0, 0, 0.025);
  //   }
  // }

  // .breadcrumb-container {
  //   float: left;
  // }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .left-menu {
    height: 100%;
    line-height: 100%;
    display: flex;
    gap: 24px;

    .navbar-logo {
      height: 100%;
      object-fit: contain;
      margin-right: 40px;
    }

    .navbar-contact {
      min-width: 100px;
      svg {
        width: 16px;
        height: 16px;
        margin-right: 8px;
        filter: brightness(0) saturate(100%) invert(49%) sepia(30%) saturate(5341%) hue-rotate(193deg) brightness(101%) contrast(96%);
      }

      span {
        color: $gray-700;
        font-size: 14px;
      }
    }
  }

  .right-menu {
    height: 100%;
    // line-height: 50px;
    display: flex;
    gap: 12px;

    &:focus {
      outline: none;
    }

    // .right-menu-item {
    //   display: inline-block;
    //   padding: 0 8px;
    //   height: 100%;
    //   font-size: 18px;
    //   color: #5a5e66;
    //   vertical-align: text-bottom;

    //   &.hover-effect {
    //     cursor: pointer;
    //     transition: background 0.3s;

    //     &:hover {
    //       background: rgba(0, 0, 0, 0.025);
    //     }
    //   }
    // }

    .avatar-container {
      // margin-right: 40px;
      cursor: pointer;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        display: flex;
        padding: 4px 6px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 6px;
        min-width: 150px;

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

        .user-avatar {
          object-fit: contain;
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
