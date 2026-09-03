<script setup lang="ts">
import { AppCustomDialog } from '../app-components';
import { useI18n } from 'vue-i18n';
import { CreateTagDto, tagService } from 'src/services';
import { type DialogEmits, useApiCall, useToast } from 'src/composables';
import TagForm, { type TagFormData } from './TagForm.vue';

const emit = defineEmits<DialogEmits>();

const i18n = useI18n();
const toast = useToast();

const labels = {
  title: i18n.t('tag.createDialog.title'),
  createSuccessMessage: i18n.t('general.createSuccessMessage'),
};

const { data: createdTag, execute: createTag } = useApiCall((dto: CreateTagDto) =>
  tagService.create(dto),
);

async function handleSubmit(data: TagFormData, onOk: () => void) {
  const dto = new CreateTagDto(data);
  await createTag(dto);

  if (createdTag.value !== null) {
    toast.positive(labels.createSuccessMessage);
    onOk();
  }
}
</script>

<template>
  <AppCustomDialog
    v-slot="{ onOk, onCancel }"
    persistent
    :title="labels.title"
    @hide="() => emit('hide')"
    @ok="(payload) => emit('ok', payload)"
  >
    <TagForm @cancel="() => onCancel()" @submit="(data) => handleSubmit(data, onOk)" />
  </AppCustomDialog>
</template>
