<script setup lang="ts">
import { computed } from 'vue';
import type { ExpenseUser } from 'src/models/expense/ExpenseUser';
import type { Money } from 'src/utils';
import { useI18n } from 'vue-i18n';

type ExpenseTableValuePerUserCellProps = {
  valuePerUser: { user: ExpenseUser; value: Money }[];
};

const { valuePerUser } = defineProps<ExpenseTableValuePerUserCellProps>();

const i18n = useI18n();

const sortedValuePerUser = computed(() => {
  return valuePerUser.toSorted((a, b) => a.user.displayName.localeCompare(b.user.displayName));
});

function getValueString({ user, value }: { user: ExpenseUser; value: Money }) {
  return `${user.displayName}: ${i18n.n(value.decimalValue, 'currency')}`;
}
</script>

<template>
  <div class="column">
    <span v-for="valueForUser in sortedValuePerUser" :key="valueForUser.user.id">{{
      getValueString(valueForUser)
    }}</span>
  </div>
</template>
