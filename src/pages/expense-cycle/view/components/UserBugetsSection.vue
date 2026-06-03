<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useExpenseCycleViewPageStore } from '../expenseCycleViewPageStore';
import { useI18n } from 'vue-i18n';
import { AppInnerLoading, ExpenseCycleUserBudgetsView } from 'src/components';

const i18n = useI18n();

const labels = {
  expenseCycleUserBudgetsTitle: i18n.t('expenseCycle.viewPage.expenseCycleUserBudgetsTitle'),
};

const pageStore = useExpenseCycleViewPageStore();
const { expenseCycle, loadingUserBudgets, userBudgets } = storeToRefs(pageStore);
</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <h3 class="q-mb-md q-mt-none text-h5">{{ labels.expenseCycleUserBudgetsTitle }}</h3>
      </div>
    </div>
    <ExpenseCycleUserBudgetsView
      v-if="expenseCycle !== null"
      :expense-cycle-id="expenseCycle.id"
      :user-budgets="userBudgets ?? []"
    />
    <AppInnerLoading :showing="loadingUserBudgets" />
  </div>
</template>
