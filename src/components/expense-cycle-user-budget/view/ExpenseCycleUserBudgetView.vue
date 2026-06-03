<script setup lang="ts">
import { AppFieldValue } from '../../app-components';
import type { ExpenseCycleUserBudget } from 'src/models/expense-cycle/ExpenseCycleUserBudget';
import { useI18n } from 'vue-i18n';

type ExpenseCycleUserBudgetsViewProps = {
  userBudget: ExpenseCycleUserBudget;
};

const { userBudget } = defineProps<ExpenseCycleUserBudgetsViewProps>();

const i18n = useI18n();
</script>

<template>
  <AppFieldValue
    :label="userBudget.user.displayName"
    :value="i18n.n(userBudget.value.decimalValue, 'currency')"
  />
</template>
