<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import { computed } from 'vue';
import AppNumberInput, { type AppNumberInputProps } from './AppNumberInput.vue';
import { isNullOrUndefined, Money } from 'src/utils';

type AppMoneyInputModelValue = Money | null | undefined;
type AppMoneyInputProps = Omit<AppNumberInputProps, 'modelValue'>;

const props = defineProps<AppMoneyInputProps>();

const model = defineModel<AppMoneyInputModelValue>();

const internalModel = computed({
  get: () => model.value?.cents ?? null,
  set: (value: number | null | undefined) => {
    model.value = !isNullOrUndefined(value) ? new Money(value) : null;
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
