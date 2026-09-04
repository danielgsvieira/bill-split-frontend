<!--
  This component is simply a wrapper for the `QBtn` component setting some defaults.

  Docs: https://quasar.dev/vue-components/button
-->
<script setup lang="ts">
import type { AppSizeString } from 'src/utils';
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { QBtn, type QBtnProps, useQuasar } from 'quasar';

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

const quasar = useQuasar();

const btnColor = computed(() => {
  const defaultColor = flat === true ? undefined : 'accent';

  return color ?? defaultColor;
});

const computedStyle = computed(() => {
  if (!flat) {
    return undefined;
  }

  const textColor = quasar.dark.isActive ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
  return { color: textColor };
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
    :style="computedStyle"
    :to
    :type
    @click="(e) => emit('click', e)"
  />
</template>
