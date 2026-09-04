<script setup lang="ts">
import { onMounted } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useExpenseCycleViewPageStore } from './expenseCycleViewPageStore';
import { useI18n } from 'vue-i18n';
import { AppGoBackBtn, AppPage, AppSeparator, ExpenseCycleView } from 'src/components';
import { ExpensesSection, UserBudgetsSection, ValuesSection } from './components';

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
  <AppPage :loading="loadingExpenseCycle" :title="labels.pageTitile">
    <template v-if="expenseCycle !== null">
      <ValuesSection />
      <AppSeparator spaced="lg" />
      <ExpensesSection />
      <AppSeparator spaced="lg" />
      <UserBudgetsSection />
      <AppSeparator spaced="lg" />
      <ExpenseCycleView :expense-cycle />
    </template>
    <div class="items-center justify-end q-mt-md row">
      <AppGoBackBtn :fallback-route="goBackRoute" />
    </div>
  </AppPage>
</template>
