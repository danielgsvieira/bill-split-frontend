<!--
  This component is simply a wrapper for the `QTooltip` component setting some defaults.

  Docs: https://quasar.dev/vue-components/tooltip
-->
<script setup lang="ts">
import { QTooltip } from 'quasar';
import type { VueSlot } from 'src/utils';

type AppTooltipAnchor =
  | 'top left'
  | 'top middle'
  | 'top right'
  | 'top start'
  | 'top end'
  | 'center left'
  | 'center middle'
  | 'center right'
  | 'center start'
  | 'center end'
  | 'bottom left'
  | 'bottom middle'
  | 'bottom right'
  | 'bottom start'
  | 'bottom end'
  | undefined;

type AppTooltipSelf =
  | 'top left'
  | 'top middle'
  | 'top right'
  | 'top start'
  | 'top end'
  | 'center left'
  | 'center middle'
  | 'center right'
  | 'center start'
  | 'center end'
  | 'bottom left'
  | 'bottom middle'
  | 'bottom right'
  | 'bottom start'
  | 'bottom end'
  | undefined;

type AppTooltipProps = {
  anchor?: AppTooltipAnchor;
  self?: AppTooltipSelf;
};
type AppTooltipSlots = {
  default: VueSlot;
};

const { anchor = undefined, self = undefined } = defineProps<AppTooltipProps>();
defineSlots<AppTooltipSlots>();
</script>

<template>
  <QTooltip :anchor :self>
    <slot name="default" />
  </QTooltip>
</template>
