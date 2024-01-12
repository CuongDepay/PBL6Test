<template>
  <div class="navbar">
    <!-- <top-nav id="topmenu-container" class="topmenu-container" v-if="settingsStore.topNav" /> -->
    <div class="left-menu flex align-center">
      <router-link to="/homepage">
        <img :src="logo" class="navbar-logo" width="112" height="36" />
      </router-link>
      <el-menu :default-active="activeIndex" class="nav-header" mode="horizontal" @select="handleNavigate">
        <router-link class="btn-buytickets mx-5 my-3" @click="removeAllFromLocalStorage()" style="marginLeft: 30px" to="/booking/movieSelection">
          <img
            alt="Ticket"
            width="112"
            height="36"
            decoding="async"
            data-nimg="1"
            src="https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-ticket.42d72c96.webp&amp;w=256&amp;q=100"
          />
        </router-link>
        <router-link to="/homepage">
          <el-menu-item index="showtime">{{ $t('homepage.topNav.homepage') }}</el-menu-item>
        </router-link>
        <router-link to="/homepage/movie-category">
          <el-menu-item index="film">{{ $t('homepage.topNav.film') }}</el-menu-item>
        </router-link>
        <el-menu-item index="promotion">{{ $t('homepage.topNav.promotions') }}</el-menu-item>
        <el-menu-item index="contact">{{ $t('homepage.topNav.contact') }}</el-menu-item>
      </el-menu>
    </div>
    <div class="right-menu flex align-center">
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

      <div class="avatar-container" v-if="userStore.token">
        <el-dropdown @command="handleCommand" trigger="click">
          <div class="avatar-wrapper">
            <img :src="userStore.avatar" class="user-avatar" />
            <span>{{ userStore.nickname }}</span>
            <svg-icon icon-class="arrow-down" class="dropdown-icon" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/profile" v-if="!dynamic">
                <el-dropdown-item>{{ $t('navbar.personalCenter') }}</el-dropdown-item>
              </router-link>
              <el-dropdown-item command="logout">
                <span>{{ $t('navbar.logout') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="header-top-account">
        <div class="account-header-wrapper mn-login" v-if="!userStore.token">
          <a @click.stop="goToLogin()" class="topskip-link skip-account">
            <span class="">Đăng nhập/</span>
          </a>
          <a @click.stop="goToRegister()" class="topskip-link skip-account">
            <span class="">Đăng ký</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import useAppStore from '@/store/modules/app'
import logo from '@/assets/logo/logo.png'
import useCustomerUserStore from '@/store/modules/customer'
import useSettingsStore from '@/store/modules/settings'
import { getTenantList } from "@/api/login";
import { dynamicClear, dynamicTenant } from "@/api/system/tenant";
import { ComponentInternalInstance } from "vue";
import { TenantVO } from "@/api/types";
import i18n from '@/lang';
import { removeAllFromLocalStorage } from '@/utils/localStorage';
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

const router = useRouter();

const activeIndex = ref('login');
const activeLogin = ref('');

// const appStore = useAppStore()
const userStore = useCustomerUserStore();
const settingsStore = useSettingsStore();

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const userId = ref(userStore.userId);
const companyName = ref(undefined);
const tenantList = ref<TenantVO[]>([]);
// Whether to switch tenants
const dynamic = ref(false);
// tenant switch
const tenantEnabled = ref(true);

const goToLogin = () => {
  saveToLocalStorage('beforePathLogin', router.currentRoute.value.href);
  router.push({path: '/homepage/customer-login', query: {
  }});
}

const goToRegister = () => {
  router.push({path: '/homepage/customer-register', query: {
  }});
}

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

const handleNavigate = (key: string) => {
  document.getElementById(key)?.scrollIntoView({behavior: 'smooth' });
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
  overflow: none;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 60px;
  overflow-x: none;
  overflow-y: hidden;
  background: #fff;
}

.nav-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #3b76ff;
  width: 100%;

  .el-menu-item {
    display: flex;
    height: 60px;
    padding: 0 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: $gray-700 !important;
    font-size: 16px;
    border-bottom: none !important;
    height: 59px;

    &:hover {
      background: $gray-200;
      color: #000 !important;
      border-top: 4px solid $blue-500;
    }

    &.is-active {
      border-top: 4px solid $blue-500;
      color: #000 !important;
      background: #fafafa;
      font-size: 16px;
    }
  }
}

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
    width: 70%;

    .navbar-logo {
      height: 100%;
      object-fit: contain;
      margin-right: 40px;
    }
      span {
        color: $gray-700;
        font-size: 14px;
      }
    }

  .right-menu {
    text-transform: uppercase;
    height: 100%;
    // line-height: 50px;
    display: flex;
    gap: 12px;

    a {
      color: #666;
      font-size: 14px;
      line-height: 18px;
    }

    &:focus {
      outline: none;
    }

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

.mn-newsoffer {
  position: relative;
  margin-left: 35px;
  margin-top: 16px;
}

.mn-newsoffer a{
  text-decoration: none;
}
.mn-newsoffer::before {
    width: 25px;
    content: "";
    background-image: url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_promotion25.png');
    background-repeat: no-repeat;
    position: absolute;
    left: -27px;
    height: 25px;
}
.mn-myticket {
  position: relative;
  margin-top: 16px;
  margin-left: 35px;
}
.mn-myticket a{
  text-decoration: none;
}
.mn-myticket::before {
    width: 25px;
    content: "";
    background-image: url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_ticket25.png');
    background-repeat: no-repeat;
    position: absolute;
    left: -27px;
    height: 25px;
}

.mn-login {
  position: relative;
  margin-left: 35px;
}
.mn-login a{
  text-decoration: none;
}

.mn-login::before {
    width: 25px;
    content: "";
    background-image: url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_login25.png');
    background-repeat: no-repeat;
    position: absolute;
    left: -25px;
    // top: -4px;
    height: 25px;
}

.btn-buytickets:hover{
    transform : translate(-2px,2px);
    background-color: #f9f9f9;
    color: #ff5e19;
    opacity: 0.7;
}
</style>
