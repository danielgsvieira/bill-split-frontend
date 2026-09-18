<script setup lang="ts">
import AppBtn from '../AppBtn.vue';
import AppCard from '../AppCard.vue';
import AppOptionGroup from '../AppOptionGroup.vue';
import AppSeparator from '../AppSeparator.vue';
import AppToggle from '../AppToggle.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { QMenu, useQuasar } from 'quasar';

type AvailableColumnsData = { name: string; label: string };

type AppTableSettingsProps = {
  availableColumns: AvailableColumnsData[];
};

type AppTableSettingsModel = {
  visibleColumns: string[];
  gridMode: boolean;
};

const { availableColumns } = defineProps<AppTableSettingsProps>();

const model = defineModel<AppTableSettingsModel>({ required: true });

const i18n = useI18n();
const quasar = useQuasar();

const labels = {
  visibleColumns: i18n.t('general.table.settings.visibleColumns'),
  visualizationMode: {
    grid: i18n.t('general.table.settings.visualizationMode.grid'),
    row: i18n.t('general.table.settings.visualizationMode.row'),
    title: i18n.t('general.table.settings.visualizationMode.title'),
  },
};

function isColumnVisible(colName: string) {
  return model.value.visibleColumns.includes(colName);
}

function setColumnVisibility(colName: string, value: boolean | null | undefined) {
  const modelIncludesColumn = model.value.visibleColumns.includes(colName);

  if (value === true) {
    if (!modelIncludesColumn) {
      model.value.visibleColumns = [...model.value.visibleColumns, colName];
    }

    return;
  }

  if (modelIncludesColumn) {
    model.value.visibleColumns = model.value.visibleColumns.filter((el) => el !== colName);
  }
}

const visualizationModeOptions = [
  {
    id: 'row',
    label: labels.visualizationMode.row,
    value: 'row',
  },
  {
    id: 'grid',
    label: labels.visualizationMode.grid,
    value: 'grid',
  },
];

const visualizationModeModel = computed({
  get: () => (model.value.gridMode ? 'grid' : 'row'),
  set: (value: 'grid' | 'row') => {
    model.value.gridMode = value === 'grid';
  },
});
</script>

<template>
  <div>
    <AppBtn flat icon="settings" round size="sm" type="button" />
    <QMenu anchor="bottom right" self="top right">
      <AppCard>
        <h6 class="q-ma-none text-h6">{{ labels.visualizationMode.title }}</h6>
        <AppOptionGroup
          :id="(Math.random() * 10000).toString()"
          v-model="visualizationModeModel"
          inline
          name="options_app_table_visualization"
          :options="visualizationModeOptions"
        />
        <AppSeparator spaced />
        <h6 class="q-ma-none text-h6">{{ labels.visibleColumns }}</h6>
        <div
          class="column-setting-menu-container"
          :class="quasar.screen.lt.sm ? 'one-column' : 'two-columns'"
        >
          <AppToggle
            v-for="(column, index) in availableColumns"
            :key="index"
            class="text-no-wrap"
            :label="column.label"
            :model-value="isColumnVisible(column.name)"
            @update:model-value="(value) => setColumnVisibility(column.name, value)"
          />
        </div>
      </AppCard>
    </QMenu>
  </div>
</template>

<style scoped lang="scss">
.column-setting-menu-container {
  max-width: $breakpoint-sm-min;

  display: grid;
  gap: 0 0.5rem;

  &.one-column {
    grid-template-columns: 1fr;
  }

  &.two-columns {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
