<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { AppPage, ExpenseCycleForm, type ExpenseCycleFormData } from 'src/components';
import { EditExpenseCycleDto, expenseCycleService } from 'src/services';
import { useApiCall, useToast } from 'src/composables';

type ExpenseCycleEditPageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCycleEditPageProps>();

const i18n = useI18n();
const toast = useToast();
const router = useRouter();

const labels = {
  pageTitle: i18n.t('expenseCycle.editPage.pageTitle'),
  editSuccessMessage: i18n.t('general.editSuccessMessage'),
};

const {
  data: expenseCycle,
  loading: loadingExpenseCycle,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));

onMounted(() => {
  void fetchExpenseCycle();
});

const { data: editedExpenseCycle, execute: editExpenseCycle } = useApiCall(
  (dto: EditExpenseCycleDto) => expenseCycleService.edit(dto),
);

async function handleSubmit(data: ExpenseCycleFormData) {
  const { startDate, endDate } = data;
  if (startDate === null || endDate === null) {
    toast.negative(i18n.t('validation.invalidFormData'));
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

    void router.push({ name: 'expense-cycle-view', params: { id: expenseCycleId } });
  }
}

export type { ExpenseCycleEditPageProps };
</script>

<template>
  <AppPage :loading="loadingExpenseCycle" :title="labels.pageTitle">
    <ExpenseCycleForm :expense-cycle @submit="handleSubmit" />
  </AppPage>
</template>
