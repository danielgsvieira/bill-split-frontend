<script setup lang="ts">
import type { ExpenseCycle } from 'src/models/ExpenseCycle';
import { expenseCycleService } from 'src/services';
import { useApiCall } from 'src/composables';
import { useI18n } from 'vue-i18n';
import { valueOrEmptyIndicator } from 'src/utils';
import { AppBtn, AppPage, AppTable, type AppTableColumns } from 'src/components';
import { type RouteLocationRaw, useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();

const labels = {
  pageTitle: t('expenseCycle.indexPage.pageTitle'),
  createExpenseCycleBtn: t('expenseCycle.indexPage.createExpenseCycleBtn'),
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
    label: t('expenseCycle.fields.title'),
    align: 'left',
  },
  {
    name: 'description',
    field: 'description',
    label: t('expenseCycle.fields.description'),
    align: 'left',
    format: (value) => valueOrEmptyIndicator(value),
  },
  {
    name: 'startDate',
    field: 'startDate',
    label: t('expenseCycle.fields.startDate'),
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    name: 'endDate',
    field: 'endDate',
    label: t('expenseCycle.fields.endDate'),
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    name: 'createdBy',
    field: 'createdBy',
    label: t('expenseCycle.fields.createdBy'),
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
      <AppBtn
        icon="add"
        :label="labels.createExpenseCycleBtn"
        :to="createExpenseCycleRoute"
        type="button"
      />
    </template>
    <AppTable :columns :loading="loading" :rows="expenseCycles ?? []" @row-click="handleRowClick" />
  </AppPage>
</template>
