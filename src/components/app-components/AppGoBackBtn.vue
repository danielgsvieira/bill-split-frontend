<script setup lang="ts">
import AppBtn from './AppBtn.vue';
import type { RouteLocationRaw } from 'vue-router';
import { useGoBack } from 'src/composables';
import { useI18n } from 'vue-i18n';

type AppGoBackBtnProps = {
  fallbackRoute: RouteLocationRaw;
};

const { fallbackRoute } = defineProps<AppGoBackBtnProps>();

const { t } = useI18n();
const { goBack } = useGoBack(fallbackRoute);
</script>

<template>
  <AppBtn flat icon="arrow_back" :label="t('general.goBack')" type="button" @click="goBack" />
</template>
