<!--
  This component is simply a wrapper for the `QIcon` component setting some defaults.

  Docs: https://quasar.dev/vue-components/icon
-->
<!-- eslint-disable vue/no-unused-properties, vue/define-props-destructuring -->
<script setup lang="ts">
import { QIcon } from 'quasar';
import type { AppSizeString, VueSlot } from 'src/utils';

type AppIconProps = {
  name: string;
  size?: AppSizeString | undefined;
};
type AppIconSlots = {
  default: VueSlot;
};

const { name, size = undefined } = defineProps<AppIconProps>();
defineSlots<AppIconSlots>();
</script>

<template>
  <QIcon :name :size>
    <slot name="default" />
  </QIcon>
</template>
