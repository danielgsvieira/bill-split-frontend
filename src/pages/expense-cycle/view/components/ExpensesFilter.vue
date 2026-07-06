<script setup lang="ts">
import type { ExpenseCycleUser } from 'src/models/expense-cycle/ExpenseCycleUser';
import ExpenseCycleUsersInput from 'components/expense/form/ExpenseCycleUsersInput.vue';
import { useI18n } from 'vue-i18n';
import { AppForm, AppInput } from 'components';

type ExpenseFilterValues = {
  description: string;
  paidBy: ExpenseCycleUser | null;
  includesUser: ExpenseCycleUser[];
};
type ExpenseFormProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseFormProps>();
const formData = defineModel<ExpenseFilterValues>({ required: true });

const i18n = useI18n();

const labels = {
  inputs: {
    description: i18n.t('expense.fields.description'),
    paidBy: i18n.t('expense.fields.paidBy'),
    includesUser: i18n.t('expenseCycle.viewPage.expensesFilter.includesUser'),
  },
};

export type { ExpenseFilterValues };
</script>

<template>
  <AppForm class="q-col-gutter-md row">
    <AppInput
      id="input_description"
      v-model="formData.description"
      class="col-12 col-md-6"
      :label="labels.inputs.description"
      name="description"
    />
    <ExpenseCycleUsersInput
      id="input_paidBy"
      v-model="formData.paidBy"
      class="col-12 col-md-3"
      :expense-cycle-id="expenseCycleId"
      :label="labels.inputs.paidBy"
      name="paidBy"
    />
    <ExpenseCycleUsersInput
      id="input_includesUser"
      v-model="formData.includesUser"
      class="col-12 col-md-3"
      :expense-cycle-id="expenseCycleId"
      :label="labels.inputs.includesUser"
      multiple
      name="includesUser"
    />
  </AppForm>
</template>
