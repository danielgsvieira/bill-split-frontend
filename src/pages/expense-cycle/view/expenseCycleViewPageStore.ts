import { useApiCall } from 'src/composables';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { expenseCycleService, expenseService } from 'src/services';

const useExpenseCycleViewPageStore = defineStore('expenseCycleViewPageStore', () => {
  const expenseCycleId = ref<number | null>(null);

  const {
    data: expenseCycle,
    loading: loadingExpenseCycle,
    execute: fetchExpenseCycle,
  } = useApiCall(() => {
    if (expenseCycleId.value === null) {
      return Promise.resolve(null);
    }

    return expenseCycleService.findOneById(expenseCycleId.value);
  });

  const {
    data: userBudgets,
    loading: loadingUserBudgets,
    execute: fetchUserBudgets,
  } = useApiCall(() => {
    if (expenseCycleId.value === null) {
      return Promise.resolve(null);
    }

    return expenseCycleService.listUserBudgets(expenseCycleId.value);
  });

  const {
    data: expenses,
    loading: loadingExpenses,
    execute: fetchExpenses,
  } = useApiCall(() => {
    if (expenseCycleId.value === null) {
      return Promise.resolve(null);
    }

    return expenseService.listByExpenseCycleId(expenseCycleId.value);
  });

  async function init(cycleId: number) {
    expenseCycleId.value = cycleId;

    await Promise.all([fetchExpenseCycle(), fetchExpenses(), fetchUserBudgets()]);
  }

  const hasEmptyUserBudget = computed(() => {
    return userBudgets.value?.some((el) => el.value.valueInCents === 0) ?? false;
  });

  return {
    expenseCycle,
    loadingExpenseCycle,
    fetchExpenseCycle,
    userBudgets,
    loadingUserBudgets,
    fetchUserBudgets,
    expenses,
    loadingExpenses,
    fetchExpenses,
    init,
    hasEmptyUserBudget,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExpenseCycleViewPageStore, import.meta.hot));
}

export { useExpenseCycleViewPageStore };
