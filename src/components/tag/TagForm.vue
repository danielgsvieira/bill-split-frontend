<script setup lang="ts">
import { tagService } from 'src/services';
import { useForm } from 'src/composables';
import { useI18n } from 'vue-i18n';
import { AppBtn, AppColorPicker, AppForm, AppInput } from '../app-components';
import { validation, type ValidationRule } from 'src/utils';

type TagFormData = {
  description: string;
  color: string;
};
type TagFormProps = {
  onSubmit: (data: TagFormData) => Promise<void> | void;
};
type TagFormEmits = (e: 'cancel') => void;

const { onSubmit } = defineProps<TagFormProps>();
const emit = defineEmits<TagFormEmits>();

const i18n = useI18n();

const labels = {
  inputs: {
    description: i18n.t('tag.fields.description'),
    color: i18n.t('tag.fields.color'),
  },
  cancelBtn: i18n.t('general.cancel'),
  submitBtn: i18n.t('general.save'),
};

const { formData, submitting, submit } = useForm<TagFormData>({
  initialValue: {
    description: '',
    color: '#aaaaaa',
  },
  submit: async (data) => {
    await onSubmit(data);
  },
});

const isDescriptionAvailableRule: ValidationRule = async (description: string) => {
  const response = await tagService.isDescriptionAvailable(description);

  return (
    response.isAvailable ||
    i18n.t('tag.validation.descriptionAlreadyExists', { fieldName: labels.inputs.description })
  );
};

const rules = {
  description: [validation.required(), validation.length(1, 32), isDescriptionAvailableRule],
  color: [validation.required()],
};

export type { TagFormData };
</script>

<template>
  <AppForm class="q-col-gutter-md row" @submit="submit">
    <AppInput
      id="input_description"
      v-model="formData.description"
      class="col-12"
      :debounce="1000"
      :label="labels.inputs.description"
      name="description"
      :rules="rules.description"
    />
    <AppColorPicker
      id="input_color"
      v-model="formData.color"
      class="col-12"
      :label="labels.inputs.color"
      name="color"
      :rules="rules.color"
    />
    <div class="col-12">
      <div class="items-center justify-end q-gutter-x-md row">
        <AppBtn flat :label="labels.cancelBtn" type="button" @click="() => emit('cancel')" />
        <AppBtn :label="labels.submitBtn" :loading="submitting" type="submit" />
      </div>
    </div>
  </AppForm>
</template>
