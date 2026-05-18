<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import { useI18n } from 'vue-i18n';
import AppInput, { type AppInputProps } from './AppInput.vue';
import { isNullOrUndefined, Money } from 'src/utils';
import { onMounted, ref } from 'vue';

type AppMoneyInputProps = Omit<AppInputProps, 'modelValue'>;

const props = defineProps<AppMoneyInputProps>();

const model = defineModel<Money | null | undefined>();

const i18n = useI18n();

const inputModel = ref(i18n.n(0, 'decimalTwoDigits'));

onMounted(() => {
  if (!isNullOrUndefined(model.value)) {
    inputModel.value = i18n.n(model.value.decimalValue, 'decimalTwoDigits');
  }
});

function handleKeyup() {
  if (typeof inputModel.value !== 'string') {
    return;
  }

  const centsStringValue = inputModel.value.replace(new RegExp('\\D', 'g'), '');
  const centsNumericValue = Number.parseInt(centsStringValue);

  inputModel.value = i18n.n(centsNumericValue / 100, 'decimalTwoDigits');
  model.value = new Money(centsNumericValue);
}
</script>

<template>
  <AppInput v-bind="props" v-model="inputModel" type="text" @keyup="handleKeyup">
    <template #append>
      <AppIcon name="attach_money" />
    </template>
  </AppInput>
</template>
