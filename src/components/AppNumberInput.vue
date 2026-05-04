<script setup lang="ts">
import AppInput, { type AppInputProps } from './AppInput.vue';

type AppNumberInputModelValue = number | null | undefined;
type AppNumberInputProps = Omit<AppInputProps, 'modelValue'>;

const props = defineProps<AppNumberInputProps>();

const model = defineModel<AppNumberInputModelValue>();

export type { AppNumberInputProps };
</script>

<template>
  <AppInput v-bind="props" v-model.number="model" />
</template>
