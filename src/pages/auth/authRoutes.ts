import type { AppRouteRecordRaw } from 'src/router/routes';

const authRoutes: AppRouteRecordRaw[] = [
  {
    name: 'auth-layout',
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    redirect: { name: 'login' },
    meta: {
      authenticated: false,
    },
    children: [
      {
        name: 'register',
        path: 'register',
        component: () => import('./register/RegisterPage.vue'),
        meta: {
          authenticated: false,
        },
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('./login/LoginPage.vue'),
        meta: {
          authenticated: false,
        },
      },
    ],
  },
];

export { authRoutes };
