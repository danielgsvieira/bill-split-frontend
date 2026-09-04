import { authRoutes } from 'src/pages/auth/authRoutes';
import { expenseCycleRoutes } from 'src/pages/expense-cycle/expenseCycleRoutes';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';

type AppRouteMeta = RouteMeta & { authenticated: boolean };

type AppRouteRecordRaw = RouteRecordRaw & {
  name: string;
  children?: AppRouteRecordRaw[];
  meta: AppRouteMeta;
};

const routes: AppRouteRecordRaw[] = [
  {
    name: 'main-layout',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'dashboard' },
    meta: {
      authenticated: false,
    },
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('pages/dashboard/DashboardPage.vue'),
        meta: {
          authenticated: true,
        },
      },
    ],
  },
  ...authRoutes,
  ...expenseCycleRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'page-not-found',
    path: '/:catchAll(.*)*',
    component: () => import('pages/page-not-found/PageNotFound.vue'),
    meta: {
      authenticated: false,
    },
  },
];

export { routes };
export type { AppRouteRecordRaw };
