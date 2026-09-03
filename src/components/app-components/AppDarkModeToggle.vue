<script setup lang="ts">
import AppToggle from './AppToggle.vue';
import { useQuasar } from 'quasar';

const quasar = useQuasar();

function handleChange(value: boolean | null | undefined) {
  quasar.dark.set(value ?? true);
  quasar.localStorage.set('theme', value ? 'dark' : 'light');
}
</script>

<template>
  <AppToggle
    checked-icon="dark_mode"
    color="accent"
    :model-value="quasar.dark.isActive"
    unchecked-icon="light_mode"
    @update:model-value="handleChange"
  />
</template>
