<script setup lang="ts">
import AppCard from './AppCard.vue';
import type { VueSlot } from 'src/utils';
import { QDialog, useDialogPluginComponent } from 'quasar';

type AppCustomDialogProps = {
  loading?: boolean | undefined;
  persistent?: boolean | undefined;
  title?: string | undefined;
  wide?: boolean | undefined;
};

type AppCustomDialogEmits = {
  // eslint-disable-next-line vue/no-unused-emit-declarations
  (e: 'hide'): void;
  // eslint-disable-next-line vue/no-unused-emit-declarations
  (e: 'ok', payload: never): void;
};
type AppCustomDialogSlots = {
  default: VueSlot<{ onCancel: () => void; onHide: () => void; onOk: (payload?: never) => void }>;
};

const {
  loading = undefined,
  persistent = undefined,
  title = undefined,
  wide = undefined,
} = defineProps<AppCustomDialogProps>();
defineEmits<AppCustomDialogEmits>();
defineSlots<AppCustomDialogSlots>();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
</script>

<template>
  <QDialog ref="dialogRef" :persistent @hide="onDialogHide">
    <AppCard class="q-dialog-plugin" :class="{ 'wide-dialog': wide }" :loading :title="title">
      <slot
        name="default"
        :on-cancel="onDialogCancel"
        :on-hide="onDialogHide"
        :on-ok="onDialogOK"
      />
    </AppCard>
  </QDialog>
</template>

<style scoped lang="scss">
.wide-dialog {
  width: 90vw;
  max-width: $breakpoint-lg-min;
}
</style>
