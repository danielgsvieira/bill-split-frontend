<script setup lang="ts">
import AppCard from 'src/components/AppCard.vue';
import { AppDateFormat } from 'src/consts';
import { computed } from 'vue';
import { expenseCycleService } from 'src/services';
import type { RouteLocationRaw } from 'vue-router';
import { useApiCall } from 'src/composables';
import { useI18n } from 'vue-i18n';
import { valueOrEmptyIndicator } from 'src/utils';
import { AppBtn, AppFieldValue, AppGoBackBtn, AppPage } from 'src/components';

type ExpenseCycleViewPageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCycleViewPageProps>();

const { t } = useI18n();

const labels = {
  deleteBtn: t('expenseCycle.viewPage.deleteBtn'),
  fields: {
    description: t('expenseCycle.fields.description'),
    endDate: t('expenseCycle.fields.endDate'),
    id: t('expenseCycle.fields.id'),
    sharedWith: t('expenseCycle.fields.sharedWith'),
    startDate: t('expenseCycle.fields.startDate'),
    title: t('expenseCycle.fields.title'),
  },
  editBtn: t('expenseCycle.viewPage.editBtn'),
  goBackBtn: t('general.goBack'),
  pageTitle: t('expenseCycle.viewPage.pageTitle'),
};

const {
  data: expenseCycle,
  loading,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));
void fetchExpenseCycle();

const sharedWithText = computed(() => {
  const str = expenseCycle.value?.sharedWith.map((el) => el.displayName).join(', ');

  return valueOrEmptyIndicator(str);
});

const editExpenseCycleRoute: RouteLocationRaw = {
  name: 'expense-cycle-edit',
  params: { id: expenseCycleId },
};
const goBackRoute: RouteLocationRaw = { name: 'expense-cycle-index' };

export type { ExpenseCycleViewPageProps };
</script>

<template>
  <AppPage :title="labels.pageTitle">
    <AppCard :loading>
      <div class="items-center q-col-gutter-md row">
        <AppFieldValue class="col-12" :label="labels.fields.title" :value="expenseCycle?.title" />
        <AppFieldValue
          class="col-12"
          :label="labels.fields.description"
          :value="valueOrEmptyIndicator(expenseCycle?.description)"
        />
        <AppFieldValue
          class="col-12 col-md-4"
          :label="labels.fields.startDate"
          :value="expenseCycle?.startDate.toFormat(AppDateFormat)"
        />
        <AppFieldValue
          class="col-12 col-md-4"
          :label="labels.fields.endDate"
          :value="expenseCycle?.endDate.toFormat(AppDateFormat)"
        />
        <AppFieldValue
          class="col-12 col-md-4"
          :label="labels.fields.sharedWith"
          :value="sharedWithText"
        />
      </div>
      <div class="items-center justify-end q-gutter-md row">
        <AppBtn
          color="secondary"
          flat
          icon="edit"
          :label="labels.editBtn"
          :to="editExpenseCycleRoute"
          type="button"
        />
        <AppBtn color="negative" flat icon="delete" :label="labels.deleteBtn" type="button" />
      </div>
    </AppCard>
    <div class="items-center justify-end q-mt-md row">
      <AppGoBackBtn :fallback-route="goBackRoute" />
    </div>
  </AppPage>
</template>
