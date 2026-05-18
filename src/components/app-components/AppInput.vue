<!--
  This component is simply a wrapper for the `QInput` component setting some defaults.
  
  Docs: https://quasar.dev/vue-components/input
-->
<script setup lang="ts">
import type { VNode } from 'vue';
import { QInput, type ValidationRule } from 'quasar';

type InputType =
  | 'text'
  | 'password'
  | 'textarea'
  | 'email'
  | 'search'
  | 'tel'
  | 'file'
  | 'number'
  | 'url'
  | 'time'
  | 'date'
  | 'datetime-local';

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
  step?: number | undefined;
  type?: InputType;
};
type AppInputEmits = (e: 'keyup') => void;
type AppInputSlots = {
  append: () => VNode[];
  prepend: () => VNode[];
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
  step = undefined,
  type = 'text',
} = defineProps<AppInputProps>();
const emit = defineEmits<AppInputEmits>();
const slots = defineSlots<AppInputSlots>();

const model = defineModel<AppInputModelValue>();

export type { AppInputModelValue, AppInputProps };
</script>

<template>
  <QInput
    :id
    v-model="model"
    :debounce
    :disable
    :hint
    :label
    :mask
    :name
    outlined
    :rules
    :step
    :type
    @keyup="emit('keyup')"
  >
    <template v-if="slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
  </QInput>
</template>
