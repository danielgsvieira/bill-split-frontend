<script setup lang="ts">
import { AppBtn } from '../../app-components';
import { computed } from 'vue';
import type { ExpenseCycleUserBudget } from 'src/models/expense-cycle/ExpenseCycleUserBudget';
import ExpenseCycleUserBudgetView from './ExpenseCycleUserBudgetView.vue';
import type { RouteLocationRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';

type ExpenseCycleUserBudgetsViewProps = {
  expenseCycleId: number;
  userBudgets: ExpenseCycleUserBudget[];
};

const { userBudgets, expenseCycleId } = defineProps<ExpenseCycleUserBudgetsViewProps>();

const i18n = useI18n();

const labels = {
  editBtn: i18n.t('general.edit'),
};

const updateUserBudgetsRoute = computed<RouteLocationRaw>(() => {
  return { name: 'expense-cycle-update-user-budgets', params: { expenseCycleId } };
});
</script>

<template>
  <div class="q-gutter-xl row">
    <ExpenseCycleUserBudgetView
      v-for="userBudget in userBudgets"
      :key="userBudget.id"
      :user-budget
    />
  </div>
  <div class="items-center justify-end q-gutter-md row">
    <AppBtn
      color="primary"
      flat
      icon="edit"
      :label="labels.editBtn"
      :to="updateUserBudgetsRoute"
      type="button"
    />
  </div>
</template>
