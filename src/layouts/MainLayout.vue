<script setup lang="ts">
import { AppDarkModeToggle } from 'src/components';
import MainLayoutUserMenu from './MainLayoutUserMenu.vue';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { QHeader, QLayout, QPageContainer, QToolbar, QToolbarTitle } from 'quasar';

const i18n = useI18n();
</script>

<template>
  <QLayout view="lHh Lpr lFf">
    <QHeader>
      <QToolbar>
        <QToolbarTitle>{{ i18n.t('general.appTitle') }}</QToolbarTitle>
        <AppDarkModeToggle />
        <MainLayoutUserMenu />
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>
