<script setup lang="ts">
import { AppSelect } from 'src/components';
import { useApiCall } from 'src/composables';
import { useI18n } from 'vue-i18n';
import type { User } from 'src/models/User';
import { userService } from 'src/services';
import type { ValidationRule } from 'quasar';
import { computed, onMounted } from 'vue';

type SharedWithInputProps = {
  label?: string | undefined;
  id: string;
  name: string;
  requiredIds?: number[];
  rules?: ValidationRule[];
};

const {
  label = undefined,
  id,
  name,
  requiredIds = undefined,
  rules: propRules = undefined,
} = defineProps<SharedWithInputProps>();
const model = defineModel<User[]>();

const i18n = useI18n();

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

const userIdDisplayNameMap = computed(() => {
  if (users.value === null) {
    return {};
  }

  return users.value.reduce<Record<number, string>>((acc, user) => {
    acc[user.id] = user.displayName;
    return acc;
  }, {});
});

const requiredIdsRule = computed<ValidationRule | null>(() => {
  if (requiredIds === undefined || requiredIds.length === 0) {
    return null;
  }

  return (value: User[]) => {
    for (const requiredId of requiredIds) {
      const foundUser = value.find((user) => user.id === requiredId);

      if (foundUser === undefined) {
        const userDisplayName = userIdDisplayNameMap.value[requiredId] ?? requiredId.toString();

        return i18n.t('expenseCycle.fieldValidations.requiredUserRelatedToExpenses', {
          user: userDisplayName,
        });
      }
    }

    return true;
  };
});

const rules = computed(() => {
  const result: ValidationRule[] = [];

  if (requiredIdsRule.value !== null) {
    result.push(requiredIdsRule.value);
  }

  if (propRules !== undefined) {
    result.push(...propRules);
  }

  return result.length > 0 ? result : undefined;
});
</script>

<template>
  <AppSelect :id v-model="model" :label :loading multiple :name :options="userOptions" :rules />
</template>
