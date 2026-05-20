<script setup lang="ts">
import type { Expense } from 'src/models/Expense';
import { expenseService } from 'src/services';
import type { RouteLocationRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AppTable, AppTableActionBtn, type AppTableColumns } from '../app-components';
import { useApiCall, useDialog, useToast } from 'src/composables';

type ExpenseTableProps = {
  editable?: boolean;
  expenses: Expense[];
  loading?: boolean;
};
type ExpenseTableEmits = (e: 'refreshList') => void;

const { editable = false, expenses, loading = false } = defineProps<ExpenseTableProps>();
const emit = defineEmits<ExpenseTableEmits>();

const i18n = useI18n();
const dialog = useDialog();
const toast = useToast();

const labels = {
  fields: {
    date: i18n.t('expense.fields.date'),
    description: i18n.t('expense.fields.description'),
    isProportional: i18n.t('expense.fields.isProportional'),
    paidBy: i18n.t('expense.fields.paidBy'),
    sharedBetween: i18n.t('expense.fields.sharedBetween'),
    price: i18n.t('expense.fields.price'),
  },
  no: i18n.t('general.no'),
  yes: i18n.t('general.yes'),
  removeExpense: {
    dialog: {
      title: i18n.t('general.remove'),
      message: i18n.t('general.removeConfirmationMessage'),
    },
    successMessage: i18n.t('general.removeSuccessMessage'),
  },
};

const columns: AppTableColumns<Expense> = [
  {
    name: 'description',
    field: 'description',
    label: labels.fields.description,
    align: 'left',
  },
  {
    name: 'date',
    field: 'date',
    label: labels.fields.date,
    align: 'left',
    format: (value) => i18n.d(value.toJSDate(), 'short'),
  },
  {
    name: 'price',
    field: 'price',
    label: labels.fields.price,
    align: 'left',
    format: (value) => i18n.n(value.decimalValue, 'currency'),
  },
  {
    name: 'isProportional',
    field: 'isProportional',
    label: labels.fields.isProportional,
    align: 'left',
    format: (value) => (value ? labels.yes : labels.no),
  },
  {
    name: 'paidBy',
    field: 'paidBy',
    label: labels.fields.paidBy,
    align: 'left',
    format: (value) => value.displayName,
  },
  {
    name: 'sharedBetween',
    field: 'sharedBetween',
    label: labels.fields.sharedBetween,
    align: 'left',
    format: (value) => getSharedBetweenText(value),
  },
];

function getSharedBetweenText(sharedBetween: Expense['sharedBetween']) {
  return sharedBetween.map((el) => el.displayName).join(', ');
}

function getEditExpenseRoute(expense: Expense): RouteLocationRaw {
  return { name: 'expense-edit', params: { id: expense.id } };
}

const {
  data: deletedExpense,
  loading: loadingDeleteExpense,
  execute: deleteExpenseApiCall,
} = useApiCall((expenseId: number) => expenseService.delete(expenseId));

async function deleteExpense(expenseId: number) {
  if (!loadingDeleteExpense.value) {
    await deleteExpenseApiCall(expenseId);

    if (deletedExpense.value !== null) {
      toast.positive(labels.removeExpense.successMessage);
      emit('refreshList');
    }
  }
}

function handleDeleteBtnClick(expense: Expense) {
  dialog.confirm(labels.removeExpense.dialog).onOk(() => void deleteExpense(expense.id));
}
</script>

<template>
  <AppTable :columns :loading :rows="expenses" :use-actions-column="editable">
    <template #actionCell="cellProps">
      <div class="items-center justify-center q-gutter-xs row">
        <AppTableActionBtn color="primary" icon="edit" :to="getEditExpenseRoute(cellProps.row)" />
        <AppTableActionBtn
          color="negative"
          icon="delete"
          @click="() => handleDeleteBtnClick(cellProps.row)"
        />
      </div>
    </template>
  </AppTable>
</template>
