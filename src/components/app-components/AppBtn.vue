<!--
  This component is simply a wrapper for the `QBtn` component setting some defaults.

  Docs: https://quasar.dev/vue-components/button
-->
<script setup lang="ts">
import type { AppSizeString } from 'src/utils';
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { QBtn, type QBtnProps } from 'quasar';

type AppBtnProps = {
  color?: QBtnProps['color'];
  flat?: boolean | undefined;
  icon?: string | undefined;
  label?: string | undefined;
  loading?: boolean | undefined;
  round?: boolean | undefined;
  size?: AppSizeString | undefined;
  to?: RouteLocationRaw | undefined;
  type: string;
};
type AppBtnEmits = (e: 'click', value: Event) => void;

const {
  color = undefined,
  flat = undefined,
  icon = undefined,
  label = undefined,
  loading = undefined,
  round = undefined,
  size = undefined,
  to = undefined,
  type,
} = defineProps<AppBtnProps>();
const emit = defineEmits<AppBtnEmits>();

const btnColor = computed(() => {
  const defaultColor = flat === true ? 'grey-8' : 'primary';

  return color ?? defaultColor;
});

export type { AppBtnEmits, AppBtnProps };
</script>

<template>
  <QBtn
    :color="btnColor"
    :flat
    :icon
    :label
    :loading
    no-caps
    :round
    :size
    :to
    :type
    @click="(e) => emit('click', e)"
  />
</template>
