<script setup lang="ts">
import type { DateTime } from 'luxon';
import type { Expense } from 'src/models/Expense';
import type { ExpenseCycle } from 'src/models/ExpenseCycle';
import ExpenseCycleUsersInput from './ExpenseCycleUsersInput.vue';
import type { RouteLocationRaw } from 'vue-router';
import { useForm } from 'src/composables';
import { useI18n } from 'vue-i18n';
import type { User } from 'src/models/User';
import {
  AppBtn,
  AppDatePicker,
  AppForm,
  AppGoBackBtn,
  AppInput,
  AppMoneyInput,
  AppToggle,
} from '../../app-components';
import { Money, validation } from 'src/utils';
import { onMounted, watch } from 'vue';

type ExpenseFormData = {
  description: string;
  date: DateTime | null;
  isProportional: boolean;
  price: Money;
  paidBy: User | null;
  sharedBetween: User[];
};
type ExpenseFormProps = {
  expense?: Expense | null;
  expenseCycle: ExpenseCycle;
  onSubmit: (data: ExpenseFormData) => Promise<void> | void;
};

const { expense = null, expenseCycle, onSubmit } = defineProps<ExpenseFormProps>();

const i18n = useI18n();

const labels = {
  inputs: {
    date: i18n.t('expense.fields.date'),
    description: i18n.t('expense.fields.description'),
    isProportional: i18n.t('expense.fields.isProportional'),
    paidBy: i18n.t('expense.fields.paidBy'),
    sharedBetween: i18n.t('expense.fields.sharedBetween'),
    price: i18n.t('expense.fields.price'),
  },
  submitBtn: i18n.t('general.save'),
};

const { formData, submitting, submit } = useForm<ExpenseFormData>({
  initialValue: {
    description: '',
    date: null,
    isProportional: false,
    price: new Money(0),
    paidBy: null,
    sharedBetween: [],
  },
  submit: async (data) => {
    await onSubmit(data);
  },
});

const rules = {
  description: [validation.required(), validation.length(1, 255)],
  date: [
    validation.required(),
    validation.minDate(expenseCycle.startDate),
    validation.maxDate(expenseCycle.endDate),
  ],
  value: [validation.required(), validation.minNumber(0.01)],
  paidBy: [validation.required()],
  sharedBetween: [validation.required()],
};

function fillExpenseData(newValue: Expense) {
  formData.value = {
    description: newValue.description,
    date: newValue.date,
    isProportional: newValue.isProportional,
    price: new Money(newValue.price.valueInCents),
    paidBy: newValue.paidBy,
    sharedBetween: [...newValue.sharedBetween],
  };
}

onMounted(() => {
  if (expense !== null) {
    fillExpenseData(expense);
  }
});

watch(
  () => expense,
  (newValue) => {
    if (newValue !== null) {
      fillExpenseData(newValue);
    }
  },
);

const goBackRoute: RouteLocationRaw = {
  name: 'expense-cycle-view',
  params: { id: expenseCycle.id },
};

export type { ExpenseFormData };
</script>

<template>
  <AppForm class="q-col-gutter-md row" @submit="submit">
    <AppInput
      id="input_description"
      v-model="formData.description"
      class="col-12 col-md-8"
      :label="labels.inputs.description"
      name="description"
      :rules="rules.description"
    />
    <AppDatePicker
      id="input_date"
      v-model="formData.date"
      class="col-12 col-md-4"
      :label="labels.inputs.date"
      name="startDate"
      :rules="rules.date"
    />
    <AppMoneyInput
      id="input_value"
      v-model="formData.price"
      class="col-12 col-md-3"
      :label="labels.inputs.price"
      name="value"
      :rules="rules.value"
      :step="0.01"
    />
    <ExpenseCycleUsersInput
      id="input_paidBy"
      v-model="formData.paidBy"
      class="col-12 col-md-3"
      :expense-cycle-id="expenseCycle.id"
      :label="labels.inputs.paidBy"
      name="paidBy"
      :rules="rules.paidBy"
    />
    <ExpenseCycleUsersInput
      id="input_sharedBetween"
      v-model="formData.sharedBetween"
      class="col-12 col-md-6"
      :expense-cycle-id="expenseCycle.id"
      :label="labels.inputs.sharedBetween"
      multiple
      name="sharedBetween"
      :rules="rules.sharedBetween"
    />
    <AppToggle
      v-model="formData.isProportional"
      class="col-12"
      :label="labels.inputs.isProportional"
    />
    <div class="col-12">
      <div class="items-center justify-end q-gutter-x-md row">
        <AppGoBackBtn :fallback-route="goBackRoute" />
        <AppBtn :label="labels.submitBtn" :loading="submitting" type="submit" />
      </div>
    </div>
  </AppForm>
</template>
