<script setup lang="ts">
import type { ExpenseCycleListItem } from 'src/models/expense-cycle/ExpenseCycleListItem';
import { expenseCycleService } from 'src/services';
import { onMounted } from 'vue';
import { useApiCall } from 'src/composables';
import { useI18n } from 'vue-i18n';
import { valueOrEmptyIndicator } from 'src/utils';
import { AppBtn, AppPage, AppTable, type AppTableColumns } from 'src/components';
import { type RouteLocationRaw, useRouter } from 'vue-router';

const router = useRouter();
const i18n = useI18n();

const labels = {
  createBtn: i18n.t('general.create'),
  fields: {
    createdBy: i18n.t('expenseCycle.fields.createdBy'),
    description: i18n.t('expenseCycle.fields.description'),
    endDate: i18n.t('expenseCycle.fields.endDate'),
    startDate: i18n.t('expenseCycle.fields.startDate'),
    title: i18n.t('expenseCycle.fields.title'),
  },
  pageTitle: i18n.t('expenseCycle.indexPage.pageTitle'),
};

const {
  data: expenseCycles,
  loading,
  execute: fetchExpenseCycles,
} = useApiCall(() => expenseCycleService.list());

onMounted(() => {
  void fetchExpenseCycles();
});

const columns: AppTableColumns<ExpenseCycleListItem> = [
  {
    name: 'title',
    field: 'title',
    label: labels.fields.title,
    align: 'left',
  },
  {
    name: 'description',
    field: 'description',
    label: labels.fields.description,
    align: 'left',
    format: (value) => valueOrEmptyIndicator(value),
  },
  {
    name: 'startDate',
    field: 'startDate',
    label: labels.fields.startDate,
    align: 'center',
    format: (value) => i18n.d(value.toJSDate(), 'short'),
  },
  {
    name: 'endDate',
    field: 'endDate',
    label: labels.fields.endDate,
    align: 'center',
    format: (value) => i18n.d(value.toJSDate(), 'short'),
  },
  {
    name: 'createdBy',
    field: 'createdBy',
    label: labels.fields.createdBy,
    align: 'center',
    format: (value) => value.displayName,
  },
];

const createExpenseCycleRoute: RouteLocationRaw = { name: 'expense-cycle-create' };

function handleRowClick(row: ExpenseCycleListItem) {
  void router.push({ name: 'expense-cycle-view', params: { id: row.id } });
}
</script>

<template>
  <AppPage :title="labels.pageTitle">
    <template #buttons>
      <AppBtn icon="add" :label="labels.createBtn" :to="createExpenseCycleRoute" type="button" />
    </template>
    <AppTable :columns :loading="loading" :rows="expenseCycles ?? []" @row-click="handleRowClick" />
  </AppPage>
</template>
