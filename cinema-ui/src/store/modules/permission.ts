import { defineStore } from 'pinia';
import router, { constantRoutes, dynamicRoutes } from '@/router';
import store from '@/store';
import { getRouters } from '@/api/menu';
import Layout from '@/layout/index.vue';
import ParentView from '@/components/ParentView/index.vue';
import InnerLink from '@/layout/components/InnerLink/index.vue';
import auth from '@/plugins/auth';
import { RouteOption } from 'vue-router';
// Match all .vue files in views
const modules = import.meta.glob('./../../views/**/*.vue');

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteOption[]>([]);
  const addRoutes = ref<RouteOption[]>([]);
  const defaultRoutes = ref<RouteOption[]>([]);
  const topbarRouters = ref<RouteOption[]>([]);
  const sidebarRouters = ref<RouteOption[]>([]);

  const setRoutes = (newRoutes: RouteOption[]): void => {
    addRoutes.value = newRoutes;
    routes.value = constantRoutes.concat(newRoutes);
  };
  const setDefaultRoutes = (routes: RouteOption[]): void => {
    defaultRoutes.value = constantRoutes.concat(routes);
  };
  const setTopbarRoutes = (routes: RouteOption[]): void => {
    topbarRouters.value = routes;
  };
  const setSidebarRouters = (routes: RouteOption[]): void => {
    sidebarRouters.value = routes;
  };
  const generateRoutes = async (): Promise<RouteOption[]> => {
    const res = await getRouters();
    const { data } = res;
    const sdata = JSON.parse(JSON.stringify(data));
    const rdata = JSON.parse(JSON.stringify(data));
    const defaultData = JSON.parse(JSON.stringify(data));
    const sidebarRoutes = filterAsyncRouter(sdata);
    const rewriteRoutes = filterAsyncRouter(rdata, undefined, true);
    const defaultRoutes = filterAsyncRouter(defaultData);
    const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
    asyncRoutes.forEach((route) => {
      router.addRoute(route);
    });
    setRoutes(rewriteRoutes);
    setSidebarRouters(constantRoutes.concat(sidebarRoutes));
    setDefaultRoutes(sidebarRoutes);
    setTopbarRoutes(defaultRoutes);
    return new Promise<RouteOption[]>((resolve) => resolve(rewriteRoutes));
  };

  /**
   * Traverse the routing string from the background and convert it to a component object
   * @param asyncRouterMap The routing string from the background
   * @param lastRouter upper level routing
   * @param type Whether to rewrite the route
   */
  const filterAsyncRouter = (asyncRouterMap: RouteOption[], lastRouter?: RouteOption, type = false): RouteOption[] => {
    return asyncRouterMap.filter((route) => {
      if (type && route.children) {
        route.children = filterChildren(route.children, undefined);
      }
      if (route.component) {
        // Layout ParentView component special handling
        if (route.component === 'Layout') {
          route.component = Layout;
        } else if (route.component === 'ParentView') {
          route.component = ParentView;
        } else if (route.component === 'InnerLink') {
          route.component = InnerLink;
        } else {
          route.component = loadView(route.component);
        }
      }
      if (route.children != null && route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, route, type);
      } else {
        delete route.children;
        delete route.redirect;
      }
      return true;
    });
  };
  const filterChildren = (childrenMap: RouteOption[], lastRouter?: RouteOption): RouteOption[] => {
    let children: RouteOption[] = [];
    childrenMap.forEach((el) => {
      if (el.children && el.children.length) {
        if (el.component === 'ParentView' && !lastRouter) {
          el.children.forEach((c) => {
            c.path = el.path + '/' + c.path;
            if (c.children && c.children.length) {
              children = children.concat(filterChildren(c.children, c));
              return;
            }
            children.push(c);
          });
          return;
        }
      }
      if (lastRouter) {
        el.path = lastRouter.path + '/' + el.path;
      }
      children = children.concat(el);
    });
    return children;
  };
  return { routes, setRoutes, generateRoutes, setSidebarRouters, topbarRouters, sidebarRouters, defaultRoutes };
});

// Dynamic routing traversal to verify whether you have permissions
export const filterDynamicRoutes = (routes: RouteOption[]) => {
  const res: RouteOption[] = [];
  routes.forEach((route) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route);
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route);
      }
    }
  });
  return res;
};

export const loadView = (view: any) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
};

// non-setup
export const usePermissionStoreHook = () => {
  return usePermissionStore(store);
};

export default usePermissionStore;
