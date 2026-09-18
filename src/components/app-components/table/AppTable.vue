<!--
  This component is simply a wrapper for the `QTable` component setting some defaults.

  Docs: https://quasar.dev/vue-components/table
-->
<script setup lang="ts" generic="T">
import AppFieldValue from '../AppFieldValue.vue';
import AppTableSettings from './AppTableSettings.vue';
import { useI18n } from 'vue-i18n';
import type { VueSlot } from 'src/utils';
import type { AppTableColumnAlignment, AppTableColumns } from './app-table-columns';
import { computed, ref } from 'vue';
import { QCard, QCardSection, QTable, type QTableColumn, QTd, useQuasar } from 'quasar';

type ItemSlotPropsCols = {
  align: AppTableColumnAlignment;
  field: string;
  gridColClass?: string;
  label: string;
  name: string;
  value: string | number | null | undefined;
}[];
type ItemSlotProps = {
  cols: ItemSlotPropsCols;
  row: T;
};
type BodyCellSlots = Record<`body-cell-${string}`, VueSlot<{ row: T }>>;

type AppTableProps = {
  columns: AppTableColumns<T>;
  grid?: boolean | undefined;
  loading?: boolean | undefined;
  manageColumns?: boolean | undefined;
  rows: T[];
  rowsPerPageOptions?: number[];
  useActionsColumn?: boolean;
};
type AppTableEmits = (e: 'rowClick', value: T) => void;
type AppTableSlots = {
  actionCell: VueSlot<{ row: T; gridMode: boolean }>;
} & BodyCellSlots;

const {
  columns,
  grid = undefined,
  loading = undefined,
  manageColumns = true,
  rows,
  rowsPerPageOptions = [10, 20, 50, 0],
  useActionsColumn = false,
} = defineProps<AppTableProps>();
const emit = defineEmits<AppTableEmits>();
const slots = defineSlots<AppTableSlots>();

const i18n = useI18n();
const quasar = useQuasar();

const tableSettingsModel = ref({
  visibleColumns: columns.map((el) => el.name),
  gridMode: grid ?? quasar.screen.lt.sm,
});

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
    .filter((el) => tableSettingsModel.value.visibleColumns.includes(el.name))
    .map((el) => el.name);

  if (useActionsColumn) {
    visibleColumns.push('actions');
  }

  return visibleColumns;
});
</script>

<template>
  <!--
    The `key` atribute Forces a full table re-render when switching between table and grid modes.
    Without this, Quasar's internal grid renderer causes the first few items to misalign.
  -->
  <QTable
    :key="String(tableSettingsModel.gridMode)"
    bordered
    :class="{ 'app-table': !tableSettingsModel.gridMode }"
    :columns="tableColumns"
    flat
    :grid="tableSettingsModel.gridMode"
    :loading
    :rows
    :rows-per-page-options
    :virtual-scroll="!tableSettingsModel.gridMode"
    :visible-columns="tableVisibleColumns"
    @row-click="(_, row) => emit('rowClick', row)"
  >
    <template v-if="manageColumns" #top-right>
      <AppTableSettings v-model="tableSettingsModel" :available-columns />
    </template>

    <template v-for="(_, slotName) in slots" :key="slotName" #[slotName]="slotProps">
      <QTd :props="slotProps">
        <slot v-if="slotName !== 'actionCell'" :name="slotName" v-bind="slotProps" />
      </QTd>
    </template>
    <template v-if="useActionsColumn" #[`body-cell-actions`]="cellProps">
      <QTd :props="cellProps">
        <slot
          name="actionCell"
          v-bind="{ row: cellProps.row, gridMode: tableSettingsModel.gridMode }"
        />
      </QTd>
    </template>

    <template v-if="tableSettingsModel.gridMode" #item="itemSlotProps: ItemSlotProps">
      <div class="col-md-4 col-sm-6 col-xs-12 q-pa-xs" @click="emit('rowClick', itemSlotProps.row)">
        <QCard bordered flat>
          <QCardSection>
            <div class="q-col-gutter-sm row">
              <template
                v-for="col in itemSlotProps.cols.filter((c) => c.name !== 'actions')"
                :key="col.name"
              >
                <div :class="col.gridColClass ?? 'col-12'">
                  <template v-if="slots[`body-cell-${col.name}`]">
                    <label class="opacity-60 text-body2 text-weight-medium">
                      {{ col.label }}
                    </label>
                    <slot :name="`body-cell-${col.name}`" v-bind="{ row: itemSlotProps.row }" />
                  </template>
                  <template v-else>
                    <AppFieldValue :label="col.label" :value="col.value" />
                  </template>
                </div>
              </template>
              <div class="col-12 justify-end">
                <slot
                  name="actionCell"
                  v-bind="{ row: itemSlotProps.row, gridMode: tableSettingsModel.gridMode }"
                />
              </div>
            </div>
          </QCardSection>
        </QCard>
      </div>
    </template>
  </QTable>
</template>

<style scoped lang="css">
.app-table {
  max-height: 80vh;
}

:deep(.q-table__middle) {
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem; /* Height for horizontal scrollbars */
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--q-primary);
    border-radius: 0.25rem;
  }

  /* Handle hover state */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--q-accent); /* Darkens on hover */
  }
}
</style>
