<script setup lang="ts">
import CreateTagDialog from './CreateTagDialog.vue';
import { isNullOrUndefined } from 'src/utils';
import type { Tag } from 'src/models/tag/Tag';
import { tagService } from 'src/services';
import { AppBtn, AppChip } from '../app-components';
import { computed, onMounted } from 'vue';
import { QField, type ValidationRule } from 'quasar';
import { useApiCall, useDialog } from 'src/composables';

type TagSelectProps = {
  disable?: boolean;
  id: string;
  label?: string | undefined;
  rules?: ValidationRule[] | undefined;
};

const { disable, id, label = undefined, rules = undefined } = defineProps<TagSelectProps>();

const dialog = useDialog();

const { data: tags, loading, execute: fetchTags } = useApiCall(() => tagService.list());

const model = defineModel<Tag[] | null | undefined>();

const modelIds = computed(() => {
  if (isNullOrUndefined(model.value)) {
    return [];
  }

  return model.value.map((el) => el.id);
});

function toggleTag(tagToToggle: Tag) {
  if (isNullOrUndefined(model.value)) {
    return;
  }

  const isSelected = modelIds.value.includes(tagToToggle.id);

  if (isSelected) {
    model.value = model.value.filter((el) => el.id !== tagToToggle.id);
    return;
  }

  model.value = [...model.value, tagToToggle];
}

function tagIcon(tag: Tag) {
  return modelIds.value.includes(tag.id) ? 'check' : undefined;
}

onMounted(() => {
  void fetchTags();
});

function addTag() {
  dialog
    .customDialog({
      component: CreateTagDialog,
    })
    .onOk(() => {
      void fetchTags();
    });
}
</script>

<template>
  <div class="align-center row">
    <QField :id v-model="model" borderless :disable :label :loading :rules stack-label>
      <template #control>
        <div class="align-center row">
          <template v-for="tag in tags" :key="tag.id">
            <AppChip
              class="cursor-pointer"
              :color="tag.color"
              :icon="tagIcon(tag)"
              @click="() => toggleTag(tag)"
            >
              {{ tag.description }}
            </AppChip>
          </template>
        </div>
        <div class="col-auto content-center">
          <AppBtn flat icon="add" round type="button" @click="addTag" />
        </div>
      </template>
    </QField>
  </div>
</template>
