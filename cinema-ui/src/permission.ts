import { to as tos } from 'await-to-js';
import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import { isHttp } from '@/utils/validate';
import { isRelogin } from '@/utils/request';
import useUserStore from '@/store/modules/user';
import useCustomerUserStore from '@/store/modules/customer';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';

NProgress.configure({ showSpinner: false });
const whiteList = [
  '/login',
  '/register',
  '/profile',
  '/homepage/movie-detail',
  '/homepage/customer-login',
  '/homepage/customer-register',
  '/homepage/movie-category',
  '/homepage/booking',
  '/booking',
  '/booking/movieSelection',
  '/booking/seatSelection',
  '/booking/payment',
  '/booking/invoice',
  '/payment-result/vnpay-payment-result'
];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title as string);
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true;
        // Determine whether the current user has pulled user_info information
        const [err] = await tos(useUserStore().getInfo());
        if (err) {
          await useUserStore().logout();
          ElMessage.error(err);
          next({ path: '/' });
        } else {
          isRelogin.show = false;
          const accessRoutes = await usePermissionStore().generateRoutes();
          // Generate an accessible routing table based on roles permissions
          accessRoutes.forEach((route) => {
            if (!isHttp(route.path)) {
              router.addRoute(route); // Dynamically add accessible routing table
            }
          });
          next({ ...to, replace: true }); // The hack method ensures that addRoutes has completed
        }
      } else  if  (useCustomerUserStore()) {
        const [err] = await tos(useCustomerUserStore().getInfo());
        next();
      } else {
        next();
      }
    }
  } else {
    // no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the login-free white list, directly enter
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // Otherwise all redirect to login page
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
