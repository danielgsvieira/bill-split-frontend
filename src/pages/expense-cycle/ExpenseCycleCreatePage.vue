<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { AppPage, ExpenseCycleForm, type ExpenseCycleFormData } from 'src/components';
import { CreateExpenseCycleDto, expenseCycleService } from 'src/services';
import { useApiCall, useToast } from 'src/composables';

const i18n = useI18n();
const router = useRouter();
const toast = useToast();

const labels = {
  pageTitle: i18n.t('expenseCycle.createPage.pageTitle'),
  createSuccessMessage: i18n.t('general.createSuccessMessage'),
};

const { data: createExpenseCycleResult, execute: createExpenseCycle } = useApiCall(
  (dto: CreateExpenseCycleDto) => expenseCycleService.create(dto),
);

async function handleSubmit(data: ExpenseCycleFormData) {
  const { startDate, endDate } = data;
  if (startDate === null || endDate === null) {
    toast.negative(i18n.t('validation.invalidFormData'));
    return;
  }

  const dto = new CreateExpenseCycleDto({
    ...data,
    startDate,
    endDate,
  });
  await createExpenseCycle(dto);

  if (createExpenseCycleResult.value !== null) {
    toast.positive(labels.createSuccessMessage);
    void router.push({
      name: 'expense-cycle-view',
      params: { id: createExpenseCycleResult.value.id },
    });
  }
}
</script>

<template>
  <AppPage :title="labels.pageTitle">
    <ExpenseCycleForm @submit="handleSubmit" />
  </AppPage>
</template>
