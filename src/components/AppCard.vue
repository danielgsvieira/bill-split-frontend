<script setup lang="ts">
import AppInnerLoading from './AppInnerLoading.vue';
import type { VueSlot } from 'src/utils';
import { QCard, QCardSection } from 'quasar';

type AppPageProps = {
  loading?: boolean | undefined;
  title?: string;
};
type AppPageSlots = {
  default: VueSlot;
};

const { loading = undefined, title = undefined } = defineProps<AppPageProps>();
defineSlots<AppPageSlots>();
</script>

<template>
  <QCard bordered flat>
    <QCardSection v-if="title !== undefined">
      <h6 class="q-ma-none text-h5 text-primary">
        {{ title }}
      </h6>
    </QCardSection>
    <QCardSection>
      <slot name="default" />
    </QCardSection>
    <AppInnerLoading :showing="loading" />
  </QCard>
</template>
