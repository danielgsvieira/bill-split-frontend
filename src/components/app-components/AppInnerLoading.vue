<!--
  This component is simply a wrapper for the `QInnerLoading` component setting some defaults.

  Docs: https://quasar.dev/vue-components/inner-loading
-->
<script setup lang="ts">
import { QInnerLoading } from 'quasar';

type AppInnerLoadingProps = {
  showing?: boolean | undefined;
};

const { showing = false } = defineProps<AppInnerLoadingProps>();
</script>

<template>
  <QInnerLoading :showing />
</template>
