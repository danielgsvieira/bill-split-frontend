<script setup lang="ts">
import { AppPage } from 'src/components';
import { RouterLink } from 'vue-router';

const linkText = 'Ciclos de Despesa';
const route = { name: 'expense-cycle-index' };
</script>

<template>
  <AppPage>
    <RouterLink :to="route">{{ linkText }}</RouterLink>
  </AppPage>
</template>
