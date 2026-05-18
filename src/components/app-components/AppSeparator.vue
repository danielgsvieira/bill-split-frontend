<!--
  This component is simply a wrapper for the `QSeparator` component setting some defaults.

  Docs: https://quasar.dev/vue-components/separator
-->
<script setup lang="ts">
import { type AppSizeString } from 'src/utils';
import { QSeparator } from 'quasar';

type AppBtnProps = {
  spaced?: boolean | AppSizeString | undefined;
  vertical?: boolean | undefined;
};

const { spaced = undefined, vertical = undefined } = defineProps<AppBtnProps>();
</script>

<template>
  <QSeparator :spaced :vertical />
</template>
