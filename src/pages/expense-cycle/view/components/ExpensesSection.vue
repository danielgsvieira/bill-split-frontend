<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useExpenseCycleViewPageStore } from '../expenseCycleViewPageStore';
import { useI18n } from 'vue-i18n';
import { AppBtn, ExpenseTable } from 'src/components';

const i18n = useI18n();

const labels = {
  createExpenseBtn: i18n.t('expenseCycle.viewPage.createExpenseBtn'),
  expenseListTitle: i18n.t('expenseCycle.viewPage.expenseListTitle'),
};

const pageStore = useExpenseCycleViewPageStore();
const { expenseCycle, expenses, loadingExpenses } = storeToRefs(pageStore);

function fetchExpenses() {
  void pageStore.fetchExpenses();
}

const createExpenseRoute: RouteLocationRaw = {
  name: 'expense-create',
  query: { expenseCycleId: expenseCycle.value?.id },
};
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
          :to="createExpenseRoute"
          type="button"
        />
      </div>
    </div>
    <ExpenseTable
      editable
      :expenses="expenses ?? []"
      :loading="loadingExpenses"
      @refresh-list="fetchExpenses"
    />
  </div>
</template>
