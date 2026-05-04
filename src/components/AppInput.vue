<!--
  This component is simply a wrapper for the `QInput` component setting some defaults.
  
  Docs: https://quasar.dev/vue-components/input
-->
<script setup lang="ts">
import type { VNode } from 'vue';
import { QInput, type ValidationRule } from 'quasar';

type AppInputModelValue = string | number | null | undefined;
type AppInputProps = {
  debounce?: number | undefined;
  disable?: boolean | undefined;
  hint?: string | undefined;
  id: string;
  label?: string | undefined;
  mask?: string | undefined;
  name: string;
  rules?: ValidationRule[] | undefined;
};
type AppInputSlots = {
  append: () => VNode[];
};

const {
  debounce = undefined,
  disable = undefined,
  hint = undefined,
  id,
  label = undefined,
  mask = undefined,
  name,
  rules = undefined,
} = defineProps<AppInputProps>();
const slots = defineSlots<AppInputSlots>();

const model = defineModel<AppInputModelValue>();

export type { AppInputProps };
</script>

<template>
  <QInput :id v-model="model" :debounce :disable :hint :label :mask :name outlined :rules>
    <template v-if="slots.append" #append>
      <slot name="append" />
    </template>
  </QInput>
</template>
