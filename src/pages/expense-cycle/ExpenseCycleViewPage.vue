<script setup lang="ts">
import { onMounted } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import { useApiCall } from 'src/composables';
import { useI18n } from 'vue-i18n';
import {
  AppBtn,
  AppCard,
  AppGoBackBtn,
  AppInnerLoading,
  AppPage,
  AppSeparator,
  ExpenseCycleUserBudgetsView,
  ExpenseCycleView,
  ExpenseTable,
} from 'src/components';
import { expenseCycleService, expenseService } from 'src/services';

type ExpenseCycleViewPageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCycleViewPageProps>();

const i18n = useI18n();

const labels = {
  createExpenseBtn: i18n.t('expenseCycle.viewPage.createExpenseBtn'),
  expenseListTitle: i18n.t('expenseCycle.viewPage.expenseListTitle'),
  expenseCycleUserBudgetsTitle: i18n.t('expenseCycle.viewPage.expenseCycleUserBudgetsTitle'),
  pageTitile: i18n.t('expenseCycle.viewPage.pageTitle'),
};

const {
  data: expenseCycle,
  loading,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));

const {
  data: expenses,
  loading: loadingExpenses,
  execute: fetchExpenses,
} = useApiCall(() => expenseService.listByExpenseCycleId(expenseCycleId));

const {
  data: userBudgets,
  loading: loadingUserBudgets,
  execute: fetchUserBudgets,
} = useApiCall(() => expenseCycleService.listUserBudgets(expenseCycleId));

onMounted(() => {
  void fetchExpenseCycle();
  void fetchExpenses();
  void fetchUserBudgets();
});

const goBackRoute: RouteLocationRaw = { name: 'expense-cycle-index' };
const createExpenseRoute: RouteLocationRaw = { name: 'expense-create', query: { expenseCycleId } };

export type { ExpenseCycleViewPageProps };
</script>

<template>
  <AppPage :title="labels.pageTitile">
    <AppCard :loading>
      <template v-if="expenseCycle !== null">
        <ExpenseCycleView :expense-cycle />
        <AppSeparator spaced="lg" />
        <div>
          <div class="row">
            <div class="col">
              <h3 class="q-mb-md q-mt-none text-h5">{{ labels.expenseCycleUserBudgetsTitle }}</h3>
            </div>
          </div>
          <ExpenseCycleUserBudgetsView
            :expense-cycle-id="expenseCycle.id"
            :user-budgets="userBudgets ?? []"
          />
          <AppInnerLoading :showing="loadingUserBudgets" />
        </div>
        <AppSeparator spaced="lg" />
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
    </AppCard>
    <div class="items-center justify-end q-mt-md row">
      <AppGoBackBtn :fallback-route="goBackRoute" />
    </div>
  </AppPage>
</template>
