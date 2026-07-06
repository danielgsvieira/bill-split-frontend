<script setup lang="ts">
import { computed } from 'vue';
import type { ExpenseUser } from 'src/models/expense/ExpenseUser';
import type { Money } from 'src/utils';
import { useI18n } from 'vue-i18n';

type ExpenseTableBalancePerUserCellProps = {
  balancePerUser: { user: ExpenseUser; balance: Money }[];
};

const { balancePerUser } = defineProps<ExpenseTableBalancePerUserCellProps>();

const i18n = useI18n();

const sortedBalancePerUser = computed(() => {
  return balancePerUser.toSorted((a, b) => a.user.displayName.localeCompare(b.user.displayName));
});

function getBalanceClasses(balance: Money) {
  return { 'text-negative': balance.valueInCents < 0 };
}
</script>

<template>
  <div class="column">
    <div v-for="{ user, balance } in sortedBalancePerUser" :key="user.id">
      {{ user.displayName }}:
      <span :class="getBalanceClasses(balance)">
        {{ i18n.n(balance.decimalValue, 'currency') }}
      </span>
    </div>
  </div>
</template>
