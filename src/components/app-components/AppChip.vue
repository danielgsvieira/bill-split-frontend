<!--
  This component is simply a wrapper for the `QChip` component setting some defaults.

  Docs: https://quasar.dev/vue-components/chip
-->
<script setup lang="ts">
import { computed } from 'vue';
import type { VueSlot } from 'src/utils';
import { type NamedColor, QChip } from 'quasar';

type AppChipProps = {
  color?: NamedColor | (string & {});
  dense?: boolean | undefined;
  icon?: string | undefined;
  outline?: boolean | undefined;
  removable?: boolean | undefined;
};
type AppChipSlots = {
  default: VueSlot;
};
type AppChipEmits = (e: 'remove') => void;

const {
  color = undefined,
  dense = undefined,
  icon = undefined,
  outline = true,
  removable = undefined,
} = defineProps<AppChipProps>();
const emit = defineEmits<AppChipEmits>();
defineSlots<AppChipSlots>();

const isHexColor = computed(() => {
  return color?.startsWith('#') ?? false;
});
</script>

<template>
  <QChip
    :class="{ dynamicColoredChip: isHexColor, outlined: outline, filled: !outline }"
    :color="!isHexColor ? color : undefined"
    :dense
    :icon
    :outline
    :removable
    @remove="emit('remove')"
  >
    <slot name="default" />
  </QChip>
</template>

<style scoped lang="scss">
.dynamicColoredChip.filled {
  background-color: v-bind(color);
}

.dynamicColoredChip.outlined {
  border-color: v-bind(color);
  color: v-bind(color);

  :deep(i) {
    color: v-bind(color);
  }
}
</style>
