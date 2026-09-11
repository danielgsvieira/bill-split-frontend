<script setup lang="ts">
import MainLayoutUserMenu from './MainLayoutUserMenu.vue';
import { menuItems } from 'src/consts/menuItems';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AppBtn, AppDarkModeToggle, AppIcon } from 'src/components';
import {
  QDrawer,
  QHeader,
  QItem,
  QItemSection,
  QLayout,
  QList,
  QPageContainer,
  QScrollArea,
  QToolbar,
  QToolbarTitle,
  Ripple as vRipple,
} from 'quasar';

const i18n = useI18n();

const showDrawer = ref(false);
</script>

<template>
  <QLayout view="hHh Lpr lFf">
    <QHeader>
      <QToolbar>
        <AppBtn flat icon="menu" round type="button" @click="() => (showDrawer = !showDrawer)" />
        <QToolbarTitle>{{ i18n.t('general.appTitle') }}</QToolbarTitle>
        <AppDarkModeToggle />
        <MainLayoutUserMenu />
      </QToolbar>
    </QHeader>

    <QDrawer v-model="showDrawer" bordered side="left">
      <QScrollArea class="fit">
        <QList role="none">
          <template v-for="(menuItem, index) in menuItems" :key="index">
            <QItem v-ripple active-class="text-accent" clickable :to="menuItem.route">
              <QItemSection avatar>
                <AppIcon :name="menuItem.icon" />
              </QItemSection>
              <QItemSection>
                {{ menuItem.label }}
              </QItemSection>
            </QItem>
          </template>
        </QList>
      </QScrollArea>
    </QDrawer>

    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>
