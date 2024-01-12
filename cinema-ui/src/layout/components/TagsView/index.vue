<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :data-path="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path ? tag.path : '', query: tag.query, fullPath: tag.fullPath ? tag.fullPath : '' }"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ getRouteTitle(tag.title) }}
        <span v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)">
          <close class="el-icon-close" style="width: 1em; height: 1em;vertical-align: middle;" />
        </span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)"><refresh-right />{{ $t('tagview.refresh') }}</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)"><close />{{ $t('tagview.closeCurrent') }}</li>
      <li @click="closeOthersTags"><circle-close />{{ $t('tagview.closeOther') }}</li>
      <li v-if="!isFirstView()" @click="closeLeftTags"><back />{{ $t('tagview.closeLeft') }}</li>
      <li v-if="!isLastView()" @click="closeRightTags"><right />{{ $t('tagview.closeRight') }}</li>
      <li @click="closeAllTags(selectedTag)"><circle-close />{{ $t('tagview.closeAll') }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ScrollPane from './ScrollPane.vue'
import { getNormalPath } from '@/utils/starcinema'
import useTagsViewStore from "@/store/modules/tagsView";
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'
import { ComponentInternalInstance } from "vue";
import { RouteOption, TagView, RouteLocationRaw } from "vue-router";
import { getRouteTitle } from '@/utils/i18n';

const visible = ref(false);
const top = ref(0);
const left = ref(0);
const selectedTag = ref<TagView>({});
const affixTags = ref<TagView[]>([]);
const scrollPaneRef = ref(ScrollPane);

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute();
const router = useRouter();

const visitedViews = computed(() => useTagsViewStore().visitedViews);
const routes = computed(() => usePermissionStore().routes);
const theme = computed(() => useSettingsStore().theme);

watch(route, () => {
    addTags();
    moveToCurrentTag();
})
watch(visible, (value) => {
    if (value) {
        document.body.addEventListener('click', closeMenu);
    } else {
        document.body.removeEventListener('click', closeMenu);
    }
})

const isActive = (r: TagView): boolean => {
    return r.path === route.path;
}
const activeStyle = (tag: TagView) => {
    if (!isActive(tag)) return {};
    return {
        "background-color": theme.value,
        "border-color": theme.value
    };
}
const isAffix = (tag: TagView) => {
    return tag.meta && tag.meta.affix;
}
const isFirstView = () => {
    try {
        return selectedTag.value.fullPath === '/index' || selectedTag.value.fullPath === visitedViews.value[1].fullPath;
    } catch (err) {
        return false;
    }
}
const isLastView = () => {
    try {
        return selectedTag.value.fullPath === visitedViews.value[visitedViews.value.length - 1].fullPath;
    } catch (err) {
        return false;
    }
}
const filterAffixTags = (routes:RouteOption [], basePath = '') => {
    let tags:TagView[] = []
    routes.forEach(route => {
        if (route.meta && route.meta.affix) {
            const tagPath = getNormalPath(basePath + '/' + route.path);
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: route.name,
                meta: { ...route.meta }
            })
        }
        if (route.children) {
            const tempTags = filterAffixTags(route.children, route.path);
            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags];
            }
        }
    })
    return tags
}
const initTags = () => {
    const res = filterAffixTags(routes.value);
    affixTags.value = res;
    for (const tag of res) {
        // Must have tag name
        if (tag.name) {
            useTagsViewStore().addVisitedView(tag);
        }
    }
}
const addTags = () => {
    const { name } = route;
    if (name) {
        useTagsViewStore().addView(route);
        if (route.meta.link) {
            useTagsViewStore().addIframeView(route);
        }
    }
    return false
}
const moveToCurrentTag = () => {
    nextTick(() => {
        for (const r of visitedViews.value) {
            if (r.path === route.path) {
                scrollPaneRef.value.moveToTarget(r);
                // when query is different then update
                if (r.fullPath !== route.fullPath) {
                    useTagsViewStore().updateVisitedView(route);
                }
            }
        }
    })
}
const refreshSelectedTag = (view: TagView) => {
    proxy?.$tab.refreshPage(view);
    if (route.meta.link) {
        useTagsViewStore().delIframeView(route);
    }
}
const closeSelectedTag = (view: TagView) => {
    proxy?.$tab.closePage(view).then(({ visitedViews }: any) => {
        if (isActive(view)) {
            toLastView(visitedViews, view);
        }
    })
}
const closeRightTags = () => {
    proxy?.$tab.closeRightPage(selectedTag.value).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === route.fullPath)) {
            toLastView(visitedViews);
        }
    })
}
const closeLeftTags = () => {
    proxy?.$tab.closeLeftPage(selectedTag.value).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === route.fullPath)) {
            toLastView(visitedViews);
        }
    })
}
const closeOthersTags = () => {
    router.push(selectedTag.value as RouteLocationRaw).catch(() => { });
    proxy?.$tab.closeOtherPage(selectedTag.value).then(() => {
        moveToCurrentTag();
    })
}
const closeAllTags = (view: TagView) => {
    proxy?.$tab.closeAllPage().then(({ visitedViews }) => {
        if (affixTags.value.some(tag => tag.path === route.path)) {
            return;
        }
        toLastView(visitedViews, view);
    })
}
const toLastView = (visitedViews:TagView[], view?: TagView) => {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
        router.push(latestView.fullPath as string);
    } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view?.name === 'Dashboard') {
            // to reload home page
            router.replace({ path: '/redirect' + view?.fullPath });
        } else {
            router.push('/');
        }
    }
}
const openMenu = (tag: TagView, e: MouseEvent) => {
    const menuMinWidth = 105;
    const offsetLeft = proxy?.$el.getBoundingClientRect().left; // container margin left
    const offsetWidth = proxy?.$el.offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const l = e.clientX - offsetLeft + 10; // 15: margin right

    if (l > maxLeft) {
        left.value = maxLeft;
    } else {
        left.value = l;
    }

    top.value = e.clientY - 40;
    visible.value = true;
    selectedTag.value = tag;
}
const closeMenu = () => {
    visible.value = false;
}
const handleScroll = () => {
    closeMenu();
}

