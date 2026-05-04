<script setup lang="ts">
import MainLayoutUserMenu from './MainLayoutUserMenu.vue';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { QHeader, QLayout, QPageContainer, QToolbar, QToolbarTitle } from 'quasar';

const { t } = useI18n();

const labels = {
  appTitle: t('general.appTitle'),
};
</script>

<template>
  <QLayout view="lHh Lpr lFf">
    <QHeader elevated>
      <QToolbar>
        <QToolbarTitle>{{ labels.appTitle }}</QToolbarTitle>
        <MainLayoutUserMenu />
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>
