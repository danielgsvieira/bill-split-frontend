<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import { computed } from 'vue';
import { Money } from 'src/utils';
import AppNumberInput, { type AppNumberInputProps } from './AppNumberInput.vue';

type AppMoneyInputModelValue = Money | null | undefined;
type AppMoneyInputProps = Omit<AppNumberInputProps, 'modelValue'>;

const props = defineProps<AppMoneyInputProps>();

const model = defineModel<AppMoneyInputModelValue>();

const internalModel = computed({
  get: () => model.value?.cents ?? null,
  set: (value: number | null | undefined) => {
    model.value = value !== null && value !== undefined ? new Money(value) : null;
  },
});
</script>

<template>
  <AppNumberInput v-bind="props" v-model="internalModel">
    <template #prepend>
      <AppIcon name="attach_money" />
    </template>
  </AppNumberInput>
</template>
