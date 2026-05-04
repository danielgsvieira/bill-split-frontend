<script setup lang="ts">
import AppInnerLoading from './AppInnerLoading.vue';
import { QPage } from 'quasar';
import type { VueSlot } from 'src/utils';

type AppPageProps = {
  centeredContent?: boolean;
  loading?: boolean | undefined;
  title?: string;
};
type AppPageSlots = {
  default: VueSlot;
  header: VueSlot;
  title: VueSlot;
  buttons: VueSlot;
};

const {
  centeredContent = false,
  loading = undefined,
  title = undefined,
} = defineProps<AppPageProps>();
const slots = defineSlots<AppPageSlots>();
</script>

<template>
  <QPage class="column items-center justify-start" padding>
    <div class="col column content-width full-width q-pa-md">
      <template v-if="title !== undefined">
        <slot name="header">
          <div class="col-auto items-center justify-between q-mb-md q-px-md row">
            <h1 class="q-ma-none text-h4 text-secondary">
              <slot name="title">
                {{ title }}
              </slot>
            </h1>
            <div v-if="slots.buttons">
              <slot name="buttons" />
            </div>
          </div>
        </slot>
      </template>
      <template v-if="centeredContent">
        <section class="col items-center justify-center q-pa-md row">
          <slot name="default" />
        </section>
      </template>
      <template v-else>
        <section class="col q-pa-md">
          <slot name="default" />
        </section>
      </template>
    </div>
    <AppInnerLoading :showing="loading" />
  </QPage>
</template>

<style scoped lang="scss">
.content-width {
  max-width: $breakpoint-lg-min;
}
</style>
