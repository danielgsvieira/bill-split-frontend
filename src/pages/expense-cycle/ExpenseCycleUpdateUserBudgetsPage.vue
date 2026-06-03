<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { valueOrEmptyIndicator } from 'src/utils';
import {
  AppFieldValue,
  AppPage,
  ExpenseCycleUserBudgetsForm,
  type ExpenseCycleUserBudgetsFormData,
} from 'src/components';
import { computed, onMounted } from 'vue';
import { expenseCycleService, UpdateExpenseCycleUserBudgetsDto } from 'src/services';
import { useApiCall, useToast } from 'src/composables';

type ExpenseCycleUpdateUserBudgetsPageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCycleUpdateUserBudgetsPageProps>();

const i18n = useI18n();
const router = useRouter();
const toast = useToast();

const labels = {
  editSuccessMessage: i18n.t('general.editSuccessMessage'),
  expenseCycleTitle: i18n.t('expenseCycle.updateUserBudgtsPage.expenseCycleTitle'),
  pageTitle: i18n.t('expenseCycle.updateUserBudgtsPage.pageTitle'),
};

const {
  data: expenseCycle,
  loading: loadingExpenseCycle,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));

const {
  data: userBudgets,
  loading: loadingUserBudgets,
  execute: fetchUserBudgets,
} = useApiCall(() => expenseCycleService.listUserBudgets(expenseCycleId));

onMounted(() => {
  void fetchExpenseCycle();
  void fetchUserBudgets();
});

const loading = computed(() => {
  return loadingExpenseCycle.value || loadingUserBudgets.value;
});

const { data: updateExpenseCycleUserBudgetsResult, execute: updateExpenseCycleUserBudgets } =
  useApiCall((dto: UpdateExpenseCycleUserBudgetsDto) =>
    expenseCycleService.updateUserBudgets(expenseCycleId, dto),
  );

async function handleSubmit(data: ExpenseCycleUserBudgetsFormData) {
  const dto = new UpdateExpenseCycleUserBudgetsDto(data);
  await updateExpenseCycleUserBudgets(dto);

  if (updateExpenseCycleUserBudgetsResult.value !== null) {
    toast.positive(labels.editSuccessMessage);

    void router.push({
      name: 'expense-cycle-view',
      params: { id: expenseCycleId },
    });
  }
}

export type { ExpenseCycleUpdateUserBudgetsPageProps };
</script>

<template>
  <AppPage :loading="loading" :title="labels.pageTitle">
    <div class="items-center q-col-gutter-md row">
      <AppFieldValue
        class="col-12"
        :label="labels.expenseCycleTitle"
        :value="valueOrEmptyIndicator(expenseCycle?.title)"
      />
    </div>
    <ExpenseCycleUserBudgetsForm
      :expense-cycle-id
      :user-budgets="userBudgets ?? []"
      @submit="handleSubmit"
    />
  </AppPage>
</template>
