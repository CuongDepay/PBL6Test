<template>
  <div v-show="isCollapse" class="search-collapse" @click="toggleSideBar">
    <svg-icon class-name="search-icon" icon-class="search" />
  </div>
  <div class="header-search" v-show="!isCollapse">
    <el-select
      ref="headerSearchSelectRef"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      :placeholder="$t('user.leftPanel.searchPlaceholder')"
      class="header-search-select"
      @change="change"
    >
      <template v-slot:prefix>
        <svg-icon class-name="search-icon" icon-class="search" />
      </template>
      <el-option v-for="option in options" :key="option.item.path" :value="option.item" :label="option.item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js'
import { getNormalPath } from '@/utils/starcinema.js'
import { isHttp } from '@/utils/validate'
import usePermissionStore from '@/store/modules/permission'
import { RouteOption } from 'vue-router'
import { PropType } from 'vue';
import useAppStore from '@/store/modules/app'
import { getRouteTitle } from '@/utils/i18n';

const props = defineProps({
  isCollapse: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
});

type Router = Array<{
  path: string;
  title: string[];
}>

const appStore = useAppStore();
const search = ref('');
const options = ref<any>([]);
const searchPool = ref<Router>([]);
const show = ref(false);
const fuse = ref();
const headerSearchSelectRef = ref(ElSelect);
const router = useRouter();
const routes = computed(() => usePermissionStore().routes);

// const click = () => {
//     show.value = !show.value
//     if (show.value) {
//         headerSearchSelectRef.value && headerSearchSelectRef.value.focus()
//     }
// };
// const close = () => {
//     headerSearchSelectRef.value && headerSearchSelectRef.value.blur()
//     options.value = []
//     show.value = false
// }
const change = (val: any) => {
  const path = val.path;
  if (isHttp(path)) {
    // http(s):// path opens a new window
    const pindex = path.indexOf("http");
    window.open(path.substr(pindex, path.length), "_blank");
  } else {
    router.push(path)
  }
  search.value = ''
  options.value = []
  nextTick(() => {
    show.value = false
  })
}
const initFuse = (list: Router) => {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
}
// Filter out the routes that can be displayed in the sidebar
// And generate the internationalized title
const generateRoutes = (routes: RouteOption[], basePath = '', prefixTitle: string[] = []) => {
  let res: Router = []
  routes.forEach(r => {
    // skip hidden router
    if (!r.hidden) {
      const p = r.path.length > 0 && r.path[0] === '/' ? r.path : '/' + r.path;
      const data = {
        path: !isHttp(r.path) ? getNormalPath(basePath + p) : r.path,
        title: [...prefixTitle]
      }
      if (r.meta && r.meta.title) {
        data.title = [...getRouteTitle(data.title), getRouteTitle(r.meta.title)];
        if (r.redirect !== 'noRedirect') {
          // only push the routes with title
          // special case: need to exclude parent router without redirect
          res.push(data);
        }
      }
      // recursive child routes
      if (r.children) {
        const tempRoutes = generateRoutes(r.children, data.path, data.title);
        if (tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes];
        }
      }
    }
  })
  return res;
}
const querySearch = (query: string) => {
  if (query !== '') {
    options.value = fuse.value.search(query)
  } else {
    options.value = []
  }
}

onMounted(() => {
  searchPool.value = generateRoutes(routes.value);
})

watchEffect(() => {
  searchPool.value = generateRoutes(routes.value)
})

// watch(show, (value) => {
//     if (value) {
//         document.body.addEventListener('click', close)
//     } else {
//         document.body.removeEventListener('click', close)
//     }
// })

watch(searchPool, (list) => {
  initFuse(list)
})

const toggleSideBar = () => {
  appStore.toggleSideBar(false)
  headerSearchSelectRef.value && headerSearchSelectRef.value.focus()
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.search-collapse {
  border-radius: 6px;
  border: 1px solid $gray-200;
  height: 32px;
  margin: 0 6px;
  display: flex;
  padding: 6px 12px;
  align-items: center;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    margin: 0 !important;
  }

  &:hover {
    border: 1px solid $gray-400;
  }

  &:active {
    border: 1px solid $blue-500;
    box-shadow: 0px 1px 2px 0px rgba(132, 202, 255, 0.05), 0px 0px 0px 2px $blue-100;
  }
}
.header-search {
  font-size: 0 !important;
  width: 100%;
  padding: 0 11px 0 12px;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    width: 100%;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
}
</style>
