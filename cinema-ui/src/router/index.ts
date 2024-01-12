import { createWebHistory, createRouter, RouteOption } from 'vue-router';
/* Layout */
import Layout from '@/layout/index.vue';

/**
 * Note: Routing Configuration Items
 *
 * hidden: true                     // When set to true, the route will not appear in the sidebar such as 401, login and other pages, or such as some edit pages /edit/1
 * alwaysShow: true                 // When you have more than one route declared by children under a route, it will automatically become a nested mode - such as a component page
 *                                  // When there is only one, that sub-route will be displayed in the sidebar as the root route-such as the boot page
 *                                  // If you want to display your root route regardless of the number of children declarations under the route
 *                                  // You can set alwaysShow: true so that it will ignore the previously defined rules and always show the root route
 * redirect: noRedirect             // This route is not clickable in breadcrumb navigation when noRedirect is set
 * name:'router-name'               // Set the name of the route, it must be filled in otherwise there will be various problems when using <keep-alive>
 * query: '{"id": 1, "name": "hieu"}' // Access the default passing parameters of the route
 * roles: ['admin', 'common']       // Role permissions for access routing
 * permissions: ['a:a:a', 'b:b:b']  // Access menu permissions for routing
 * meta : {
    noCache: true                   // If set to true, it will not be cached by <keep-alive> (default false)
    title: 'title'                  // Set the name of this route displayed in the sidebar and breadcrumbs
    icon: 'svg-name'                // Set the icon of the route, corresponding to the path src/assets/icons/svg
    breadcrumb: false               // If set to false, it will not be shown in breadcrumb breadcrumbs
    activeMenu: '/system/user'      // When this property is set in the route, the corresponding sidebar will be highlighted.
  }
 */

// public route
export const constantRoutes: RouteOption[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/homepage',
        component: () => import('@/views/homepage/index.vue')
      },
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login:active(\\d+)?',
    component: () => import('@/views/login.vue'),
    hidden: true
  },
  {
    path: '/homepage',
    component: () => import('@/views/homepage/index.vue'),
    hidden: true
  },
  {
    path: '/homepage/movie-detail',
    component: () => import('@/views/homepage/movieDetail.vue'),
    hidden: true,
    meta: { title: '{"vi_VN":"Chi tiết phim","en_US":"Movie Detail"}', icon: '' }
  },
  {
    path: '/homepage/customer-login',
    component: () => import('@/views/homepage/customerLogin.vue'),
    hidden: true,
    meta: { title: '{"vi_VN":"Đăng nhập","en_US":"Login"}', icon: '' }
  },
  {
    path: '/homepage/movie-category',
    component: () => import('@/views/homepage/movieCategory.vue'),
    hidden: true,
    meta: { title: '{"vi_VN":"Phim","en_US":"Movie"}', icon: '' }
  },
  {
    path: '/homepage/customer-register',
    component: () => import('@/views/homepage/customerRegister.vue'),
    hidden: true,
    meta: { title: '{"vi_VN":"Đăng ký","en_US":"Register"}', icon: '' }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    hidden: true
  },
  {
    path: '/profile',
    component: () => import('@/views/homepage/profile.vue'),
    hidden: true
  },
  {
    path: '/booking/invoice',
    component: () => import('@/views/booking/invoice.vue'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index.vue'),
        name: 'Index',
        meta: { title: '{"vi_VN":"Bảng tin","en_US":"Bulletin"}', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index.vue'),
        name: 'Profile',
        meta: { title: '{"vi_VN":"Thông tin cá nhân","en_US":"Profile"}', icon: 'user' }
      }
    ]
  },
  {
    path: '/booking',
    hidden: true,
    children: [
      {
        path: 'movieSelection',
        component: () => import('@/views/booking/movieSelection.vue'),
        props: { step: 1 }
      },
      {
        path: 'seatSelection',
        component: () => import('@/views/booking/seatSelection.vue'),
        props: { step: 2 }
      },
      {
        path: 'payment',
        component: () => import('@/views/booking/payment.vue'),
        props: { step: 3 }
      },
      {
        path: 'invoice',
        component: () => import('@/views/booking/invoice.vue'),
        props: { step: 3 }
      },
    ]
  },
  {
    path: '/payment-result/vnpay-payment-result',
    component: () => import('@/views/paymentResult/vnpayPaymentResult.vue'),
    hidden: true,
    meta: { title: '{"vi_VN":"Thông tin thanh toán","en_US":"Payment infomation"}', icon: '' }
  }
];

// Dynamic routing, dynamically loaded based on user permissions
export const dynamicRoutes: RouteOption[] = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole.vue'),
        name: 'AuthRole',
        meta: { title: '{"vi_VN":"Chỉ định vai trò","en_US":"Assign roles"}', activeMenu: '/system/user', icon: '' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser.vue'),
        name: 'AuthUser',
        meta: { title: '{"vi_VN":"Chỉ định tài khoản","en_US":"Assign users"}', activeMenu: '/system/role', icon: '' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data.vue'),
        name: 'Data',
        meta: { title: '{"vi_VN":"Chi tiết danh mục","en_US":"Dictionary data"}', activeMenu: '/system/dict', icon: '' }
      }
    ]
  },
  {
    path: '/system/oss-config',
    component: Layout,
    hidden: true,
    permissions: ['system:oss:list'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/system/oss/config.vue'),
        name: 'OssConfig',
        meta: { title: '{"vi_VN":"Cấu hình file","en_US":"File config"}', activeMenu: '/system/oss', icon: '' }
      }
    ]
  },
  {
    path: '/portCustomer/showtime-seat',
    component: Layout,
    hidden: true,
    permissions: ['portCustomer:showtimeManagement:list'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/portCustomer/showtimeManagement/release.vue'),
        name: 'ShowtimeRelease',
        meta: { title: '{"vi_VN":"Phát hành lịch chiếu","en_US":"Release showtime"}', activeMenu: '/portCustomer/showtime-seat', icon: '' }
      }
    ]
  }
];

/**
 * create route
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_CONTEXT_PATH),
  routes: constantRoutes,
  // When refreshing, the scroll bar position is restored
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
