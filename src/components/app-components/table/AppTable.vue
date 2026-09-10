<!-- eslint-disable vue/prop-name-casing -->
<!--
  This component is simply a wrapper for the `QTable` component setting some defaults.

  Docs: https://quasar.dev/vue-components/table
-->
<script setup lang="ts" generic="T">
import AppFieldValue from '../AppFieldValue.vue';
import AppTableColumnManager from './AppTableColumnManager.vue';
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
  defaultVisibleColumns?: string[] | undefined;
  grid?: boolean | undefined;
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
  grid = undefined,
  loading = undefined,
  manageColumns = undefined,
  rows,
  rowsPerPageOptions = [10, 20, 50, 0],
  useActionsColumn = false,
} = defineProps<AppTableProps>();
const emit = defineEmits<AppTableEmits>();
const slots = defineSlots<AppTableSlots>();

const i18n = useI18n();
const quasar = useQuasar();

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

const enableGridMode = computed(() => {
  return grid ?? quasar.screen.lt.sm;
});
</script>

<template>
  <QTable
    bordered
    :columns="tableColumns"
    flat
    :grid="enableGridMode"
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

    <template v-if="enableGridMode" #item="itemSlotProps: ItemSlotProps">
      <div class="col-md-4 col-sm-6 col-xs-12 q-pa-xs" @click="emit('rowClick', itemSlotProps.row)">
        <QCard bordered flat>
          <QCardSection>
            <div class="q-col-gutter-md row">
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
                <slot name="actionCell" v-bind="{ row: itemSlotProps.row }" />
              </div>
            </div>
          </QCardSection>
        </QCard>
      </div>
    </template>
  </QTable>
</template>
