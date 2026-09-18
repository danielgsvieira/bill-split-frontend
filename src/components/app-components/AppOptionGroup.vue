<!--
  This component is simply a wrapper for the `QOptionGroup` component setting some defaults.
  
  Docs: https://quasar.dev/vue-components/option-group
-->
<script setup lang="ts" generic="T extends object | string | number">
import { QField, QOptionGroup, type QOptionGroupProps, type ValidationRule } from 'quasar';

type AppOptionGroupOption = {
  id: string | number;
  label: string;
  value: T;
};

type AppOptionGroupProps = {
  color?: QOptionGroupProps['color'];
  dense?: boolean | undefined;
  disable?: boolean | undefined;
  hint?: string | undefined;
  id: string;
  inline?: boolean | undefined;
  label?: string | undefined;
  leftLabel?: boolean | undefined;
  name: string;
  options: AppOptionGroupOption[];
  rules?: ValidationRule[] | undefined;
  type?: 'radio' | 'checkbox' | 'toggle';
};
type AppOptionGroupModelType = T | null | undefined;

const {
  color = 'accent',
  dense = undefined,
  disable = undefined,
  hint = undefined,
  id,
  inline = undefined,
  label = undefined,
  leftLabel = undefined,
  name,
  options,
  rules = undefined,
  type = undefined,
} = defineProps<AppOptionGroupProps>();

const model = defineModel<AppOptionGroupModelType>();
</script>

<template>
  <QField v-model="model" borderless :rules>
    <QOptionGroup
      :id
      v-model="model"
      :color
      :dense
      :disable
      :hint
      :inline
      :label
      :left-label
      :name
      option-label="label"
      option-value="value"
      :options="options"
      :type
    />
  </QField>
</template>

<style scoped lang="scss">
:deep(.q-field__control) {
  color: inherit !important;
}
</style>
