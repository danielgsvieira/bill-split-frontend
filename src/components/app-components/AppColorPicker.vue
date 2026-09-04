<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import AppInput, { type AppInputProps } from './AppInput.vue';
import { QColor, QPopupProxy } from 'quasar';

type AppDatePickerModelType = string | null | undefined;
type AppDatePickerProps = Omit<AppInputProps, 'type'>;

const props = defineProps<AppDatePickerProps>();
const model = defineModel<AppDatePickerModelType>({ default: '#AAAAAA' });
</script>

<template>
  <AppInput v-bind="props" v-model="model">
    <template #append>
      <div class="colorVisualizer" :style="{ backgroundColor: model ?? '' }"></div>
      <AppIcon class="cursor-pointer" name="colorize">
        <QPopupProxy>
          <QColor v-model="model" no-header />
        </QPopupProxy>
      </AppIcon>
    </template>
  </AppInput>
</template>

<style scoped lang="scss">
.colorVisualizer {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.2rem;
}
</style>
