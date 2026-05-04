<!--
  This component is simply a wrapper for the `QForm` component setting some defaults.

  Docs: https://quasar.dev/vue-components/form
-->
<!-- eslint-disable vue/no-unused-properties, vue/define-props-destructuring -->
<script setup lang="ts">
import type { Component } from 'vue';
import { QForm } from 'quasar';
import type { VueSlot } from 'src/utils';

type AppFormEmits = {
  (e: 'reset' | 'validationSuccess'): void;
  (e: 'submit', value: Event | SubmitEvent): void;
  (e: 'validationError', value: Component): void;
};
type AppFormSlots = {
  default: VueSlot;
};

const emit = defineEmits<AppFormEmits>();
defineSlots<AppFormSlots>();
</script>

<template>
  <QForm
    @reset="() => emit('reset')"
    @submit="(e) => emit('submit', e)"
    @validation-error="(e) => emit('validationError', e)"
    @validation-success="() => emit('validationSuccess')"
  >
    <slot name="default" />
  </QForm>
</template>
