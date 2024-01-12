import { useTagsViewStore } from '@/store/modules/tagsView';
import router from '@/router';
import { TagView, RouteLocationRaw } from 'vue-router';

export default {
  // Refresh the current tab
  async refreshPage(obj: TagView): Promise<void> {
    const { path, query, matched } = router.currentRoute.value;
    if (obj === undefined) {
      matched.forEach((m) => {
        if (m.components && m.components.default && m.components.default.name) {
          if (!['Layout', 'ParentView'].includes(m.components.default.name)) {
            obj = { name: m.components.default.name, path: path, query: query };
          }
        }
      });
    }
    // prettier-ignore
    await useTagsViewStore().delCachedView(obj)
    router.replace({
      path: '/redirect' + obj.path,
      query: obj.query
    });
  },
  // Close the current tab and open a new tab
  closeOpenPage(obj: RouteLocationRaw): void {
    useTagsViewStore().delView(router.currentRoute.value);
    if (obj !== undefined) {
      router.push(obj);
    }
  },
  // Close the specified tab
  async closePage(obj?: TagView): Promise<{ visitedViews: TagView[]; cachedViews: string[] } | any> {
    if (obj === undefined) {
      // prettier-ignore
      const { visitedViews } = await useTagsViewStore().delView(router.currentRoute.value) as any
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        return router.push(latestView.fullPath);
      }
      return router.push('/');
    }
    return useTagsViewStore().delView(obj);
  },
  // close all tabs
  closeAllPage() {
    return useTagsViewStore().delAllViews();
  },
  // Close the tab on the left
  closeLeftPage(obj: TagView) {
    return useTagsViewStore().delLeftTags(obj || router.currentRoute.value);
  },
  // Close the tab on the right
  closeRightPage(obj: TagView) {
    return useTagsViewStore().delRightTags(obj || router.currentRoute.value);
  },
  // close other tabs
  closeOtherPage(obj: TagView) {
    return useTagsViewStore().delOthersViews(obj || router.currentRoute.value);
  },
  // open tab
  openPage(url: RouteLocationRaw) {
    return router.push(url);
  },
  // Modify tab page
  updatePage(obj: TagView) {
    return useTagsViewStore().updateVisitedView(obj);
  }
};
