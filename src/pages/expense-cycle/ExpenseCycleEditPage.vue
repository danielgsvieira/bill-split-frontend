<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { AppPage, ExpenseCycleForm, type ExpenseCycleFormData } from 'src/components';
import { EditExpenseCycleDto, expenseCycleService } from 'src/services';
import { useApiCall, useToast } from 'src/composables';

type ExpenseCycleEditPageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCycleEditPageProps>();

const { t } = useI18n();
const toast = useToast();

const labels = {
  pageTitle: t('expenseCycle.editPage.pageTitle'),
  editSuccessMessage: t('general.editSuccessMessage'),
};

const {
  data: expenseCycle,
  loading: loadingExpenseCycle,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));
void fetchExpenseCycle();

const { data: editedExpenseCycle, execute: editExpenseCycle } = useApiCall(
  (dto: EditExpenseCycleDto) => expenseCycleService.edit(dto),
);

async function handleSubmit(data: ExpenseCycleFormData) {
  const { startDate, endDate } = data;
  if (startDate === null || endDate === null) {
    toast.negative(t('validation.invalidFormData'));
    return;
  }

  const dto = new EditExpenseCycleDto({
    ...data,
    id: expenseCycleId,
    startDate,
    endDate,
  });
  await editExpenseCycle(dto);

  if (editedExpenseCycle.value !== null) {
    expenseCycle.value = editedExpenseCycle.value;
    toast.positive(labels.editSuccessMessage);
  }
}

export type { ExpenseCycleEditPageProps };
</script>

<template>
  <AppPage :loading="loadingExpenseCycle" :title="labels.pageTitle">
    <ExpenseCycleForm :expense-cycle="expenseCycle" @submit="handleSubmit" />
  </AppPage>
</template>
