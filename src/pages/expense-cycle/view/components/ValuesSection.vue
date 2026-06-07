<script setup lang="ts">
import { computed } from 'vue';
import type { ExpenseCycleUser } from 'src/models/expense-cycle/ExpenseCycleUser';
import { Money } from 'src/utils';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores';
import { useExpenseCycleViewPageStore } from '../expenseCycleViewPageStore';
import { useI18n } from 'vue-i18n';
import { AppFieldValue, AppIcon } from 'src/components';

const i18n = useI18n();

const labels = {
  expenseCycleBalanceTitle: i18n.t('expenseCycle.viewPage.expenseCycleBalanceTitle'),
  fillUserBudgetsToViewHint: i18n.t('expenseCycle.viewPage.fillUserBudgetsToViewHint'),
  balance: i18n.t('expenseCycle.viewPage.valuesSection.balance'),
  debtPaymentSuggestion: i18n.t('expenseCycle.viewPage.valuesSection.debtPaymentSuggestion'),
  totalExpended: i18n.t('expenseCycle.viewPage.valuesSection.totalExpended'),
};

const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);

const pageStore = useExpenseCycleViewPageStore();
const { expenseCycle, expenses, hasEmptyUserBudget, userBudgets } = storeToRefs(pageStore);

const budgetData = computed(() => {
  if (userBudgets.value === null) {
    return null;
  }

  return userBudgets.value.reduce<{ userId: number; value: Money }[]>((acc, budget) => {
    acc.push({ userId: budget.user.id, value: budget.value });
    return acc;
  }, []);
});

const totalValuePerUser = computed(() => {
  if (
    expenses.value === null ||
    budgetData.value === null ||
    expenseCycle.value === null ||
    hasEmptyUserBudget.value
  ) {
    return [];
  }

  // Just to silence TS
  const budgetDataParam = budgetData.value;
  const cycleExpenses = expenses.value;

  const result = expenseCycle.value.users.map((user) => {
    return { user, value: new Money(0) };
  });

  result.forEach((resultUserData) => {
    cycleExpenses.forEach((expense) => {
      const foundExpenseValue = expense
        .getValuePerUser(budgetDataParam)
        .find((el) => el.user.id === resultUserData.user.id)?.value;

      if (foundExpenseValue !== undefined) {
        resultUserData.value = new Money(
          resultUserData.value.valueInCents + foundExpenseValue.valueInCents,
        );
      }
    });
  });

  return result;
});

const totalBalancePerUser = computed(() => {
  if (
    expenses.value === null ||
    budgetData.value === null ||
    expenseCycle.value === null ||
    hasEmptyUserBudget.value
  ) {
    return [];
  }

  // Just to silence TS
  const budgetDataParam = budgetData.value;
  const cycleExpenses = expenses.value;

  const result = expenseCycle.value.users.map((user) => {
    return { user, balance: new Money(0) };
  });

  result.forEach((resultUserData) => {
    cycleExpenses.forEach((expense) => {
      const foundBalance = expense
        .getBalancePerUser(budgetDataParam)
        .find((el) => el.user.id === resultUserData.user.id)?.balance;

      if (foundBalance !== undefined) {
        resultUserData.balance = new Money(
          resultUserData.balance.valueInCents + foundBalance.valueInCents,
        );
      }
    });
  });

  return result;
});

