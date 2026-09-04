<script setup lang="ts" generic="T extends object | string | number">
import { ref } from 'vue';
import { QSelect, type ValidationRule } from 'quasar';

type AppAutocompleteProps = {
  autocompleteFn: (value: string) => Promise<string[]> | string[];
  clearable?: boolean | undefined;
  disable?: boolean | undefined;
  hint?: string | undefined;
  id: string;
  label?: string | undefined;
  name: string;
  rules?: ValidationRule[] | undefined;
};
type AppAutocompleteModelType = string | null | undefined;

const {
  autocompleteFn,
  clearable = true,
  disable = undefined,
  hint = undefined,
  id,
  label = undefined,
  name,
  rules = undefined,
} = defineProps<AppAutocompleteProps>();

const model = defineModel<AppAutocompleteModelType>();

const options = ref<string[]>([]);

function setModel(value: AppAutocompleteModelType) {
  model.value = value;
}

function handleFilter(
  value: string,
  update: (callbackFn: () => Promise<void> | void, afterFn?: (ref: QSelect) => void) => void,
  abortFn: () => void,
) {
  if (value.length < 2) {
    abortFn();
    return;
  }

  update(async () => {
    options.value = await autocompleteFn(value);
  });
}
</script>

<template>
  <QSelect
    :id
    :clearable
    :disable
    fill-input
    hide-dropdown-icon
    hide-selected
    :hint
    input-debounce="250"
    :label
    :model-value="model"
    :name
    :options
    outlined
    :rules
    use-input
    @filter="handleFilter"
    @input-value="setModel"
  />
</template>
