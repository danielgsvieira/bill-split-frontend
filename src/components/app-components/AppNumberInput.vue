<script setup lang="ts">
import type { VueSlot } from 'src/utils';
import AppInput, { type AppInputProps } from './AppInput.vue';

type AppNumberInputModelValue = number | null | undefined;
type AppNumberInputProps = Omit<AppInputProps, 'modelValue' | 'type'>;
type AppNumberInputSlots = {
  append: VueSlot;
  prepend: VueSlot;
};

const props = defineProps<AppNumberInputProps>();
const slots = defineSlots<AppNumberInputSlots>();

const model = defineModel<AppNumberInputModelValue>();

export type { AppNumberInputProps };
</script>

<template>
  <AppInput v-bind="props" v-model.number="model" type="number">
    <template v-if="slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
  </AppInput>
</template>
