<script setup lang="ts">
import { AppCustomDialog } from '../app-components';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { CreateExpenseDto, expenseCycleService, expenseService } from 'src/services';
import { type DialogEmits, useApiCall, useToast } from 'src/composables';
import { ExpenseForm, type ExpenseFormData } from 'src/components';

type CreateExpenseDialogProps = {
  expenseCycleId: number;
};
type CreateExpenseDialogEmits = DialogEmits;

const { expenseCycleId } = defineProps<CreateExpenseDialogProps>();
const emit = defineEmits<CreateExpenseDialogEmits>();

const i18n = useI18n();
const toast = useToast();

const labels = {
  title: i18n.t('expense.createDialog.title'),
  createSuccessMessage: i18n.t('general.createSuccessMessage'),
};

const {
  data: expenseCycle,
  loading: loadingExpenseCycle,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));

onMounted(() => {
  void fetchExpenseCycle();
});

const { data: createdExpense, execute: createExpense } = useApiCall((dto: CreateExpenseDto) =>
  expenseService.create(dto),
);

async function handleSubmit(data: ExpenseFormData, onOk: () => void) {
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
    onOk();
  }
}

export type { CreateExpenseDialogProps };
</script>

<template>
  <AppCustomDialog
    v-slot="{ onOk, onCancel }"
    :loading="loadingExpenseCycle"
    persistent
    :title="labels.title"
    wide
    @hide="() => emit('hide')"
    @ok="(payload) => emit('ok', payload)"
  >
    <ExpenseForm
      v-if="expenseCycle !== null"
      :expense-cycle
      @cancel="() => onCancel()"
      @submit="(data) => handleSubmit(data, onOk)"
    />
  </AppCustomDialog>
</template>
