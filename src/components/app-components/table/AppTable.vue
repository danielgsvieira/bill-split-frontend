<!-- eslint-disable vue/prop-name-casing -->
<!--
  This component is simply a wrapper for the `QTable` component setting some defaults.

  Docs: https://quasar.dev/vue-components/table
-->
<script setup lang="ts" generic="T">
import AppTableColumnManager from './AppTableColumnManager.vue';
import type { AppTableColumns } from './app-table-columns';
import { useI18n } from 'vue-i18n';
import type { VueSlot } from 'src/utils';
import { computed, ref } from 'vue';
import { QTable, type QTableColumn, QTd } from 'quasar';

type BodyCellSlots = Record<`body-cell-${string}`, VueSlot<{ row: T }>>;

type AppTableProps = {
  columns: AppTableColumns<T>;
  defaultVisibleColumns?: string[] | undefined;
  loading?: boolean | undefined;
  manageColumns?: boolean | undefined;
  rows: T[];
  rowsPerPageOptions?: number[];
  useActionsColumn?: boolean;
};
type AppTableEmits = (e: 'rowClick', value: T) => void;
type AppTableSlots = {
  actionCell: VueSlot<{ row: T }>;
} & BodyCellSlots;

const {
  columns,
  defaultVisibleColumns = undefined,
  loading = undefined,
  manageColumns = undefined,
  rows,
  rowsPerPageOptions = [10, 20, 50, 0],
  useActionsColumn = false,
} = defineProps<AppTableProps>();
const emit = defineEmits<AppTableEmits>();
const slots = defineSlots<AppTableSlots>();

const i18n = useI18n();

const visibleColumnsModel = ref(defaultVisibleColumns ?? columns.map((el) => el.name));

const availableColumns = computed(() => {
  return columns.map((el) => {
    return { name: el.name, label: el.label };
  });
});

const tableColumns = computed(() => {
  const result: AppTableColumns<T> = [...columns];

  if (useActionsColumn) {
    result.push({
      align: 'center',
      field: '',
      label: i18n.t('general.table.actionColumnLabel'),
      name: 'actions',
    });
  }

  return result as QTableColumn[];
});

const tableVisibleColumns = computed(() => {
  const visibleColumns = columns
    .filter((el) => visibleColumnsModel.value.includes(el.name))
    .map((el) => el.name);

  if (useActionsColumn) {
    visibleColumns.push('actions');
  }

  return visibleColumns;
});
</script>

<template>
  <QTable
    bordered
    :columns="tableColumns"
    flat
    :loading
    :rows
    :rows-per-page-options
    :visible-columns="tableVisibleColumns"
    @row-click="(_, row) => emit('rowClick', row)"
  >
    <template v-if="manageColumns" #top-right>
      <AppTableColumnManager v-model="visibleColumnsModel" :available-columns />
    </template>
    <template v-for="(_, slotName) in slots" :key="slotName" #[slotName]="slotProps">
      <QTd :props="slotProps">
        <slot v-if="slotName !== 'actionCell'" :name="slotName" v-bind="slotProps" />
      </QTd>
    </template>
    <template v-if="useActionsColumn" #[`body-cell-actions`]="cellProps">
      <QTd :props="cellProps">
        <slot name="actionCell" v-bind="{ row: cellProps.row }" />
      </QTd>
    </template>
  </QTable>
</template>
