<script setup lang="ts">
type AppFielValueProps = {
  label: string;
  value?: string | number | null | undefined;
  valueTextClass?: string | undefined;
};

const { label, value = undefined, valueTextClass = undefined } = defineProps<AppFielValueProps>();
</script>

<template>
  <div class="column">
    <label class="opacity-50 text-body2 text-weight-medium">
      {{ label }}
    </label>
    <p class="q-mb-none text-body" :class="valueTextClass">{{ value ?? '' }}</p>
  </div>
</template>
