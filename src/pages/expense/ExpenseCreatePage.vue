<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { AppPage, ExpenseForm, type ExpenseFormData } from 'src/components';
import { CreateExpenseDto, expenseCycleService, expenseService } from 'src/services';
import { useApiCall, useToast } from 'src/composables';

type ExpenseCreatePageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCreatePageProps>();

const router = useRouter();
const i18n = useI18n();
const toast = useToast();

const labels = {
  pageTitle: i18n.t('expense.createPage.pageTitle'),
  createSuccessMessage: i18n.t('general.createSuccessMessage'),
};

const {
  data: expenseCycle,
  loading: loadingExpenseCycle,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));
void fetchExpenseCycle();

const { data: createdExpense, execute: createExpense } = useApiCall((dto: CreateExpenseDto) =>
  expenseService.create(dto),
);

async function handleSubmit(data: ExpenseFormData) {
  if (expenseCycle.value === null) {
    return;
  }

  const { date, paidBy } = data;
  if (date === null || paidBy === null) {
    toast.negative(i18n.t('validation.invalidFormData'));
    return;
  }

  const dto = new CreateExpenseDto({
    ...data,
    date,
    expenseCycle: expenseCycle.value,
    paidBy,
  });
  await createExpense(dto);

  if (createdExpense.value !== null) {
    toast.positive(labels.createSuccessMessage);
    void router.push({ name: 'expense-cycle-view', params: { id: expenseCycle.value.id } });
  }
}

export type { ExpenseCreatePageProps };
</script>

<template>
  <AppPage :loading="loadingExpenseCycle" :title="labels.pageTitle">
    <ExpenseForm v-if="expenseCycle !== null" :expense-cycle @submit="handleSubmit" />
  </AppPage>
</template>
