<script setup lang="ts">
import { AppDateFormat } from 'src/consts';
import { computed } from 'vue';
import type { ExpenseCycle } from 'src/models/ExpenseCycle';
import { expenseCycleService } from 'src/services';
import { useI18n } from 'vue-i18n';
import { valueOrEmptyIndicator } from 'src/utils';
import { AppBtn, AppFieldValue } from 'src/components';
import { type RouteLocationRaw, useRouter } from 'vue-router';
import { useApiCall, useDialog, useToast } from 'src/composables';

type ExpenseCycleViewProps = {
  expenseCycle: ExpenseCycle;
};

const { expenseCycle } = defineProps<ExpenseCycleViewProps>();

const router = useRouter();
const { t } = useI18n();
const dialog = useDialog();
const toast = useToast();

const labels = {
  deleteBtn: t('general.delete'),
  fields: {
    description: t('expenseCycle.fields.description'),
    endDate: t('expenseCycle.fields.endDate'),
    sharedWith: t('expenseCycle.fields.sharedWith'),
    startDate: t('expenseCycle.fields.startDate'),
    title: t('expenseCycle.fields.title'),
  },
  editBtn: t('general.edit'),
  removeExpenseCycle: {
    dialog: {
      title: t('general.remove'),
      message: t('general.removeConfirmationMessage'),
    },
    successMessage: t('general.removeSuccessMessage'),
  },
};

const {
  data: deletedExpenseCycle,
  loading: loadingDeleteExpenseCycle,
  execute: deleteExpenseCicleApiCall,
} = useApiCall(() => expenseCycleService.delete(expenseCycle.id));

async function deleteExpenseCycle() {
  await deleteExpenseCicleApiCall();

  if (deletedExpenseCycle.value !== null) {
    toast.positive(labels.removeExpenseCycle.successMessage);
    void router.push({ name: 'expense-cycle-index' });
  }
}

function handleDeleteBtnClick() {
  dialog.confirm(labels.removeExpenseCycle.dialog).onOk(() => void deleteExpenseCycle());
}

const sharedWithText = computed(() => {
  const str = expenseCycle.sharedWith.map((el) => el.displayName).join(', ');

  return valueOrEmptyIndicator(str);
});

const editExpenseCycleRoute = computed<RouteLocationRaw>(() => {
  return { name: 'expense-cycle-edit', params: { id: expenseCycle.id } };
});
</script>

<template>
  <div>
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
  </div>
</template>
