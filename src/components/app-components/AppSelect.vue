<script setup lang="ts" generic="T extends object | string | number">
import { useI18n } from 'vue-i18n';
import type { VueSlot } from 'src/utils';
import { QItem, QItemSection, QSelect, type ValidationRule } from 'quasar';
import { ref, watch } from 'vue';

type FilterFnUpdate = (callback: () => void) => void;

type AppSelectOption = {
  id: string | number;
  label: string;
  value: T;
};

type AppSelectProps = {
  clearable?: boolean | undefined;
  disable?: boolean | undefined;
  hint?: string | undefined;
  id: string;
  label?: string | undefined;
  loading?: boolean | undefined;
  multiple?: boolean | undefined;
  name: string;
  options: AppSelectOption[];
  rules?: ValidationRule[] | undefined;
  useChips?: boolean | undefined;
};
type AppSelectSlots = {
  selectedItem: VueSlot<{
    option: AppSelectOption;
    selected: boolean;
    removeAtIndex: (index: number) => void;
    toggleOption: (opt: AppSelectOption) => void;
  }>;
};
type AppSelectModelType = T | T[] | null | undefined;

const {
  clearable = true,
  disable = undefined,
  hint = undefined,
  id,
  label = undefined,
  loading = undefined,
  multiple = undefined,
  name,
  options,
  rules = undefined,
  useChips = undefined,
} = defineProps<AppSelectProps>();
const slots = defineSlots<AppSelectSlots>();

const model = defineModel<AppSelectModelType>();

const i18n = useI18n();

const filteredOptions = ref(options);

function filterFn(searchStr: string, update: FilterFnUpdate) {
  if (searchStr.length < 1) {
    update(() => {
      filteredOptions.value = options;
    });

    return;
  }

  update(() => {
    const needle = searchStr.toLowerCase();
    filteredOptions.value = options.filter((el) => el.label.toLowerCase().includes(needle));
  });
}

watch(
  () => options,
  (newValue) => {
    filteredOptions.value = newValue;
  },
);
</script>

<template>
  <QSelect
    :id
    v-model="model"
    :clearable
    :disable
    emit-value
    :hint
    input-debounce="250"
    :label
    :loading
    map-options
    :multiple
    :name
    option-label="label"
    option-value="value"
    :options="filteredOptions"
    outlined
    :rules
    :use-chips="useChips ?? multiple === true"
    use-input
    @filter="filterFn"
  >
    <template #no-option>
      <QItem>
        <QItemSection class="opacity-60 text-italic">
          {{ i18n.t('general.noResults') }}
        </QItemSection>
      </QItem>
    </template>
    <template
      v-if="slots['selectedItem']"
      #[`selected-item`]="{ opt, selected, removeAtIndex, toggleOption }"
    >
      <slot name="selectedItem" v-bind="{ option: opt, selected, removeAtIndex, toggleOption }" />
    </template>
  </QSelect>
</template>
