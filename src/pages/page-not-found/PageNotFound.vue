<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const labels = {
  fourOFour: i18n.t('pageNotFound.fourOFour'),
  homeBtn: i18n.t('pageNotFound.homeBtn'),
  pageNotFoundText: i18n.t('pageNotFound.pageNotFoundText'),
};
</script>

<template>
  <div class="bg-blue flex flex-center fullscreen q-pa-md text-center text-white">
    <div>
      <div class="fontSize30vh">{{ labels.fourOFour }}</div>

      <div class="opacity04 text-h2">{{ labels.pageNotFoundText }}</div>

      <div class="q-mt-md text-subtitle1">
        <RouterLink to="/">
          {{ labels.homeBtn }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fontSize30vh {
  font-size: 30vh;
}

.opacity04 {
  opacity: 0.4;
}
</style>
