import { defineRouter } from '#q-app/wrappers';
import { routes } from './routes';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

// Disable the @typescript-eslint/consistent-type-definitions rule to make use of declaration merging
/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare module 'vue-router' {
  interface RouteMeta {
    // Makes route.meta.authenticated mandatory
    authenticated: boolean;
  }
}
/* eslint-enable @typescript-eslint/consistent-type-definitions */

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const router = defineRouter((/* { store, ssrContext } */) => {
  const createWebHistoryFn =
    process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory;

  const createHistory = process.env.SERVER ? createMemoryHistory : createWebHistoryFn;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});

export default router;
