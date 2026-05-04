<script setup lang="ts">
import { AppPage } from 'src/components';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { CreateExpenseCycleDto, expenseCycleService } from 'src/services';
import { ExpenseCycleForm, type ExpenseCycleFormData } from '../components';
import { useApiCall, useToast } from 'src/composables';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();

const labels = {
  pageTitle: t('expenseCycle.createPage.pageTitle'),
  submitBtn: t('expenseCycle.createPage.submitBtn'),
};

const { data: createdExpenseCycle, execute: createExpenseCycle } = useApiCall(
  (dto: CreateExpenseCycleDto) => expenseCycleService.create(dto),
);

async function handleSubmit(data: ExpenseCycleFormData) {
  const { startDate, endDate } = data;
  if (startDate === null || endDate === null) {
    toast.negative(t('validation.invalidFormData'));
    return;
  }

  const dto = new CreateExpenseCycleDto({
    ...data,
    startDate,
    endDate,
  });
  await createExpenseCycle(dto);

  if (createdExpenseCycle.value !== null) {
    void router.push({ name: 'expense-cycle-view', params: { id: createdExpenseCycle.value.id } });
  }
}
</script>

<template>
  <AppPage :title="labels.pageTitle">
    <ExpenseCycleForm :submit-btn-label="labels.submitBtn" @submit="handleSubmit" />
  </AppPage>
</template>
