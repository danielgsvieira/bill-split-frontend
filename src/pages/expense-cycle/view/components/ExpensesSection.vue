<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDialog } from 'src/composables';
import { useExpenseCycleViewPageStore } from '../expenseCycleViewPageStore';
import { useI18n } from 'vue-i18n';
import {
  AppBtn,
  CreateExpenseDialog,
  type CreateExpenseDialogProps,
  ExpenseTable,
} from 'src/components';
import { computed, ref } from 'vue';
import ExpensesFilter, { type ExpenseFilterValues } from './ExpensesFilter.vue';

const i18n = useI18n();
const dialog = useDialog();

const labels = {
  createExpenseBtn: i18n.t('expenseCycle.viewPage.createExpenseBtn'),
  expenseListTitle: i18n.t('expenseCycle.viewPage.expenseListTitle'),
  filterTitle: i18n.t('general.filters'),
};

const pageStore = useExpenseCycleViewPageStore();
const { expenseCycle, expenses, loadingExpenses, userBudgets } = storeToRefs(pageStore);

const filterValues = ref<ExpenseFilterValues>({
  description: '',
  paidBy: null,
  includesUser: [],
});

const filteredExpenses = computed(() => {
  let result = expenses.value ?? [];

  const { description, includesUser, paidBy } = filterValues.value;

  if (paidBy !== null) {
    result = result.filter((expense) => expense.paidBy.id === paidBy.id);
  }

  if (description.trim().length > 0) {
    result = result.filter((expense) =>
      expense.description.toLocaleLowerCase().includes(description.toLocaleLowerCase()),
    );
  }

  if (includesUser.length > 0) {
    const includesUserIds = includesUser.map((el) => el.id);

    result = result.filter((expense) => {
      const expenseUserIds = expense.sharedBetween.map((user) => user.id);

      return includesUserIds.every((id) => expenseUserIds.includes(id));
    });
  }

  return result;
});

function openCreateExpenseDialog() {
  if (expenseCycle.value === null) {
    return;
  }

  const componentProps: CreateExpenseDialogProps = { expenseCycleId: expenseCycle.value.id };

  dialog
    .customDialog({
      component: CreateExpenseDialog,
      componentProps,
    })
    .onOk(reinitData);
}

function reinitData() {
  if (expenseCycle.value === null) {
    return;
  }

  void pageStore.init(expenseCycle.value.id);
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <h3 class="q-mb-md q-mt-none text-h5">{{ labels.expenseListTitle }}</h3>
      </div>
      <div class="col-auto">
        <AppBtn
          icon="add"
          :label="labels.createExpenseBtn"
          type="button"
          @click="() => openCreateExpenseDialog()"
        />
      </div>
    </div>
    <div v-if="expenseCycle !== null" class="q-mb-md row">
      <div class="col-12">
        <ExpensesFilter v-model="filterValues" :expense-cycle-id="expenseCycle.id" />
      </div>
    </div>
    <ExpenseTable
      editable
      :expenses="filteredExpenses"
      :loading="loadingExpenses"
      :user-budgets
      @update-data="reinitData"
    />
  </div>
</template>
