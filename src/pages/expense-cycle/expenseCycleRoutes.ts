import type { AppRouteRecordRaw } from 'src/router/routes';
import type { ExpenseCycleEditPageProps } from './edit/ExpenseCycleEditPage.vue';
import type { ExpenseCycleViewPageProps } from './view/ExpenseCycleViewPage.vue';

const expenseCycleRoutes: AppRouteRecordRaw[] = [
  {
    name: 'expense-cycle',
    path: '/expense-cycle',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'expense-cycle-index' },
    meta: {
      authenticated: true,
    },
    children: [
      {
        name: 'expense-cycle-index',
        path: '',
        component: () => import('./index/ExpenseCycleIndexPage.vue'),
        meta: {
          authenticated: true,
        },
      },
      {
        name: 'expense-cycle-view',
        path: ':id',
        component: () => import('./view/ExpenseCycleViewPage.vue'),
        props: (route): ExpenseCycleViewPageProps => ({
          expenseCycleId: Number.parseInt(route.params.id as string),
        }),
        meta: {
          authenticated: true,
        },
      },
      {
        name: 'expense-cycle-create',
        path: 'create',
        component: () => import('./create/ExpenseCycleCreatePage.vue'),
        meta: {
          authenticated: true,
        },
      },
      {
        name: 'expense-cycle-edit',
        path: ':id/edit',
        component: () => import('./edit/ExpenseCycleEditPage.vue'),
        props: (route): ExpenseCycleEditPageProps => ({
          expenseCycleId: Number.parseInt(route.params.id as string),
        }),
        meta: {
          authenticated: true,
        },
      },
    ],
  },
];

export { expenseCycleRoutes };
