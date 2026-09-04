<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { AppCustomDialog, ExpenseForm, type ExpenseFormData } from 'src/components';
import { type DialogEmits, useApiCall, useToast } from 'src/composables';
import { EditExpenseDto, expenseCycleService, expenseService } from 'src/services';
import { onMounted, ref } from 'vue';

type EditExpenseDialogProps = {
  expenseId: number;
};
type EditExpenseDialogEmits = DialogEmits;

const { expenseId } = defineProps<EditExpenseDialogProps>();
const emit = defineEmits<EditExpenseDialogEmits>();

const i18n = useI18n();
const toast = useToast();

const labels = {
  title: i18n.t('expense.editDialog.title'),
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

async function handleSubmit(data: ExpenseFormData, onOk: () => void) {
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
    onOk();
  }
}

export type { EditExpenseDialogProps };
</script>

<template>
  <AppCustomDialog
    v-slot="{ onOk, onCancel }"
    :loading="loadingData"
    persistent
    :title="labels.title"
    wide
    @hide="() => emit('hide')"
    @ok="(payload) => emit('ok', payload)"
  >
    <ExpenseForm
      v-if="expenseCycle !== null"
      :expense
      :expense-cycle
      @cancel="() => onCancel()"
      @submit="(data) => handleSubmit(data, onOk)"
    />
  </AppCustomDialog>
</template>
