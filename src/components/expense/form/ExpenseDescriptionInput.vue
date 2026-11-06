<script setup lang="ts">
import { AppAutocomplete } from 'src/components/app-components';
import { expenseService } from 'src/services';
import type { ValidationRule } from 'quasar';

type ExpenseDescriptionInputProps = {
  autofocus?: boolean | undefined;
  id: string;
  label?: string | undefined;
  name: string;
  rules?: ValidationRule[] | undefined;
};

const {
  id,
  autofocus = undefined,
  label = undefined,
  name,
  rules = undefined,
} = defineProps<ExpenseDescriptionInputProps>();

const autocompleteFn = (value: string) => {
  return expenseService.getDescriptionAutocomplete(value);
};
</script>

<template>
  <AppAutocomplete :id :autocomplete-fn :autofocus :label :name :rules />
</template>