onMounted(() => {
    initTags();
    addTags();
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.tags-view-container {
  height: 40px;
  width: 100%;
  display: flex;
  padding: 4px 24px;
  align-items: center;
  border-bottom: 1px solid $gray-200;
//   background: #fff;
//   border-bottom: 1px solid #d8dce5;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 32px;
      border-right: 1px solid $gray-200 !important;
      padding: 8px 12px;
      color: $gray-800;
      font-size: 14px;
    //   line-height: 23px;
    //   border: 1px solid #d8dce5;
    //   color: #495060;
    //   background: #fff;
    //   padding: 0 8px;
    //   font-size: 12px;
    //   margin-left: 5px;
    //   margin-top: 4px;
    //   &:first-of-type {
    //     margin-left: 15px;
    //   }
      span svg {
        margin-left: 10px;
        width: 16px !important;
        height: 16px !important;
        margin-bottom: 3px;
        color: $gray-800 !important;
        border-radius: 6px;

        &:hover {
          background: $gray-100;
        }

        &:active {
          background: $gray-200;
        }
      }
      &:hover {
        background: $gray-100;
      }
      &:last-of-type {
        border-right: none !important;
      }
      &.active {
        background: $blue-50 !important;
        color: $blue-500;
        &::before {
          content: "";
          background: $blue-500 !important;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 10px;
          margin-bottom: 2px;
        }
        span svg {
          margin-left: 10px;
          width: 16px !important;
          height: 16px !important;
          margin-bottom: 3px;
          border-radius: 6px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 8px 0px;
    border-radius: 8px;
    background: $gray-0;
    /* Shadow/Lg */
    box-shadow: 0px -2px 8px -2px rgba(17, 25, 39, 0.03), 0px 12px 16px -4px rgba(17, 25, 39, 0.08);
    li {
      color: $gray-700;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 0;
      padding: 8px 16px;
      align-items: center;
      gap: 10px;
      display: flex;
      cursor: pointer;
      &:hover {
        background: $gray-100;
      }
      svg {
        width: 16px;
        height: 16px;
        margin-bottom: 1px;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
        width: 12px !important;
        height: 12px !important;
      }
    }
  }
}
</style>
