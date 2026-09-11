import { i18n as i18nInstance } from 'src/boot/i18n';
import type { RouteLocationRaw } from 'vue-router';

type MenuItem = {
  label: string;
  icon: string;
  route: RouteLocationRaw;
};

const i18n = i18nInstance.global;

const menuItems: MenuItem[] = [
  {
    label: i18n.t('menus.dashboard'),
    icon: 'dashboard',
    route: { name: 'dashboard' },
  },
  {
    label: i18n.t('menus.expenseCycleIndex'),
    icon: 'list_alt',
    route: { name: 'expense-cycle-index' },
  },
];

export { menuItems };
