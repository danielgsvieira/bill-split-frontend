<script setup lang="ts">
import { expenseCycleService } from 'src/services';
import { type RouteLocationRaw } from 'vue-router';
import { useApiCall } from 'src/composables';
import { useI18n } from 'vue-i18n';
import { AppCard, AppGoBackBtn, AppPage, ExpenseCycleView } from 'src/components';

type ExpenseCycleViewPageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCycleViewPageProps>();

const { t } = useI18n();

const {
  data: expenseCycle,
  loading,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));
void fetchExpenseCycle();

const goBackRoute: RouteLocationRaw = { name: 'expense-cycle-index' };

export type { ExpenseCycleViewPageProps };
</script>

<template>
  <AppPage :title="t('expenseCycle.viewPage.pageTitle')">
    <AppCard :loading>
      <ExpenseCycleView v-if="expenseCycle !== null" :expense-cycle />
    </AppCard>
    <div class="items-center justify-end q-mt-md row">
      <AppGoBackBtn :fallback-route="goBackRoute" />
    </div>
  </AppPage>
</template>
