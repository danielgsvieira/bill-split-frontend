<script setup lang="ts">
import { AppSelect } from 'src/components';
import { useApiCall } from 'src/composables';
import type { User } from 'src/models/User';
import { userService } from 'src/services';
import { computed, onMounted } from 'vue';

type SharedWithInputProps = {
  label?: string | undefined;
  id: string;
  name: string;
};

const { label = undefined, id, name } = defineProps<SharedWithInputProps>();
const model = defineModel<User[]>();

const {
  data: users,
  loading,
  execute: fetchUsers,
} = useApiCall(() => userService.listUsersAvailableToShareWith());

onMounted(() => {
  void fetchUsers();
});

const userOptions = computed(() => {
  const options = users.value?.map((el) => ({ id: el.id, label: el.displayName, value: el }));
  return options ?? [];
});
</script>

<template>
  <AppSelect :id v-model="model" :label :loading multiple :name :options="userOptions" />
</template>
