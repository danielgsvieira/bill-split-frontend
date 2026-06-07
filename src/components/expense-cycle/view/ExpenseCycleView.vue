<script setup lang="ts">
import { computed } from 'vue';
import type { ExpenseCycleDetails } from 'src/models/expense-cycle/ExpenseCycleDetails';
import { expenseCycleService } from 'src/services';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores';
import { useI18n } from 'vue-i18n';
import { valueOrEmptyIndicator } from 'src/utils';
import { AppBtn, AppFieldValue } from 'src/components';
import { type RouteLocationRaw, useRouter } from 'vue-router';
import { useApiCall, useDialog, useToast } from 'src/composables';

type ExpenseCycleViewProps = {
  expenseCycle: ExpenseCycleDetails;
};

const { expenseCycle } = defineProps<ExpenseCycleViewProps>();

const router = useRouter();
const i18n = useI18n();
const dialog = useDialog();
const toast = useToast();

const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);

const labels = {
  deleteBtn: i18n.t('general.delete'),
  fields: {
    description: i18n.t('expenseCycle.fields.description'),
    endDate: i18n.t('expenseCycle.fields.endDate'),
    sharedWith: i18n.t('expenseCycle.fields.sharedWith'),
    startDate: i18n.t('expenseCycle.fields.startDate'),
    title: i18n.t('expenseCycle.fields.title'),
  },
  editBtn: i18n.t('general.edit'),
  removeExpenseCycle: {
    dialog: {
      title: i18n.t('general.remove'),
      message: i18n.t('general.removeConfirmationMessage'),
    },
    successMessage: i18n.t('general.removeSuccessMessage'),
  },
};

const {
  data: deletedExpenseCycle,
  loading: loadingDeleteExpenseCycle,
  execute: deleteExpenseCycleApiCall,
} = useApiCall(() => expenseCycleService.delete(expenseCycle.id));

async function deleteExpenseCycle() {
  await deleteExpenseCycleApiCall();

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

const canDelete = computed(() => authUser.value?.id === expenseCycle.id);

const editExpenseCycleRoute = computed<RouteLocationRaw>(() => {
  return { name: 'expense-cycle-edit', params: { id: expenseCycle.id } };
});
</script>

<template>
  <div>
    <div class="items-center q-col-gutter-md row">
      <AppFieldValue class="col-12" :label="labels.fields.title" :value="expenseCycle.title" />
      <AppFieldValue
        class="col-12"
        :label="labels.fields.description"
        :value="valueOrEmptyIndicator(expenseCycle.description)"
      />
      <AppFieldValue
        class="col-12 col-sm-4"
        :label="labels.fields.startDate"
        :value="i18n.d(expenseCycle.startDate.toJSDate(), 'short')"
      />
      <AppFieldValue
        class="col-12 col-sm-4"
        :label="labels.fields.endDate"
        :value="i18n.d(expenseCycle.endDate.toJSDate(), 'short')"
      />
      <AppFieldValue
        class="col-12 col-sm-4"
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
        v-if="canDelete"
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
