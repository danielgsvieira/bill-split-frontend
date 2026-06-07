<!-- eslint-disable vue/prop-name-casing -->
<!--
  This component is simply a wrapper for the `QTable` component setting some defaults.

  Docs: https://quasar.dev/vue-components/table
-->
<script setup lang="ts" generic="T">
import type { AppTableColumns } from './app-table-columns';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { VueSlot } from 'src/utils';
import { QTable, type QTableColumn, QTd, useQuasar } from 'quasar';

// TODO: Fix action column slot not working on mobile/grid version

type AppTableProps = {
  columns: AppTableColumns<T>;
  grid?: boolean | undefined;
  loading?: boolean | undefined;
  rows: T[];
  rowsPerPageOptions?: number[];
  useActionsColumn?: boolean;
};
type AppTableEmits = (e: 'rowClick', value: T) => void;
type AppTableSlots = {
  actionCell: VueSlot<{ row: T }>;
};

const {
  columns,
  grid = undefined,
  loading = undefined,
  rows,
  rowsPerPageOptions = [10, 20, 50, 0],
  useActionsColumn = false,
} = defineProps<AppTableProps>();
const emit = defineEmits<AppTableEmits>();
defineSlots<AppTableSlots>();

const i18n = useI18n();
const quasar = useQuasar();

const tableColumns = computed(() => {
  const result: AppTableColumns<T> = [...columns];

  if (useActionsColumn) {
    result.push({
      align: 'center',
      field: '' as keyof T,
      label: i18n.t('general.table.actionColumnLabel'),
      name: 'actions',
    });
  }

  return result as QTableColumn[];
});
</script>

<template>
  <QTable
    bordered
    :columns="tableColumns"
    flat
    :grid="grid ?? quasar.screen.lt.md"
    :loading
    :rows
    :rows-per-page-options
    @row-click="(_, row) => emit('rowClick', row)"
  >
    <template v-if="useActionsColumn" #[`body-cell-actions`]="cellProps">
      <QTd :props="cellProps">
        <slot name="actionCell" v-bind="{ row: cellProps.row }" />
      </QTd>
    </template>
  </QTable>
</template>
