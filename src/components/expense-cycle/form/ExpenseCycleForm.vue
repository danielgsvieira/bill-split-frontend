<script setup lang="ts">
import type { ExpenseCycle } from 'src/models/ExpenseCycle';
import type { RouteLocationRaw } from 'vue-router';
import SharedWithInput from './SharedWithInput.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores';
import { useForm } from 'src/composables';
import { useI18n } from 'vue-i18n';
import type { User } from 'src/models/User';
import { AppBtn, AppDatePicker, AppForm, AppGoBackBtn, AppInput } from 'src/components';
import { computed, watch } from 'vue';
import { endOfDay, startOfDay, validation } from 'src/utils';

type ExpenseCycleFormData = {
  title: string;
  description: string;
  sharedWith: User[];
  startDate: Date | null;
  endDate: Date | null;
};
type ExpensecycleFormProps = {
  expenseCycle?: ExpenseCycle | null;
  onSubmit: (data: ExpenseCycleFormData) => Promise<void> | void;
};

const { expenseCycle = null, onSubmit } = defineProps<ExpensecycleFormProps>();

const i18n = useI18n();

const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);

const labels = {
  inputHints: {
    sharedWith: {
      onlyCreatorCanEdit: i18n.t('expenseCycle.fieldHints.sharedWith.onlyCreatorCanEdit'),
    },
  },
  inputs: {
    description: i18n.t('expenseCycle.fields.description'),
    endDate: i18n.t('expenseCycle.fields.endDate'),
    sharedWith: i18n.t('expenseCycle.fields.sharedWith'),
    startDate: i18n.t('expenseCycle.fields.startDate'),
    title: i18n.t('expenseCycle.fields.title'),
  },
  submitBtn: i18n.t('general.save'),
};

const { formData, submitting, submit } = useForm<ExpenseCycleFormData>({
  initialValue: {
    title: '',
    description: '',
    sharedWith: [],
    startDate: null,
    endDate: null,
  },
  submit: async (data) => {
    await onSubmit(data);
  },
});

const rules = computed(() => {
  return {
    title: [validation.required(), validation.maxLength(255)],
    description: [validation.maxLength(3000)],
    startDate: [
      validation.required(),
      validation.maxDate(formData.value.endDate, { customMaxText: labels.inputs.endDate }),
    ],
    endDate: [
      validation.required(),
      validation.minDate(formData.value.startDate, { customMinText: labels.inputs.startDate }),
    ],
  };
});

const startDateModel = computed({
  get: () => formData.value.startDate,
  set: (value: Date | null) => {
    formData.value.startDate = value !== null ? startOfDay(value) : null;
  },
});

const endDateModel = computed({
  get: () => formData.value.endDate,
  set: (value: Date | null) => {
    formData.value.endDate = value !== null ? endOfDay(value) : null;
  },
});

watch(
  () => expenseCycle,
  (newValue) => {
    if (newValue !== null) {
      formData.value = {
        title: newValue.title,
        description: newValue.description ?? '',
        sharedWith: [...newValue.sharedWith],
        startDate: newValue.startDate,
        endDate: newValue.endDate,
      };
    }
  },
);

const disableSharedWithInput = computed(() => {
  return expenseCycle !== null && authUser.value?.id !== expenseCycle.createdBy.id;
});

const sharedWithInputHint = computed(() => {
  return disableSharedWithInput.value ? labels.inputHints.sharedWith.onlyCreatorCanEdit : undefined;
});

const goBackRoute: RouteLocationRaw = { name: 'expense-cycle-index' };

export type { ExpenseCycleFormData };
</script>

<template>
  <AppForm class="q-col-gutter-md row" @submit="submit">
    <AppInput
      id="input_title"
      v-model="formData.title"
      class="col-12"
      :label="labels.inputs.title"
      name="title"
      :rules="rules.title"
    />
    <AppInput
      id="input_description"
      v-model="formData.description"
      class="col-12"
      :label="labels.inputs.description"
      name="description"
      :rules="rules.description"
    />
    <AppDatePicker
      id="input_startDate"
      v-model="startDateModel"
      class="col-12 col-md-4"
      :label="labels.inputs.startDate"
      name="startDate"
      :rules="rules.startDate"
    />
    <AppDatePicker
      id="input_endDate"
      v-model="endDateModel"
      class="col-12 col-md-4"
      :label="labels.inputs.endDate"
      name="endDate"
      :rules="rules.endDate"
    />
    <SharedWithInput
      id="input_sharedWith"
      v-model="formData.sharedWith"
      :disable="disableSharedWithInput"
      :hint="sharedWithInputHint"
      :label="labels.inputs.sharedWith"
      name="sharedWith"
    />
    <div class="col-12">
      <div class="items-center justify-end q-gutter-x-md row">
        <AppGoBackBtn :fallback-route="goBackRoute" />
        <AppBtn :label="labels.submitBtn" :loading="submitting" type="submit" />
      </div>
    </div>
  </AppForm>
</template>
