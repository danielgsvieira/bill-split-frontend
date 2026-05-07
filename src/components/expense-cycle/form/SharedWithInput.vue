<script setup lang="ts">
import { AppSelect } from 'src/components';
import { computed } from 'vue';
import { useApiCall } from 'src/composables';
import { useI18n } from 'vue-i18n';
import type { User } from 'src/models/User';
import { userService } from 'src/services';

type SharedWithInputProps = {
  disable?: boolean;
  hint?: string | undefined;
};

const { disable, hint = undefined } = defineProps<SharedWithInputProps>();
const model = defineModel<User[]>();

const i18n = useI18n();

const {
  data: users,
  loading,
  execute: fetchUsers,
} = useApiCall(() => userService.listUsersAvailableToShareWith());
void fetchUsers();

const userOptions = computed(() => {
  const options = users.value?.map((el) => ({ id: el.id, label: el.displayName, value: el }));
  return options ?? [];
});
</script>

<template>
  <AppSelect
    id="input_shared_with"
    v-model="model"
    class="col-12 col-md-4"
    clearable
    :disable
    :hint
    :label="i18n.t('expenseCycle.fields.sharedWith')"
    :loading
    multiple
    name="sharedWith"
    :options="userOptions"
  />
</template>
