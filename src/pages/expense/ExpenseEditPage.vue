<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { AppPage, ExpenseForm, type ExpenseFormData } from 'src/components';
import { EditExpenseDto, expenseCycleService, expenseService } from 'src/services';
import { onMounted, ref } from 'vue';
import { useApiCall, useToast } from 'src/composables';

type ExpenseEditPageProps = {
  expenseId: number;
};

const { expenseId } = defineProps<ExpenseEditPageProps>();

const i18n = useI18n();
const toast = useToast();
const router = useRouter();

const labels = {
  pageTitle: i18n.t('expense.editPage.pageTitle'),
  editSuccessMessage: i18n.t('general.editSuccessMessage'),
};

const loadingData = ref(true);

const { data: expenseCycle, execute: fetchExpenseCycle } = useApiCall((expenseCycleId: number) =>
  expenseCycleService.findOneById(expenseCycleId),
);

const { data: expense, execute: fetchExpense } = useApiCall(() =>
  expenseService.findOneById(expenseId),
);

onMounted(async () => {
  loadingData.value = true;
  await fetchExpense();

  if (expense.value !== null) {
    void fetchExpenseCycle(expense.value.expenseCycle.id);
  }
  loadingData.value = false;
});

const { data: editedExpenseCycle, execute: editExpenseCycle } = useApiCall((dto: EditExpenseDto) =>
  expenseService.edit(dto),
);

async function handleSubmit(data: ExpenseFormData) {
  const { date, paidBy } = data;
  if (date === null || paidBy === null) {
    toast.negative(i18n.t('validation.invalidFormData'));
    return;
  }

  const dto = new EditExpenseDto({
    ...data,
    id: expenseId,
    date,
    paidBy,
  });
  await editExpenseCycle(dto);

  if (editedExpenseCycle.value !== null) {
    expense.value = editedExpenseCycle.value;
    toast.positive(labels.editSuccessMessage);

    void router.push({ name: 'expense-cycle-view', params: { id: expenseCycle.value?.id } });
  }
}

export type { ExpenseEditPageProps };
</script>

<template>
  <AppPage :loading="loadingData" :title="labels.pageTitle">
    <ExpenseForm v-if="expenseCycle !== null" :expense :expense-cycle @submit="handleSubmit" />
  </AppPage>
</template>
