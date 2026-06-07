<script setup lang="ts">
import { computed } from 'vue';
import type { ExpenseCycleUserBudget } from 'src/models/expense-cycle/ExpenseCycleUserBudget';
import type { RouteLocationRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AppBtn, AppFieldValue } from '../../app-components';

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
  return { name: 'expense-cycle-update-user-budgets', params: { id: expenseCycleId } };
});
</script>

<template>
  <div class="q-gutter-xl row">
    <AppFieldValue
      v-for="userBudget in userBudgets"
      :key="userBudget.id"
      :label="userBudget.user.displayName"
      :value="i18n.n(userBudget.value.decimalValue, 'currency')"
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
