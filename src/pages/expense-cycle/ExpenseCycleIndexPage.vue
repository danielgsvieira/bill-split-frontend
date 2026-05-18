<script setup lang="ts">
import type { ExpenseCycle } from 'src/models/ExpenseCycle';
import { expenseCycleService } from 'src/services';
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
void fetchExpenseCycles();

const columns: AppTableColumns<ExpenseCycle> = [
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
    format: (value) => i18n.d(value, 'short'),
  },
  {
    name: 'endDate',
    field: 'endDate',
    label: labels.fields.endDate,
    align: 'center',
    format: (value) => i18n.d(value, 'short'),
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

function handleRowClick(row: ExpenseCycle) {
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
