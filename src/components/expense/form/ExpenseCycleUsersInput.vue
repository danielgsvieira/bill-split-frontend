<script setup lang="ts" generic="T extends User | User[]">
import { AppSelect } from 'src/components';
import { expenseCycleService } from 'src/services';
import { useApiCall } from 'src/composables';
import type { User } from 'src/models/User';
import type { ValidationRule } from 'quasar';
import { computed, onMounted } from 'vue';

type SharedWithInputProps = {
  disable?: boolean;
  expenseCycleId: number;
  hint?: string | undefined;
  id: string;
  label?: string | undefined;
  multiple?: boolean | undefined;
  name: string;
  rules?: ValidationRule[] | undefined;
};

const {
  disable,
  expenseCycleId,
  hint = undefined,
  id,
  label = undefined,
  multiple = undefined,
  name,
  rules = undefined,
} = defineProps<SharedWithInputProps>();
const model = defineModel<T | null | undefined>();

const {
  data: users,
  loading,
  execute: fetchUsers,
} = useApiCall(() => expenseCycleService.listUsers(expenseCycleId));

onMounted(() => {
  void fetchUsers();
});

const userOptions = computed(() => {
  const options = users.value?.map((el) => ({ id: el.id, label: el.displayName, value: el }));
  return options ?? [];
});
</script>

<template>
  <AppSelect
    :id
    v-model="model"
    clearable
    :disable
    :hint
    :label
    :loading
    :multiple
    :name
    :options="userOptions"
    :rules
  />
</template>
