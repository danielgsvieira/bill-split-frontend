<script setup lang="ts">
import AppCard from 'src/components/AppCard.vue';
import { AppDateFormat } from 'src/consts';
import { computed } from 'vue';
import { expenseCycleService } from 'src/services';
import { useI18n } from 'vue-i18n';
import { valueOrEmptyIndicator } from 'src/utils';
import { AppBtn, AppFieldValue, AppGoBackBtn, AppPage } from 'src/components';
import { type RouteLocationRaw, useRouter } from 'vue-router';
import { useApiCall, useDialog, useToast } from 'src/composables';

type ExpenseCycleViewPageProps = {
  expenseCycleId: number;
};

const { expenseCycleId } = defineProps<ExpenseCycleViewPageProps>();

const { t } = useI18n();
const router = useRouter();
const dialog = useDialog();
const toast = useToast();

const labels = {
  deleteBtn: t('expenseCycle.viewPage.deleteBtn'),
  fields: {
    description: t('expenseCycle.fields.description'),
    endDate: t('expenseCycle.fields.endDate'),
    id: t('expenseCycle.fields.id'),
    sharedWith: t('expenseCycle.fields.sharedWith'),
    startDate: t('expenseCycle.fields.startDate'),
    title: t('expenseCycle.fields.title'),
  },
  editBtn: t('expenseCycle.viewPage.editBtn'),
  goBackBtn: t('general.goBack'),
  pageTitle: t('expenseCycle.viewPage.pageTitle'),
  removeExpenseCycle: {
    dialog: {
      title: t('general.remove'),
      message: t('general.removeConfirmationMessage'),
    },
    successMessage: t('general.removeSuccessMessage'),
  },
};

const {
  data: expenseCycle,
  loading,
  execute: fetchExpenseCycle,
} = useApiCall(() => expenseCycleService.findOneById(expenseCycleId));
void fetchExpenseCycle();

const sharedWithText = computed(() => {
  const str = expenseCycle.value?.sharedWith.map((el) => el.displayName).join(', ');

  return valueOrEmptyIndicator(str);
});

const editExpenseCycleRoute: RouteLocationRaw = {
  name: 'expense-cycle-edit',
  params: { id: expenseCycleId },
};
const goBackRoute: RouteLocationRaw = { name: 'expense-cycle-index' };

const {
  data: deletedExpenseCycle,
  loading: loadingDeleteExpenseCycle,
  execute: deleteExpenseCicleApiCall,
} = useApiCall(() => expenseCycleService.delete(expenseCycleId));

async function deleteExpenseCycle() {
  await deleteExpenseCicleApiCall();

  if (deletedExpenseCycle.value !== null) {
    toast.positive(t('general.removeSuccessMessage'));
    void router.push({ name: 'expense-cycle-index' });
  }
}

function handleDeleteBtnClick() {
  dialog.confirm(labels.removeExpenseCycle.dialog).onOk(() => void deleteExpenseCycle());
}

export type { ExpenseCycleViewPageProps };
</script>

<template>
  <AppPage :title="labels.pageTitle">
    <AppCard :loading>
      <div class="items-center q-col-gutter-md row">
        <AppFieldValue class="col-12" :label="labels.fields.title" :value="expenseCycle?.title" />
        <AppFieldValue
          class="col-12"
          :label="labels.fields.description"
          :value="valueOrEmptyIndicator(expenseCycle?.description)"
        />
        <AppFieldValue
          class="col-12 col-md-4"
          :label="labels.fields.startDate"
          :value="expenseCycle?.startDate.toFormat(AppDateFormat)"
        />
        <AppFieldValue
          class="col-12 col-md-4"
          :label="labels.fields.endDate"
          :value="expenseCycle?.endDate.toFormat(AppDateFormat)"
        />
        <AppFieldValue
          class="col-12 col-md-4"
          :label="labels.fields.sharedWith"
          :value="sharedWithText"
        />
      </div>
      <div class="items-center justify-end q-gutter-md row">
        <AppBtn
          color="primary"
          flat
          icon="edit"
          :label="labels.editBtn"
          :to="editExpenseCycleRoute"
          type="button"
        />
        <AppBtn
          color="negative"
          flat
          icon="delete"
          :label="labels.deleteBtn"
          :loading="loadingDeleteExpenseCycle"
          type="button"
          @click="handleDeleteBtnClick"
        />
      </div>
    </AppCard>
    <div class="items-center justify-end q-mt-md row">
      <AppGoBackBtn :fallback-route="goBackRoute" />
    </div>
  </AppPage>
</template>
