<template>
  <el-menu :default-active="activeMenu" mode="horizontal" @select="handleSelect" :ellipsis="false">
    <template v-for="(item, index) in topMenus">
      <el-menu-item :style="{'--theme': theme}" :index="item.path" :key="index" v-if="index < visibleNumber"
        ><svg-icon :icon-class="item.meta ? item.meta.icon : '' " /> {{ item.meta?.title }}</el-menu-item
      >
    </template>

    <!-- Top menu collapsed beyond quantity -->
    <el-sub-menu :style="{'--theme': theme}" index="more" v-if="topMenus.length > visibleNumber">
      <template #title>More menu</template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item :index="item.path" :key="index" v-if="index >= visibleNumber"
          ><svg-icon :icon-class="item.meta ? item.meta.icon : '' " /> {{ item.meta?.title }}</el-menu-item
        >
      </template>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { constantRoutes } from '@/router';
import { isHttp } from '@/utils/validate';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';
import { RouteOption } from 'vue-router';

// Initial number of top bars
const visibleNumber = ref<number>(-1);
// The index of the currently active menu
const currentIndex = ref<string>();
// Hide sidebar routing
const hideList = ['/index', '/user/profile'];

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const route = useRoute();
const router = useRouter();

// theme color
const theme = computed(() => settingsStore.theme);
// all routing information
const routers = computed(() => permissionStore.topbarRouters);

// top display menu
const topMenus = computed(() => {
  let topMenus:RouteOption[] = [];
  routers.value.map((menu) => {
    if (menu.hidden !== true) {
      // Compatible with the internal jump of the first-level menu on the top bar
      if (menu.path === "/") {
          topMenus.push(menu.children? menu.children[0] : menu);
      } else {
          topMenus.push(menu);
      }
    }
  })
  return topMenus;
})

// Set subroutes
const childrenMenus = computed(() => {
  let childrenMenus:RouteOption[] = [];
  routers.value.map((router) => {
    router.children?.forEach((item) => {
      if (item.parentPath === undefined) {
        if(router.path === "/") {
          item.path = "/" + item.path;
        } else {
          if(!isHttp(item.path)) {
            item.path = router.path + "/" + item.path;
          }
        }
        item.parentPath = router.path;
      }
      childrenMenus.push(item);
    })
  })
  return constantRoutes.concat(childrenMenus);
})

// menu activated by default
const activeMenu = computed(() => {
  const path = route.path;
  let activePath = path;
  if (path !== undefined && path.lastIndexOf("/") > 0 && hideList.indexOf(path) === -1) {
    const tmpPath = path.substring(1, path.length);
    activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
    if (!route.meta.link) {
        appStore.toggleSideBarHide(false);
    }
  } else if(!route.children) {
    activePath = path;
    appStore.toggleSideBarHide(true);
  }
  activeRoutes(activePath);
  return activePath;
})

const setVisibleNumber = () => {
  const width = document.body.getBoundingClientRect().width / 3;
  visibleNumber.value = parseInt(String(width / 85));
}

const handleSelect = (key: string) => {
  currentIndex.value = key;
  const route = routers.value.find(item => item.path === key);
  if (isHttp(key)) {
    // http(s):// path opens a new window
    window.open(key, "_blank");
  } else if (!route || !route.children) {
    // No subrouting paths are opened internally
    const routeMenu = childrenMenus.value.find(item => item.path === key);
    if (routeMenu && routeMenu.query) {
      let query = JSON.parse(routeMenu.query);
      router.push({ path: key, query: query });
    } else {
      router.push({ path: key });
    }
    appStore.toggleSideBarHide(true);
  } else {
    // Show left linkage menu
    activeRoutes(key);
    appStore.toggleSideBarHide(false);
  }
}

const activeRoutes = (key: string) => {
  let routes:RouteOption[] = [];
  if (childrenMenus.value && childrenMenus.value.length > 0) {
    childrenMenus.value.map((item) => {
      if (key == item.parentPath || (key == "index" && "" == item.path)) {
        routes.push(item);
      }
    });
  }
  if(routes.length > 0) {
    permissionStore.setSidebarRouters(routes);
  } else {
    appStore.toggleSideBarHide(true);
  }
  return routes;
}

onMounted(() => {
  window.addEventListener('resize', setVisibleNumber)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setVisibleNumber)
})

onMounted(() => {
  setVisibleNumber()
})
</script>

<style lang="scss">
.topmenu-container.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}

.topmenu-container.el-menu--horizontal > .el-menu-item.is-active, .el-menu--horizontal > .el-sub-menu.is-active .el-submenu__title {
  border-bottom: 2px solid #{'var(--theme)'} !important;
  color: #303133;
}

/* sub-menu item */
.topmenu-container.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
</style>
