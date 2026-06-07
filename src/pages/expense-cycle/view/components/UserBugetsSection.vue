<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useExpenseCycleViewPageStore } from '../expenseCycleViewPageStore';
import { useI18n } from 'vue-i18n';
import { AppIcon, AppInnerLoading, ExpenseCycleUserBudgetsView } from 'src/components';

const i18n = useI18n();

const labels = {
  expenseCycleUserBudgetsTitle: i18n.t('expenseCycle.viewPage.expenseCycleUserBudgetsTitle'),
  expensesMustBeFilledHint: i18n.t('expenseCycle.viewPage.allBudgetsMustBeFilledHint'),
};

const pageStore = useExpenseCycleViewPageStore();
const { expenseCycle, hasEmptyUserBudget, loadingUserBudgets, userBudgets } =
  storeToRefs(pageStore);
</script>

<template>
  <div>
    <div class="row">
      <div class="col q-mb-md">
        <h3 class="q-mb-none q-mt-none text-h5">{{ labels.expenseCycleUserBudgetsTitle }}</h3>
        <div v-if="hasEmptyUserBudget">
          <AppIcon class="text-negative" name="warning" />
          <span class="text-caption text-negative">
            {{ labels.expensesMustBeFilledHint }}
          </span>
        </div>
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
