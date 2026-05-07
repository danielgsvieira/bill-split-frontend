<script setup lang="ts">
import AppBtn, { type AppBtnProps } from '../AppBtn.vue';

type AppTableActionBtnProps = Pick<AppBtnProps, 'icon' | 'to'>;
type AppTableActionBtnEmits = (e: 'click', value: Event) => void;

const { icon, to } = defineProps<AppTableActionBtnProps>();
const emit = defineEmits<AppTableActionBtnEmits>();
</script>

<template>
  <AppBtn flat :icon round size="sm" :to type="button" @click="(e) => emit('click', e)" />
</template>
