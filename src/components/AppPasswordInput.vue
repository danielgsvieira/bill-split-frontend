<!-- eslint-disable vue/define-props-destructuring -->
<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import { ref } from 'vue';
import AppInput, { type AppInputProps } from './AppInput.vue';

type AppInputPasswordModelValue = string | null | undefined;
type AppInputPasswordProps = Omit<AppInputProps, 'type'>;

const props = defineProps<AppInputPasswordProps>();

const model = defineModel<AppInputPasswordModelValue>();

const showText = ref(false);
</script>

<template>
  <AppInput v-bind="props" v-model="model" :type="showText ? 'text' : 'password'">
    <template #append>
      <AppIcon :name="showText ? 'visibility' : 'visibility_off'" @click="showText = !showText" />
    </template>
  </AppInput>
</template>
