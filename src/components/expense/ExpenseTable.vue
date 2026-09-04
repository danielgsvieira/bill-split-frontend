<script setup lang="ts">
import { computed } from 'vue';
import type { DateTime } from 'luxon';
import type { Expense } from 'src/models/expense/Expense';
import type { ExpenseCycleUserBudget } from 'src/models/expense-cycle/ExpenseCycleUserBudget';
import { expenseService } from 'src/services';
import ExpenseTableBalancePerUserCell from './ExpenseTableBalancePerUserCell.vue';
import ExpenseTableValuePerUserCell from './ExpenseTableValuePerUserCell.vue';
import type { ExpenseUser } from 'src/models/expense/ExpenseUser';
import type { Money } from 'src/utils';
import { useI18n } from 'vue-i18n';
import { AppTable, AppTableActionBtn, type AppTableColumns } from '../app-components';
import EditExpenseDialog, { type EditExpenseDialogProps } from './EditExpenseDialog.vue';
import { useApiCall, useDialog, useToast } from 'src/composables';

type ExpenseTableProps = {
  editable?: boolean;
  expenses: Expense[];
  loading?: boolean;
  userBudgets: ExpenseCycleUserBudget[] | null;
};
type ExpenseTableEmits = (e: 'updateData') => void;

const {
  editable = false,
  expenses,
  loading = false,
  userBudgets,
} = defineProps<ExpenseTableProps>();
const emit = defineEmits<ExpenseTableEmits>();

const i18n = useI18n();
const dialog = useDialog();
const toast = useToast();

const labels = {
  fields: {
    balancePerUser: i18n.t('expense.fields.balancePerUser'),
    date: i18n.t('expense.fields.date'),
    description: i18n.t('expense.fields.description'),
    isProportional: i18n.t('expense.fields.isProportional'),
    paidBy: i18n.t('expense.fields.paidBy'),
    sharedBetween: i18n.t('expense.fields.sharedBetween'),
    price: i18n.t('expense.fields.price'),
    valuePerUser: i18n.t('expense.fields.valuePerUser'),
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
  expensesMustBeFilledHint: i18n.t('expenseCycle.viewPage.allBudgetsMustBeFilledHint'),
};

const budgetData = computed(() => {
  if (userBudgets === null) {
    return null;
  }

  return userBudgets.reduce<{ userId: number; value: Money }[]>((acc, budget) => {
    acc.push({ userId: budget.user.id, value: budget.value });
    return acc;
  }, []);
});

const columns: AppTableColumns<Expense> = [
  {
    name: 'description',
    field: 'description',
    label: labels.fields.description,
    align: 'left',
  },
  {
    name: 'price',
    field: 'price',
    label: labels.fields.price,
    align: 'left',
    format: (value: Money) => i18n.n(value.decimalValue, 'currency'),
  },
  {
    name: 'date',
    field: 'date',
    label: labels.fields.date,
    align: 'left',
    format: (value: DateTime) => i18n.d(value.toJSDate(), 'short'),
  },
  {
    name: 'sharedBetween',
    field: 'sharedBetween',
    label: labels.fields.sharedBetween,
    align: 'left',
    format: (value: ExpenseUser[]) => getSharedBetweenText(value),
  },
  {
    name: 'paidBy',
    field: 'paidBy',
    label: labels.fields.paidBy,
    align: 'left',
    format: (value: ExpenseUser) => value.displayName,
  },
  {
    name: 'isProportional',
    field: 'isProportional',
    label: labels.fields.isProportional,
    align: 'left',
    format: (value: boolean) => (value ? labels.yes : labels.no),
  },
  {
    name: 'valuePerUser',
    field: 'valuePerUser',
    label: labels.fields.valuePerUser,
    align: 'left',
  },
  {
    name: 'balancePerUser',
    field: 'balancePerUser',
    label: labels.fields.balancePerUser,
    align: 'left',
  },
];

function getSharedBetweenText(sharedBetween: Expense['sharedBetween']) {
  return sharedBetween.map((el) => el.displayName).join(', ');
}

function openEditExpenseDialog(expenseId: number) {
  const componentProps: EditExpenseDialogProps = { expenseId };

  dialog
    .customDialog({
      component: EditExpenseDialog,
      componentProps,
    })
    .onOk(() => {
      emit('updateData');
    });
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
      emit('updateData');
    }
  }
}

function handleDeleteBtnClick(expense: Expense) {
  dialog.confirm(labels.removeExpense.dialog).onOk(() => void deleteExpense(expense.id));
}
</script>

<template>
  <AppTable :columns :loading :rows="expenses" :use-actions-column="editable">
    <template #body-cell-valuePerUser="cellProps">
      <ExpenseTableValuePerUserCell
        v-if="budgetData !== null"
        :value-per-user="cellProps.row.getValuePerUser(budgetData)"
      />
    </template>
    <template #body-cell-balancePerUser="cellProps">
      <ExpenseTableBalancePerUserCell
        v-if="budgetData !== null"
        :balance-per-user="cellProps.row.getBalancePerUser(budgetData)"
      />
    </template>
    <template #actionCell="cellProps">
      <div class="items-center justify-center q-gutter-xs row">
        <AppTableActionBtn
          color="accent"
          icon="edit"
          @click="() => openEditExpenseDialog(cellProps.row.id)"
        />
        <AppTableActionBtn
          color="negative"
          icon="delete"
          @click="() => handleDeleteBtnClick(cellProps.row)"
        />
      </div>
    </template>
  </AppTable>
</template>
