<!--
  This component is simply a wrapper for the `QIcon` component setting some defaults.

  Docs: https://quasar.dev/vue-components/icon
-->
<!-- eslint-disable vue/no-unused-properties, vue/define-props-destructuring -->
<script setup lang="ts">
import { QIcon } from 'quasar';
import type { VueSlot } from 'src/utils';

type AppIconProps = {
  name: string;
};
type AppIconSlots = {
  default: VueSlot;
};

const { name } = defineProps<AppIconProps>();
defineSlots<AppIconSlots>();
</script>

<template>
  <QIcon :name>
    <slot name="default" />
  </QIcon>
</template>
