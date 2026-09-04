<script setup lang="ts">
import AppBtn from '../AppBtn.vue';
import AppCard from '../AppCard.vue';
import AppToggle from '../AppToggle.vue';
import { QMenu } from 'quasar';
import { useI18n } from 'vue-i18n';

type AvailablecolumnData = { name: string; label: string };

type AppTableColumnManagerProps = {
  availableColumns: AvailablecolumnData[];
};

const { availableColumns } = defineProps<AppTableColumnManagerProps>();

const model = defineModel<string[]>({ required: true });

const i18n = useI18n();

function isColumnVisible(colName: string) {
  return model.value.includes(colName);
}

function setColumnVisibility(colName: string, value: boolean | null | undefined) {
  const modelIncludesColumn = model.value.includes(colName);

  if (value === true) {
    if (!modelIncludesColumn) {
      model.value = [...model.value, colName];
    }

    return;
  }

  if (modelIncludesColumn) {
    model.value = model.value.filter((el) => el !== colName);
  }
}
</script>

<template>
  <div>
    <AppBtn flat icon="settings" round size="sm" type="button" />
    <QMenu anchor="bottom right" self="top right">
      <AppCard :title="i18n.t('general.table.visibleColumnsMenu.title')">
        <div class="column-setting-menu-container">
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
  grid-template-columns: 1fr 1fr;
  gap: 0 0.5rem;
}
</style>
