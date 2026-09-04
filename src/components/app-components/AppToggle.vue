<!--
  This component is simply a wrapper for the `QToggle` component setting some defaults.

  Docs: https://quasar.dev/vue-components/toggle
-->
<script setup lang="ts" generic="T extends boolean | number | string | object = boolean">
import { QField, QToggle, type QToggleProps, type ValidationRule } from 'quasar';

type AppToggleProps = {
  checkedIcon?: string | undefined;
  color?: QToggleProps['color'];
  falseValue?: T;
  indeterminateValue?: T;
  label?: string | undefined;
  leftLabel?: boolean | undefined;
  rules?: ValidationRule[] | undefined;
  trueValue?: T;
  uncheckedIcon?: string | undefined;
};

const {
  checkedIcon = undefined,
  color = 'accent',
  falseValue = false,
  indeterminateValue = undefined,
  label = undefined,
  leftLabel = false,
  rules = undefined,
  trueValue = true,
  uncheckedIcon = undefined,
} = defineProps<AppToggleProps>();

const model = defineModel<T | null | undefined>();
</script>

<template>
  <QField v-model="model" borderless :rules>
    <QToggle
      v-model="model"
      :checked-icon
      :color
      :false-value
      :indeterminate-value
      :label
      :left-label
      :true-value
      :unchecked-icon
    />
  </QField>
</template>

<style scoped lang="scss">
:deep(.q-field__control) {
  color: inherit !important;
}
</style>
