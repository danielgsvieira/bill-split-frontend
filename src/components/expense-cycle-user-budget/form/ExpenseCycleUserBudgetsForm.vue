<script setup lang="ts">
import type { ExpenseCycleUserBudget } from 'src/models/expense-cycle/ExpenseCycleUserBudget';
import type { RouteLocationRaw } from 'vue-router';
import { useForm } from 'src/composables';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import { AppBtn, AppForm, AppGoBackBtn, AppMoneyInput } from '../../app-components';
import { Money, validation } from 'src/utils';

type ExpenseCycleUserBudgetsFormData = {
  budgets: ExpenseCycleUserBudget[];
};

type ExpenseCycleUserBudgetsFormProps = {
  expenseCycleId: number;
  onSubmit: (data: ExpenseCycleUserBudgetsFormData) => Promise<void> | void;
  userBudgets: ExpenseCycleUserBudget[];
};

const { expenseCycleId, onSubmit, userBudgets } = defineProps<ExpenseCycleUserBudgetsFormProps>();

const i18n = useI18n();

const labels = {
  submitBtn: i18n.t('general.save'),
};

const { formData, submitting, submit } = useForm<ExpenseCycleUserBudgetsFormData>({
  initialValue: {
    budgets: [],
  },
  submit: async (data) => {
    await onSubmit(data);
  },
});

watch(
  () => userBudgets,
  (newValue) => {
    formData.value = { budgets: newValue };
  },
);

const fieldRules = [validation.required(), validation.minMoney(new Money(1))];

const goBackRoute: RouteLocationRaw = {
  name: 'expense-cycle-view',
  params: { id: expenseCycleId },
};

export type { ExpenseCycleUserBudgetsFormData };
</script>

<template>
  <AppForm @submit="submit">
    <div class="q-col-gutter-md row">
      <AppMoneyInput
        v-for="budgetFormData in formData.budgets"
        :id="`input_budget_${budgetFormData.id}_value`"
        :key="budgetFormData.id"
        v-model="budgetFormData.value"
        class="col-12 col-md-3"
        :label="budgetFormData.user.displayName"
        :name="`input_budget_${budgetFormData.id}_value`"
        :rules="fieldRules"
      />
    </div>
    <div class="col-12">
      <div class="items-center justify-end q-gutter-x-md row">
        <AppGoBackBtn :fallback-route="goBackRoute" />
        <AppBtn :label="labels.submitBtn" :loading="submitting" type="submit" />
      </div>
    </div>
  </AppForm>
</template>
