<script setup lang="ts">
import AppInnerLoading from './AppInnerLoading.vue';
import type { VueSlot } from 'src/utils';
import { QCard, QCardSection, useQuasar } from 'quasar';

type AppPageProps = {
  loading?: boolean | undefined;
  title?: string | undefined;
};
type AppPageSlots = {
  default: VueSlot;
};

const { loading = undefined, title = undefined } = defineProps<AppPageProps>();
defineSlots<AppPageSlots>();

const quasar = useQuasar();
</script>

<template>
  <QCard bordered flat>
    <QCardSection v-if="title !== undefined">
      <h6 class="q-ma-none text-h5" :class="!quasar.dark.isActive ? 'text-accent' : undefined">
        {{ title }}
      </h6>
    </QCardSection>
    <QCardSection>
      <slot name="default" />
    </QCardSection>
    <AppInnerLoading :showing="loading" />
  </QCard>
</template>
