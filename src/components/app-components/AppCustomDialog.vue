<script setup lang="ts">
import AppCard from './AppCard.vue';
import type { VueSlot } from 'src/utils';
import { QDialog, useDialogPluginComponent } from 'quasar';

type AppCustomDialogProps = {
  title?: string | undefined;
  persistent?: boolean | undefined;
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

const { persistent = undefined, title = undefined } = defineProps<AppCustomDialogProps>();
defineEmits<AppCustomDialogEmits>();
defineSlots<AppCustomDialogSlots>();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
</script>

<template>
  <QDialog ref="dialogRef" :persistent @hide="onDialogHide">
    <AppCard class="q-dialog-plugin" :title="title">
      <slot
        name="default"
        :on-cancel="onDialogCancel"
        :on-hide="onDialogHide"
        :on-ok="onDialogOK"
      />
    </AppCard>
  </QDialog>
</template>
