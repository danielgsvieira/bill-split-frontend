<script setup lang="ts">
type ExpenseEditPageProps = {
  expenseId: number;
};

const { expenseId } = defineProps<ExpenseEditPageProps>();

const text = `ExpenseEditPage.vue | id: ${expenseId}`;

export type { ExpenseEditPageProps };
</script>

<template>
  {{ text }}
</template>
