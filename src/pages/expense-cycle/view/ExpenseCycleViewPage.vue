<script setup lang="ts">
import { onMounted } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useExpenseCycleViewPageStore } from './expenseCycleViewPageStore';
import { useI18n } from 'vue-i18n';
import { AppCard, AppGoBackBtn, AppPage, AppSeparator, ExpenseCycleView } from 'src/components';
import { ExpensesSection, UserBudgetsSection } from './components';

type ExpenseCycleViewPageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCycleViewPageProps>();

const i18n = useI18n();

const labels = {
  pageTitile: i18n.t('expenseCycle.viewPage.pageTitle'),
};

const pageStore = useExpenseCycleViewPageStore();
const { expenseCycle, loadingExpenseCycle } = storeToRefs(pageStore);

onMounted(() => {
  void pageStore.init(expenseCycleId);
});

const goBackRoute: RouteLocationRaw = { name: 'expense-cycle-index' };

export type { ExpenseCycleViewPageProps };
</script>

<template>
  <AppPage :title="labels.pageTitile">
    <AppCard :loading-expense-cycle>
      <template v-if="expenseCycle !== null">
        <ExpenseCycleView :expense-cycle />
        <AppSeparator spaced="lg" />
        <UserBudgetsSection />
        <AppSeparator spaced="lg" />
        <ExpensesSection />
      </template>
    </AppCard>
    <div class="items-center justify-end q-mt-md row">
      <AppGoBackBtn :fallback-route="goBackRoute" />
    </div>
  </AppPage>
</template>
