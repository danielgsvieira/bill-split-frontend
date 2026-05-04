<script setup lang="ts">
type AppFielValueProps = {
  label: string;
  value?: string | number | null | undefined;
};

const { label, value = undefined } = defineProps<AppFielValueProps>();
</script>

<template>
  <div class="column">
    <label class="text-body2 text-grey-8 text-weight-medium">
      {{ label }}
    </label>
    <p class="q-mb-none text-body">{{ value ?? '' }}</p>
  </div>
</template>
