import type { AppRouteRecordRaw } from 'src/router/routes';
import type { ExpenseCreatePageProps } from './ExpenseCreatePage.vue';
import type { ExpenseEditPageProps } from './ExpenseEditPage.vue';

const expenseRoutes: AppRouteRecordRaw[] = [
  {
    name: 'expense',
    path: '/expense',
    component: () => import('layouts/MainLayout.vue'),
    // TODO: deal with this redirect, maybe redirect to somewere else
    redirect: { name: 'dashboard' },
    meta: {
      authenticated: true,
    },
    children: [
      {
        name: 'expense-create',
        path: 'create',
        component: () => import('./ExpenseCreatePage.vue'),
        props: (route): ExpenseCreatePageProps => ({
          expenseCycleId: Number.parseInt(route.query.expenseCycleId as string),
        }),
        meta: {
          authenticated: true,
        },
      },
      {
        name: 'expense-edit',
        path: ':id/edit',
        component: () => import('./ExpenseEditPage.vue'),
        props: (route): ExpenseEditPageProps => ({
          expenseId: Number.parseInt(route.params.id as string),
        }),
        meta: {
          authenticated: true,
        },
      },
    ],
  },
];

export { expenseRoutes };
