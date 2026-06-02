<script setup lang="ts">
import { AppFieldValue } from '../app-components';
import { computed } from 'vue';
import type { Expense } from 'src/models/expense/Expense';
import { useI18n } from 'vue-i18n';

type ExpenseViwProps = {
  expense: Expense;
};

const { expense } = defineProps<ExpenseViwProps>();

const i18n = useI18n();

const labels = {
  fields: {
    date: i18n.t('expense.fields.date'),
    description: i18n.t('expense.fields.description'),
    isProportional: i18n.t('expense.fields.isProportional'),
    paidBy: i18n.t('expense.fields.paidBy'),
    sharedBetween: i18n.t('expense.fields.sharedBetween'),
    value: i18n.t('expense.fields.price'),
  },
  no: i18n.t('general.no'),
  yes: i18n.t('general.yes'),
};

const sharedBetweenText = computed(() =>
  expense.sharedBetween.map((el) => el.displayName).join(', '),
);
</script>

<template>
  <div class="items-center q-col-gutter-sm row">
    <AppFieldValue
      class="col-12 col-lg-4 col-md-6"
      :label="labels.fields.description"
      :value="expense.description"
    />
    <AppFieldValue
      class="col-6 col-lg col-md-3"
      :label="labels.fields.date"
      :value="i18n.d(expense.date.toJSDate(), 'short')"
    />
    <AppFieldValue
      class="col-6 col-lg col-md-3"
      :label="labels.fields.value"
      :value="i18n.n(expense.price.decimalValue, 'currency')"
    />
    <AppFieldValue
      class="col-6 col-lg col-md-3"
      :label="labels.fields.isProportional"
      :value="expense.isProportional ? labels.yes : labels.no"
    />
    <AppFieldValue
      class="col-6 col-lg col-md-3"
      :label="labels.fields.paidBy"
      :value="expense.paidBy.displayName"
    />
    <AppFieldValue
      class="col-12 col-lg-3 col-md-6"
      :label="labels.fields.sharedBetween"
      :value="sharedBetweenText"
    />
  </div>
</template>