const cyclePaymentRecomendations = computed(() => {
  const result = totalBalancePerUser.value.map(({ user }) => {
    return { user, payments: [] as { from: ExpenseCycleUser; value: Money }[] };
  });

  const currentBalances = totalBalancePerUser.value.map(({ user, balance }) => {
    return { user, balance: new Money(balance.valueInCents) };
  });

  result.forEach((resultUserData) => {
    const resultUserCurrentBalance = currentBalances.find(
      (el) => el.user.id === resultUserData.user.id,
    );

    if (resultUserCurrentBalance === undefined) {
      throw new Error('userBalance not found');
    }

    if (resultUserCurrentBalance.balance.valueInCents <= 0) {
      return;
    }

    for (const currentBalanceEl of currentBalances) {
      if (resultUserCurrentBalance.balance.valueInCents <= 0) {
        break;
      }

      const isSameUser = currentBalanceEl.user.id === resultUserData.user.id;
      const isBalancePositve = currentBalanceEl.balance.valueInCents >= 0;

      if (isSameUser || isBalancePositve) {
        continue;
      }

      const absBalanceInCents = Math.abs(currentBalanceEl.balance.valueInCents);

      if (resultUserCurrentBalance.balance.valueInCents >= absBalanceInCents) {
        resultUserData.payments.push({
          from: currentBalanceEl.user,
          value: new Money(absBalanceInCents),
        });

        resultUserCurrentBalance.balance = new Money(
          resultUserCurrentBalance.balance.valueInCents - absBalanceInCents,
        );
        currentBalanceEl.balance = new Money(
          currentBalanceEl.balance.valueInCents + absBalanceInCents,
        );
      } else {
        resultUserData.payments.push({
          from: currentBalanceEl.user,
          value: new Money(resultUserCurrentBalance.balance.valueInCents),
        });

        resultUserCurrentBalance.balance = new Money(0);
        currentBalanceEl.balance = new Money(
          currentBalanceEl.balance.valueInCents + resultUserCurrentBalance.balance.valueInCents,
        );
      }
    }
  });

  return result;
});

function getPaymentRecomendationText(receivingUser: string, payingUser: string, value: Money) {
  return i18n.t('expenseCycle.viewPage.valuesSection.paymentRecomendationText', {
    receivingUser,
    payingUser,
    value: i18n.n(value.decimalValue, 'currency'),
  });
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col q-mb-md">
        <h3 class="q-mb-none q-mt-none text-h5">{{ labels.expenseCycleBalanceTitle }}</h3>
      </div>
    </div>
    <div v-if="hasEmptyUserBudget" class="items-center row">
      <AppIcon class="text-grey-8" name="info" />
      <p class="d-inline-block q-mb-none q-ml-sm text-grey-8">
        {{ labels.fillUserBudgetsToViewHint }}
      </p>
    </div>
    <template v-else>
      <h6 class="q-ma-none text-body1">
        {{ labels.totalExpended }}
      </h6>
      <div class="q-col-gutter-sm q-mb-md row">
        <div
          v-for="{ user, value } in totalValuePerUser"
          :key="user.id"
          class="col-6 col-md-2 col-sm-3"
        >
          <AppFieldValue
            class="q-pa-sm"
            :class="{ 'highlighted-info': authUser?.id === user.id }"
            :label="user.displayName"
            :value="i18n.n(value.decimalValue, 'currency')"
          />
        </div>
      </div>
      <h6 class="q-ma-none text-body1">
        {{ labels.balance }}
      </h6>
      <div class="q-col-gutter-sm q-mb-md row">
        <div
          v-for="{ user, balance } in totalBalancePerUser"
          :key="user.id"
          class="col-6 col-md-2 col-sm-3"
        >
          <AppFieldValue
            class="q-pa-sm"
            :class="{
              'highlighted-info': authUser?.id === user.id,
              'text-negative': balance.valueInCents < 0,
            }"
            :label="user.displayName"
            :value="i18n.n(balance.decimalValue, 'currency')"
          />
        </div>
      </div>
      <h6 class="q-ma-none text-body1">
        {{ labels.debtPaymentSuggestion }}
      </h6>
      <div class="q-col-gutter-sm row">
        <div
          v-for="{ user: receivingUser, payments } in cyclePaymentRecomendations"
          :key="`debt_info_${receivingUser.id}`"
          class="col-12"
        >
          <div
            v-for="payment in payments"
            :key="`debt_from_${payment.from.id}_to_${receivingUser.id}`"
            class="q-pa-sm"
            :class="{
              'highlighted-info':
                authUser?.id === receivingUser.id || authUser?.id === payment.from.id,
            }"
          >
            {{
              getPaymentRecomendationText(
                receivingUser.displayName,
                payment.from.displayName,
                payment.value,
              )
            }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.highlighted-info {
  background-color: $grey-3;
  border-radius: 0.25rem;
}
</style>
